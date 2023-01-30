import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { Fragment } from 'react';

import useUser from '@/hooks/useUser';

import { Header, Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';

import Footer from '../components/layout/Footer2';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
const HomeNav = ({
  connectScroll,
  educateScroll,
  raiseScroll,
  advisorScroll,
}: any) => {
  return (
    <>
      <a
        onClick={connectScroll}
        className="cursor-pointer text-lg font-normal text-white hover:text-gray-600 active:text-gray-700"
      >
        Find a CoFounder
      </a>
      <a
        onClick={educateScroll}
        className="cursor-pointer text-lg font-normal text-white hover:text-gray-600 active:text-gray-700"
      >
        StartUp Accelerator
      </a>
      {/* <a
        href="https://advisors.cofounderslab.com/"
        className="flex cursor-pointer items-center gap-2 text-lg font-normal text-white hover:text-gray-600 active:text-gray-700"
        target="_blank"
        rel="noreferrer"
      >
        Advisors{' '}
        <ExternalLinkIcon
          className="h-4 w-4 text-gray-300"
          aria-hidden="true"
        />
      </a> */}
      <a
        onClick={raiseScroll}
        className="cursor-pointer text-lg font-normal text-white hover:text-gray-600 active:text-gray-700"
      >
        Resources
      </a>
    </>
  );
};

const Home: NextPage = () => {
  const router = useRouter();
  const { user, loggedOut } = useUser();

  useEffect(() => {
    if (user && !loggedOut) {
      if (user.onboarded) {
        router.push('/feed');
      } else {
        router.push('/onboarding');
      }
    }
  }, [user, loggedOut]);

  const connectRef = useRef<HTMLHeadingElement>(null);
  const educateRef = useRef<HTMLHeadingElement>(null);
  const raiseRef = useRef<HTMLHeadingElement>(null);

  const connectScroll = () => {
    if (connectRef && connectRef.current) {
      connectRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const educateScroll = () => {
    router.push('/accelerator');
    // if (educateRef && educateRef.current) {
    //   educateRef.current.scrollIntoView({ behavior: 'smooth' });
    // }
  };
  const advisorScroll = () => {
    router.push('/advisors');
    // if (educateRef && educateRef.current) {
    //   educateRef.current.scrollIntoView({ behavior: 'smooth' });
    // }
  };
  const raiseScroll = () => {
    if (raiseRef && raiseRef.current) {
      raiseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout
      meta={
        <Meta
          title="CoFoundersLab: World's Largest Network of Entrepreneurs"
          description="The leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      sidebar={null}
      header={
        <Header
          sticky={true}
          publicMenu={
            <HomeNav
              connectScroll={connectScroll}
              educateScroll={educateScroll}
              advisorScroll={advisorScroll}
              raiseScroll={raiseScroll}
            />
          }
        />
      }
      footer={<Footer />}
    >
      {/* HERO */}
      <div className="mx-auto px-4 py-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8 lg:py-20">
        <div className="absolute left-[41.5%] top-[-27%] flex h-[850px] w-[850px] rotate-[-45deg] items-end justify-start overflow-hidden rounded-[40px] bg-blue-600">
          <Image
            src="/assets/images/homepage/intersect-45.png"
            alt="CoFoundersLab - THE STARTUP COMMUNITY"
            width={650}
            height={650}
            className="absolute bottom-[-5px] left-0 rotate-[90deg]"
          />
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="mb-8 max-w-xl">
              <span className="font-bold text-blue-300">CoFoundersLab</span>
              <h2 className="mb-6 mt-2 max-w-lg font-sans text-2xl font-medium tracking-tight text-gray-700 sm:text-[38px] sm:leading-none md:leading-normal">
                The STARTUP{' '}
                <span className="inline-block cursor-pointer font-bold">
                  COMM<span className="text-white">UNITY</span>
                </span>
                <span className="inline-block cursor-pointer hover:text-blue-700">
                  Start. Grow. Fund.
                </span>
              </h2>
              <p className="mb-12 max-w-2xl text-base text-gray-600">
                CoFoundersLab is the largest startup community
                <br />
                on the Internet. Accelerate your business today 🚀
              </p>
              <Link
                href="/register"
                className="mt-3 mb-5 inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-gradient-to-r from-[#FA630F] to-orange-500 px-6 py-3 text-lg font-medium text-white shadow-sm transition duration-200 hover:bg-orange-500 active:bg-orange-800"
              >
                Join for free
              </Link>
            </div>
            <div className="grid gap-8 gap-y-8 sm:grid-cols-2">
              <div>
                {/* <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M3.161 4.469a6.5 6.5 0 0 1 8.84-.328 6.5 6.5 0 0 1 9.178 9.154l-7.765 7.79a2 2 0 0 1-2.719.102l-.11-.101-7.764-7.791a6.5 6.5 0 0 1 .34-8.826zm1.414 1.414a4.5 4.5 0 0 0-.146 6.21l.146.154L12 19.672l5.303-5.304-3.535-3.535-1.06 1.06a3 3 0 1 1-4.244-4.242l2.102-2.103a4.501 4.501 0 0 0-5.837.189l-.154.146zm8.486 2.828a1 1 0 0 1 1.414 0l4.242 4.242.708-.706a4.5 4.5 0 0 0-6.211-6.51l-.153.146-3.182 3.182a1 1 0 0 0-.078 1.327l.078.087a1 1 0 0 0 1.327.078l.087-.078 1.768-1.768z"
                      fill="rgba(0,134,255,1)"
                    />
                  </svg>
                </div> */}
                <h6 className="mb-2 font-semibold leading-5 text-blue-600">
                  Find a CoFounder
                </h6>
                <p className="text-base text-gray-700">
                  Find your perfect partner based on interests, skills and
                  location.
                </p>
              </div>
              <div>
                {/* <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path
                      d="M5 3v16h16v2H3V3h2zm15.293 3.293l1.414 1.414L16 13.414l-3-2.999-4.293 4.292-1.414-1.414L13 7.586l3 2.999 4.293-4.292z"
                      fill="rgba(0,134,255,1)"
                    />
                  </svg>
                </div> */}
                <h6 className="mb-2 font-semibold leading-5 text-blue-600">
                  Get Funded
                </h6>
                <p className="text-base text-gray-700">
                  Learn how to pitch and find investors to fund your Startup.
                </p>
              </div>
            </div>
          </div>
          {/* <div className="flex items-center justify-center lg:pl-">
            <Image
              src="/assets/images/homepage/undraw_project_team_lc5a.svg"
              alt="CoFoundersLab - THE STARTUP COMMUNITY"
              width={550}
              height={300}
            />
          </div> */}
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8 lg:py-20">
          <div className="grid gap-8 gap-y-10 lg:grid-cols-2">
            <div className="flex items-center">
              <Image
                src="/assets/images/homepage/laptop.png"
                alt="Turbocharge Your Startup Growth"
                width={500}
                height={350}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="max-w-xl">
                <div className="max-w-xl md:mx-auto lg:max-w-2xl">
                  <div>
                    <p className="mb-3 inline-block rounded-full py-px text-sm font-semibold uppercase tracking-wider text-orange-300">
                      BENEFITS
                    </p>
                  </div>
                  <h2 className="mb-6 max-w-xl font-sans text-2xl font-medium leading-none tracking-tight text-gray-700 sm:text-4xl md:mx-auto">
                    Why Choose CoFoundersLab
                  </h2>
                </div>
              </div>
              <div className="max-w-xl">
                <div className="flex space-x-10">
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <div>
                        <Image
                          src="/assets/images/homepage/gis_flag-start.svg"
                          alt="flag"
                          width={20}
                          height={35}
                        />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-700">
                        START
                      </h2>
                    </div>
                    <div className="max-w-xl text-sm">
                      Got an Idea? We’ll help you
                      <br />
                      turn it into a business
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div>
                        <Image
                          src="/assets/images/homepage/majesticons_rocket-3-start.png"
                          alt="flag"
                          width={25}
                          height={25}
                        />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-700">GROW</h2>
                    </div>
                    <div className="max-w-xl text-sm">
                      Together we’ll grow your
                      <br />
                      startup to a robust business!
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex">
                  <h2 className="text-3xl font-bold text-orange-600">
                    Fund Your Business
                  </h2>
                  <div>
                    <Image
                      src="/assets/images/homepage/Vector.png"
                      alt="business"
                      height={18}
                      width={25}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto px-4 py-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8 lg:py-16">
          <div className="grid gap-8 gap-y-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="max-w-xl">
                <div className="max-w-xl md:mx-auto lg:max-w-2xl">
                  <div>
                    <p className="mb-3 inline-block rounded-full py-px text-sm font-semibold uppercase tracking-wider text-blue-300">
                      ABOUT
                    </p>
                  </div>
                  <h2 className="mb-6 max-w-xl font-sans text-2xl font-medium leading-none tracking-tight text-gray-700 sm:text-4xl md:mx-auto">
                    CoFoundersLab Launch
                  </h2>
                </div>
              </div>
              <div className="max-w-xl">
                <div className="flex space-x-10">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                      <div>
                        <Image
                          src="/assets/images/homepage/material-symbols_check-small.png"
                          alt="flag"
                          width={30}
                          height={30}
                        />
                      </div>
                      <p className="text-sm text-gray-700">
                        Launch provides your dedicated growth partner for your
                        Startup!
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div>
                        <Image
                          src="/assets/images/homepage/material-symbols_check-small.png"
                          alt="flag"
                          width={30}
                          height={30}
                        />
                      </div>
                      <p className="text-sm text-gray-700">
                        Stay Accountable with an exclusive Community of StartUps
                        to help you grow!
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div>
                        <Image
                          src="/assets/images/homepage/material-symbols_check-small.png"
                          alt="flag"
                          width={30}
                          height={30}
                        />
                      </div>
                      <p className="text-sm text-gray-700">
                        Weekly Live Masterclasses with Industry Experts,
                        Marketers & Investors
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 mb-10 flex space-x-10">
                  <div className="flex space-x-5">
                    <div>
                      <Image
                        src="/assets/images/homepage/ant-design_like-filled.png"
                        alt="flag"
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-orange-600">
                        650,000+
                      </span>
                      <span className="text-xs">Users Worldwide</span>
                    </div>
                  </div>
                  <div className="flex space-x-5">
                    <div>
                      <Image
                        src="/assets/images/homepage/ant-design_like-filled.png"
                        alt="flag"
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-orange-600">
                        79
                      </span>
                      <span className="text-xs">
                        Expert Mentors on Platform
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/register"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-gradient-to-r from-[#FA630F] to-orange-500 px-6 py-3 text-lg font-medium text-white shadow-sm transition duration-200 hover:bg-orange-500 active:bg-orange-800"
                >
                  Sign up for free
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/homepage/2207_w046_n005_193b_p1_193_1.png"
                alt="About"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="bg-white py-5 px-4">
        <div className="mx-auto px-4 pb-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8">
          <div className="mb-5 font-bold text-blue-300">Our Partners</div>
          <div className="flex flex-col items-center justify-evenly space-y-5 md:flex-row md:space-y-0 md:space-x-10">
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/partner-logos/Funden-logo.png"
                alt="business"
                height={15}
                width={60}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/partner-logos/customerly-logo.svg"
                alt="business"
                height={30}
                width={100}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/partner-logos/undock-logo-deep-purple.png"
                alt="business"
                height={13}
                width={100}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/partner-logos/slidebean-new-logo.png"
                alt="business"
                height={30}
                width={100}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/partner-logos/Hubspot-logo.gif"
                alt="business"
                height={40}
                width={100}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/partner-logos/audvisor.png"
                alt="business"
                height={35}
                width={100}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/partner-logos/soona-logo.png"
                alt="business"
                height={15}
                width={80}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8 lg:py-20">
          <div className="grid gap-8 gap-y-10 lg:grid-cols-2">
            <div className="flex h-[400px] w-[400px] rotate-45 items-center overflow-hidden rounded-2xl bg-orange-600">
              <div className="absolute left-[-20%] bottom-[0%] h-[500px] w-[500px]">
                <Image
                  src="/assets/images/homepage/connect-girl-tilt.png"
                  alt="Turbocharge Your Startup Growth"
                  width={900}
                  height={900}
                />
              </div>
            </div>
            <div className="flex flex-col justify-start">
              <div className="max-w-xl">
                <div className="max-w-xl md:mx-auto lg:max-w-2xl">
                  <div>
                    <p className="mb-3 inline-block rounded-full py-px text-sm font-semibold uppercase tracking-wider text-blue-300">
                      CONNECT
                    </p>
                  </div>
                  <h2 className="mb-6 max-w-xl font-sans text-2xl font-medium leading-none tracking-tight text-gray-700 sm:text-4xl md:mx-auto">
                    Find Your CoFounder
                  </h2>
                  <p className="text-sm">
                    From advisors, investors, mentors & entrepreneurs,
                    CoFoundersLab
                    <br />
                    provides you with all the means necessary to find the
                    perfect fit for your startup.
                  </p>
                </div>
              </div>
              <div className="mt-5 max-w-xl">
                <div className="flex space-x-10">
                  <div className="flex flex-col">
                    <div className="mb-3 flex space-x-5">
                      <div>
                        <Image
                          src="/assets/images/homepage/Search.png"
                          alt="flag"
                          width={25}
                          height={25}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="mb-2 text-sm font-bold text-gray-700">
                          CoFounder Smart-Search
                        </h2>
                        <p className="max-w-sm text-sm">
                          Use our specialised search algorithm to help find the
                          perfect CoFounder to grow your business to success.
                        </p>
                      </div>
                    </div>
                    <div className="mb-3 flex space-x-5">
                      <div>
                        <Image
                          src="/assets/images/homepage/Icon.png"
                          alt="flag"
                          width={25}
                          height={25}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="mb-2 text-sm font-bold text-gray-700">
                          All that you could need
                        </h2>
                        <p className="max-w-sm text-sm">
                          From mentors, investors, entrepreneurs, locations and
                          skillsets. Find the perfect team member, CoFounder, or
                          investor that fit your startup needs.
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-5">
                      <div>
                        <Image
                          src="/assets/images/homepage/Heart.png"
                          alt="flag"
                          width={25}
                          height={25}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="mb-2 text-sm font-bold text-gray-700">
                          Build your network
                        </h2>
                        <p className="max-w-sm text-sm">
                          Open opportunities by networking through our
                          discussion board, exclusive weekly events, or simply
                          connect with other entrepreneurs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/register"
                  className="ml-10 mt-10 inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-gradient-to-r from-[#FA630F] to-orange-500 px-6 py-3 text-lg font-medium text-white shadow-sm transition duration-200 hover:bg-orange-500 active:bg-orange-800"
                >
                  Join for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8 lg:py-20">
          <div className="flex flex-col justify-start">
            <div className="mb-10 max-w-xl text-center md:mx-auto lg:max-w-2xl">
              <div>
                <p className="mb-3 inline-block rounded-full py-px text-sm font-semibold uppercase tracking-wider text-blue-300">
                  Testimonials
                </p>
              </div>
              <h2 className="mb-6 max-w-xl font-sans text-2xl font-medium leading-none tracking-tight text-gray-700 sm:text-4xl md:mx-auto">
                Hear From Our StartUps
              </h2>
            </div>
            <div className="grid grid-cols-2 space-x-10">
              <div className="rounded-3xl border px-10 py-10 shadow-xl">
                <h2 className="mb-3 text-2xl font-bold text-gray-700">
                  {'"Found a Community of Passionate Founders"'}
                </h2>
                <Image
                  src="/assets/images/homepage/5star.png"
                  alt=""
                  height={18}
                  width={100}
                />
                <p className="mt-3">
                  In CoFoundersLab I have found a community of passionate
                  founders and advisors who help each other by sharing their
                  experiences with direct feedback that allows a founder to grow
                  and develop their company to its potential. Its been my
                  favorite group to network with like-minded professionals.
                </p>

                <div className="mt-10 flex items-center space-x-5">
                  <div>
                    <Image
                      src="/assets/images/homepage/heather-dawson.jpg"
                      alt=""
                      height={50}
                      width={50}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs text-gray-800">Heather Dawson</p>
                    <p className="text-xs text-gray-500">CEO, Xiggit</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border px-10 py-10 shadow-xl">
                <h2 className="mb-3 text-2xl font-bold text-gray-700">
                  {'"Take Our Idea And Turn It into A Solid Business"'}
                </h2>
                <Image
                  src="/assets/images/homepage/5star.png"
                  alt=""
                  height={25}
                  width={100}
                />
                <p className="mt-3">
                  By helping us find the right team member, CoFoundersLab really
                  did help us take our company idea and turn it into a solid
                  business that has the potential to change the world!
                </p>

                <div className="mt-10 flex items-center space-x-5">
                  <div>
                    <Image
                      src="/assets/images/homepage/drew-taylor.png"
                      alt=""
                      height={50}
                      width={50}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs text-gray-800">Drew Taylor</p>
                    <p className="text-xs text-gray-500">
                      CoFounder of AstroPrint
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="mx-auto px-4 pt-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8 lg:pt-20">
          <div className="rounded-xl border-0 bg-blue-600 px-10 py-12">
            <div className="relative flex">
              <div className="absolute top-[-85px]">
                <Image
                  src="/assets/images/homepage/2207_w046_n005_234b_p1_234_2.png"
                  alt=""
                  width={205}
                  height={205}
                />
              </div>
              <div className="flex flex-grow justify-between">
                <div className="ml-[300px] max-w-[280px] text-2xl font-bold text-white">
                  Join Newsletter to keep up to date
                </div>
                <div className="flex bg-white p-2">
                  <input
                    type="text"
                    className="border-0 text-sm"
                    placeholder="Your Email Address"
                  />
                  <button className="bg-blue-600 px-10 text-sm font-bold text-white">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FIND COFOUNDER */}
      {/* <div
        ref={connectRef}
        id="find-a-cofounder"
        className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8 lg:py-20"
      >
        <div className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl">
          <div>
            <p className="mb-6 inline-block rounded-full bg-blue-600 px-3 py-px text-sm font-semibold uppercase tracking-wider text-white">
              Connect
            </p>
          </div>
          <h2 className="mb-6 max-w-xl font-sans text-3xl font-bold leading-none tracking-tight text-gray-700 sm:text-4xl md:mx-auto">
            Find Your CoFounder
          </h2>
          <p className="md:text-md text-base text-gray-700">
            From advisors, investors, mentors &amp; entrepreneurs, CoFoundersLab
            provides you with all the means necessary to find the perfect fit
            for your startup.
          </p>
        </div>
        <div className="grid gap-8 sm:mx-auto lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="flex">
              <div className="mr-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9.446 9.032l1.504 1.504-1.414 1.414-1.504-1.504a4 4 0 1 1 1.414-1.414zM18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                      fill="rgba(0,134,255,1)"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h6 className="mb-2 font-semibold leading-5">
                  CoFounder Smart-Search
                </h6>
                <p className="text-sm text-gray-700">
                  Use our specialised search algorithm to help find the perfect
                  CoFounder to grow your business to success.
                </p>
                <hr className="my-6 w-full border-gray-300" />
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M20.083 15.2l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zm0-4.7l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm-7.569-9.191l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0zM12 3.332L5.887 7 12 10.668 18.113 7 12 3.332z"
                      fill="rgba(0,134,255,1)"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h6 className="mb-2 font-semibold leading-5">
                  All that you could need
                </h6>
                <p className="text-sm text-gray-700">
                  From mentors, investors, entrepreneurs, locations and
                  skillsets. Find the perfect team member, CoFounder, or
                  investor that fit your startup needs.
                </p>
                <hr className="my-6 w-full border-gray-300" />
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0L24 0 24 24 0 24z" />
                    <path
                      d="M16 16c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zM6 12c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm10 6c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zM6 14c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm8.5-12C17.538 2 20 4.462 20 7.5S17.538 13 14.5 13 9 10.538 9 7.5 11.462 2 14.5 2zm0 2C12.567 4 11 5.567 11 7.5s1.567 3.5 3.5 3.5S18 9.433 18 7.5 16.433 4 14.5 4z"
                      fill="rgba(0,134,255,1)"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h6 className="mb-2 font-semibold leading-5">
                  Build your network
                </h6>
                <p className="text-sm text-gray-700">
                  Open opportunities by networking through our discussion board,
                  exclusive weekly events, or simply connect with other
                  entrepreneurs.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center">
              <Link
                href="/register"
                className="mr-6 inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-base font-medium text-white transition duration-200 hover:bg-orange-500 active:bg-orange-800"
              >
                Join for free
              </Link>
            </div>
          </div>
          <div className="grid">
            <Image
              src="/assets/images/homepage/undraw_team_page_re_cffb.svg"
              alt="Find Your CoFounder"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div> */}

      {/* ACCELERATOR */}
      {/* <div ref={educateRef} id="accelerator" className="bg-cyan-100">
        <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8 lg:py-20">
          <div className="grid gap-8 gap-y-10 lg:grid-cols-2">
            <div className="flex items-center">
              <Image
                src="/assets/images/homepage/undraw_growth_analytics_re_pyxf.svg"
                alt="Turbocharge Your Startup Growth"
                width={500}
                height={300}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="max-w-xl">
                <div className="max-w-xl md:mx-auto lg:max-w-2xl">
                  <div>
                    <p className="mb-6 inline-block rounded-full bg-blue-600 px-3 py-px text-sm font-semibold uppercase tracking-wider text-white">
                      Startup Accelerator
                    </p>
                  </div>
                  <h2 className="mb-6 max-w-xl font-sans text-3xl font-bold leading-none tracking-tight text-gray-700 sm:text-4xl md:mx-auto">
                    Turbocharge Your Startup Growth
                  </h2>
                </div>
                <p className="mt-11 mb-8 text-base text-gray-700 md:text-lg">
                  A curated 20 week program to accelerate your business.
                </p>
              </div>
              <div className="max-w-xl">
                <div className="grid space-y-3 sm:grid-cols-2 sm:gap-2 sm:space-y-0">
                  <ul className="space-y-6">
                    <li className="flex">
                      <span className="mr-1">
                        <svg
                          className="mt-px h-7 w-7 text-blue-600"
                          stroke="currentColor"
                          viewBox="0 0 52 52"
                        >
                          <polygon
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                          />
                        </svg>
                      </span>
                      A dedicated program of content, resources and materials to
                      take your business to the next level
                    </li>
                    <li className="flex">
                      <span className="mr-1">
                        <svg
                          className="mt-px h-7 w-7 text-blue-600"
                          stroke="currentColor"
                          viewBox="0 0 52 52"
                        >
                          <polygon
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                          />
                        </svg>
                      </span>
                      Exclusive groups to keep the founder focused with group
                      accountability
                    </li>
                  </ul>
                  <ul className="space-y-6">
                    <li className="flex">
                      <span className="mr-1">
                        <svg
                          className="mt-px h-7 w-7 text-blue-600"
                          stroke="currentColor"
                          viewBox="0 0 52 52"
                        >
                          <polygon
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                          />
                        </svg>
                      </span>
                      Direct personalized mentoring to cater to your specific
                      needs
                    </li>
                    <li className="flex">
                      <span className="mr-1">
                        <svg
                          className="mt-px h-7 w-7 text-blue-600"
                          stroke="currentColor"
                          viewBox="0 0 52 52"
                        >
                          <polygon
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                          />
                        </svg>
                      </span>
                      Helping you build you perfect pitch deck to raise capital
                      to grow your business
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <Link
                    href="/register"
                    className="mt-8 mr-6 inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-base font-medium text-white transition duration-200 hover:bg-orange-500 active:bg-orange-800"
                  >
                    Accelerate your Startup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* ADVISORS */}
      {/* <div className="lg:py-18 mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8">
        <div className="grid gap-6 gap-y-10 lg:grid-cols-2">
          <div className="mx-auto mb-10 max-w-xl sm:pr-16">
            <div className="mt-3 max-w-xl md:mx-auto lg:max-w-2xl">
              <div>
                <p className="mb-6 inline-block rounded-full bg-blue-600 px-3 py-px text-sm font-semibold uppercase tracking-wider text-white">
                  Advisor network
                </p>
              </div>
              <h2 className="mb-6 max-w-xl font-sans text-3xl font-bold leading-none tracking-tight text-gray-700 sm:text-4xl md:mx-auto">
                Find Your Advisors
              </h2>
            </div>
            <p className="mt-8 mb-8 text-base text-gray-700 md:text-lg">
              A highly curated group of amazing advisors and business titans
              touching all areas of business.
            </p>
            <div className="flex items-center justify-center">
              <Link
                href="/register"
                className="mr-6 inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-base font-medium text-white transition duration-200 hover:bg-orange-500 active:bg-orange-800"
              >
                Join for free
              </Link>
            </div>
          </div>
          <div className="grid space-y-3 sm:grid-cols-2 sm:gap-2 sm:space-y-0 md:mt-12">
            <ul className="space-y-3">
              <li className="flex text-base text-gray-700 md:text-lg">
                <span className="mr-1">
                  <svg
                    className="mt-px h-7 w-7 text-blue-600"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </span>
                Connect directly with vetted business advisors and mentors
                covering all industries
              </li>
              <li className="flex pt-10 text-base text-gray-700 md:text-lg">
                <span className="mr-1">
                  <svg
                    className="mt-px h-7 w-7 text-blue-600"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </span>
                Expand your network and opportunities with advisors, mentors and
                associates
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex text-base text-gray-700 md:text-lg">
                <span className="mr-1">
                  <svg
                    className="mt-px h-7 w-7 text-blue-600"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </span>
                Prepare, maintain and perfect your business strategy for
                best-in-class results
              </li>
              <li className="flex pt-10 text-base text-gray-700 md:text-lg">
                <span className="mr-1">
                  <svg
                    className="mt-px h-7 w-7 text-blue-600"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </span>
                Gain instant access to years of knowledge from industry
                practitioners
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* RESOURCES */}
      {/* <div ref={raiseRef} id="resources" className="bg-cyan-100">
        <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8 lg:py-20">
          <div className="grid gap-8 gap-y-10 lg:grid-cols-2">
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/homepage/undraw_operating_system_re_iqsc.svg"
                alt="All the Tools for Success"
                width={500}
                height={300}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="max-w-xl">
                <div className="max-w-xl md:mx-auto lg:max-w-2xl">
                  <div>
                    <p className="mb-6 inline-block rounded-full bg-blue-600 px-3 py-px text-sm font-semibold uppercase tracking-wider text-white">
                      Resources
                    </p>
                  </div>
                  <h2 className="mb-6 max-w-xl font-sans text-3xl font-bold leading-none tracking-tight text-gray-700 sm:text-4xl md:mx-auto">
                    All the Tools for Success
                  </h2>
                </div>
                <p className="mt-8 mb-8 text-base text-gray-700 md:text-lg">
                  Hours of downloadable materials, workbooks, and resources to
                  arm you with everything you need start, grow and fund your
                  business.
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/register"
                    className="mr-6 inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-base font-medium text-white transition duration-200 hover:bg-orange-500 active:bg-orange-800"
                  >
                    Join for free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* TESTIMONIAL */}
      {/* <div className="lg:py-22 overflow-hidden bg-white py-16">
        <div className="max-w-8xl relative mx-auto px-4 sm:px-6 lg:px-8">
          <svg
            className="absolute top-full right-full translate-x-1/3 -translate-y-1/4 transform lg:translate-x-1/2 xl:-translate-y-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            role="img"
            aria-labelledby="svg-workcation"
          >
            <title id="svg-workcation">Workcation</title>
            <defs>
              <pattern
                id="ad119f34-7694-4c31-947f-5c9d249b21f3"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-blue-100"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"
            />
          </svg>

          <div className="relative">
            <blockquote className="mt-10">
              <div className="mx-auto max-w-3xl text-center text-2xl font-medium leading-9 text-gray-700">
                <p>
                  &ldquo;In CoFoundersLab I have found a community of passionate
                  founders and advisors who help each other by sharing their
                  experiences with direct feedback that allows a founder to grow
                  and develop their company to its potential. Its been my
                  favorite group to network with like-minded
                  professionals.&rdquo;
                </p>
              </div>
              <footer className="mt-8">
                <div className="md:flex md:items-center md:justify-center">
                  <div className="md:flex-shrink-0">
                    <div className="inline-flex flex-shrink-0 rounded-full border-2 border-white shadow-md">
                      <img
                        className="mx-auto h-20 w-20 rounded-full"
                        src="/assets/images/homepage/heather-dawson.jpg"
                        alt="Heather Dawson / CEO of Xiggit"
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                    <div className="text-base font-semibold text-gray-700">
                      Heather Dawson
                    </div>

                    <svg
                      className="mx-1 hidden h-5 w-5 text-blue-100 md:block"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11 0h3L9 20H6l5-20z" />
                    </svg>

                    <div className="text-base font-medium text-gray-500">
                      CEO, Xiggit
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div> */}

      {/* BOTTOM CTA */}
      {/* <div className="bg-blue-600">
        <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-12 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-700 sm:text-3xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-white">
              Join The Internet&apos;s Largest Startup Community
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-base font-medium text-white transition duration-200 hover:bg-orange-500 active:bg-orange-800"
              >
                Join for free now
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default Home;
