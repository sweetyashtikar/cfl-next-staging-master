import DiscussionCard from '@/components/discuss/Card';

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
      <ul role="list" className="space-y-6">
        {items && items.map((discussion: any, i: number) => (
          <li key={discussion.id}>
            <DiscussionCard data={discussion} loadVotes/>
          </li>
        ))}
      </ul>
    );
  };

  const renderPagination = () => {
    return (
      <nav
        aria-label="Pagination"
        className="flex justify-center pt-10 pb-5 text-sm font-medium text-gray-700"
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
            ? 'No more discussions'
            : 'Load more'}
        </button>
      </nav>
    );
  };

  return (
    <>
      <h1 className="sr-only">Recent questions</h1>
      {renderDiscussions()}
      {renderPagination()}
    </>
  );
}
