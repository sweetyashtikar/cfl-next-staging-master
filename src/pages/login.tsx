import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useUser from '@/hooks/useUser';

import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';

import { API_URL } from '@/config/index';
import { ILoginParams, useAuth } from '@/context/AuthContext';
import * as ga from '@/helpers/ga';

import { handleAlgoliaUpdate } from './api/algolia/algolia';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const { user, mutate, loggedOut } = useUser();

  useEffect(() => {
    if (user && !loggedOut) {
      if (user.onboarded) {
        router.replace('/feed');
        const { id, profile } = user;
        profile.connections = [] || [];
        handleAlgoliaUpdate(id, profile);
      } else {
        router.replace('/onboarding/profile');
      }
    }
  }, [user, loggedOut]);

  const { register, handleSubmit, formState } = useForm<ILoginParams>();
  const { isSubmitting } = formState;
  const onSubmit: SubmitHandler<ILoginParams> = async (data) => {
    try {
      await login(data);
      mutate();
      toast('Logged in successfully.');
      ga.event('login', {
        method: 'local',
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Layout
      meta={
        <Meta
          title="Login - CoFoundersLab"
          description="Login on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      headerBanner={null}
      header={null}
      footer={null}
      sidebar={null}
    >
      <div className="flex min-h-screen bg-white">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-24 xl:px-32">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link
                href="/"
                title="Back to the homepage"
                className="inline-block"
              >
                <img
                  className="h-12 w-auto"
                  src="/assets/images/cfl.svg"
                  alt="CoFoundersLab"
                />
              </Link>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign into your FREE
                <span className="text-center"> account</span>
                <p className="text-center"></p>
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{' '}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  click here to create
                </Link>{' '}
                a free account
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
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('password', { required: true })}
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgot"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-md bg-blue-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-400"
                  >
                    Login
                  </button>
                </div>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">or</span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-3">
                  <div>
                    <div className="group relative flex flex-col items-center">
                      <Link
                        href={`${API_URL}/connect/google`}
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                        onClick={() => {
                          ga.event('click_signup_with_google', {
                            event_category: 'engagement',
                          });
                        }}
                      >
                        Sign in with Google
                      </Link>
                    </div>
                  </div>
                  {/* <div>
                    <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Facebook</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div> */}

                  {/* <div>
                    <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Twitter</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with GitHub</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="hidden w-[100%] flex-1 bg-[url('/assets/images/auth-splash.jpg')]
  bg-cover  bg-center bg-no-repeat lg:block "
        >
          <div className=" flex  h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#403636] to-[#ccb9b91a] ">
            <p className="text-center text-[87px] font-black uppercase leading-[5.75rem] text-white">
              join our <br />
              community <br />
              for free
            </p>
            <p className="text-[67px] font-black uppercase text-white"></p>

            <p className="mt-3.5 text-center text-[3.5rem] text-white">
              Accelerate your startup journey
            </p>
            {/* <div className="mt-3.5  text-2xl font-bold uppercase text-white">
              <span className="pr-8">connect</span>{' '}
              <span className="pr-8">collaborate</span>{' '}
              <span className="pr-8">educate</span>
            </div> */}
          </div>
          {/* <div className="relative z-10 flex flex-row h-full justify-center items-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-extrabold leading-none mb-5">TAKE THE<br />NEXT STEP</h1>
              <p className="text-2xl max-w-2xl mb-24">To join a community that collaborates and educates on the world's beststart up platform.</p>
              <p className="text-2xl max-w-2xl mb-5">Accelerate your startup with the world’s leading platform for entrepreneurs and innovators.</p>
              <div className="text-center">
                <span className="mr-5 text-xl font-bold">CONNECT</span>
                <span className="mr-5 text-xl font-bold">COLLABORATE</span>
                <span className="text-xl font-bold">EDUCATE</span>
              </div>
            </div>
          </div> */}
          {/* <Image
            className="absolute right-0"
            alt="Join World's Largest Network of Entrepreneurs"
            src="/assets/images/auth-splash.jpg"
            layout="fill"
            objectFit="cover"
            quality={70}
          /> */}
          {/* <img
            className="absolute inset-0 z-0 h-full w-full object-cover"
            alt="Join World's Largest Network of Entrepreneurs"
            src="/assets/images/auth-splash.jpg"
          /> */}
        </div>
      </div>
    </Layout>
  );
}
