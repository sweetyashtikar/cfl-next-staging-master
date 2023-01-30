import { GetServerSideProps } from 'next';

import RigthSideBar from '@/components/discuss/right-sidebar';
import GroupList from '@/components/groups/GroupList';
import { Layout, Meta } from '@/components/layout';

import { parseCookies } from '@/helpers';

export interface IGroups {
  id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const Groups = () => {
  return (
    <Layout
      meta={
        <Meta
          title="Groups - CoFoundersLab"
          description="CoFoundersLab Groups, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      showLeftSidebar
    >
      <div className="block justify-between sm:flex">
        <div className="m-10 ml-4 mr-4 lg:w-4/6">
          <div className="mb-4 border border-gray-200 bg-white">
            <header className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 py-5 sm:flex sm:items-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#4E5E78] md:w-full lg:w-1/2">
                  Groups
                </h1>
              </div>
            </header>
          </div>
          <GroupList />
        </div>
        <div className="mt-10 hidden lg:block">
          <RigthSideBar />
        </div>
      </div>
    </Layout>
  );
};

export default Groups;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);

  return {
    props: {
      token: token ? token : '',
    },
  };
};
