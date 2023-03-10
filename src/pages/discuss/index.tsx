import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';

import Discussions from '@/components/discuss/List';
import DiscussPage from '@/components/discuss/Page';
import { Layout, Meta } from '@/components/layout';
import Loading from '@/components/Loading';

import { API_URL } from '@/config/index';
import { apiFetcher } from '@/helpers/fetchers';

const tabs = [
  { name: 'Recent', href: '#', current: true },
  { name: 'Most Liked', href: '#', current: false },
  { name: 'Most Answers', href: '#', current: false },
];

const fetcher = async (url: string) => {
  const res = await fetch(`${API_URL}/discussions?${url}`);
  if (!res.ok) {
    throw await res.json();
  }
  return res.json();
};

function Discuss() {
  const PAGE_SIZE = 10;
  const [query, setQuery] = useState('');
  const [discussionData, setDiscussionData] = useState([]);

  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(
    (index) =>
      `_sort=pinned:DESC,createdAt:DESC&_limit=${PAGE_SIZE}&_start=${
        index * PAGE_SIZE
      }&${query}`,
    fetcher
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  let discussions = data ? [].concat(...data) : [];

  useEffect(() => {
    setDiscussionData(discussions);
  }, [data]);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  const handleSearch = (searchTerm: string) => {
    const serachedArray: any = [];
    if (data) {
      data[0].map((item: any) => {
        if (
          item.profile.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.profile.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.profile.skills.find((a: any) =>
            a.toLowerCase().includes(searchTerm.toLowerCase())
          )
        ) {
          serachedArray.push(item);
        }
      });
      setDiscussionData(serachedArray);
    }
  };

  return (
    <Layout
      meta={
        <Meta
          title="Discuss - CoFoundersLab"
          description="Discuss on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      showLeftSidebar
      handleSearch={handleSearch}
    >
      <DiscussPage showNavigation loadVotes>
        {data ? (
          <>
            {/* content tabs */}
            {/* <div className="px-4 sm:px-0 mb-4">
                <div className="sm:hidden">
                  <label htmlFor="question-tabs" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="question-tabs"
                    className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                    defaultValue={tabs.find((tab) => tab.current)?.name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>

                <div className="hidden sm:block">
                  <nav
                    className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab, tabIdx) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        aria-current={tab.current ? 'page' : undefined}
                        className={classNames(
                          tab.current
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-700',
                          tabIdx === 0 ? 'rounded-l-lg' : '',
                          tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                          'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                        )}
                      >
                        <span>{tab.name}</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            tab.current ? 'bg-blue-600' : 'bg-transparent',
                            'absolute inset-x-0 bottom-0 h-0.5'
                          )}
                        />
                      </a>
                    ))}
                  </nav>
                </div>
              </div> */}
            <Discussions
              items={discussionData}
              isLoadingMore={isLoadingMore}
              isReachingEnd={isReachingEnd}
              size={size}
              setSize={setSize}
            />
          </>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}
      </DiscussPage>
    </Layout>
  );
}

export default function PageContainer({ fallback }: any) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <SWRConfig
      value={{
        fallback,
      }}
    >
      <Discuss />
    </SWRConfig>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const paths = [`/discussions?_sort=createdAt:DESC&_limit=10&_start=0&`];
  let fallback: any = {};
  for (let index = 0; index < paths.length; index++) {
    const path = paths[index] as string;
    fallback[path] = await apiFetcher(path);
  }

  return {
    props: {
      fallback: fallback,
    },
    revalidate: 60,
  };
};
