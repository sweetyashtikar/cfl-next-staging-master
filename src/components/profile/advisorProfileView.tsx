import {
  CheckIcon,
  GlobeAltIcon,
  LinkIcon,
  LocationMarkerIcon,
  MailIcon,
  PresentationChartBarIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ConnectModal from '@/components/connect/Modal';
import MessageModal from '@/components/message/Modal';

import { NEXT_URL } from '@/config/index';
import { generateSlug } from '@/helpers/helperFunctions';
import { classNames } from '@/helpers/index';

import Forbidden from '../Forbidden';
import ProfilePicture from '../ProfilePicture';
import { useCityByID } from '../../hooks/useCitySearch';

const SkillImage = (imageName: any) => {
  const [src, setSrc] = useState('');
  useEffect(() => {
    setSrc(imageName + '.png');
  }, [imageName]);
  return (
    <div
      className={
        'flex h-[80px] w-[80px] items-center justify-center rounded-full bg-slate-100 p-5 text-center'
      }
    >
      <img
        src={'/assets/images/skills/' + generateSlug(src)}
        height={50}
        width={50}
        alt={imageName}
        title={imageName}
        onError={() => {
          setSrc('c-gray.svg');
        }}
      />
    </div>
  );
};

const InterestImage = (imageName: any) => {
  const [src, setSrc] = useState('');
  useEffect(() => {
    setSrc(imageName + '.jpg');
  }, [imageName]);
  return (
    <div
      className={
        'flex h-[80px] w-[80px] items-center justify-center rounded-full bg-slate-100 p-5 text-center'
      }
    >
      <img
        src={'/assets/images/interest/' + generateSlug(src)}
        height={50}
        width={50}
        alt={imageName}
        title={imageName}
        onError={() => {
          setSrc('c-gray.svg');
        }}
      />
    </div>
  );
};

export default function ProfileView({ profile, advisor }: any) {
  const router = useRouter();
  const [showConnect, setShowConnect] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState({
    name: profile?.city?.name,
    country: profile?.city?.country,
  });
  const c = useCityByID(advisor?.city);

  if (!profile) return <Forbidden />;

  if (typeof advisor?.city == 'string') {
    if (!c.loading && city.name == undefined) {
      setCity({ name: c.data[0].name, country: c.data[0].country });
    }
  }

  const profileAttributes = [
    {
      label: 'Location',
      value:
        advisor?.city?.name != undefined
          ? `${advisor?.city?.name}, ${advisor?.city?.country}`
          : `${city?.name}, ${city?.country}`,
      icon: LocationMarkerIcon,
    },
    {
      label: 'Company Name',
      value: advisor?.companyName,
      icon: PresentationChartBarIcon,
    },
    {
      label: 'Website',
      value: advisor?.website,
      icon: GlobeAltIcon,
    },
  ];

  const bannerUrl =
    advisor?.profileBanner?.url || '/assets/images/profile/defaultBanner.jpg';
  return (
    <>
      <section aria-labelledby="profile-overview-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <h2 className="sr-only" id="profile-overview-title">
            Profile Overview
          </h2>
          <div
            className="h-[250px] w-full !bg-cover !bg-center !bg-no-repeat"
            style={{ background: 'url(' + bannerUrl + ')' }}
          ></div>
          <div className="relative mt-[-60px] p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:flex-grow sm:items-center sm:space-x-5">
                <div className="relative flex-shrink-0">
                  {profile?.premium && (
                    <div className="absolute right-[30px] flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white bg-orange-600 text-white">
                      <CheckIcon width={20} height={20} />
                    </div>
                  )}
                  <ProfilePicture
                    className="mx-auto h-[180px] w-[180px] overflow-hidden rounded-full border border-slate-200"
                    profile={advisor}
                  />
                </div>
                <div className="mt-4 w-full flex-grow text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <div className="flex flex-row justify-between">
                    <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                      {`${advisor?.firstName} ${advisor?.lastName}`}
                    </p>
                    {advisor?.bookingUrl && (
                      <button
                        className="rounded-sm border border-gray-800 px-2 text-sm"
                        onClick={() => {
                          setShowModal(true);
                        }}
                      >
                        Book an appointment
                      </button>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    {advisor?.title}
                  </p>
                </div>
              </div>
              <div
                className={classNames(
                  profile && profile?.id === profile.id && 'hidden',
                  'mt-5 flex justify-center gap-4 sm:mt-0'
                )}
              >
                <button
                  type="button"
                  onClick={() => setShowConnect(true)}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <LinkIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Connect</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowMessage(true)}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-orange-700 shadow-sm hover:bg-gray-50 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <MailIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 divide-y divide-gray-200 border-t border-b border-gray-200 bg-gray-50 sm:divide-y-0 sm:divide-x">
            <div className="flex flex-grow items-center space-x-2 px-6 py-3 text-sm font-medium text-gray-500">
              <img
                className="h-5"
                src="/assets/images/c-gray.svg"
                alt="CoFoundersLab"
              />
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    `${NEXT_URL}/advisor/${advisor?.slug}`
                  );
                  toast.success('Copied to clipboard');
                }}
                className="text-gray-600"
              >
                {`${NEXT_URL}/advisor/${advisor?.slug}`}
              </button>
            </div>
            {/* <div className="flex items-center space-x-6 px-6 py-3 text-sm font-medium text-gray-500">
              {profile?.linkedinUrl && (
                <a
                  href={profile?.linkedinUrl}
                  className="text-gray-400 hover:text-gray-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">
                    {advisor?.firstName}&apos;s LinkedIn Profile
                  </span>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              {profile?.twitterUrl && (
                <a
                  href={profile?.twitterUrl}
                  className="text-gray-400 hover:text-gray-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">
                    {profile?.firstName}&apos;s Twitter Profile
                  </span>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              )}
            </div> */}
          </div>
          <h2 className="sr-only" id="quick-links-title">
            Quick links
          </h2>
          <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-3">
              {profileAttributes.map((field) => {
                if (
                  field.value == '' ||
                  field.value == null ||
                  field.value == 'undefined'
                ) {
                  return;
                }
                return (
                  <div key={field.label} className="sm:col-span-1">
                    <dt className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                      <field.icon
                        className="h-5 w-5 text-gray-800"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-gray-500">
                        {field.label}
                      </span>
                    </dt>
                    <dd className="mt-1 ml-7 text-sm font-medium text-gray-900">
                      {field.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="about-user"
        className={advisor?.professionalBackground == undefined ? 'hidden' : ''}
      >
        <div className="overflow-hidden rounded-lg bg-white px-4 py-4 shadow">
          <div className="px-0 pb-0">
            <div className="border-0 border-b-2 border-slate-100 sm:col-span-6">
              <dt className="px-4 pb-4 text-xl font-medium text-gray-900">
                Professional Background
              </dt>
            </div>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
              <div className="sm:col-span-6">
                {/* <dt className="px-4 text-xl font-medium text-gray-900">
                  About
                </dt> */}
                <dd
                  className="mt-1 max-w-full px-4 pt-4 pb-2 text-sm text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html: advisor?.professionalBackground,
                  }}
                />
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="about-user"
        className={advisor?.topics == undefined ? 'hidden' : ''}
      >
        <div className="overflow-hidden rounded-lg bg-white px-4 py-4 shadow">
          <div className="px-0 pb-0">
            <div className="border-0 border-b-2 border-slate-100 sm:col-span-6">
              <dt className="px-4 pb-4 text-xl font-medium text-gray-900">
                Topics I can help you with
              </dt>
            </div>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
              <div className="sm:col-span-6">
                {/* <dt className="px-4 text-xl font-medium text-gray-900">
                  About
                </dt> */}
                <dd
                  className="mt-1 max-w-full px-4 pt-4 pb-2 text-sm text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html: advisor?.topics,
                  }}
                />
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="about-user"
        className={
          advisor?.otherAreas == undefined || advisor?.otherAreas == ''
            ? 'hidden'
            : ''
        }
      >
        <div className="overflow-hidden rounded-lg bg-white px-4 py-4 shadow">
          <div className="px-0 pb-0">
            <div className="border-0 border-b-2 border-slate-100 sm:col-span-6">
              <dt className="px-4 pb-4 text-xl font-medium text-gray-900">
                Other areas I can help you with
              </dt>
            </div>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
              <div className="sm:col-span-6">
                {/* <dt className="px-4 text-xl font-medium text-gray-900">
                  About
                </dt> */}
                <dd
                  className="mt-1 max-w-full px-4 pt-4 pb-2 text-sm text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html: advisor?.otherAreas,
                  }}
                />
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div
        id="defaultModal"
        tab-index="-1"
        aria-hidden="true"
        className={
          (showModal ? '' : 'hidden') +
          ' h-modal fixed top-0 right-0 left-0 z-50 w-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full'
        }
      >
        <div className="absolute left-[50%] top-[50%] h-full w-full max-w-7xl translate-x-[-50%] translate-y-[-50%] p-4 md:h-auto">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t p-4 pb-0">
              {/* <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        Get Started
                    </div> */}
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                }}
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <Script src="https://sdk.undock.com/ui-kit.js"></Script>
            <div className="space-y-6 p-6 pt-0">
              {advisor?.bookingUrl && (
                // <iframe
                //   width={'100%'}
                //   height="350px"
                //   src={advisor?.bookingUrl}
                // ></iframe>

                // @ts-ignore
                <undock-settings-inline
                  target={advisor?.bookingUrl}
                  use-shadow="false"
                  border-radius="0"
                  max-width="1280px"
                  min-height="800px"
                >
                  {/*@ts-ignore */}
                </undock-settings-inline>
              )}
            </div>
            {/* <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                    <button data-modal-toggle="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                </div> */}
          </div>
        </div>
      </div>

      {/* <section
        aria-labelledby="about-user"
        className={profile?.summary == undefined ? 'hidden' : ''}
      >
        <div className="overflow-hidden rounded-lg bg-white px-4 py-4 shadow">
          <div className="px-0 pb-0">
            <div className="border-0 border-b-2 border-slate-100 sm:col-span-6">
              <dt className="px-4 pb-4 text-xl font-medium text-gray-900">
                About
              </dt>
            </div>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
              <div className="sm:col-span-6">
                <dd
                  className="mt-1 max-w-full px-4 pt-4 pb-2 text-sm text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html: profile?.summary,
                  }}
                />
              </div>
            </dl>
          </div>
        </div>
      </section> */}

      {/* <section
        aria-labelledby="professional-skills"
        className={profile?.skills == undefined ? 'hidden' : ''}
      >
        <div className="overflow-hidden rounded-lg bg-white px-4 py-4 shadow">
          <div className="px-0 pb-0">
            <div className="mb-7 border-0 border-b-2 border-slate-100 sm:col-span-6">
              <dt className="px-4 pb-4 text-xl font-medium text-gray-900">
                Skills
              </dt>
            </div>
            <div className="grid grid-cols-2 place-items-center md:grid-cols-4">
              {profile?.skills?.map((skill: any, index: number) => {
                return (
                  <div
                    key={skill + '-' + index}
                    className={
                      'mb-5 flex max-w-[170px] flex-col items-center justify-center rounded-xl border border-slate-200 p-5'
                    }
                  >
                    <div>{SkillImage(skill)}</div>
                    <div className="text-center text-sm text-gray-700">
                      {skill}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section> */}

      {/* <section
        aria-labelledby="professional-interests"
        className={profile?.interests == undefined ? 'hidden' : ''}
      >
        <div className="overflow-hidden rounded-lg bg-white px-4 py-4 shadow">
          <div className="px-0 pb-0">
            <div className="mb-7 border-0 border-b-2 border-slate-100 sm:col-span-6">
              <dt className="px-4 pb-4 text-xl font-medium text-gray-900">
                Interests••••••
              </dt>
            </div>
            <div className="grid grid-cols-2 place-items-center md:grid-cols-4">
              {profile?.interests?.map((interest: any, index: number) => {
                return (
                  <div
                    key={interest + '-' + index}
                    className={
                      'mb-5 flex max-w-[170px] flex-col items-center justify-center rounded-xl border border-slate-200 p-5'
                    }
                  >
                    <div>{InterestImage(interest)}</div>
                    <div className="text-center text-sm text-gray-700">
                      {interest}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section> */}

      {/* Actions panel */}
      <section aria-labelledby="quick-links-title">
        <div className="overflow-hidden rounded-lg bg-white shadow"></div>
      </section>
      <ConnectModal
        open={showConnect}
        profile={profile}
        handleClose={() => setShowConnect(false)}
      />
      <MessageModal
        open={showMessage}
        profile={profile}
        handleClose={() => setShowMessage(false)}
      />
    </>
  );
}
