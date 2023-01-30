import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';

import Link from '@/components/Link';

import * as ga from '@/helpers/ga';
import { classNames } from '@/helpers/index';

import { ISubmenuItem } from './layout/Header';

export const Dropdown = (props: {
  name: string;
  items: ISubmenuItem[];
  ctaText: string;
  premium: boolean;
}) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-gray-900' : 'text-gray-500',
              'group inline-flex items-center rounded-md bg-white text-lg font-normal text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
          >
            <span>{props.name}</span>
            <ChevronDownIcon
              className={classNames(
                open ? 'text-gray-600' : 'text-gray-400',
                'ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-gray-500'
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={classNames(
                props.items.length > 1 ? 'lg:max-w-3xl' : '',
                'absolute left-1/2 z-40 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0'
              )}
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div
                  className={classNames(
                    props.items.length > 1 ? 'lg:grid-cols-2' : '',
                    'relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'
                  )}
                >
                  {props.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-600 text-white sm:h-12 sm:w-12">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                {props.premium !== true ? (
                  <div className="bg-gray-50 p-5 sm:p-8">
                    <Link
                      href="/premium"
                      className="-m-3 flow-root rounded-md p-3 transition duration-150 ease-in-out hover:bg-gray-100"
                      onClick={() => {
                        ga.event('click_menu_premium_cta', {
                          event_category: 'ecommerce',
                        });
                      }}
                    >
                      <span className="flex items-center">
                        <span className="text-base font-medium text-gray-900">
                          Did you know?
                        </span>
                        <span className="ml-3 inline-flex items-center rounded-full bg-orange-100 px-3 py-0.5 text-xs font-medium leading-5 text-orange-800">
                          &#9734; Premium
                        </span>
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        {props.ctaText}
                      </span>
                    </Link>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
