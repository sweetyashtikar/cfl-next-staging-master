import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { API_URL, NEXT_URL } from '@/config/index';

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
      res.status(404).json({ message: 'No subscription found' });
      return;
    }

    try {
      const { url } = await stripe.billingPortal.sessions.create({
        customer: subscription.customerId,
        return_url: `${NEXT_URL}/settings/billing`,
      });

      res.status(200).json({ url });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
