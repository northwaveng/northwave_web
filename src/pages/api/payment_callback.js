import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/fire_config';
import { toast } from 'react-toastify';

export default async function handler(req, res) {
  try {
    // Get the payment reference from the query parameters
    const { reference } = req.query;

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
      const memberDoc = doc(db, "users", "lovethife@gmail.com");
      const memberData = { "hasMadePayment": true };

      await updateDoc(memberDoc, memberData).then(() => {
        toast.success("Payment Made.");
      }).catch((error) => {
        toast.error(`Something is wrong: ${error.message}`);
      });
    } else {
      toast.error("Payment not successful");
    }
  } catch (error) {
    toast.error('Error processing payment callback:', error);
  }
}
