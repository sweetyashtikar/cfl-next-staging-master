// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

import { API_URL } from '@/config/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (!req.headers.cookie) {
    res.status(403).json({ message: 'Not Authorized' });
    return;
  }

  if (!req.url) {
    res.status(404).json({ message: 'URL not found' });
    return;
  }

  const path = req.url.replace(/^\/api\/session/, '');

  const { token } = cookie.parse(req.headers.cookie);

  const options: any = {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  if (req.method && ['PUT', 'POST'].includes(req.method)) {
    options.body = JSON.stringify(req.body);
  }

  const strapiRes = await fetch(`${API_URL}${path}`, options);

  const data = await strapiRes.json();

  if (strapiRes.ok) {
    res.status(200).json(data);
  } else {
    res.status(data.statusCode).json(data);
  }
}
