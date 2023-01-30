import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useUser from '@/hooks/useUser';

import AdvisorProfileCard from '@/components/AdvsiorCard';
import Forbidden from '@/components/Forbidden';
import { Header, Layout, Meta } from '@/components/layout';

import { API_URL } from '@/config';
import { parseCookies } from '@/helpers';

function Paginate({ count, page = 1, limit }: any) {
  let totalPages = Math.ceil(count / limit);
  let showing = count < limit ? count : page * limit;
  return (
    <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          href="/advisors#"
        >
          Previous
        </a>
        <a
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          href="/advisors#"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page}</span> to{' '}
            <span className="font-medium">{showing}</span> of{' '}
            <span className="font-medium">{count}</span> results
          </p>
        </div>
        <div>
          {totalPages > 1 && (
            <nav
              className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {page - 1 > 0 ? (
                <a
                  className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  href={'/advisors?page=' + (page - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </a>
              ) : (
                <span className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </span>
              )}

              {page - 2 > 0 && (
                <a
                  aria-current="page"
                  className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 md:inline-flex"
                  href={'/advisors?page=' + (page - 2)}
                >
                  {page - 2}
                </a>
              )}
              {page - 1 > 0 && (
                <a
                  aria-current="page"
                  className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 md:inline-flex"
                  href={'/advisors?page=' + (page - 1)}
                >
                  {page - 1}
                </a>
              )}

              <a
                aria-current="page"
                className="relative z-10 hidden cursor-default items-center border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 md:inline-flex"
              >
                {page}
              </a>

              {parseInt(page) + 1 <= totalPages && (
                <a
                  aria-current="page"
                  className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 md:inline-flex"
                  href={'/advisors?page=' + (parseInt(page) + 1)}
                >
                  {parseInt(page) + 1}
                </a>
              )}
              {parseInt(page) + 2 <= totalPages && (
                <a
                  aria-current="page"
                  className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 md:inline-flex"
                  href={'/advisors?page=' + (parseInt(page) + 2)}
                >
                  {parseInt(page) + 2}
                </a>
              )}

              {totalPages - page > 0 ? (
                <a
                  className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  href={'/advisors?page=' + (parseInt(page) + 1)}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              ) : (
                <span className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </span>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

const Advisors: NextPage = ({ advisors, count, limit, token }: any) => {
  const { loading, loggedOut, user } = useUser();
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { page } = router.query || 1;

  // useEffect(() => {
  //   if (user && user?.profile) {
  //     if (router.asPath === '/search') {
  //       router.push(
  //         `/search?${qs.stringify({ country: user?.profile?.countryCode })}`
  //       );
  //     }
  //   }
  // }, [user]);

  // if (loading) return <Loading />;
  if (loggedOut || !user) return <Forbidden />;

  return (
    <Layout
      meta={
        <Meta
          title="Advisors - CoFoundersLab"
          description="Advisors on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      header={<Header sticky={true} />}
      bgColor="white"
    >
      <div className="mx-auto max-w-[700px] ">
        <div className="rounded-md bg-white shadow-sm">
          <div className="mx-auto max-w-7xl py-14 px-4 sm:py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mt-1 text-4xl font-extrabold text-[#57B0FF] sm:text-5xl sm:tracking-tight lg:text-6xl">
                All Advisors
              </p>
              <div className="flex w-full justify-center text-center">
                <div
                  style={{
                    borderTop: '5px solid #57B0FF',
                    width: '25px',
                    borderRadius: '14px',
                  }}
                />
              </div>
              <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
                Get connected with the advisors.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="  mt-10  h-full border-gray-200 bg-white ">
        <section
          aria-labelledby="products-heading"
          className="mx-auto py-5 sm:py-6 lg:px-0 lg:pt-0"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-1 lg:gap-x-0">
            <main className="px-3 lg:col-span-3">
              {/* <ConnectionRequests /> */}
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
              >
                {advisors.map((advisor: any) => {
                  return (
                    <li
                      key={advisor._id}
                      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                      <AdvisorProfileCard advisor={advisor} />
                    </li>
                  );
                })}
              </ul>
              {/* <SearchList advisor/> */}
              <Paginate count={count} page={page} limit={limit} />
            </main>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Advisors;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}: any) => {
  const { token } = parseCookies(req);
  const page: number = parseInt(query.page) || 1;
  const limit: number = 12;

  let strapiRes, res, advisors;
  if (token) {
    strapiRes = await fetch(
      `${API_URL}/advisor-profiles?_limit=` +
        limit +
        `&_start=` +
        (page - 1) * limit,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    advisors = await strapiRes.json();
    res = await fetch(`${API_URL}/advisor-profiles/count`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    strapiRes = await fetch(
      `${API_URL}/advisor-profiles?_limit=` +
        limit +
        `&_start=` +
        (page - 1) * limit,
      {
        method: 'GET',
        headers: {},
      }
    );
    advisors = await strapiRes.json();
    res = await fetch(`${API_URL}/advisor-profiles/count`, {
      method: 'GET',
      headers: {},
    });
  }
  const count = await res.json();
  if (strapiRes.ok) {
    if (token) {
      return {
        props: {
          advisors,
          count,
          limit,
          token,
        },
      };
    } else {
      return {
        props: {
          advisors,
          count,
          limit,
        },
      };
    }
  }

  return {
    props: {
      advisors: [],
      count: 0,
      token,
    },
  };
};
