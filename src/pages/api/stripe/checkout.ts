import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { API_URL } from '@/config/index';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }
    const { token } = cookie.parse(req.headers.cookie);
    const strapiRes = await fetch(`${API_URL}/subscriptions/customer`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const subscription = await strapiRes.json();
    if (!strapiRes.ok) {
      res.status(403).json({ message: 'User forbidden' });
      return;
    }

    const plan: string = req.body.plan;
    if (!['month', 'year'].includes(plan)) {
      throw new Error('Invalid plan.');
    }

    let trialPeriodDays = 14;
    const promo: string = req.body.promo;
    if (promo === 'pepperdine') {
      trialPeriodDays = 30;
    }

    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        customer: subscription.customerId,
        line_items: [
          {
            price:
              plan === 'month'
                ? 'price_0LACyQ3HCM8UiiADHiMAIwVJ'
                : 'price_0LACyk3HCM8UiiAD4BO5MPWq',
            quantity: 1,
          },
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        subscription_data: {
          trial_period_days: trialPeriodDays,
        },
        success_url: `${req.headers.origin}/premium-confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/premium`,
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err: any) {
      console.log('checkout.ts', err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
