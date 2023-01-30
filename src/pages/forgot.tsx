import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useUser from '@/hooks/useUser';

import { Layout, Meta } from '@/components/layout';

import { IForgotParams, useAuth } from '@/context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { forgot } = useAuth();
  const { user, mutate, loggedOut } = useUser();

  useEffect(() => {
    if (user && !loggedOut) {
      if (user.onboarded) {
        router.replace('/feed');
      } else {
        router.replace('/onboarding/profile');
      }
    }
  }, [user, loggedOut]);

  const { register, handleSubmit, formState } = useForm<IForgotParams>();
  const { isSubmitting } = formState;
  const onSubmit: SubmitHandler<IForgotParams> = async (data) => {
    try {
      await forgot(data);
      mutate();
      toast('Reset successfull! Please check your email address.');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Layout
      meta={
        <Meta
          title="Forgot password - CoFoundersLab"
          description="Forgot password at CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
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
              <Link href="/">
                <a title="Back to the homepage" className="inline-block">
                  <img
                    className="h-12 w-auto"
                    src="/assets/images/c.svg"
                    alt="CoFoundersLab"
                  />
                </a>
              </Link>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Forgot password
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or go back to{' '}
                <Link href="/login">
                  <a className="font-medium text-blue-600 hover:text-blue-500">
                    sign in
                  </a>
                </Link>{' '}
              </p>
            </div>

            <div className="mt-8">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="identifier"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('identifier', { required: true })}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-md bg-blue-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-400"
                  >
                    Request password reset
                  </button>
                </div>
              </form>
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
