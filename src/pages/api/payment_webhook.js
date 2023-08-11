export default function handler(req, res) {
    if (req.method === 'POST') {
      const eventType = req.headers['x-event-type'];
      const eventData = req.body;
  
      switch (eventType) {
        case 'transfer.success':
          // Handle transfer success event
          console.log('Transfer Successful:', eventData);
          break;
        case 'transfer.failed':
          // Handle transfer failed event
          console.log('Transfer Failed:', eventData);
          break;
        case 'transfer.reversed':
          // Handle transfer reversed event
          console.log('Transfer Reversed:', eventData);
          break;
        default:
          // Unknown event type
          console.log('Unknown Event Type:', eventType);
          break;
      }
  
      // Respond with a success status
      res.status(200).end();
    } else {
      // Handle other HTTP methods
      res.status(405).end();
    }
  }
  