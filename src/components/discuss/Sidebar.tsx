import { ChatAlt2Icon } from '@heroicons/react/solid';
import useSWR from 'swr';

import Link from '@/components/Link';

import { apiFetcher } from '@/helpers/fetchers';

export interface IDiscussSidebarProps {}

export default function DiscussSidebar({}: IDiscussSidebarProps) {
  const { data, error } = useSWR(
    `/discussion-topics?trending=true`,
    apiFetcher
  );

  return (
    <div className="sticky top-4 space-y-4">
      <section aria-labelledby="trending-heading">
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h2
              id="trending-heading"
              className="text-base font-bold text-gray-900"
            >
              Trending topics
            </h2>
            <div className="mt-6 flow-root">
              {!data && !error && (
                <div className="flex items-center justify-center py-20">
                  <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-600"></div>
                </div>
              )}

              {data && data.length > 0 && (
                <ul role="list" className="-my-4 divide-y divide-gray-100">
                  {data.map((topic: any) => (
                    <li key={topic.id} className="flex space-x-3 py-2">
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/discuss/topic/${topic.slug}`}
                          className="text-sm text-gray-800 hover:underline"
                        >
                          {topic.name}
                        </Link>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center text-sm">
                          <button
                            type="button"
                            className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                          >
                            <ChatAlt2Icon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            <span className="font-medium text-gray-900">
                              {topic.discussionsCount}
                            </span>
                          </button>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {error && (
                <p className="text-sm text-gray-500">Could not load topics</p>
              )}
            </div>
            {/* <div className="mt-6">
                <a
                  href="#"
                  className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View all
                </a>
              </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
