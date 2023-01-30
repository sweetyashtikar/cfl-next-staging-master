import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
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

export default function BlogPost({ post }: any) {
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
      <div className="relative overflow-hidden bg-white pt-16">
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
                <Link href="/blog">View all Blog posts</Link>
              </span>
              <span className="mt-4 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                {post?.title}
              </span>
            </h1>
          </div>
          <div className="mx-auto mt-8 max-w-prose text-gray-500">
            <figure className="mb-8 text-center">
              <Image
                className="w-full rounded-lg"
                src={post?.featuredImage?.url}
                alt={post?.featuredImage?.alternativeText}
                layout="responsive"
                width={1920}
                height={1080}
              />
              {post?.featuredImage?.caption && (
                <figcaption>{post?.featuredImage?.caption}</figcaption>
              )}
            </figure>
            <div
              className="prose-lg prose prose-blue"
              dangerouslySetInnerHTML={{ __html: post?.body }}
            />
          </div>
        </div>
        <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-12 lg:px-8">
          <Link href="/premium">
            <img src="../assets/images/blog/blogBanner.png" alt="blogBanner" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}/blog-posts?_limit=10`);
  const discussions: any = await res.json();

  const slugs = discussions.map((discussion: any) => discussion.slug);
  const paths = slugs.map((slug: any) => ({ params: { slug } }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  try {
    const post = await apiFetcher(`/blog-posts/${slug}`);
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
