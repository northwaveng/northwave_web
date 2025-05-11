import { doc, updateDoc, addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../../firebase/fire_config";
import { v4 } from "uuid";

export default function handler(req, res) {
  if (req.method === "POST") {
    const eventType = req.headers["x-event-type"];
    const eventData = req.body;

    switch (eventType) {
      case "transfer.success":
        // Handle transfer success event
        console.log("Transfer Successful:", eventData);
        break;
      case "transfer.failed":
        // Handle transfer failed event
        console.log("Transfer Failed:", eventData);
        break;
      case "transfer.reversed":
        // Handle transfer reversed event
        console.log("Transfer Reversed:", eventData);
        break;
      case "customeridentification.success":
      case "customeridentification.failed":
      case "assigndedicatedaccount.failed":
      case "assigndedicatedaccount.success":
        addDoc(collection(db, "messages"), { message: eventData })
          .then(() => {})
          .catch((error) => {
            console.log(`Something is wrong: ${error}`);
          });
        break;
      default:
        // Unknown event type
        console.log("Unknown Event Type:", eventType);
        break;
    }

    // Respond with a success status
    res.status(200).end();
  } else {
    // Handle other HTTP methods
    res.status(405).end();
  }
}
