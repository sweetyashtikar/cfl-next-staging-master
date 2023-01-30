import Image from 'next/image';

import Link from '@/components/Link';

import { truncate } from '@/helpers/index';

export interface IDiscussSidebarProps {
  items: any;
  isLoadingMore: any;
  isReachingEnd: any;
  size: any;
  setSize: any;
}

export default function DiscussSidebar({
  items,
  isLoadingMore,
  isReachingEnd,
  size,
  setSize,
}: IDiscussSidebarProps) {
  const renderDiscussions = () => {
    return (
      <ul role="list" className="space-y-16">
        {items.map((post: any) => (
          <li key={post.id}>
            <div className="grid gap-12 gap-y-10 lg:grid-cols-2">
              <div>
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    className="w-full object-cover"
                    src={post.featuredImage?.url}
                    alt={post.title}
                    width={1920}
                    height={1080}
                  />
                </Link>
              </div>
              <div className="flex flex-col justify-center">
                <div className="max-w-xl">
                  <div className="max-w-xl md:mx-auto lg:max-w-2xl">
                    <div>
                      <p className="mb-6 inline-block text-sm font-semibold uppercase tracking-wider text-blue-600">
                        {post.category?.title}
                      </p>
                    </div>
                    <h2 className="mb-6 max-w-xl font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 hover:text-blue-600 sm:text-4xl md:mx-auto">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                  </div>
                  <p className="my-8 text-base text-gray-700 md:text-lg">
                    {truncate(post.body, 180, '...')}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mr-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white transition duration-200 hover:bg-blue-500 active:bg-blue-800"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const renderPagination = () => {
    return (
      <nav
        aria-label="Pagination"
        className="flex justify-center pt-20 pb-5 text-sm font-medium text-gray-700"
      >
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          className="inline-flex items-center rounded-md bg-blue-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-400"
        >
          {isLoadingMore && (
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
          )}
          {isLoadingMore
            ? 'Loading...'
            : isReachingEnd
            ? 'No more posts'
            : 'Load more'}
        </button>
      </nav>
    );
  };

  return (
    <>
      <h1 className="sr-only">Recent blog posts</h1>
      {renderDiscussions()}
      {renderPagination()}
    </>
  );
}
