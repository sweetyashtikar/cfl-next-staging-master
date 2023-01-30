import { Menu, Popover, Transition } from '@headlessui/react';
import {
  AcademicCapIcon,
  AnnotationIcon,
  CashIcon,
  ChatAlt2Icon,
  MailIcon,
  MenuIcon,
  SearchIcon,
  UserGroupIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import useUser from '@/hooks/useUser';

import Link from '@/components/Link';
import ProfilePicture from '@/components/ProfilePicture';

import { useAuth } from '@/context/AuthContext';
import { classNames } from '@/helpers/index';

import Search from './algolia-ui/Search';
import PremiumBanner from '../common/PremiumBanner';

export interface ISubmenuItem {
  name: string;
  description: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

const connectSubmenu: ISubmenuItem[] = [
  {
    name: 'Find a CoFounder',
    description:
      'Network and filter searches based on your preferences of interest, skills, location and more.',
    href: '/search',
    icon: UsersIcon,
  },
  {
    name: 'Talk to an advisor',
    description:
      'Search and consult and an advisor for experienced advice through your startup journey.',
    href: 'https://advisors.cofounderslab.com/',
    icon: AnnotationIcon,
  },
];

const collaborateSubmenu: ISubmenuItem[] = [
  {
    name: 'Discuss',
    description:
      'Ask your questions or join a discussion with your community of entreprenures, innovators, and industry leaders.',
    href: '/discuss',
    icon: ChatAlt2Icon,
  },
];

const educateSubmenu: ISubmenuItem[] = [
  {
    name: 'Learning Center',
    description:
      'Curated programs and courses to help you expand your startup knowledge from zero to one.',
    href: 'https://learn.cofounderslab.com/',
    icon: AcademicCapIcon,
  },
];

let userNavigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Edit Profile', href: '/settings/profile' },
  // { name: 'Settings', href: '/settings/profile' },
];

const userNavigationAuthenticatedMobile = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Messages', href: '/messages' },
  { name: 'Connections', href: '/connections' },
  { name: 'Edit Profile', href: '/settings/profile' },
  { name: 'Settings', href: '/settings/profile' },
];

interface IHeaderProps {
  publicMenu?: JSX.Element;
  sticky?: boolean;
  headerBanner?: ReactNode;
  handleSearch?: (searchTerm: string) => void;
}

export default function Header(props: IHeaderProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const { loading, loggedOut, user, mutate } = useUser();
  const [search, setSearch] = useState();
  const topMenu = useRef<HTMLDivElement>(null);
  const [stickyVal, setStickyVal] = useState('');

  const handleScroll = () => {
    if (window.scrollY > 0) {
      // @ts-ignore
      topMenu?.current?.classList.add('bg-white', 'shadow', 'stickyAdded');
    }
    if (window.scrollY == 0 || window.scrollY < 0) {
      //@ts-ignore
      topMenu?.current?.classList.remove('bg-white', 'shadow', 'stickyAdded');
    }
  };

  useEffect(() => {
    if (loggedOut) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      return () => {};
    }
  });

  if (user?.advisor_profile && user?.advisor_profile !== null) {
    userNavigation = [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Edit Profile', href: '/settings/profile' },
      { name: 'Edit Advisor Profile', href: '/settings/advisor-profile' },
      // { name: 'Settings', href: '/settings/profile' },
    ];
  }

  // const bannerRef = useRef<HTMLHeadingElement>(null);
  // const currentTime = new Date().getTime();
  // const [bannerState, setBannerState] = useState('0');
  // const { asPath } = useRouter();

  // const handleBanner = () => {
  //   localStorage.setItem(
  //     'bannerState',
  //     (new Date().getTime() + 60 * 60 * 24 * 1000).toString()
  //   );
  //   bannerRef.current?.remove();
  // };

  // useEffect(() => {
  //   if (localStorage) {
  //     let timeStamp: string | '0' = localStorage.getItem('bannerState') || '0';
  //     setBannerState(timeStamp);
  //   }
  //   if (!loggedOut && user && !user.onboarded) {
  //     router.push('/onboarding');
  //   }
  // }, [user, loggedOut]);

  const mobileMenu = [
    {
      name: 'Find a CoFounder',
      href: '/search',
      icon: UsersIcon,
    },
    {
      name: 'Talk to an advisor',
      href: 'https://advisors.cofounderslab.com/',
      icon: AnnotationIcon,
    },
    {
      name: 'Discuss',
      href: '/discuss',
      icon: ChatAlt2Icon,
    },
    {
      name: 'Learning Center',
      href: 'https://learn.cofounderslab.com/',
      icon: AcademicCapIcon,
    },
    {
      name: 'Find an investor',
      icon: CashIcon,
      href:
        user &&
        `https://funden.app/register/cofounderslab?first_name=${user?.profile?.firstName}&last_name=${user?.profile?.lastName}&email=${user.email}`,
    },
  ];

  const raiseSubmenu: ISubmenuItem[] = [
    {
      name: 'Find an investor',
      description:
        'Let us introduce you with more than 200+ in-network VCs that are actively investing in startups just like yours.',
      href: user
        ? `https://funden.app/register/cofounderslab?first_name=${user?.profile?.firstName}&last_name=${user?.profile?.lastName}&email=${user.email}`
        : '',
      icon: CashIcon,
    },
  ];

  const publicMenu = () => {
    return (
      <>
        <Link
          href="/#find-a-cofounder"
          className="text-lg font-normal text-gray-800 hover:text-gray-900"
        >
          Find a CoFounder
        </Link>
        <Link
          href="/#accelerator"
          className="text-lg font-normal text-gray-800 hover:text-gray-900"
        >
          Startup Accelerator
        </Link>
        {/* <a
          href="https://advisors.cofounderslab.com/"
          className="flex cursor-pointer items-center gap-2 text-lg font-normal text-gray-800 hover:text-blue-600 active:text-blue-700"
          target="_blank"
          rel="noreferrer"
        >
          Advisors{' '}
          <ExternalLinkIcon
            className="h-4 w-4 text-gray-300"
            aria-hidden="true"
          />
        </a> */}
        <Link
          href="/#resources"
          className="text-lg font-normal text-gray-800 hover:text-gray-900"
        >
          Resources
        </Link>
      </>
    );
  };

  const authenticatedMenu = (premium: boolean) => {
    return (
      <>
        {/* <Link
          href="/search"
          className="text-lg font-normal text-gray-800 hover:text-gray-900"
        >
          Find a CoFounder
        </Link>
        <Link
          href="/accelerator"
          className="text-lg font-normal text-gray-800 hover:text-gray-900"
        >
          Startup Accelerator
        </Link> */}
        {/* {premium?
        <a
          href="https://advisors.cofounderslab.com/accounts/login/?next=/"
          className="flex cursor-pointer items-center gap-2 text-lg font-normal text-gray-800 hover:text-blue-600 active:text-blue-700"
          target="_blank"
          rel="noreferrer"
        >
          Advisors{' '}
          <ExternalLinkIcon
            className="h-4 w-4 text-gray-300"
            aria-hidden="true"
          />
        </a>:null} */}
        {/* <Link
          href="https://learn.cofounderslab.com/"
          className="text-lg font-normal text-gray-800 hover:text-gray-900"
        >
          Resources
        </Link> */}
        {/* <Dropdown
          name="Find a CoFounder"
          items={connectSubmenu}
          ctaText="Get the extra tools you need to find the right cofounder, see what extra features you receive in Premium."
          premium={premium}
        />
        <Dropdown
          name="Startup Accelerator"
          items={collaborateSubmenu}
          ctaText="Premium users receive a certifed badge, check out what other perks Premium users receive."
          premium={premium}
        />
        <Dropdown
          name="Advisors"
          items={educateSubmenu}
          ctaText="Premium users save over $1,000 by switching to Premium and receieving all courses for free. Check out what other features Premium users receive."
          premium={premium}
        />
        <Dropdown
          name="Resources"
          items={raiseSubmenu}
          ctaText="Premium users also get access to our partner perks. Check out our partners and switch to Premium to receive special offers."
          premium={premium}
        />
        {/* <div>
          <button>Test</button>
        </div> */}
      </>
    );
  };

  const handleLogout = async () => {
    const req = await logout();

    if (!req) {
      return toast.error('There was an error logging out.');
    }
    //@ts-ignore
    mutate(null);
    router.replace('/');
    toast('Logged out successfully');
    router.reload();
    return;
  };

  const publicFarRight = () => {
    return (
      <>
        <Link
          href="/register"
          className="inline-flex items-center justify-center whitespace-nowrap px-5 py-2 text-base font-medium text-white hover:text-gray-600"
        >
          Sign up
        </Link>
        <Link
          href="/login"
          className="loginButton ml-8 whitespace-nowrap rounded-sm bg-white px-5 py-2 text-base font-medium text-blue-600 hover:rounded-full hover:text-gray-900"
        >
          Log in
        </Link>
      </>
    );
  };

  const authenticatedFarRight = () => {
    if (!user) return null;

    return (
      <>
        {user.role?.type !== 'premium' && (
          <Link
            href="/premium"
            className="text-shadow-default hidden items-center justify-center whitespace-nowrap rounded-md bg-orange-600 bg-gradient-to-bl px-4 py-2 text-base font-medium text-white shadow-sm lg:inline-flex"
          >
            Get Premium
          </Link>
        )}
        <Link
          href="/messages"
          title="My messages"
          className="group relative ml-4 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          <span className="sr-only">My messages</span>
          <MailIcon className="h-6 w-6" aria-hidden="true" />
          {user?.badges?.unreadMessages > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-800 group-hover:bg-red-200">
              {user?.badges?.unreadMessages}
            </span>
          )}
        </Link>
        <Link
          href="/connections"
          title="My connections"
          className="group relative ml-4 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          <span className="sr-only">My connections</span>
          <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
          {user?.badges?.pendingConnections > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-800 group-hover:bg-red-200">
              {user?.badges?.pendingConnections}
            </span>
          )}
        </Link>
        {/* <a
          href="#"
          className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </a> */}

        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-8 flex-shrink-0 ">
          <div>
            <Menu.Button
              className={classNames(
                user?.profile?.cflTeam
                  ? 'ring-red-500'
                  : user.role?.type === 'premium'
                  ? 'ring-orange-500'
                  : 'ring-blue-400',
                'flex rounded-full bg-white ring-2 ring-offset-2 focus:outline-none'
              )}
            >
              <span className="sr-only">Open user menu</span>
              <ProfilePicture
                profile={user?.profile}
                className="h-8 w-8 overflow-hidden rounded-full"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="-mt-1 mb-1 block rounded-t-md border-b border-gray-200 bg-gray-100 py-2 px-4">
                <Link
                  href={`/profile/${user?.profile?.slug}`}
                  className="flex items-center space-x-3"
                >
                  <ProfilePicture
                    profile={user?.profile}
                    className="h-8 w-8 overflow-hidden rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700 ">{`${user?.profile?.firstName} ${user?.profile?.lastName}`}</span>
                </Link>
              </div>
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      href={item.href}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
              <hr className="my-1" />
              <Menu.Item>
                <a
                  onClick={handleLogout}
                  className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </>
    );
  };

  const publicMobileMenu = () => (
    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <img
              className="h-8 w-auto"
              src="/assets/images/c.svg"
              alt="CoFoundersLab"
            />
          </div>
          <div className="-mr-2">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Close menu</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
      </div>
      <div className="space-y-6 py-6 px-5">
        <Link
          href="/register"
          className="flex w-full items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-base font-medium text-white shadow-sm transition duration-200 hover:bg-orange-500 active:bg-orange-800"
        >
          Sign up
        </Link>
        <p className="mt-6 text-center text-base font-medium text-gray-500">
          Already registered?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );

  const authenticatedMobileMenu = () => (
    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <img
              className="h-8 w-auto"
              src="/assets/images/c.svg"
              alt="CoFoundersLab"
            />
          </div>
          <div className="-mr-2">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Close menu</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
        <div className="mt-6">
          <nav className="grid gap-y-8">
            {mobileMenu.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
              >
                <item.icon
                  className="h-6 w-6 flex-shrink-0 text-blue-600"
                  aria-hidden="true"
                />
                <span className="ml-3 text-base font-normal text-gray-900">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="space-y-6 py-6 px-5">
        <div className="grid grid-cols-1 gap-y-4 gap-x-8">
          {userNavigationAuthenticatedMobile.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-normal text-gray-900 hover:text-gray-700"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          {user && user.role?.type !== 'premium' && (
            <Link
              href="/premium"
              className="text-shadow-default mb-4 block justify-center whitespace-nowrap rounded-md border border-transparent bg-orange-600 bg-gradient-to-bl px-4 py-2 text-center text-base font-medium text-white shadow-sm"
            >
              Get Premium
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-base font-medium text-gray-800 shadow-sm hover:bg-gray-300"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Popover
      ref={topMenu}
      className={classNames(
        props.sticky ? 'sticky top-0 z-[999999999] ' : 'relative',
        !loggedOut ? 'bg-white shadow' : ''
      )}
    >
      {user?.profile?.premium === false && router.pathname.includes('feed') && (
        <PremiumBanner />
      )}
      {user?.profile?.premium === true && router.pathname.includes('feed') && (
        <PremiumBanner />
      )}
      {/* for freemium user */}
      {/* {user &&
        user.role?.type !== 'premium' &&
        asPath != '/premium' &&
        currentTime > parseInt(bannerState) && (
          <div className="relative bg-orange-600" ref={bannerRef}>
            <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
              <div className="pr-16 sm:px-16 sm:text-center">
                <p className="font-medium text-white">
                  <span className="md:hidden">
                    DON'T MISS OUT! Celebrate 2022 and Get your FREE 30 Day
                    Premium Membership Now! use code: NEWYEAR
                  </span>
                  <span className="hidden md:inline">
                    DON'T MISS OUT! Celebrate 2022 and Get your FREE 30 Day
                    Premium Membership Now! use code: NEWYEAR
                  </span>
                  <span className="block sm:ml-2 sm:inline-block">
                    <a
                      href="/premium"
                      target="_blank"
                      className="ml-5 font-bold text-white underline"
                    >
                      {' '}
                      Learn more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </span>
                </p>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2">
                <button
                  type="button"
                  className="flex rounded-md p-2 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                    onClick={handleBanner}
                  />
                </button>
              </div>
            </div>
          </div>
        )} */}
      {/* freemium user banner ends here */}

      {/* {typeof props.headerBanner !== 'undefined' ? (
        props.headerBanner
      ) : (
        <HeaderBanner />
      )} */}

      <div className="mx-auto max-w-[100vw] pl-3 sm:px-5 lg:max-w-[90vw] xl:max-w-[80vw]">
        <div className="flex h-14 items-center py-5 sm:h-16 md:justify-start md:space-x-10">
          <div className="flex justify-start xl:w-0 xl:flex-1">
            <Link href="/feed">
              <span className="sr-only">CoFoundersLab</span>
              <img
                className="hidden h-7 w-auto sm:h-9 xl:block"
                src="/assets/images/cfl.svg"
                alt="CoFoundersLab"
              />
              <img
                className="ml-1 block h-7 w-auto sm:h-9 xl:hidden"
                src="/assets/images/c.svg"
                alt="CoFoundersLab"
              />
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {!loggedOut && (
            <div className="relative w-3/4 md:w-1/3">
              <Search />
              <SearchIcon className="absolute top-2.5 left-5 h-5" />
            </div>
          )}

          <div className="flex flex-grow justify-end  space-x-10">
            <Popover.Group
              as="nav"
              className="hidden items-center space-x-10 md:flex"
            >
              {loading || loggedOut
                ? props.publicMenu || publicMenu()
                : authenticatedMenu(user?.role?.type === 'premium')}
            </Popover.Group>

            <div className="hidden items-center md:flex">
              {!loading
                ? loggedOut
                  ? publicFarRight()
                  : authenticatedFarRight()
                : null}
            </div>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-40 origin-top-right transform p-2 transition md:hidden"
        >
          {loading || loggedOut
            ? publicMobileMenu()
            : authenticatedMobileMenu()}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
