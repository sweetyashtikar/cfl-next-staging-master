import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import PostCard from '@/components/feed/post';
import { Layout } from '@/components/layout';

import { API_URL } from '@/config';
import { parseCookies } from '@/helpers';
import { apiGet } from '@/helpers/fetchers';

import { IPOST } from '.';

const FeedPost = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR<IPOST>(`/feed-posts/${id}`, apiGet);

  return (
    <Layout showLeftSidebar>
      <div className="m-10 ml-4 w-4/6">{data && <PostCard data={data} />}</div>
    </Layout>
  );
};

export default FeedPost;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);

  const user = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  return {
    props: {
      token: token ? token : '',
    },
  };
};
