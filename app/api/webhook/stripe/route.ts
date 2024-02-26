import { createOrder } from '@lib/actions/order.action';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe('sk_test_...', {
   // Ensure to use the latest API version
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err:any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object as Stripe.Checkout.Session;
      const {id,metadata,amount_total} = event.data.object
      const order = {
        stripeId:id,
        eventId:metadata?.eventId || "",
        buyerId:metadata?.buyerId || "",
        totalAmount:amount_total ? (amount_total / 100).toString() : '0',
        createdAt: new Date()
      }
      const newOrder = await await createOrder(order)
      return NextResponse.json({ message: 'OK', order: newOrder })
      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response('', { status: 200 })
}
