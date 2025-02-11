import { Environment, EventName, Paddle } from "@paddle/paddle-node-sdk";
import { NextResponse } from "next/server";

const paddle = new Paddle(process.env.NEXT_PADDLE_API_TOKEN!, {
  environment: Environment.sandbox,
});

export async function POST(req: Request) {
  const signature = (req.headers.get("paddle-signature") as string) || "";
  // req.body should be of type `buffer`, convert to string before passing it to `unmarshal`.
  // If express returned a JSON, remove any other middleware that might have processed raw request to object
  const rawRequestBody = (await req.text()) || "";
  // Replace `WEBHOOK_SECRET_KEY` with the secret key in notifications from vendor dashboard
  const secretKey = process.env.WEBHOOK_SECRET_KEY || "";

  try {
    if (signature && rawRequestBody) {
      // The `unmarshal` function will validate the integrity of the webhook and return an entity
      const eventData = await paddle.webhooks.unmarshal(
        rawRequestBody,
        secretKey,
        signature
      );
      switch (eventData.eventType) {
        case EventName.SubscriptionActivated:
          console.log(`Product ${eventData.data.id} was updated`);
          break;
        case EventName.SubscriptionUpdated:
          console.log(`Subscription ${eventData.data.id} was updated`);
          break;
        case EventName.SubscriptionCanceled:
          console.log(`Subscription ${eventData.data.id} was cancelled`);
          break;
        case EventName.PayoutPaid:
          console.log(`object ${eventData.data.id} was paid`);
          break;
        default:
          console.log(eventData.eventType);
      }
    } else {
      console.log("Signature missing in header");
    }
  } catch (e) {
    // Handle signature mismatch or other runtime errors
    console.log(e);
  }
  // Return a response to acknowledge
  return NextResponse.json({ ok: true });
}
