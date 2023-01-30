import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import moment from 'moment';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

import useUser from '@/hooks/useUser';

import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';

import { API_URL } from '@/config/index';
import { apiFetcher } from '@/helpers/fetchers';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const ctaContent = () => {
  return (
    <div className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-12 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-blue-600">Join the community</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-base font-medium text-white transition duration-200 hover:bg-orange-500 active:bg-orange-800"
            >
              Join for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Event({ post }: any) {
  const { loading: userLoading, user } = useUser();
  return (
    <Layout
      meta={
        <Meta
          title={`${post?.title} - CoFoundersLab`}
          description={`${post?.body?.substring(125)}...`}
        />
      }
    >
      <div className="relative overflow-hidden bg-white py-16">
        <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full">
          <div
            className="relative mx-auto h-full max-w-prose text-lg"
            aria-hidden="true"
          >
            <svg
              className="absolute top-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="block text-center text-base font-semibold uppercase tracking-wide text-blue-600">
                <Link href="/events">View all Events</Link>
              </span>
              <span className="mt-4 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                {post?.title}
              </span>
            </h1>
          </div>
          <div className="mx-auto mt-8 max-w-prose text-gray-500">
            <p className="mb-4 flex items-center justify-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <time dateTime={post.startDate}>
                {moment(post.startDate).format('MMMM Do YYYY, h:mm A z')}
              </time>
              <LocationMarkerIcon
                className="mr-2 ml-4 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>{post.location}</span>
            </p>
            <div
              className="prose prose-lg prose-blue"
              dangerouslySetInnerHTML={{ __html: post?.body }}
            />
          </div>
        </div>
      </div>
      {!user == true && ctaContent()}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}/events?_limit=10`);
  const events: any = await res.json();
  if (!events) return { paths: [], fallback: 'blocking' };

  const slugs = events.map((event: any) => event.slug);
  const paths = slugs.map((slug: any) => ({ params: { slug } }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  try {
    const post = await apiFetcher(`/events/${slug}`);
    const markdownToHtml = await unified()
      .use(remarkParse)
      .use(remarkHtml, { sanitize: true })
      .process(post.body);
    post.body = markdownToHtml.toString();

    return {
      props: {
        post,
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      revalidate: 60,
      notFound: true,
    };
  }
};
