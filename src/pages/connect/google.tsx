import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useUser from '@/hooks/useUser';

import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';

import { useAuth } from '@/context/AuthContext';
import * as ga from '@/helpers/ga';

export default function Login() {
  const router = useRouter();
  const { connect } = useAuth();
  const { user, mutate, loggedOut } = useUser();
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    if (user && !loggedOut) {
      if (user.onboarded) {
        ga.event('login', {
          method: 'google',
        });
        router.replace('/feed');
      } else {
        ga.event('sign_up', {
          method: 'google',
        });
        router.replace('/onboarding/profile');
      }
    }
  }, [user, loggedOut]);

  const callConnect = async () => {
    try {
      const queryString = router.asPath.split(/\?/)[1] as string;
      await connect('google', queryString);
      mutate();
      toast('Logged in successfully.');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    callConnect();
    setTimeout(() => {
      setShowRetry(true);
    }, 10000);
  }, []);

  return (
    <Layout
      meta={
        <Meta
          title="Connecting with Google - CoFoundersLab"
          description="Connecting with Google on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      headerBanner={null}
      header={null}
      footer={null}
    >
      <div className="flex min-h-screen bg-white">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-24 xl:px-32">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link
                href="/login"
                title="Back to the login page"
                className="inline-block"
              >
                <img
                  className="h-12 w-auto"
                  src="/assets/images/c.svg"
                  alt="CoFoundersLab"
                />
              </Link>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Connecting with Google
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please wait while you&apos;re being authenticated.
              </p>
              {showRetry && (
                <p className="mt-2 text-sm text-gray-600">
                  This is taking longer than usual.{' '}
                  <a
                    onClick={() => {
                      callConnect();
                    }}
                    className="cursor-pointer text-blue-600"
                  >
                    Click here to try again
                  </a>
                </p>
              )}
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-center py-20">
                <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-600"></div>
              </div>
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
