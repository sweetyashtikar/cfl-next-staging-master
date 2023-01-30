import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';

export default function NotFound() {
  return (
    <Layout
      meta={
        <Meta
          title="Acces denied"
          description="Sorry, you don't have access to that page."
        />
      }
    >
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8">
        <div className="my-auto flex-shrink-0 py-16 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            403 error
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Acces denied
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Sorry, you don&apos;t have access to that page.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link
                href="/"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700"
              >
                Go back home
                <span className="ml-2" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <button
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-blue-700 hover:bg-indigo-200"
                onClick={() => {
                  // @ts-ignore
                  window.customerly.open();
                }}
              >
                Contact support
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
