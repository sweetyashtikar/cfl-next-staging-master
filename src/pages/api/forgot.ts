import type { NextApiRequest, NextApiResponse } from 'next';

import { API_URL } from '@/config/index';

type Data = {
  jwt?: string;
  user?: any;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { identifier } = req.body;

    const strapiRes = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: identifier,
      }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json(data);
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0]?.messages[0]?.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
