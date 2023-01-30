import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import useSWR, { SWRConfig } from 'swr';

import useUser from '@/hooks/useUser';

import Forbidden from '@/components/Forbidden';
import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';
import Loading from '@/components/Loading';
import AdvisorProfileView from '@/components/profile/advisorProfileView';

import { API_URL } from '@/config/index';
import { apiFetcher } from '@/helpers/fetchers';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const courses = [
  {
    id: 1,
    title: 'Playbook To Launch Your Startup',
    href: 'https://learn.cofounderslab.com/p/playbook-to-launch-your-startup',
    preview:
      'Learn how to build a minimum viable product. Get certified. Launch your startup. Grow your business.',
  },
  // {
  //   id: 2,
  //   title: 'Growth Hacking Introduction',
  //   href: '/learn',
  //   preview:
  //     'Get a FREE introduction to the world of Growth Hacking. Learn useful tools to acquire new customers efficiently.',
  // },
  // {
  //   id: 3,
  //   title: 'Mastering The Fundraising Game',
  //   href: '/learn',
  //   preview:
  //     'Learn how to fundraise. Get certified. Close the deal. Grow your business.',
  // },
];

function AdvisorProfilePage({ slug }: any) {
  const { loading, loggedOut, user } = useUser();
  const { data: advisor } = useSWR(`/advisor-profiles/${slug}`, apiFetcher);
  if (!advisor || !user) return <Forbidden />;
  const profile = advisor?.user?.profile;
  return (
    <Layout
      meta={
        <Meta
          title={`${advisor?.firstName} ${advisor?.lastName} - Entrepreneurs from ${advisor?.city?.name} on CoFoundersLab`}
          description={` ${advisor?.title} ${advisor?.firstName} ${advisor?.lastName} CoFoundersLab profile. The leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate.`}
        />
      }
    >
      <div className="h-full border-t border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <h1 className="sr-only">Profile</h1>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-6 lg:col-span-3">
              <AdvisorProfileView profile={profile} advisor={advisor} />
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-6">
              {/* <section aria-labelledby="recent-hires-title">
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <div className="p-6">
                  <h2
                    className="text-base font-bold text-gray-900"
                    id="recent-hires-title"
                  >
                    Similar profiles
                  </h2>
                  <div className="flow-root mt-6">
                    <ul
                      role="list"
                      className="-my-5 divide-y divide-gray-200"
                    >
                      {recentHires.map((person) => (
                        <li key={person.name} className="py-4">
                          <div className="relative flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                className="h-8 w-8 rounded-full"
                                src={person.imageUrl}
                                alt=""
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link
                                href={'/profile'}
                                className="text-sm font-medium text-gray-900 truncate hover:underline focus:outline-none"
                              >
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                {person.name}
                              </Link>
                              <p
                                title={person.tagline}
                                className="text-sm text-gray-500 truncate"
                              >
                                {person.tagline}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section> */}

              {/* Announcements */}
              <section aria-labelledby="courses-title">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h2
                      className="text-base font-bold text-gray-900"
                      id="courses-title"
                    >
                      Learning center
                    </h2>
                    <div className="mt-2 flow-root">
                      <p className="mb-5 text-sm font-light text-gray-900">
                        Add new skills with free courses
                      </p>
                      <ul
                        role="list"
                        className="-my-5 divide-y divide-gray-200"
                      >
                        {courses.map((course) => (
                          <li key={course.id} className="py-5">
                            <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                              <img
                                className="mb-5 object-cover"
                                src="https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/NzooaJJVS7OwTBdjRr2p"
                                alt=""
                              />
                              <h3 className="text-sm font-semibold text-gray-800">
                                <Link
                                  href={course.href}
                                  className="hover:underline focus:outline-none"
                                >
                                  {/* Extend touch target to entire panel */}
                                  <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                  />
                                  {course.title}
                                </Link>
                              </h3>
                              <p className="line-clamp-2 mt-1 text-sm text-gray-600">
                                {course.preview}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="https://learn.cofounderslab.com/"
                        className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      >
                        View more courses
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function Profile({ fallback }: any) {
  const router = useRouter();
  const { slug } = router.query;

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <SWRConfig
      value={{
        fallback,
      }}
    >
      <AdvisorProfilePage slug={slug} />
    </SWRConfig>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}/advisor-profiles?_limit=10`);
  const profiles: any = await res.json();
  const slugs = profiles.map((profile: any) => profile.slug);
  const paths = slugs.map((slug: any) => ({ params: { slug } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;

  const res = await fetch(`${API_URL}/advisor-profiles/${slug}`);
  if (!res.ok) {
    return {
      notFound: true,
    };
  }
  const profile: any = await res.json();
  const fallback: any = {};
  fallback[`/advisor/${slug}`] = profile;

  return {
    props: {
      fallback: fallback,
    },
    revalidate: 60,
  };
};
