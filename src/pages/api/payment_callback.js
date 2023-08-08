import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/fire_config';

export default async function handler(req, res) {
  try {
    // Get the payment reference from the query parameters
    const { email, reference } = req.query;

    // Verify the payment status with Paystack
    const verifyUrl = `https://api.paystack.co/transaction/verify/${reference}`;
    const config = {
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_TEST_SECRET_KEY}`,
        "Cache-Control": "no-cache"
      }
    };

    const response = await axios.get(verifyUrl, config);
    const paymentData = response.data.data;

    if (paymentData.status === 'success') {
      // member
      const memberDoc = doc(db, "users", email);
      const memberData = { "group.payment.askAdminToPay": false, "group.payment.hasPaid": true, };

      await updateDoc(memberDoc, memberData).then(() => {
        res.setHeader('Location', `${process.env.NEXT_PUBLIC_DOMAIN}payment_successful`);
        res.status(302).end();
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
