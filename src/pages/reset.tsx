import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useUser from '@/hooks/useUser';

import { Layout, Meta } from '@/components/layout';

import { IResetParams, useAuth } from '@/context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { code } = router.query;
  const { reset } = useAuth();
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

  const { register, handleSubmit, formState } = useForm<IResetParams>();
  const { isSubmitting } = formState;
  const onSubmit: SubmitHandler<IResetParams> = async (data) => {
    try {
      const postData = {
        ...data,
        code,
      };
      await reset(postData);

      mutate();
      toast('Password reset successful.');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

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
                Password reset
              </h2>
            </div>

            <div className="mt-8">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('password', { required: true })}
                      type="password"
                      autoComplete="new-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('passwordConfirmation', { required: true })}
                      type="password"
                      autoComplete="new-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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

// TODO: get user's data from token and display hello message
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token } = parseCookies(req);

//   // TODO: code duplication
//   const strapiRes = await fetch(`${API_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const user = await strapiRes.json();

//   return {
//     props: {
//       user,
//     },
//   };
// };
