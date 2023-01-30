import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { FilterIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';

import useUser from '@/hooks/useUser';

import Forbidden from '@/components/Forbidden';
import { Layout, Meta } from '@/components/layout';
import Loading from '@/components/Loading';
import ProfileFilters from '@/components/search/Filters';
import SearchList from '@/components/search/List';
import SearchPagination from '@/components/search/Pagination';
import ConnectionRequests from '@/components/search/Requests';
import SearchBar from '@/components/search/SearchBar';

export default function Search() {
  const { loading, loggedOut } = useUser();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // useEffect(() => {
  //   if (user && user?.profile) {
  //     if (router.asPath === '/search') {
  //       router.push(
  //         `/search?${qs.stringify({ country: user?.profile?.countryCode })}`
  //       );
  //     }
  //   }
  // }, [user]);

  if (loading) return <Loading />;
  if (loggedOut) return <Forbidden />;

  return (
    <Layout
      meta={
        <Meta
          title="Search - CoFoundersLab"
          description="Search on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      showLeftSidebar
    >
      <div className=" mx-6 mt-10  h-full border-gray-200 bg-gray-100 sm:mx-4 md:ml-5">
        <div className="border border-gray-200 bg-white ">
          <header className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 py-5 sm:flex sm:items-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#4E5E78] md:w-full lg:w-1/2">
                {/* Search */}
                Find Your CoFounder
              </h1>
              <div className="mt-3 w-full sm:mt-0 sm:ml-2 md:w-max">
                <label htmlFor="desktop-search-candidate" className="sr-only">
                  Search bar
                </label>
                <div className="flex w-full rounded-md ">
                  <SearchBar />
                  <button
                    type="button"
                    className="relative z-10 ml-5 inline-flex items-center rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FilterIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {/* TODO: sort search results */}
                  {/* <button
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <SortAscendingIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2">Sort</span>
                    <ChevronDownIcon
                      className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </button> */}
                </div>
              </div>
            </div>
          </header>
        </div>

        <section
          aria-labelledby="products-heading"
          className="mx-auto     py-5  sm:py-6 lg:px-0 lg:pt-0"
        >
          <h2 id="products-heading" className="sr-only">
            Members
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-1 lg:gap-x-0">
            {/* Filters */}
            <aside className="hidden lg:block lg:bg-white lg:px-7">
              <ProfileFilters />
            </aside>

            {/* Product grid */}
            <main className="lg:col-span-3">
              <ConnectionRequests />
              <SearchList />
              <SearchPagination />
            </main>
          </div>
        </section>
      </div>

      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* Filters */}
              <div className="mt-4 border-t border-gray-200 px-6">
                <ProfileFilters prefix="mobile" />
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </Layout>
  );
}
