import { GetServerSideProps } from 'next';

import Forbidden from '@/components/Forbidden';
import { Layout, Meta } from '@/components/layout';
import SettingsPage from '@/components/settings/Page';
import ProfileRefund from '@/components/settings/ProfileRefund';

import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers/index';

export default function BillingSettings({ user, token }: any) {
  if (!user) return <Forbidden />;

  return (
    <Layout
      meta={
        <Meta
          title="Cancel Profile - CoFoundersLab"
          description="Cancel Profile on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <SettingsPage>
        <ProfileRefund user={user} />
      </SettingsPage>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  // TODO: code duplication
  const strapiRes = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await strapiRes.json();

  if (strapiRes.ok) {
    return {
      props: {
        user,
        token,
      },
    };
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};
