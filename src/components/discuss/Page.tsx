import Link from 'next/link';

import Navigation from './Navigation';
import RigthSideBar from './right-sidebar';

export default function DiscussPage({ children, showNavigation }: any) {
  return (
    <div className="mt-10 ml-5 mr-5 h-full border-b border-gray-200 bg-white">
      <div className="border-b border-gray-200 bg-white xl:border-none">
        <header className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="border-t border-gray-200 py-3 lg:grid lg:grid-cols-12 lg:gap-x-5 xl:gap-x-[106px] 2xl:gap-x-5">
            <h1
              className={`text-3xl font-extrabold tracking-tight text-[#4E5D78] lg:col-span-6 lg:block ${
                showNavigation
                  ? 'lg:col-start-4 xl:col-start-3  2xl:col-start-4'
                  : 'lg:col-start-1'
              }`}
            >
              <Link href="/discuss">Discuss</Link>
            </h1>
            <div className="sr-only lg:col-span-7">
              {/* TODO: discuss search form */}
              {/* <form className="flex w-full rounded-md shadow-sm">
              <label htmlFor="desktop-search-candidate" className="sr-only">
                Search bar
              </label>
              <div className="relative flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  name="desktop-search-candidate"
                  id="desktop-search-candidate"
                  className="block w-full rounded-none rounded-l-md pl-10 sm:block sm:text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search"
                />
              </div>
              <button className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                Search
              </button>
            </form> */}
            </div>
          </div>
        </header>
      </div>

      <section
        aria-labelledby="products-heading"
        className="mx-auto px-4 pb-5 pt-2 sm:px-6"
      >
        <div className="lg:grid lg:grid-cols-12 lg:gap-5">
          {showNavigation && (
            <div className="hidden lg:col-span-3 lg:block xl:w-3/4 2xl:w-11/12">
              <Navigation />
            </div>
          )}

          <main
            className={`lg:col-span-9 ${
              showNavigation ? 'xl:col-span-6 xl:ml-[-13%] 2xl:ml-[-5%]' : ''
            }`}
          >
            {children}
          </main>

          <aside className="hidden xl:col-span-3 xl:block">
            {/* <Sidebar /> */}
            <RigthSideBar />
          </aside>
        </div>
      </section>
    </div>
  );
}
