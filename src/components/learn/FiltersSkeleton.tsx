export default function FiltersSkeleton() {
  return (
    <ul role="list" className="flex justify-between">
      {[...Array(4)].map((_, i: number) => (
        <li key={i} className="border-b border-gray-300 py-5">
          <div className="flex h-full animate-pulse flex-col items-start space-y-5">
            <div className="h-6 w-40 rounded-md bg-gray-300"></div>
            <div className="flex w-full space-x-4">
              <div className="h-4 w-4 rounded-md bg-gray-300"></div>
              <div className="h-4 w-40 rounded-md bg-gray-300"></div>
            </div>
            <div className="flex w-full space-x-4">
              <div className="h-4 w-4 rounded-md bg-gray-300"></div>
              <div className="h-4 w-28 rounded-md bg-gray-300"></div>
            </div>
            <div className="flex w-full space-x-4">
              <div className="h-4 w-4 rounded-md bg-gray-300"></div>
              <div className="h-4 w-48 rounded-md bg-gray-300"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
