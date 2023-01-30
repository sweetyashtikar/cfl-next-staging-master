import { Layout, Meta } from '@/components/layout';

export default function About() {
  return (
    <Layout meta={<Meta title="About CoFoundersLab" description="" />}>
      <div className="bg-white py-40">
        <div className="mx-auto max-w-md space-y-5">
          <a
            href="#"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            View more courses
          </a>
          <a className="text-shadow-default inline-flex items-center justify-center whitespace-nowrap rounded-md bg-orange-600 bg-gradient-to-bl px-4 py-2 text-base font-medium text-white shadow-sm">
            Try Premium
          </a>
        </div>
      </div>
    </Layout>
  );
}
