import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import qs from 'qs';
import React from 'react';
import useSWR from 'swr';

import Link from '@/components/Link';

import { useSearchContext } from '@/context/SearchContext';
import { sessionGet } from '@/helpers/fetchers';
import { classNames } from '@/helpers/index';

const PAGE_SIZE = 12;

export default function AdvisorsPagination() {
  const router = useRouter();
  const currentPage = router.query.page
    ? parseInt(router.query.page?.toString())
    : 1;
  let { data: total, error } = useSWR('advisor-profiles/count', sessionGet);

  const searchContext: any = useSearchContext();

  total = searchContext.hits.length ? searchContext.hits.length : total;

  if (!total && !error) {
    return (
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
    );
  }

  if (total <= 0) return null;

  const pageCount = Math.ceil(total / PAGE_SIZE);
  const pages: number[] = [];
  const pgPad = 3;
  for (let i = 1; i <= pageCount; i++) {
    if (pageCount <= 2 * pgPad + 1) pages.push(i);
    else if (i >= currentPage - pgPad && i <= currentPage + pgPad)
      pages.push(i);
    else if (i === currentPage - pgPad - 1) pages.push(-1);
    else if (i === currentPage + pgPad + 1) pages.push(-1);
  }

  return (
    <>
      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
        <div className="flex flex-1 justify-between sm:hidden">
          <Link
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </Link>
          <Link
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </Link>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {PAGE_SIZE * (currentPage - 1) + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {PAGE_SIZE * currentPage > total
                  ? total
                  : PAGE_SIZE * currentPage}
              </span>{' '}
              of <span className="font-medium">{total}</span> results
            </p>
          </div>
          {pageCount > 1 && (
            <div>
              <nav
                className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                {/* previous link */}
                {currentPage - 1 > 0 ? (
                  <Link
                    href={(() => {
                      const query = { ...router.query, page: currentPage - 1 };
                      return `/advisors?${qs.stringify(query)}`;
                    })()}
                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-300">
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}

                {/* pages links */}
                {pages.map((p, i) =>
                  p > 0 ? (
                    <Link
                      key={i}
                      href={(() => {
                        const query = { ...router.query, page: p };
                        return `/advisors?${qs.stringify(query)}`;
                      })()}
                      aria-current="page"
                      className={classNames(
                        currentPage === p
                          ? 'z-10 border-blue-300 bg-blue-50 text-blue-600'
                          : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50',
                        'relative hidden items-center border px-4 py-2 text-sm font-medium md:inline-flex'
                      )}
                    >
                      {p}
                    </Link>
                  ) : (
                    <span
                      key={i}
                      className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                    >
                      ...
                    </span>
                  )
                )}

                {/* next link */}
                {currentPage + 1 < pageCount ? (
                  <Link
                    href={(() => {
                      const query = { ...router.query, page: currentPage + 1 };
                      return `/advisors?${qs.stringify(query)}`;
                    })()}
                    className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-300">
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
