import Navigation from '@/components/connections/Navigation';

export default function ConnectionsPage({ children }: any) {
  return (
    <>
      <div className="h-full border-b border-gray-200 bg-gray-100">
        <div className="border-b border-gray-200 bg-white">
          <header className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="border-t border-gray-200 py-5 sm:flex sm:items-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                My Connections
              </h1>
            </div>
          </header>
        </div>

        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8"
        >
          <div className="py-6 md:grid md:grid-cols-12 md:gap-x-5">
            <aside className="py-6 px-2 sm:px-6 md:col-span-3 md:py-0 md:px-0">
              <Navigation />
            </aside>

            <div className="space-y-6 sm:px-6 md:col-span-9 md:px-0">
              {children}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
