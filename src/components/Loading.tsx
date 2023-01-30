import { Layout, Meta } from '@/components/layout';

export default function Loading() {
  return (
    <Layout meta={<Meta title="CoFoundersLab" description="" />}>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-20">
          <div className="flex items-center justify-center py-20">
            <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
