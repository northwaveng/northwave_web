import axios from 'axios';
import { doc, updateDoc, addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/fire_config';
import Cryptograph from '@/components/utils/cryptograph';

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

          res.status(200).json({ status: 'success', message: groupId });

          // getDoc(doc(db, 'groups', groupId)).then((snapshot) => {
          //   const target = parseFloat(snapshot.data().target);
          //   res.status(200).json({ status: 'success', message: target });

          //   if (totalContributions > target) {
          //     const members = snapshot.data().members;
          //     const collector = members[0];

          //     res.status(200).json({ status: 'success', message: collector });

          //     getDoc(doc(db, 'users', collector)).then((user) => {
          //       const data = user.data();
          //       const crypto = new Cryptograph();
          //       const accountNumber = crypto.decrypt({ value: data.kyc.accountNumber });

          //       res.status(200).json({ status: 'success', message: accountNumber });

          //       // res.setHeader('Location', `${process.env.NEXT_PUBLIC_DOMAIN}payment_successful`);
          //       // res.status(302).end();
          //     }).catch((error) => {
          //       res.status(200).json({ status: 'error', message: `Something is wrong: ${error.message}` });
          //     });
          //   }
          // }).catch((error) => {
          //   res.status(200).json({ status: 'error', message: `Something is wrong: ${error.message}` });
          // });

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
