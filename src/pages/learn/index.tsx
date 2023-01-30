import useUser from '@/hooks/useUser';

import Forbidden from '@/components/Forbidden';
import { Layout, Meta } from '@/components/layout';
import CourseList from '@/components/learn/CourseList';
import Loading from '@/components/Loading';

export default function Learn() {
  const { loading, loggedOut } = useUser();
  // const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  if (loading) return <Loading />;
  if (loggedOut) return <Forbidden />;

  return (
    <Layout
      meta={
        <Meta
          title="Learning Center - CoFoundersLab"
          description="Learn on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      showLeftSidebar
    >
      <div className="h-full border-b border-gray-200 bg-gray-100 md:ml-5 lg:mt-10">
        {/* <div className="border-b border-gray-200 bg-white">
          <header className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 py-5 sm:flex sm:items-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:w-1/4 lg:w-1/2">
                Find Your Courses
              </h1>
              <div className="mt-3 w-full sm:mt-0 sm:ml-2 md:w-2/4">
                <label htmlFor="desktop-search-candidate" className="sr-only">
                  Search bar
                </label>
                <div className="flex w-full rounded-md shadow-sm">
                  <SearchBar />
                  <button
                    type="button"
                    className="relative z-10 ml-5 inline-flex items-center rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FilterIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </header>
        </div> */}

        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-0 lg:pt-0"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-1 lg:gap-x-0">
            {/* Filters */}
            {/* <aside className="hidden lg:block lg:bg-white lg:px-7">
              <CourseFilters />
            </aside> */}

            <main className="lg:col-span-3">
              <CourseList />
              {/* <CoursePagination /> */}
            </main>
          </div>
        </section>
      </div>

      {/* Mobile filter dialog */}
      {/* <Transition.Root show={mobileFiltersOpen} as={Fragment}>
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

              <div className="mt-4 border-t border-gray-200 px-6">
                <CourseFilters prefix="mobile" />
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root> */}
    </Layout>
  );
}
