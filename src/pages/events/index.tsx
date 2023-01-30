import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import moment from 'moment';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';

import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';
import Loading from '@/components/Loading';

import { API_URL } from '@/config/index';
import { classNames } from '@/helpers/index';

const fetcher = async (url: string) => {
  const res = await fetch(`${API_URL}/events?${url}`);
  if (!res.ok) {
    throw await res.json();
  }
  return res.json();
};

const UPCOMING_EVENTS_FILTER = `_sort=startDate:ASC&startDate_gte=${new Date().toISOString()}`;
const PAST_EVENTS_FILTER = `_sort=startDate:DESC&startDate_lte=${new Date().toISOString()}`;

function Events() {
  const PAGE_SIZE = 10;
  const [query, setQuery] = useState(UPCOMING_EVENTS_FILTER);

  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(
    (index) => `${query}&_limit=${PAGE_SIZE}&_start=${index * PAGE_SIZE}`,
    fetcher
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const events = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  const renderPagination = () => {
    return (
      <nav
        aria-label="Pagination"
        className="flex justify-center pt-20 pb-5 text-sm font-medium text-gray-700"
      >
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          className="inline-flex items-center rounded-md bg-blue-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-400"
        >
          {isLoadingMore && (
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {isLoadingMore
            ? 'Loading...'
            : isReachingEnd
            ? 'No more events'
            : 'Load more'}
        </button>
      </nav>
    );
  };

  return (
    <Layout
      meta={
        <Meta
          title="Events - CoFoundersLab"
          description="CoFoundersLab Events, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-14 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Events
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
              Industry events or summits are a great opportunity to network and
              stay on top of new trends
            </p>
          </div>

          <nav
            className="relative z-0 mt-6 flex divide-x divide-gray-100 rounded-lg shadow"
            aria-label="Tabs"
          >
            <button
              className={classNames(
                query === UPCOMING_EVENTS_FILTER
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                'group relative min-w-0 flex-1 overflow-hidden rounded-l-lg bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
              )}
              onClick={() => setQuery(UPCOMING_EVENTS_FILTER)}
            >
              <span>Upcoming events</span>
              <span
                aria-hidden="true"
                className={classNames(
                  query === UPCOMING_EVENTS_FILTER
                    ? 'bg-blue-600'
                    : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </button>
            <button
              className={classNames(
                query === PAST_EVENTS_FILTER
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                'group relative min-w-0 flex-1 overflow-hidden rounded-r-lg bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
              )}
              onClick={() => setQuery(PAST_EVENTS_FILTER)}
            >
              <span>Past events</span>
              <span
                aria-hidden="true"
                className={classNames(
                  query === PAST_EVENTS_FILTER
                    ? 'bg-blue-600'
                    : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </button>
          </nav>

          {data ? (
            <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
              {events.map((event: any) => (
                <div key={event.id}>
                  <p className="flex items-center text-sm text-gray-500">
                    <CalendarIcon
                      className="mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <time dateTime={event.startDate}>
                      {moment(event.startDate).format('MMMM Do YYYY, h:mm A z')}
                    </time>
                    <LocationMarkerIcon
                      className="mr-2 ml-4 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>{event.location}</span>
                  </p>
                  <Link href={`/events/${event.slug}`} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                      {event.title}
                    </p>
                    <p className="mt-3 truncate text-base text-gray-500">
                      {event.body}
                    </p>
                  </Link>
                  <div className="mt-3">
                    <Link
                      href={`/events/${event.slug}`}
                      className="text-base font-semibold text-blue-600 hover:text-blue-600"
                    >
                      View event
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-600"></div>
            </div>
          )}
          {renderPagination()}
        </div>
      </div>
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
      <Events />
    </SWRConfig>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const path = `${UPCOMING_EVENTS_FILTER}&_limit=10&_start=0`;
  const fallback = {
    [`${path}`]: await fetcher(path),
  };

  return {
    props: {
      fallback: fallback,
    },
    revalidate: 60,
  };
};
