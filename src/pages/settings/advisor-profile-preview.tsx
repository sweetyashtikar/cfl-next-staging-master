import {
  LocationMarkerIcon,
  PresentationChartBarIcon,
} from '@heroicons/react/outline';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import Forbidden from '@/components/Forbidden';
import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';
import AdvisorProfileView from '@/components/profile/advisorProfileView';

import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers/index';

const courses = [
  {
    id: 1,
    title: 'Playbook To Launch Your Startup',
    href: 'https://learn.cofounderslab.com/p/playbook-to-launch-your-startup',
    preview:
      'Learn how to build a minimum viable product. Get certified. Launch your startup. Grow your business.',
  },
];

export default function ProfilePreview({ user, token }: any) {
  const router = useRouter();

  if (!user) return <Forbidden />;
  const profile = user?.profile;
  const advisor = user?.advisor_profile;
  if (!profile) return <Forbidden />;

  const profileAttributes = [
    {
      label: 'Location',
      value: `${advisor?.city?.name}, ${advisor?.city?.country}`,
      icon: LocationMarkerIcon,
    },
    {
      label: 'Startup stage',
      value: profile?.startupStage,
      icon: PresentationChartBarIcon,
    },
    {
      label: 'Looking For',
      value: profile?.lookingFor,
      icon: PresentationChartBarIcon,
    },
  ];

  return (
    <Layout
      meta={
        <Meta
          title={`${advisor.firstName} ${advisor.lastName} - Entrepreneurs from ${profile?.city?.name} on CoFoundersLab`}
          description={`${advisor.title} ${advisor.firstName} ${advisor.lastName} CoFoundersLab profile. The leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate.`}
        />
      }
    >
      <div className="h-full border-t border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <h1 className="sr-only">Profile</h1>
          {/* Main 3 column grid */}
          <button
            onClick={() => {
              router.back();
            }}
            className="mb-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back To Profile Edit
          </button>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-6 lg:col-span-3">
              <AdvisorProfileView profile={profile} advisor={advisor} />
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-6">
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
                                  key={course.id + '-course'}
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  // TODO: code duplication
  const strapiRes = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await strapiRes.json();

  if (strapiRes.ok) {
    return {
      props: {
        user,
        token,
      },
    };
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};
