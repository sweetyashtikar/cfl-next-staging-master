import { TrendingUpIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useUser from '@/hooks/useUser';

import Link from '@/components/Link';

import { NEXT_URL } from '@/config';
import { classNames } from '@/helpers/index';

import DiscussPostIcon from './icons/DiscussPostIcon';

export interface IDiscussTopics {
  description: string;
  id: string;
  name: string;
  slug: string;
  trending: boolean;
  _id: string;
  discussions: Array<any>;
}

const navigation = [
  // { name: 'Home', href: '/discuss', icon: HomeIcon },
  { name: 'Trending', href: '/discuss', icon: TrendingUpIcon },
  // { name: 'Popular', href: '/discuss', icon: FireIcon },
  // { name: 'Mine', href: '/', icon: UserIcon },
];

export default function DiscussNavigation() {
  const router = useRouter();
  const { user } = useUser();

  const [discussionTopics, setDiscussionTopics] = useState<IDiscussTopics[]>(
    []
  );

  useEffect(() => {
    const discussionTopicsFetcher = async () => {
      try {
        const res: any = await axios.get(
          `${NEXT_URL}/api/session/discussion-topics?trending=true`
        );
        setDiscussionTopics(res.data);
      } catch (error) {}
    };

    discussionTopicsFetcher();
  }, []);

  return (
    <>
      <nav
        aria-label="Sidebar"
        className="mr-1 h-full border-r-2 border-gray-200 pr-5"
      >
        <div className="space-y-1 pb-3">
          <Link
            href={user ? '/discuss/new' : '/login'}
            className="mb-2 block w-full rounded-md border border-transparent bg-blue-600 px-4 py-1.5 text-center text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Ask question
          </Link>
          {navigation.map((item) => {
            const current = router.pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  current
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50',
                  'group flex flex-wrap items-center justify-center rounded-md px-3 py-2 text-sm font-medium'
                )}
                aria-current={current && 'page'}
              >
                <item.icon
                  className={classNames(
                    current
                      ? 'text-gray-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-1 mr-3 h-5 w-6 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
                <span className="truncate text-lg font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* TODO: topics */}
        <div className="">
          <div className="space-y-2" aria-labelledby="communities-headline">
            {discussionTopics.map(({ id, name, slug, discussions }) => (
              <Link
                key={id}
                href={`/discuss/topic/${slug}`}
                className="body-text group flex items-center justify-between rounded-sm border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50 hover:text-gray-900"
              >
                <span className="truncate">{name}</span>
                <span className="grid grid-cols-3 items-center">
                  <span className="">
                    <DiscussPostIcon />
                  </span>
                  <span className="col-span-2 text-right text-[#000000b3]">
                    {discussions?.length}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
