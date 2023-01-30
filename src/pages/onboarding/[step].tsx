import { CheckIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';
import ProfileInfo from '@/components/onboarding/ProfileInfo';
import ProfilePicture from '@/components/onboarding/ProfilePicture';
import RadioGroup from '@/components/onboarding/RadioGroup';

import { API_URL } from '@/config/index';
import { classNames } from '@/helpers/index';
import { parseCookies } from '@/helpers/index';

export default function Onboarding({
  step: currentStep,
  user,
  token,
  nextStep,
}: any) {
  useEffect(() => {
    if (nextStep === 'profile') {
      toast("Looks like you're new here, let's create your profile");
    }
  }, [nextStep]);

  const steps = [
    {
      id: 'create',
      name: 'Create account',
      description: 'Your account has been created and validated',
      status: 'upcoming',
    },
    {
      id: 'profile',
      name: 'Personal information',
      description: 'Tell us a few details about you',
      href: '/onboarding/profile',
      status: 'upcoming',
      content: <ProfileInfo user={user} nextStep="/onboarding/picture" />,
    },
    {
      id: 'picture',
      name: 'Profile picture',
      description: 'Share the best version of yourself',
      href: '/onboarding/picture',
      status: 'upcoming',
      content: (
        <ProfilePicture
          user={user}
          token={token}
          nextStep="/onboarding/business"
        />
      ),
    },
    {
      id: 'role',
      name: 'Your role',
      description: 'What is your role?',
      href: '/onboarding/role',
      status: 'upcoming',
      content: (
        <RadioGroup
          user={user}
          nextStep="/onboarding/looking"
          documentKey="role"
          optionsFetchKey="roles"
          successMessage="How exciting!"
        />
      ),
    },
    {
      id: 'looking',
      name: 'Looking for',
      description: 'What are you looking for?',
      href: '/onboarding/looking',
      status: 'upcoming',
      content: (
        <RadioGroup
          user={user}
          nextStep="/onboarding/business"
          documentKey="lookingFor"
          optionsFetchKey="lookingFor"
          successMessage="We have exactly that!"
        />
      ),
    },
    {
      id: 'business',
      name: 'Business information',
      description: 'What is your current business stage?',
      href: '/onboarding/business',
      status: 'upcoming',
      content: (
        <RadioGroup
          user={user}
          nextStep="/onboarding/skills"
          documentKey="startupStage"
          optionsFetchKey="startupStages"
          successMessage="You're on the right path!"
        />
      ),
    },
    {
      id: 'skills',
      name: 'Your skills',
      description: 'What specific skills do you have?',
      href: '/onboarding/skills',
      status: 'upcoming',
      content: (
        <RadioGroup
          user={user}
          nextStep="/onboarding/interests"
          documentKey="skills"
          optionsFetchKey="skills"
          multiselect={true}
          successMessage="Lots of powerful skills!"
        />
      ),
    },
    {
      id: 'interests',
      name: 'Interests',
      description: 'What are you interested in here at CoFoundersLab?',
      href: '/onboarding/interests',
      status: 'upcoming',
      content: (
        <RadioGroup
          user={user}
          nextStep="/onboarding"
          documentKey="interests"
          optionsFetchKey="interests"
          multiselect={true}
          successMessage="Welcome to CoFoundersLab!"
          buttonText="Jump in!"
        />
      ),
    },
  ];

  for (let i = 0; i < steps.length; i++) {
    if (steps[i]?.id !== nextStep) {
      // @ts-ignore
      steps[i].status = 'complete';
    } else {
      // @ts-ignore
      steps[i].status = 'current';
      break;
    }
  }

  const renderStep = (step: any, stepIdx: any) => {
    return (
      <>
        {stepIdx !== steps.length - 1 ? (
          <div
            className={classNames(
              step.status === 'complete' ? 'bg-blue-600' : 'bg-gray-300',
              'absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5'
            )}
            aria-hidden="true"
          />
        ) : null}
        <div className="group relative flex items-start">
          <span className="flex h-9 items-center">
            <Link
              href={
                step.href && step.status !== 'upcoming' ? step.href : undefined
              }
            >
              {step.status === 'complete' ? (
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 group-hover:bg-blue-800">
                  <CheckIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </span>
              ) : step.status === 'current' ? (
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                </span>
              ) : (
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                </span>
              )}
            </Link>
          </span>
          <span className="ml-4 flex min-w-0 flex-grow flex-col">
            <Link
              href={
                step.href && step.status !== 'upcoming' ? step.href : undefined
              }
              className="flex flex-col"
            >
              <span
                className={classNames(
                  step.id === currentStep && 'text-blue-600',
                  step.status === 'upcoming' && 'text-gray-500',
                  'text-sm font-semibold uppercase'
                )}
              >
                {step.name}
              </span>
              <span className="text-sm text-gray-500">{step.description}</span>
            </Link>
            {step.id === currentStep && (
              <span className="mt-6">{step.content}</span>
            )}
          </span>
        </div>
      </>
    );
  };

  return (
    <Layout
      meta={
        <Meta
          title="Welcome to CoFoundersLab"
          description="Welcome to CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      headerBanner={null}
      sidebar={null}
      header={null}
      footer={null}
    >
      <div className="flex min-h-screen bg-white">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:px-24 xl:px-32">
          <div className="mx-auto w-full max-w-3xl">
            <div>
              <img
                className="h-12 w-auto"
                src="/assets/images/c.svg"
                alt="CoFoundersLab"
              />
            </div>
            <nav aria-label="Progress">
              <ol role="list" className="mt-6">
                {steps.map((step, stepIdx) => (
                  <li
                    key={step.name}
                    className={classNames(
                      stepIdx !== steps.length - 1 ? 'pb-10' : '',
                      'relative'
                    )}
                  >
                    {renderStep(step, stepIdx)}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute z-10 p-20 text-lg text-white">
            Just a few steps away from thousands of CoFounders
          </div>
          <img
            className="absolute inset-0 z-0 h-full w-full object-cover"
            alt="Join World's Largest Network of Entrepreneurs"
            src="/assets/images/auth-splash.jpg"
          />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query: { step },
}) => {
  const currentStep = step?.toString() || 'create';
  const stepOrder = [
    'create',
    'profile',
    'picture',
    'role',
    'looking',
    'business',
    'skills',
    'interests',
  ];
  const { token } = parseCookies(req);

  if (!stepOrder.includes(currentStep)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // TODO: code duplication
  const strapiRes = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await strapiRes.json();

  if (strapiRes.ok) {
    let nextStep = 'profile';

    if (
      user?.profile?.firstName &&
      user?.profile?.lastName &&
      user?.profile?.pronouns &&
      user?.profile?.city &&
      user?.profile?.tagline
    ) {
      nextStep = 'picture';
    }

    if (user?.profile?.profilePicture) {
      nextStep = 'role';
    }

    if (user?.profile?.role) {
      nextStep = 'looking';
    }

    if (user?.profile?.lookingFor) {
      nextStep = 'business';
    }

    if (user?.profile?.startupStage) {
      nextStep = 'skills';
    }

    if (user?.profile?.skills) {
      nextStep = 'interests';
    }

    if (stepOrder.indexOf(currentStep) > stepOrder.indexOf(nextStep)) {
      return {
        redirect: {
          destination: `/onboarding/${nextStep}`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        user,
        token,
        step,
        nextStep,
        stepOrder,
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
