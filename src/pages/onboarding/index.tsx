import { GetServerSideProps } from 'next';

import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers/index';

export default function Onboarding() {
  return null;
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

  if (user.onboarded) {
    return {
      redirect: {
        destination: '/feed',
        permanent: false,
      },
    };
  }

  if (strapiRes.ok) {
    let step = 'profile';

    if (
      user?.profile?.firstName &&
      user?.profile?.lastName &&
      user?.profile?.pronouns &&
      user?.profile?.city &&
      user?.profile?.tagline
    ) {
      step = 'picture';
    }

    if (user?.profile?.profilePicture) {
      step = 'role';
    }

    if (user?.profile?.role) {
      step = 'looking';
    }

    if (user?.profile?.lookingFor) {
      step = 'business';
    }

    if (user?.profile?.startupStage) {
      step = 'skills';
    }

    if (user?.profile?.skills) {
      step = 'interests';
    }

    return {
      redirect: {
        destination: `/onboarding/${step}`,
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
