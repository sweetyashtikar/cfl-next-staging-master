import { GetServerSideProps } from 'next';

import Forbidden from '@/components/Forbidden';
import { Layout, Meta } from '@/components/layout';
import SettingsPage from '@/components/settings/Page';
import ProfileBannerForm from '@/components/settings/ProfileBannerForm';
import ProfileDetails from '@/components/settings/ProfileDetails';
import ProfileInfo from '@/components/settings/ProfileInfo';
import ProfilePictureForm from '@/components/settings/ProfilePictureForm';
import ProfileSettings from '@/components/settings/ProfileSettings';
import ProfileSummary from '@/components/settings/ProfileSummary';

import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers/index';

export default function MyProfile({ user, token, onboardingData }: any) {
  if (!user || user?.error) return <Forbidden />;

  return (
    <Layout
      meta={
        <Meta
          title="Edit profile - CoFoundersLab"
          description="Edit profile on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <SettingsPage user={user}>
        <ProfilePictureForm user={user} token={token} />
        <ProfileBannerForm user={user} token={token} />
        <ProfileInfo user={user} />
        <ProfileSummary user={user} />
        <ProfileDetails user={user} onboardingData={onboardingData} />
        <ProfileSettings user={user} />
      </SettingsPage>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const [userRes, onboardingRes] = await Promise.all([
    fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch(`${API_URL}/onboarding`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);
  const [user, onboardingData] = await Promise.all([
    userRes.json(),
    onboardingRes.json(),
  ]);
  if (!user?.error && !onboardingData?.error) {
    return {
      props: {
        user,
        token: token ? token : '',
        onboardingData,
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
