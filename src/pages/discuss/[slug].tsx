import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import Loader from '@/components/common/Loader';
import DiscussionCard from '@/components/discuss/Card';
import DiscussPage from '@/components/discuss/Page';
import { Layout, Meta } from '@/components/layout';
import Loading from '@/components/Loading';

import { apiFetcher } from '@/helpers/fetchers';

function Discuss({ slug }: any) {
  const { data, isLoading } = useSWR(`/discussions/${slug}`, apiFetcher);

  return (
    <Layout
      meta={
        <Meta
          title={`${data?.title || 'Discussion'} - CoFoundersLab`}
          description={`Discussion on CoFoundersLab - ${data?.body.substring(
            125
          )}...`}
        />
      }
      showLeftSidebar
    >
      <DiscussPage>
        {isLoading ? (
          <div className="grid place-items-center">
            <Loader />
          </div>
        ) : (
          <DiscussionCard data={data} loadReplies={true} allowReply={true} />
        )}
      </DiscussPage>
    </Layout>
  );
}

export default function PageContainer() {
  const router = useRouter();
  const { slug } = router.query;

  if (router.isFallback) {
    return <Loading />;
  }

  return <Discuss slug={slug} />;
}
