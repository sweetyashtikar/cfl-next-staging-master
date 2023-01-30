import { AtSymbolIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useUser from '@/hooks/useUser';

import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';

import { API_URL } from '@/config/index';
import { IRegisterParams, useAuth } from '@/context/AuthContext';
import * as ga from '@/helpers/ga';

import country_Codes from '../json/country_dial_info.json';

export default function Register() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const { register: signup, validate } = useAuth();
  const { user, mutate, loggedOut } = useUser();
  const [emailResendCounter, setEmailResendCounter] = useState(0);
  const [phoneResendCounter, setPhoneResendCounter] = useState(0);
  const [emailResendLoading, setEmailResendLoading] = useState(false);
  const [phoneResendLoading, setPhoneResendLoading] = useState(false);
  const countryCodes = country_Codes;

  const {
    register: registerForm,
    handleSubmit: handleRegisterFormSubmit,
    setValue: setRegisterFormValue,
    formState: registerFormState,
  } = useForm<IRegisterParams>();
  const { isSubmitting: isRegisterFormSubmitting } = registerFormState;
  const onRegisterFormSubmit: SubmitHandler<IRegisterParams> = async (data) => {
    try {
      if (!data.agreement || !data.subscription) {
        return false;
      }
      data.phone = data.countryDialCode + data.phone;
      await signup(data);

      setIdentifier(data.email);
      setPhone(data.phone);
      toast('Please verify your email and phone number.');
      ga.event('sign_up_request', {
        event_category: 'engagement',
        event_label: 'Sign up (before validation)',
      });
    } catch (e: any) {
      toast.error(e.message);
    }
    return false;
  };

  const {
    register: validateForm,
    handleSubmit: handleValidateFormSubmit,
    formState: validateFormState,
  } = useForm<{
    emailToken: string;
    phoneToken: string;
  }>();
  const { isSubmitting: isValidateFormSubmitting } = validateFormState;
  const onValidateFormSubmit: SubmitHandler<{
    emailToken: string;
    phoneToken: string;
  }> = async (data) => {
    if (identifier) {
      try {
        await validate({ identifier, ...data });
        mutate();
        toast('Your account was successfully validated.');
        ga.event('sign_up', {
          method: 'local',
        });
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error('Missing identifier');
    }
  };

  const onChange = (v: any) => {
    setRegisterFormValue('countryDialCode', v.value);
  };

  useEffect(() => {
    if (user && !loggedOut) {
      router.push('/onboarding/profile');
    }
  }, [user, loggedOut]);

  useEffect(() => {
    if (emailResendCounter > 0)
      setTimeout(() => setEmailResendCounter(emailResendCounter - 1), 1000);
    if (phoneResendCounter > 0)
      setTimeout(() => setPhoneResendCounter(phoneResendCounter - 1), 1000);
  }, [emailResendCounter, phoneResendCounter]);

  const resendEmailToken = async () => {
    setEmailResendLoading(true);
    try {
      await axios.post(`${API_URL}/auth/send-email-token`, {
        email: identifier,
      });
      setEmailResendCounter(60);
      toast('Code sent, please check your email.');
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setEmailResendLoading(false);
    }
  };

  const resendPhoneToken = async () => {
    setPhoneResendLoading(true);
    try {
      await axios.post(`${API_URL}/auth/send-sms-token`, {
        phone: phone,
      });
      setPhoneResendCounter(60);
      toast('Code sent, please check your phone.');
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setPhoneResendLoading(false);
    }
  };

  return (
    <Layout
      meta={
        <Meta
          title="Sign up - CoFoundersLab"
          description="Sign up for CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      headerBanner={null}
      header={null}
      sidebar={null}
      footer={null}
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
                  src="/assets/images/c.svg"
                  alt="CoFoundersLab"
                />
              </Link>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{' '}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  click here to sign in
                </Link>{' '}
                if you already have an account
              </p>
            </div>

            {!identifier && (
              <div className="mt-8">
                <form
                  className="space-y-6"
                  onSubmit={handleRegisterFormSubmit(onRegisterFormSubmit)}
                >
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          {...registerForm('email', { required: true })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          {...registerForm('password', { required: true })}
                          type="password"
                          autoComplete="current-password"
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                          placeholder="A secure password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="agreement" className="mt-1">
                        <input
                          {...registerForm('agreement', { required: true })}
                          id="agreement"
                          type="checkbox"
                        />
                        &nbsp;{' '}
                        <span className="font-sans text-sm text-gray-500">
                          By filling your registration form and checking the
                          box, you agree to the{' '}
                          <a
                            href="https://cofounderslab.com/terms"
                            className="underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Terms &amp; Conditions
                          </a>{' '}
                          and{' '}
                          <a
                            href="https://cofounderslab.com/privacy"
                            className="underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Privacy Policy
                          </a>
                          .
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="subscription" className="mt-1">
                        <input
                          {...registerForm('subscription', { required: true })}
                          id="subscription"
                          type="checkbox"
                        />
                        &nbsp;{' '}
                        <span className="font-sans text-sm text-gray-500">
                          By subscribing to CoFoundersLab, you agree that we may
                          send you marketing emails about CoFoundersLab. You can
                          unsubscribe anytime.
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isRegisterFormSubmitting}
                      className="flex w-full justify-center rounded-md bg-blue-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-400"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            )}

            {identifier && (
              <div className="mt-8">
                <form
                  className="space-y-6"
                  onSubmit={handleValidateFormSubmit(onValidateFormSubmit)}
                >
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="emailToken"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email code
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <div className="relative flex flex-grow items-stretch focus-within:z-10">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <AtSymbolIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            {...validateForm('emailToken', { required: true })}
                            type="tel"
                            autoComplete="off"
                            pattern="[0-9]{5}"
                            className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter the code sent to your email"
                          />
                        </div>
                        <button
                          type="button"
                          disabled={
                            emailResendLoading || emailResendCounter > 0
                          }
                          onClick={resendEmailToken}
                          className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-200"
                        >
                          <span>
                            Resend{' '}
                            {emailResendCounter > 0
                              ? `(${emailResendCounter})`
                              : ''}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isValidateFormSubmitting}
                      className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-400"
                    >
                      Validate
                    </button>
                  </div>
                </form>
              </div>
            )}

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
                      Sign up with Google
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          {/* <div className="absolute text-white p-20 z-10 text-lg">
            This side would ideally be a wall of testimonials, screenshots from
            twitter, facebook, etc.
          </div> */}
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
