import { Transition } from '@headlessui/react';
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';
import useSWR from 'swr';

import Link from '@/components/Link';

import { apiGet } from '@/helpers/fetchers';

export default function HeaderBanner() {
  const { data: close, mutate } = useSWR('closeAnnouncement', (key: any) => {
    const value: any = localStorage.getItem(key) || 0;
    if (parseInt(value) < new Date().getTime()) {
      return false;
    }
    return true;
    //return !!value ? JSON.parse(value) : false;
  });
  const { data: announcement } = useSWR(
    !close ? `/announcement` : null,
    apiGet,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  if (typeof close === 'undefined' || !announcement) return null;

  return (
    <Transition
      show={!close && announcement.Show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="relative inset-x-0 top-0 z-20">
        <div className="mx-auto">
          <div className="bg-gradient-to-l from-blue-500 to-blue-600 p-2 shadow-lg">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex w-0 flex-1 items-center justify-center">
                <span className="flex rounded-lg bg-blue-800 p-2">
                  <SpeakerphoneIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
                {/* <p className="ml-3 truncate font-medium text-white"> */}
                <p className="ml-3 font-medium text-white">
                  <span className="md:hidden">
                    {announcement.MessageMobile || announcement.Message}
                  </span>
                  <span className="hidden md:inline">
                    {announcement.Message}
                  </span>
                </p>
                <div className="order-3 mt-2 ml-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                  <Link
                    href={announcement.ButtonUrl}
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm hover:bg-blue-50"
                  >
                    {announcement.ButtonText}
                  </Link>
                </div>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.closeAnnouncement = (
                      new Date().getTime() +
                      60 * 60 * 24 * 1000
                    ).toString();
                    mutate();
                  }}
                  className="-mr-1 flex rounded-md p-2 text-white hover:bg-white hover:text-blue-500"
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
