import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Layout, Meta } from '@/components/layout';

import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers/index';

export default function Login() {
  const router = useRouter();
  const { code } = router.query;
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [error, setError] = useState('');

  const verify = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/verify-change-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      });
      const data = await res.json();

      if (res.ok) {
        setVerificationStatus(true);
        toast.success('Email verified successfully');
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (e: any) {
      setError(e.message);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    verify();
  }, []);
  //const { user, mutate, loggedOut } = useUser();

  return (
    <Layout
      meta={
        <Meta
          title="Reset password - CoFoundersLab"
          description="Reset password at CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      headerBanner={null}
      header={null}
      footer={null}
    >
      <div className="flex min-h-screen bg-white">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-24 xl:px-32">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="text-center">
              <Link href="/">
                <a title="Back to the homepage" className="inline-block">
                  <img
                    className="h-12 w-auto"
                    src="/assets/images/c.svg"
                    alt="CoFoundersLab"
                  />
                </a>
              </Link>
              {verificationStatus && (
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Email Verified Successfully
                </h2>
              )}
              {!verificationStatus && (
                <div>
                  <h2 className="mt-6 pb-2 text-3xl font-extrabold text-gray-900">
                    Email not yet verified
                  </h2>
                  <p className="pb-2">{error}</p>
                  <p>Please try again later</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 z-0 h-full w-full object-cover"
            alt="Join World's Largest Network of Entrepreneurs"
            src="/assets/images/auth-splash.jpg"
          />
        </div>
      </div>
    </Layout>
  );
}

// TODO: get user's data from token and display hello message
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { token } = parseCookies(req);
  console.log(params);
  // TODO: code duplication
  const strapiRes = await fetch(`${API_URL}/users/verify-email`, {
    method: 'GET',
  });
  const user = await strapiRes.json();
  console.log(user);
  return {
    props: {
      user,
    },
  };
};
