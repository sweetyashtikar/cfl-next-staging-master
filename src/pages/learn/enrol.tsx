import { CheckIcon, ThumbUpIcon } from '@heroicons/react/solid';

import { Layout, Meta } from '@/components/layout';

import { classNames } from '@/helpers/index';

const eventTypes = {
  applied: { icon: null, bgColorClass: 'bg-gray-400' },
  advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.completed,
    content: 'Overview',
    target: 'Front End Developer',
    date: '5:22',
    datetime: '2020-09-20',
  },
  {
    id: 2,
    type: eventTypes.completed,
    content: 'The Importance of CoFounders',
    target: 'Bethany Blake',
    date: '14:12',
    datetime: '2020-09-22',
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: 'Determining CoFounder Compatibility',
    target: 'Martha Gardner',
    date: '26:21',
    datetime: '2020-09-28',
  },
  {
    id: 4,
    type: eventTypes.applied,
    content: 'CoFounders Equity Split and Vesting',
    target: 'Bethany Blake',
    date: '14:56',
    datetime: '2020-09-30',
  },
  {
    id: 5,
    type: eventTypes.applied,
    content: 'CoFounder Compensation',
    target: 'Katherine Snyder',
    date: '7:00',
    datetime: '2020-10-04',
  },
  {
    id: 6,
    type: eventTypes.applied,
    content: ' Responsibility as a founder',
    target: 'Katherine Snyder',
    date: '7:00',
    datetime: '2020-10-04',
  },
  {
    id: 7,
    type: eventTypes.applied,
    content: 'Freelancers vs Full Time Employees',
    target: 'Katherine Snyder',
    date: '7:00',
    datetime: '2020-10-04',
  },
  {
    id: 8,
    type: eventTypes.applied,
    content: 'Hiring Rockstar Early Employees',
    target: 'Katherine Snyder',
    date: '7:00',
    datetime: '2020-10-04',
  },
];

export default function Course() {
  return (
    <Layout meta={<Meta title="Course CoFoundersLab" description="" />}>
      <>
        <div className="bg-gray-100 py-10">
          {/* <div className="max-w-7xl mx-auto px-4 pb-4 sm:px-6 lg:px-8">
            <div>
              <nav className="sm:hidden" aria-label="Back">
                <a
                  href="#"
                  className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <ChevronLeftIcon
                    className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Back
                </a>
              </nav>
              <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                  <li>
                    <div className="flex">
                      <a
                        href="#"
                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Learning Center
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <a
                        href="#"
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Boost your conversion rates
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <a
                        href="#"
                        aria-current="page"
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Session 1
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div> */}
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 lg:col-start-2">
              <div className="mt-2 md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
                    The Importance of CoFounders
                  </h2>
                </div>
                <div className="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4">
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Complete and continue &rarr;
                  </button>
                </div>
              </div>

              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <iframe
                      src="https://player.vimeo.com/video/149039384?h=a6b5f43070&title=0&byline=0&portrait=0"
                      width="100%"
                      height="420"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </section>
            </div>

            <section
              aria-labelledby="timeline-title"
              className="lg:col-span-1 lg:col-start-1"
            >
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2
                  id="timeline-title"
                  className="text-lg font-medium text-gray-900"
                >
                  Boost your conversion rates
                </h2>

                <div className="relative mt-8 pb-1">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-blue-200 py-1 px-2 text-xs font-semibold uppercase text-blue-600">
                        Progression
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="inline-block text-xs font-semibold text-blue-600">
                        30%
                      </span>
                    </div>
                  </div>
                  <div className="mb-4 flex h-2 overflow-hidden rounded bg-blue-200 text-xs">
                    <div
                      style={{ width: '30%' }}
                      className="flex flex-col justify-center whitespace-nowrap bg-blue-500 text-center text-white shadow-none"
                    ></div>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="mt-6 flow-root">
                  <ul role="list" className="-mb-8">
                    {timeline.map((item, itemIdx) => (
                      <li key={item.id}>
                        <div className="relative pb-8">
                          {itemIdx !== timeline.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span
                                className={classNames(
                                  item.type.bgColorClass,
                                  'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white'
                                )}
                              >
                                {item.type.icon && (
                                  <item.type.icon
                                    className="h-5 w-5 text-white"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {item.content}
                                </p>
                              </div>
                              <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                <time dateTime={item.datetime}>
                                  ({item.date})
                                </time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    </Layout>
  );
}

// export async function getStaticProps() {
//   return {
//     props: {
//       protected: true,
//       roles: ['authenticateds'],
//     },
//   };
// }
