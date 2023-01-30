import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';

export default function About() {
  return (
    <Layout
      meta={
        <Meta
          title="About - CoFoundersLab"
          description="About CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
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
            <div className="relative">
              <div className="prose prose-blue mx-auto text-gray-500 lg:max-w-none">
                <p>
                  The CoFoundersLab team is aware that building a company from
                  the ground up is not easy, and it all begins with a strong
                  foundation &mdash; a team. Over the years, our global
                  community has been home to over 625,000 entrepreneurs from all
                  over the world looking to either build a startup or help grow
                  one. We specialize in facilitating creative entrepreneurial
                  partnerships in a platform designed to enable members to meet
                  like-minded individuals through connections with others in the
                  same field. We firmly believe that entrepreneurs are the
                  driving force behind global innovation and progress, which is
                  why we live and breathe to support this community.
                </p>
                <p>
                  CoFoundersLab takes pride in developing an ecosystem of
                  diverse company products and services from the formation stage
                  to investment. We support founders and investors in
                  establishing successful enterprises by connecting
                  entrepreneurial-minded individuals to collaborate seamlessly
                  and conveniently through its full stack of products. By
                  joining CoFoundersLab, you become a part of a global ecosystem
                  that provides access to a broader network of resources,
                  including education, finance, mentorship, and partnerships.
                </p>
              </div>
              <div className="mt-10">
                <p className="mb-6 text-lg font-medium text-gray-500">
                  Join the World&apos;s Largest Network of Entrepreneurs
                </p>
                <Link
                  href="/register"
                  className="rounded-md border border-transparent bg-blue-600 px-5 py-3 text-lg font-medium text-white hover:bg-blue-700"
                >
                  Sign up for free
                </Link>
              </div>
            </div>
            <div className="relative mx-auto mt-12 max-w-prose text-base lg:mt-0 lg:max-w-none">
              <svg
                className="absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="bedc54bc-7371-44a2-a2bc-dc68d819ae60"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)"
                />
              </svg>
              <blockquote className="relative rounded-lg bg-white shadow-lg">
                <div className="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
                  <div className="relative mt-8 text-lg font-medium text-gray-700">
                    <svg
                      className="absolute top-0 left-0 h-8 w-8 -translate-x-3 -translate-y-2 transform text-gray-200"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="relative">
                      In CoFoundersLab I have found a community of passionate
                      founders and advisors who help each other by sharing their
                      experiences with direct feedback that allows a founder to
                      grow and develop their company to its potential. Its been
                      my favorite group to network with like-minded
                      professionals.
                    </p>
                  </div>
                </div>
                <cite className="relative flex items-center rounded-b-lg bg-blue-500 py-5 px-6 not-italic sm:mt-10 sm:items-start sm:py-5 sm:pl-12 sm:pr-10">
                  <div className="relative rounded-full border-2 border-white sm:absolute sm:top-0 sm:-translate-y-1/2 sm:transform">
                    <img
                      className="h-12 w-12 rounded-full bg-blue-300 sm:h-20 sm:w-20"
                      src="/assets/images/homepage/heather-dawson.jpg"
                      alt="Heather Dawson / CEO of Xiggit"
                    />
                  </div>
                  <span className="relative ml-4 font-semibold leading-6 text-blue-200 sm:ml-24 sm:pl-1">
                    <p className="font-semibold text-white sm:inline">
                      Heather Dawson
                    </p>{' '}
                    <p className="sm:inline">CEO, Xiggit</p>
                  </span>
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
