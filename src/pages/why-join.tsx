import { Layout, Meta } from '@/components/layout';

export default function Page() {
  return (
    <Layout meta={<Meta title="Why join CoFoundersLab?" description="" />}>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <h1 className="group mb-5 max-w-lg font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:mb-6">
            <span className="mb-1 inline-block sm:mb-4">
              Why join CoFoundersLab?
            </span>
            <div className="bg-deep-purple-accent-400 scale-x-30 ml-auto h-1 origin-left transform duration-300 group-hover:scale-x-100" />
          </h1>

          <div className="prose max-w-7xl">
            <p>The community empowers you to&hellip;</p>
            <p>
              <strong>CONNECT</strong>&nbsp;
            </p>
            <p>
              CoFoundersLab is the largest ecosystem of innovators and
              entrepreneurs online promoting a greater network of brain and
              skill reservoirs. Powered by AI matching algorithms, the community
              is an excellent place to connect with founders, CoFounders,
              mentors, and even future team members.
            </p>
            <p>
              <strong>COLLABORATE</strong>
            </p>
            <p>
              The community promotes collaboration within the CoFoundersLab
              platform using our direct video chat, message boards and allows
              members to use our suite of tools and resources to propel and
              scale every startup.&nbsp;
            </p>
            <p>
              <strong>EDUCATE</strong>&nbsp;
            </p>
            <p>
              CoFoundersLab is a great place to take a startup to learn the
              perfect tools for success and arm your business with the knowledge
              and expertise learned through connections. The company gives full
              support as you&rsquo;ll be educated with various business
              techniques to take your startup to the next level.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
