import axios from "axios";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/fire_config";

export default async function handler(req, res) {
  console.log(req.query);
  try {
    const { ticketId, reference } = req.query;

    // Verify the payment status with Paystack
    const verifyUrl = `https://api.paystack.co/transaction/verify/${reference}`;
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_TEST_SECRET_KEY}`,
        "Cache-Control": "no-cache",
      },
    };

    const response = await axios.get(verifyUrl, config);
    const data = response.data.data;

    if (data.status === "success") {
      // ticket
      const refDoc = doc(db, "tickets", ticketId);
      const update = { paymentStatus: "paid", transactionId: data.reference };

      await updateDoc(refDoc, update)
        .then(async () => {
          await addDoc(collection(db, "contributions"), {}).then(() => {
            res.setHeader(
              "Location",
              `${process.env.NEXT_PUBLIC_DOMAIN}payment_successful`
            );
            res.status(302).end();
          });
        })
        .catch((error) => {
          res.status(200).json({
            status: "error",
            message: `Something is wrong: ${error.message}`,
          });
        });
    } else {
      res
        .status(200)
        .json({ status: "error", message: "Payment not successful" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.response.data.message });
  }
}
