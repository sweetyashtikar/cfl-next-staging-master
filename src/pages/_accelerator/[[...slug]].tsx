import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import Content from '@/components/accelerator/content';
import Nav from '@/components/accelerator/nav';
import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';

import { API_URL } from '@/config';
import { parseCookies } from '@/helpers/index';

export default function Accelerator({ course }: any) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Layout
      meta={
        <Meta
          title="Accelerator - CoFoundersLab"
          description="CoFoundersLab Accelerator, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <div className="h-full border-b border-gray-200 bg-gray-100">
        <div className="border-b border-gray-200 bg-white">
          <header className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 py-5 lg:grid lg:grid-cols-12 lg:gap-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 lg:col-span-2 lg:block">
                <Link href="/accelerator">Accelerator</Link>
              </h1>
              <div className="lg:col-span-7"></div>
            </div>
          </header>
        </div>

        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="hidden lg:col-span-3 lg:block">
              <Nav course={course} />
            </div>
            <main className="lg:col-span-9">
              <article className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                <Content
                  content={
                    slug
                      ? course.modules?.find((x: any) => x._id === slug[0])
                          ?.content
                      : course.content
                  }
                />
              </article>
            </main>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const strapiRes = await fetch(
    `${API_URL}/courses/${process.env.ACCELERATOR_COURSE_ID}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const course = await strapiRes.json();

  if (strapiRes.ok) {
    return {
      props: {
        course,
      },
    };
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
