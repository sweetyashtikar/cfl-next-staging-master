import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { NEXT_URL } from '@/config/index';

interface IPageProps {
  user?: any;
}

export default function ProfileSummary({ user }: IPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { data: portal } = await axios.post<any, any>(
        `${NEXT_URL}/api/stripe/portal`
      );
      window.location.assign(portal.url);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Plan &amp; Billing
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You are currently on the{' '}
              {user.role?.type === 'premium' ? 'Premium' : 'Free'} plan
            </p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-5">
              <button
                type="submit"
                disabled={loading}
                onClick={redirectToCustomerPortal}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-400"
              >
                Open subscription portal
              </button>
            </div>
          </div>
        </div>
      </div>

      {user.role?.type === 'premium' && (
        <div className="">
          <h2 className="pb-5 pt-8 font-medium">Available Actions</h2>
          <div className="mt-6 h-36 rounded-md bg-white p-6 pt-8 pb-8 shadow md:flex md:items-center md:justify-between md:space-x-5">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="pt-0">
                <h1 className="text-md font-sans font-medium text-gray-900">
                  End your service
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  Sometimes you just need to call it quits. We get it.
                </p>
              </div>
            </div>
            <div className="justify-stretch mt-6 flex w-72 flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
              <button
                onClick={() => {
                  router.push('/settings/cancel-profile');
                }}
                className="inline-flex items-center justify-center rounded-md border border-gray-500 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:border-0 hover:bg-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              >
                Cancel your plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
