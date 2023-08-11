import axios from 'axios';
import { doc, updateDoc, addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/fire_config';
import { v4 } from 'uuid';

export default async function handler(req, res) {
  try {
    // Get the payment reference from the query parameters
    const { email, reference, groupId, totalContributions } = req.query;

    // Verify the payment status with Paystack
    const verifyUrl = `https://api.paystack.co/transaction/verify/${reference}`;
    const config = {
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_TEST_SECRET_KEY}`,
        "Cache-Control": "no-cache"
      }
    };

    const response = await axios.get(verifyUrl, config);
    const data = response.data.data;

    if (data.status === 'success') {
      // member
      const memberDoc = doc(db, "users", email);
      const memberData = { "group.payment.askAdminToPay": false, "group.payment.hasPaid": true };

      await updateDoc(memberDoc, memberData).then(async () => {
        await addDoc(collection(db, "contributions"), {
          amount: data.amount,
          contributedOn: data.transaction_date,
          customer: data.customer.customer_code,
          email: data.customer.email,
          response: data.status,
          reference: data.reference,
          paymentChannel: data.channel,
          groupId: groupId,
        }).then(() => {

          getDoc(doc(db, 'groups', groupId)).then((snapshot) => {
            const target = parseFloat(snapshot.data().target);
            const contributions = parseFloat(totalContributions);

            if (contributions > target) {
              const members = snapshot.data().members;
              const collector = members[0];

              getDoc(doc(db, 'users', collector)).then(async (user) => {
                const user_ = user.data();
                const url = `${process.env.NEXT_PUBLIC_PAYSTACK_HOSTNAME}transfer`;
                const headers = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_TEST_SECRET_KEY}`, 'Content-Type': 'application/json' };
                const reference = v4();
                const adminCommission = target * 0.05;
                const adminTarget = target + adminCommission

                const params = JSON.stringify({
                  "source": "balance",
                  "amount": user_.group.admin.isAdmin ? adminTarget * 100 : target * 100,
                  "reference": reference,
                  "recipient": user_.kyc.recipientCode,
                  "reason": "NorthWave's Contribution Collection"
                });

                try {
                  const response = await axios.post(url, params, { headers });

                  if (response.status === 200 || response.status === 201) {
                    // move the first member to last
                    const firstMember = members.shift();
                    members.push(firstMember);

                    // rearrange members
                    for (let i = 0; i < members.length - 1; i++) {
                      members[i] = members[i];
                    }

                    updateDoc(doc(db, "groups", groupId), { "members": members }).then(() => {

                      members.forEach(async (member, index) => {
                        await updateDoc(doc(db, "users", member), {
                          "group.position": index + 1,
                          "payment.hasPaid": user_.group.admin.isAdmin && false
                        }).then(() => {
                          res.setHeader('Location', `${process.env.NEXT_PUBLIC_DOMAIN}payment_successful`);
                          res.status(302).end();
                        }).catch((error) => {
                          res.status(200).json({ status: 'error', message: `Something is wrong: ${error.message}` });
                        });
                      });

                    }).catch((error) => {
                      res.status(200).json({ status: 'error', message: `Something is wrong: ${error.message}` });
                    });
                  }
                } catch (error) {
                  res.status(200).json({ status: 'error', message: `Something is wrong: ${error.message}` });
                }
              }).catch((error) => {
                res.status(200).json({ status: 'error', message: `Something is wrong: ${error.message}` });
              });
            } else {
              res.setHeader('Location', `${process.env.NEXT_PUBLIC_DOMAIN}payment_successful`);
              res.status(302).end();
            }
          }).catch((error) => {
            res.status(200).json({ status: 'error', message: `Something is wrong: ${error.message}` });
          });

        }).catch((error) => {
          res.status(200).json({ status: 'error', message: `Something is wrong: ${error.message}` });
        });

      }).catch((error) => {
        res.status(200).json({ status: 'error', message: `Something is wrong: ${error.message}` });
      });
    } else {
      res.status(200).json({ status: 'error', message: 'Payment not successful' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'An error occurred' });
  }
}
