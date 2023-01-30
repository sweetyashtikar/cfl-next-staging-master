import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data?: any;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { refreshToken } = req.body;
    const strapiRes = await fetch(
      `https://partners.undock.com/partners/oauth/refresh-tokens`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken,
        }),
      }
    );
    const data = await strapiRes.json();
    if (strapiRes.ok) {
      res.status(200).json({ data });
    } else {
      res.status(data?.statusCode).json({ message: data?.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
