import {
  BellIcon,
  ChatAlt2Icon,
  ChatAltIcon,
  CogIcon,
  GlobeIcon,
  LibraryIcon,
  SearchIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import useSWR from 'swr';

import useUser from '@/hooks/useUser';

import Link from '@/components/Link';

import { useAuth } from '@/context/AuthContext';
import { sessionGet } from '@/helpers/fetchers';

import FindAdvisorIcon from './icons/FindAdvisorIcon';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const PAGE_SIZE = 12;

const LeftSideBar = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [arrow, setArrow] = useState(true);
  const { user, mutate, loggedOut } = useUser();
  const { logout } = useAuth();
  const router = useRouter();
  const { page } = router.query;

  const offset = page ? (parseInt(page.toString()) - 1) * PAGE_SIZE : 0;
  const fetchUrl = `groups/?&_limit=${PAGE_SIZE}&_start=${offset}`;

  const { data: unReadNotificationsCount } = useSWR<number>(
    'notifications/unseen-notifications-count',
    sessionGet
  );

  const { data: groups } = useSWR(fetchUrl, sessionGet);

  const redirectToPage = (url: string) => {
    if (loggedOut && !(url === '/feed' || url === '/discuss')) {
      router.push('/login');
    } else {
      router.push(url);
    }
  };

  const getGroupUrl = () => {
    const groupMember = groups?.[0];
    let groupUrl = '/premium';

    if (groupMember) {
      const isMember = groupMember.users_permissions_users?.find(
        (member: any) => member.id === user?.id
      );
      if (isMember) {
        groupUrl = `/feed?group=${groupMember.id}`;
      }
    }

    return groupUrl;
  };

  const GeneralMenuList = [
    { Icon: GlobeIcon, label: 'Explore', url: '/feed' },
    {
      Icon: UserGroupIcon,
      label: 'Launch',
      url: 'https://seanc48410.clickfunnels.com/optin1673876724612',
    },
    { Icon: ChatAltIcon, label: 'Discuss', url: '/discuss' },
    {
      Icon: FindAdvisorIcon,
      label: 'Find a CoFounder',
      url: `/search`,
    },
    {
      Icon: SearchIcon,
      label: 'Find an Advisor',
      url: '/advisors',
    },
    {
      Icon: LibraryIcon,
      label: 'Learn',
      url: 'https://learn.cofounderslab.com/',
    },

    { Icon: ChatAlt2Icon, label: 'Messages', url: '/messages' },
    { Icon: BellIcon, label: 'Notifications', url: '/notifications' },

    // { Icon: ChatAltIcon, label: 'Courses', url: '/learn' }, // TODO - Will change icon later
  ];

  const UserMenuList = [
    {
      Icon: UserIcon,
      label: 'Profile',
      url: `/profile/${user?.profile?.slug}`,
    },
    { Icon: CogIcon, label: 'Settings', url: '/settings/profile' },
  ];

  return (
    <div className="col-span-2 mt-10 hidden h-full rounded-lg bg-white py-3 px-3 shadow md:block md:w-[25%] lg:w-[18%] xl:w-64 xl:px-5">
      {GeneralMenuList.map(({ Icon, label, url }) => (
        // eslint-disable-next-line react/jsx-key
        <>
          <Link key={label} onClick={() => redirectToPage(url)}>
            <div
              className={`flex min-h-[48px] cursor-pointer items-center rounded-xl px-2 py-1 hover:bg-gray-100 ${
                router.asPath.includes(url.split('?')[0] || '') &&
                label !== 'Launch' &&
                'active'
              }`}
            >
              <div className="mr-3 h-4 w-4 xl:mr-4">
                <Icon className="h-4 w-4" />
              </div>
              <span>{label}</span>
              {!!(
                label === 'Notifications' &&
                unReadNotificationsCount &&
                unReadNotificationsCount > 0
              ) && (
                <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 px-2 text-white xl:h-6 xl:w-6">
                  <small>{unReadNotificationsCount}</small>
                </div>
              )}
            </div>
          </Link>
        </>
      ))}

      <div className="" />
      {!loggedOut &&
        UserMenuList.map(({ Icon, label, url }) => (
          <Link key={label} onClick={() => redirectToPage(url)}>
            <div
              className={`flex cursor-pointer items-center rounded-xl px-2 py-4 hover:bg-gray-100 ${
                router.asPath.includes(url) && 'active'
              }`}
            >
              <Icon className="mr-3 h-4" /> <span>{label}</span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default LeftSideBar;
