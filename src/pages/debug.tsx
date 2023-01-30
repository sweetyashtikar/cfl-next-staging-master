import { Layout, Meta } from '@/components/layout';

export default function Debug() {
  return (
    <Layout
      meta={
        <Meta
          title="Debug - CoFoundersLab"
          description="Debug CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <div className="overflow-hidden bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-base lg:max-w-none">
            <h2 className="mb-2 inline-block rounded-full bg-blue-600 px-3 py-px text-sm font-semibold uppercase tracking-wider text-white">
              About
            </h2>
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              CoFoundersLab
            </p>
          </div>
          <div className="relative mx-auto max-w-prose text-base lg:mx-0 lg:max-w-5xl lg:pr-72">
            <p className="text-lg text-gray-500">
              Founded in 2011, CoFoundersLab has been dedicated to assisting
              entrepreneurial-minded individuals in gaining access to the tools
              they require in order to succeed. Since then, CoFoundersLab has
              been the world&rsquo;s largest network of entrepreneurs using
              technology and AI algorithms to make connections in the business
              world seamlessly and efficiently.
            </p>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
            <button
              type="button"
              onClick={() => {
                throw new Error('Sentry Frontend Error');
              }}
              className="rounded-md border border-transparent bg-blue-600 px-5 py-3 text-lg font-medium text-white hover:bg-blue-700"
            >
              Sentry Frontend Error
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
