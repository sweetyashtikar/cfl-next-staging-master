import { CheckIcon } from '@heroicons/react/outline';
import { LinkIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useUser from '@/hooks/useUser';

import ConnectModal from '@/components/connect/Modal';
import MessageModal from '@/components/message/Modal';

import { API_URL } from '@/config';
import { generateSlug } from '@/helpers/helperFunctions';
import { classNames } from '@/helpers/index';

import Loader from '../common/Loader';
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
export default function ProfileView({ profile, token }: any) {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(
    profile?.profileBanner?.url || '/assets/images/coverbg.png'
  );
  const [ProfileImageurl, setProfileImageurl] = useState(null);
  const [ProfileImagefile, setProfileImagefile] = useState(null);
  const [skill, setSkills] = useState(profile?.skills);
  const { user } = useUser();
  const [city, setCity] = useState({
    name: profile?.city?.name,
    country: profile?.city?.country,
  });
  const c = useCityByID(profile.city);
  if (!profile) return <Forbidden />;
  if (typeof profile?.city == 'string') {
    if (!c.loading && city.name == undefined) {
      setCity({ name: c.data[0].name, country: c.data[0].country });
    }
  }
  // const UniversityAttributes: any = [
  //   {
  //     name: 'New York Universty (NYU)',
  //     img: '/assets/images/UniversityDummy.png',
  //     span: '2013 - 2017',
  //     degree: 'Bacholers in Computer Application',
  //   },
  //   {
  //     name: 'University of British Columbia',
  //     img: '/assets/images/UniversityDummy.png',
  //     span: '2017 - 2021',
  //     degree: 'Bacholers in Computer Science',
  //   },
  // ];
  // //
  // const profileAttributes: any = [
  //   {
  //     label: 'Location',
  //     value:
  //       profile?.city?.name != undefined
  //         ? `${profile?.city?.name}, ${profile?.city?.country}`
  //         : `${city?.name}, ${city?.country}`,
  //     icon: LocationMarkerIcon,
  //   },
  //   {
  //     label: 'Startup stage',
  //     value: profile?.startupStage,
  //     icon: PresentationChartBarIcon,
  //   },
  //   {
  //     label: 'Looking For',
  //     value: profile?.lookingFor,
  //     icon: PresentationChartBarIcon,
  //   },
  // ];
  // const bannerUrl =
  //   // profile?.profileBanner?.url || '/assets/images/profile/defaultBanner.jpg';
  //   profile?.profileBanner?.url || '/assets/images/coverbg.png';

  const handleSubmit = async (updateData: any, imageType: string) => {
    setIsUploading(true);
    try {
      const body = new FormData();
      body.append('files', updateData);
      // @ts-ignore
      body.append('refId', user?.profile?.id);
      body.append('ref', 'profile');
      body.append('field', imageType);
      await axios.post(`${API_URL}/upload`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsUploading(false);
      toast('Great! Your profile information was saved successfully');
    } catch (e: any) {
      setIsUploading(false);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  const coverChange = (e: any) => {
    let file = e.target.files[0];
    setBannerFile(file);
    if (file) {
      handleSubmit(file, 'profileBanner');
      let url = URL.createObjectURL(file);
      setBannerUrl(url);
    }
  };
  const ProfileImageChange = (e: any) => {
    let file = e.target.files[0];
    setProfileImagefile(file);
    if (file) {
      handleSubmit(file, 'profilePicture');
      let url: any = URL.createObjectURL(file);
      setProfileImageurl(url);
    }
  };

  return (
    <>
      <section aria-labelledby="profile-overview-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <h2 className="sr-only" id="profile-overview-title">
            Profile Overview
          </h2>
          {isUploading && (
            <div className="fixed top-0 left-0 z-50 grid h-full w-full place-items-center bg-[#ffffffa0]">
              <Loader />
            </div>
          )}
          <div
            className="relative h-[250px] w-full !bg-cover !bg-center !bg-no-repeat"
            style={{ background: 'url(' + bannerUrl + ')' }}
          >
            <div
              className={classNames(
                user && user?.profile?.id != profile.id && 'hidden',
                'mobileCover covers mt-5 flex justify-center gap-4 sm:mt-0'
              )}
            >
              <input
                type="file"
                id="CoverImage"
                name="CoverImage"
                style={{ display: 'none' }}
                accept="image/*"
                disabled={isUploading}
                onChange={(e) => {
                  coverChange(e);
                }}
              ></input>
              <label
                htmlFor="CoverImage"
                className="hover: inline-flex cursor-pointer justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
              >
                <img
                  src={'/assets/images/upload.svg'}
                  className="mr-2"
                  alt=""
                />
                <span>Edit Cover Photo</span>
              </label>
            </div>
          </div>
          <div className="relative mt-[-150px] p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:items-center sm:space-x-5">
                <div className="relative flex-shrink-0">
                  {/* {profile?.premium && (
                    <div className="absolute right-[30px] flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white bg-orange-600 text-white">
                      <CheckIcon width={20} height={20} />
                    </div>
                  )} */}
                  <ProfilePicture
                    className="mx-auto h-[180px] w-[180px] overflow-hidden rounded-full border-4 border border-slate-200"
                    profile={profile}
                    profileURL={ProfileImageurl}
                  />
                  <input
                    type="file"
                    id="ProfileImage"
                    name="ProfileImage"
                    style={{ display: 'none' }}
                    accept="image/*"
                    disabled={isUploading}
                    onChange={(e) => {
                      ProfileImageChange(e);
                    }}
                  ></input>
                  <label htmlFor="ProfileImage">
                    <img
                      className="picProfile absolute"
                      src={'/assets/images/upload.svg'}
                      alt=""
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="relative px-6 pl-4 pb-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:items-center sm:space-x-5">
                <div className="relative flex-shrink-0">
                  {profile?.premium && (
                    <div className="absolute right-[30px] flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white bg-orange-600 text-white">
                      <CheckIcon width={20} height={20} />
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <div className="flex flex-col">
                    <p className="flex gap-2 text-xl font-bold text-[#4E5D78] sm:text-2xl">
                      <span>{`${
                        profile.error ? 'Saleh Ahmed' : profile.firstName
                      } ${profile.error ? '' : profile.lastName}`}</span>
                      <img src={'/assets/images/check.svg'} alt="" />
                    </p>
                    <span>{profile?.tagline}</span>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2  ${
                    user && user?.profile?.id === profile.id && 'hidden'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setShowMessage(true)}
                    className={`hover: mobMessage inline-flex justify-center rounded-md border border-[#377DFF] bg-white px-6 px-4 py-2 pl-6 text-sm  font-medium text-[#377DFF] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    <span>Message</span>
                  </button>
                  <div className={`flex w-0 flex-1`}>
                    <ConnectModal
                      open={showConnect}
                      profile={profile}
                      handleClose={() => setShowConnect(false)}
                      setIsRequestSent={setIsRequestSent}
                    />
                    <button
                      onClick={() => !isRequestSent && setShowConnect(true)}
                      className="flex items-center justify-center rounded-md  border border-blue-500 bg-blue-500 p-2 py-1 text-white xl:py-2"
                      disabled={isRequestSent}
                    >
                      <LinkIcon className="mr-1 h-5 w-5" aria-hidden="true" />
                      <span className="text-[13px]">
                        {isRequestSent ? 'Request Sent' : 'Connect'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={classNames(
                  user && user?.profile?.id !== profile.id && 'hidden',
                  'mt-5 flex justify-start gap-4 sm:mt-0 sm:justify-center'
                )}
              >
                <img
                  src={'/assets/images/Vector.svg'}
                  className="mt-3 h-4 w-4"
                  alt=""
                />
                <button
                  type="button"
                  onClick={() => {}}
                  className="hover: inline-flex justify-center rounded-md border bg-slate-100 px-4 py-2 text-sm  font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span>Edit basic info</span>
                </button>
              </div>
            </div>
          </div>
          {/* <div className="flex items-center space-x-2 divide-y divide-gray-200 border-t border-b border-gray-200 bg-gray-50 sm:divide-y-0 sm:divide-x">
            <div className="flex flex-grow items-center space-x-2 px-6 py-3 text-sm font-medium text-gray-500">
              <img
                className="h-5"
                src="/assets/images/c-gray.svg"
                alt="CoFoundersLab"
              />
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    `${NEXT_URL}/profile/${profile?.slug}`
                  );
                  toast.success('Copied to clipboard');
                }}
                className="text-gray-600"
              >
                {`${NEXT_URL}/profile/${profile?.slug}`}
              </button>
            </div>
            <div className="flex items-center space-x-6 px-6 py-3 text-sm font-medium text-gray-500">
              {profile?.linkedinUrl && (
                <a
                  href={profile?.linkedinUrl}
                  className="text-gray-400 hover:text-gray-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">
                    {profile?.firstName}&apos;s LinkedIn Profile
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
            </div>
          </div> */}
          <h2 className="sr-only" id="quick-links-title">
            Quick links
          </h2>
          {/* <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-3">
              {profileAttributes?.map((field) => (
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
              ))}
            </dl>
          </div> */}
        </div>
      </section>
      <section aria-labelledby="about-user">
        <div className="overflow-hidden rounded-lg bg-white  py-4 shadow">
          <div className="px-0 pb-0">
            {/* <div className="border-0 border-b-2 border-slate-100 sm:col-span-6"> */}
            <div className="border-0 border-slate-100 sm:col-span-6">
              <dt className="mobHead border-b-2 border-slate-100 px-8 pt-3 text-3xl font-semibold text-[#4E5D78]">
                About
              </dt>
            </div>
            <dl className="justify grid grid-cols-1 gap-x-4 gap-y-8 px-8 pb-4 text-lg text-base text-gray-500 sm:grid-cols-3">
              <div className="sm:col-span-6">
                {/* <dt className="px-4 text-xl font-medium text-gray-900">
                  About
                </dt> */}
                <dd
                  className="mt-1 max-w-full  pb-2 text-sm text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: profile?.summary || `Hi I am ${profile?.firstName}`,
                  }}
                />
              </div>
            </dl>
          </div>
        </div>
      </section>
      {/*  <section aria-labelledby="professional-skills">
        <div className="overflow-hidden rounded-lg bg-white  py-4 shadow">
          <div className="px-0 pb-0">
  
            <div className="border-0 border-slate-100 sm:col-span-6">
              <dt className="mobHead border-b-2 border-slate-100 px-8 pb-2 pt-3 text-3xl font-semibold text-[#4E5D78]">
                Business Info
              </dt>
            </div>
            <div className="px-8 pt-4">
              <div className="border-0pb-4 grid grid-cols-3 text-center text-[#4E5D78] sm:grid-cols-3 sm:text-left">
                <div className="fnsizee text-lg font-semibold">
                  Business Name
                </div>
                <div className="fnsizee text-lg font-semibold">Industry</div>
                <div className="fnsizee text-lg font-semibold">
                  Business Stage
                </div>
              </div>
              <div className="s grid grid-cols-3 pt-4 pb-4  text-center text-[#4E5D78] sm:grid-cols-3 sm:text-left">
                <div className="fnsizee text-lg">BMW Exports</div>
                <div className="fnsizee text-lg">Manufactuer</div>
                <div className="fnsizee text-lg">Startup</div>
              </div>
              <div className="mt-2 grid grid-cols-3 pb-4 text-center text-[#4E5D78] sm:grid-cols-3 sm:text-left">
                <div className="fnsizee text-lg font-semibold">
                  Amount Raised
                </div>
                <div className="fnsizee text-lg font-semibold">Staff</div>
                <div className="fnsizee text-lg font-semibold">
                  Company Location
                </div>
              </div>
              <div className="grid-cols-3pb-4 grid pt-4 pb-4  text-center text-[#4E5D78] sm:grid-cols-3 sm:text-left">
                <div className="fnsizee text-lg">$2 Bilion</div>
                <div className="fnsizee text-lg">500 Employees</div>
                <div className="fnsizee text-lg">California</div>
              </div>
            </div>
          </div>
        </div>
                </section>*/}
      <section
        aria-labelledby="professional-skills"
        className={profile?.skills != undefined ? '' : ''}
      >
        <div className="overflow-hidden rounded-lg bg-white  py-4 shadow">
          <div className="px-0 pb-0">
            <div className="mb-7 border-0 border-b-2 border-slate-100 sm:col-span-6">
              <dt className="mobHead px-8 pb-4 text-3xl font-semibold text-[#4E5D78]">
                Skills
              </dt>
            </div>
            <div className="grid-cols-0 grid  place-items-center gap-4 px-8 md:grid-cols-3 lg:grid-cols-4">
              {profile?.skills?.map((skil: any, index: number) => {
                // {['Engineering', 'Finance']?.map((skill: any, index: number) => {
                return (
                  <div
                    key={skil + '-' + index}
                    className={
                      'skilsss mb-5 flex h-full w-[100%] max-w-[170px] flex-col items-center justify-center rounded-xl border border-slate-200 p-5'
                    }
                  >
                    <div>{SkillImage(skil)}</div>
                    <div className="mt-2 text-center text-sm  font-semibold text-gray-700">
                      {skil}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* <ul className="list-none">
              {profile?.skills?.map((skill: any, index: number) => {
                return (
                  <li
                    key={skill + '-' + index}
                    className={
                      index % 2 === 0
                        ? 'max-w-full bg-white px-4 py-1 text-sm text-gray-700'
                        : 'max-w-full bg-white px-4 py-1 text-sm text-gray-700'
                    }
                  >
                    <CheckIcon className="float-left mr-2 h-5 w-5 text-blue-600" />
                    {skill}
                  </li>
                );
              })}
            </ul> */}
          </div>
        </div>
      </section>
      <section
        aria-labelledby="professional-interests"
        className={profile?.interests != undefined ? '' : ''}
      >
        <div className="overflow-hidden rounded-lg bg-white  py-4 shadow">
          <div className="px-0 pb-0">
            <div className="mb-7 border-0 border-b-2 border-slate-100 sm:col-span-6">
              <dt className="mobHead px-8 pb-4 text-3xl font-semibold text-[#4E5D78]">
                Interests
              </dt>
            </div>
            <div className="grid-cols-0 grid place-items-center  gap-4 px-8 md:grid-cols-3 lg:grid-cols-4">
              {profile?.interests?.map((interest: any, index: number) => {
                // {['Investment', 'Networking', 'Education']?.map(
                //   (interest: any, index: number) => {
                return (
                  <div
                    key={interest + '-' + index}
                    className={
                      'skilsss mb-5 flex h-full w-[100%] max-w-[170px] flex-col items-center justify-center rounded-xl border border-slate-200 p-5'
                    }
                  >
                    <div>{InterestImage(interest)}</div>
                    <div className="mt-2 text-center text-sm font-semibold text-gray-700">
                      {interest}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* <ul className="list-none">
              {profile?.interests?.map((interest: any, index: number) => {
                return (
                  <li
                    key={interest + '-' + index}
                    className={
                      index % 2 === 0
                        ? 'max-w-full bg-white px-4 py-1 text-sm text-gray-700'
                        : 'max-w-full bg-white px-4 py-1 text-sm text-gray-700'
                    }
                  >
                    <CheckIcon className="float-left mr-2 h-5 w-5 text-blue-600" />
                    {interest}
                  </li>
                );
              })}
            </ul> */}
          </div>
        </div>
      </section>

      {/*to be revised <section
        aria-labelledby="professional-skills"
        className={profile?.skills != undefined ? '' : ''}
      >
        <div className="overflow-hidden rounded-lg bg-white py-4 shadow">
          <div className="px-0 pb-0">
            <div className="mb-7 border-0 border-b-2 border-slate-100 sm:col-span-6">
              <dt className="mobHead px-8 pb-4 text-3xl font-semibold text-[#4E5D78]">
                Education
              </dt>
            </div>
            <div className=" px-8 ">
              {showMore
                ? UniversityAttributes.map((field: any) => {
                    return (
                      <div key={field.name} className="educationCard mb-10">
                        <div>
                          <img
                            src={'/assets/images/UniversityDummy.png'}
                            alt="University Image"
                            height={500}
                          />
                        </div>
                        <div className="pl-5">
                          <div className="mb-4 text-sm text-[#4E5D78] sm:text-xl">
                            {field.name}
                          </div>
                          <div className="mb-4 text-sm text-[#4E5D78] sm:text-xl">
                            {field.degree}
                          </div>
                          <div className="text-sm text-blue-600 sm:text-xl">
                            {field.span}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : [UniversityAttributes[0]].map((field) => {
                    return (
                      <div key={field.name} className="educationCard mb-10">
                        <div>
                          <img
                            src={'/assets/images/UniversityDummy.png'}
                            alt="University Image"
                            height={500}
                          />
                        </div>
                        <div className="pl-5">
                          <div className="mb-4 text-sm sm:text-xl">
                            {field.name}
                          </div>
                          <div className="mb-4 text-sm sm:text-xl">
                            {field.degree}
                          </div>
                          <div className="text-sm text-blue-600 sm:text-xl">
                            {field.span}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              <div className="" onClick={() => setShowMore(!showMore)}>
                {!showMore ? (
                  <div className="educationCard cursor-pointer justify-center">
                    See More <SlArrowDown className="ml-2 mt-1" />
                  </div>
                ) : (
                  <div className="educationCard cursor-pointer justify-center">
                    See Less <SlArrowUp className="ml-2 mt-1" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div> */}
      {/* </section> */}
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
