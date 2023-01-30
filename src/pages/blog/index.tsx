import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';

import BlogPosts from '@/components/blog/List';
import { Layout, Meta } from '@/components/layout';
import Loading from '@/components/Loading';

import { API_URL } from '@/config/index';

const fetcher = async (url: string) => {
  const res = await fetch(`${API_URL}/blog-posts?${url}`);
  if (!res.ok) {
    throw await res.json();
  }
  return res.json();
};

function Blog() {
  const PAGE_SIZE = 10;
  const [query, setQuery] = useState('');

  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(
    (index) =>
      `_sort=published_at:DESC&_limit=${PAGE_SIZE}&_start=${
        index * PAGE_SIZE
      }&${query}`,
    fetcher
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const discussions = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <Layout
      meta={
        <Meta
          title="Blog - CoFoundersLab"
          description="CoFoundersLab Blog, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-14 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-2 inline-block rounded-full bg-blue-600 px-3 py-px text-sm font-semibold uppercase tracking-wider text-white">
              Startup advice
            </h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              CoFoundersLab Blog
            </p>
            <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
              Curated content from the leading entrepreneurs in the world
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mb-10 bg-white px-4 sm:max-w-xl md:max-w-full md:px-24 lg:mb-16 lg:max-w-7xl lg:px-8">
        {data ? (
          <BlogPosts
            items={discussions}
            isLoadingMore={isLoadingMore}
            isReachingEnd={isReachingEnd}
            size={size}
            setSize={setSize}
          />
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}
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
      <Blog />
    </SWRConfig>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const path = `_sort=published_at:DESC&_limit=10&_start=0&`;
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
