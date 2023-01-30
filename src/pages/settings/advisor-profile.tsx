import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useState } from 'react';

import Forbidden from '@/components/Forbidden';
import { Layout, Meta } from '@/components/layout';
import Loading from '@/components/Loading';
import AdvisorProfileInfo from '@/components/settings/AdvisorProfileInfo';
import AdvisorProfilePictureForm from '@/components/settings/AdvisorProfilePictureForm';
import SettingsPage from '@/components/settings/Page';

import { API_URL, NEXT_URL } from '@/config/index';
import { parseCookies } from '@/helpers/index';

export default function MyProfile({ user, token }: any) {
  const router = useRouter();
  const { code } = router.query;
  const [settingsUrl, setSettingsUrl] = useState(null);
  const [showRegenerateToken, setShowRegenerateToken] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user && code) {
    if (typeof window !== 'undefined') {
      window.location.href = window.location.href + '&redirect=true';
    }
    return <Loading />;
  }

  const getProfileUrl = async (tString?: string) => {
    const accessToken = tString;
    const res = axios.post(`${NEXT_URL}/api/undock/profile`, { accessToken });
    res.then((r: any) => {
      const profileData = axios({
        method: user.advisor_profile ? 'PUT' : 'POST',
        url:
          `${NEXT_URL}/api/session/advisor-profiles/` +
          user?.advisor_profile?.id,
        data: { bookingUrl: r?.data?.data?.data?.target },
      });
      profileData.then((pd: any) => {
        router.push('/settings/advisor-profile');
      });
    });
  };

  const regenerateAccessToken = async () => {
    setLoading(true);
    const res = axios.post(`${NEXT_URL}/api/undock/refresh`, {
      refreshToken: user?.advisor_profile?.refreshToken,
    });
    res
      .then((r: any) => {
        const d = axios({
          method: user.advisor_profile ? 'PUT' : 'POST',
          url:
            `${NEXT_URL}/api/session/advisor-profiles/` +
            user?.advisor_profile?.id,
          data: r?.data?.data?.data,
        });
        setLoading(false);
        setShowRegenerateToken(false);
        d.then((pd: any) => {
          router.reload();
        });
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const getSettingsUrl = async (tString?: string, rToken?: string) => {
    const accessToken = tString;
    const res = axios.post(`${NEXT_URL}/api/undock/settings`, {
      accessToken: accessToken,
    });
    res
      .then((r: any) => {
        if (r?.data?.data?.success == true) {
          setSettingsUrl(r?.data?.data?.data?.target || null);
        }
      })
      .catch((e: any) => {
        console.log(e);
        setShowRegenerateToken(true);
        //regenerateAccessToken();
      });
  };

  if (user && code) {
    const res = axios.post(`${NEXT_URL}/api/undock/exchange`, { code });
    res
      .then((r: any) => {
        try {
          axios({
            method: user.advisor_profile ? 'PUT' : 'POST',
            url:
              `${NEXT_URL}/api/session/advisor-profiles/` +
              user?.advisor_profile?.id,
            data: r?.data?.data?.data,
          });
          getProfileUrl(r?.data?.data?.data?.accessToken);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (!user || user?.error) return <Forbidden />;
  if (!code && user?.advisor_profile?.accessToken) {
    getSettingsUrl(user?.advisor_profile?.accessToken);
  }

  return (
    <Layout
      meta={
        <Meta
          title="Edit Advisor profile - CoFoundersLab"
          description="Edit profile on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <Script src="https://sdk.undock.com/ui-kit.js"></Script>
      <SettingsPage user={user}>
        <AdvisorProfilePictureForm
          user={user}
          token={token}
          settingsUrl={settingsUrl}
          loading={loading}
          showRegenerateToken={showRegenerateToken}
          regenerate={() => {
            regenerateAccessToken();
          }}
        />
        {/* <ProfileBannerForm user={user} token={token} /> */}
        <AdvisorProfileInfo user={user} />
        {/* <ProfileSummary user={user} /> */}
        {/* <ProfileDetails user={user} onboardingData={onboardingData} /> */}
        {/* <ProfileSettings user={user} /> */}
      </SettingsPage>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  // TODO: code duplication
  if (!token) {
    return { props: { user: '', token: '' } };
  }
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

  return { props: { user: '', token: '' } };

  // return {
  //   redirect: {
  //     destination: '/login',
  //     permanent: false,
  //   },
  // };
};
