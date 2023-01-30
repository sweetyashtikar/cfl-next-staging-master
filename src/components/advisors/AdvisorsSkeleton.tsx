export default function AdvisorsSkeleton() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
    >
      {[...Array(6)].map((_, i: number) => (
        <li key={i} className="col-span-1">
          <div className="rounded-md border-2">
            <div className="flex h-full animate-pulse flex-col items-center justify-center space-y-8 py-6">
              <div className="mx-auto h-24 w-24 rounded-full bg-gray-300"></div>
              <div className="space-y-3">
                <div className="mx-auto h-6 w-24 rounded-md bg-gray-300"></div>
                <div className="mx-auto h-6 w-36 rounded-md bg-gray-300"></div>
              </div>
              <div className="flex w-full flex-row justify-between">
                <div className="mx-auto h-8 w-32 rounded-md bg-gray-300"></div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
