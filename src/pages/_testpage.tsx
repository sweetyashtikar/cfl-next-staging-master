import Link from 'next/link';
import React from 'react';
import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';

import { Layout } from '@/components/layout';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};
const TestPage = () => {
  return (
    <Layout sidebar={null}>
      <div className="bg-white">
        <div className="  mx-auto px-4 pb-10 pt-20 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8 ">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="mb-8 max-w-xl">
                <h2 className="mb-6 max-w-lg font-sans text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:leading-tight">
                  The STARTUP{' '}
                  <span className="inline-block cursor-pointer text-blue-600 hover:text-blue-700">
                    COMMUNITY
                  </span>
                  <span className="inline-block cursor-pointer text-gray-500 hover:text-blue-700">
                    Start. Grow. Fund.
                  </span>
                </h2>
                <p className="text-base text-gray-600">
                  CoFoundersLab is the largest startup community on the
                  Internet. Join now to find your CoFounder and accelerate your
                  business today 🚀
                </p>
                <Link href="/register">
                  <a className="mt-6 inline-flex items-center justify-center whitespace-nowrap  bg-gradient-to-r from-[#FAA00F] to-[#FA640F] px-6 py-3 text-lg font-medium text-white shadow-sm transition duration-200 hover:bg-orange-500 active:bg-orange-800">
                    Join for free
                  </a>
                </Link>
              </div>
              <div className="grid gap-8 gap-y-8 sm:grid-cols-2">
                <div className="mt-5 flex items-start">
                  <div className=" flex  w-14 items-center justify-center rounded-full">
                    <div className=" flex min-h-[45px] min-w-[45px] items-center justify-center bg-[#046FCE] p-1">
                      <img
                        src="/assets/images/test/solid-find.svg"
                        alt="solid"
                      />
                    </div>
                  </div>
                  <div className="pl-4">
                    <h6 className="mb-2 font-bold leading-5 text-[#046FCE]">
                      Find a CoFounder
                    </h6>
                    <p className="text-sm text-gray-900">
                      Find your perfect partner based on interests, skills and
                      location.
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-start">
                  <div className=" flex  w-14 items-center justify-center rounded-full">
                    <div className="flex min-h-[45px] min-w-[45px] items-center justify-center bg-[#046FCE] p-1">
                      <img src="/assets/images/test/funded.svg" alt="solid" />
                    </div>
                  </div>
                  <div className="pl-4">
                    <h6 className="mb-2 font-bold leading-5 text-[#046FCE]">
                      Get Funded
                    </h6>
                    <p className="text-sm text-gray-900">
                      Learn how to pitch and find investors to fund your
                      Startup.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mx-4 mt-[-90px]  pt-24 lg:pl-8 lg:pt-0">
              <img
                src="/assets/images/homepage/force.png"
                alt="CoFoundersLab - THE STARTUP COMMUNITY"
                width={550}
                height={300}
              />
              <div className="rounded-md border-b-4 border-primaryBlue"></div>
            </div>
          </div>
        </div>

        {/* PARTNERS */}
        <div className="bg-[#F5FAFF] py-5 px-4">
          <div className="mx-auto sm:px-6 md:max-w-full  lg:max-w-7xl ">
            <p className="ml-16 pt-2 pb-4 text-[32px] font-semibold text-[#7AB3E6]">
              Our Partner
            </p>
            <div className=" lg:grid lg:grid-cols-7 lg:gap-4">
              <div className="mb-5 bg-white px-[24px] py-[8px]">
                <img
                  className=""
                  src="/assets/images/test/funden.svg"
                  alt="Undock"
                />
              </div>
              <div className="mb-5 bg-white px-[24px] py-[8px]">
                <img
                  className=""
                  src="/assets/images/test/customerly.svg"
                  alt="Undock"
                />
              </div>
              <div className="mb-5 bg-white px-[24px] py-[8px]">
                <img
                  className=""
                  src="/assets/images/test/advisor.svg"
                  alt="Undock"
                />
              </div>
              <div className="mb-5 bg-white px-[24px] py-[8px]">
                <img
                  className="pt-2"
                  src="/assets/images/test/sona.svg"
                  alt="Undock"
                />
              </div>
              <div className="mb-5 bg-white px-[24px] py-[8px]">
                <img
                  className=""
                  src="/assets/images/test/hubshot.svg"
                  alt="Undock"
                />
              </div>
              <div className="mb-5 bg-white px-[24px] py-[8px]">
                <img
                  className=""
                  src="/assets/images/test/undock.svg"
                  alt="Undock"
                />
              </div>
              <div className="mb-5 bg-white px-[24px] py-[8px]">
                <img
                  className="mt-2"
                  src="/assets/images/test/slidebean.svg"
                  alt="Undock"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex w-full flex-col md:max-w-full lg:max-w-7xl lg:flex-row">
          <div className="w-full  p-10 lg:w-[50%]">
            <button className="bg-[#0C8CFF] py-2 px-[27px] text-[20px] font-bold text-white">
              Connect
            </button>
            <div className="py-[30px]">
              <div className="mb-4 text-[48px] font-bold text-black">
                Find Your CoFounder
              </div>
              <p className=" text-lg ">
                From advisors, investors, mentors & entrepreneurs, CoFoundersLab
                provides you with all the means necessary to find the perfect
                fit for your startup.
              </p>
            </div>
            <div className="flex items-start ">
              <div className="pr-[30px]">
                <img
                  className="min-w-[27px] "
                  src="/assets/images/test/Search.svg"
                  alt="search"
                />
              </div>
              <div>
                <div className="text-[18px] font-bold text-lightBlack">
                  CoFounder Smart-Search
                </div>
                <div className="pt-2 text-[18px]">
                  Use our specialised search algorithm to help find the perfect
                  CoFounder to grow your business to success.
                </div>
              </div>
            </div>
            <div className="flex items-start pt-[25px]">
              <div className="pr-[30px]">
                <img
                  className="min-w-[27px] "
                  src="/assets/images/test/stack.svg"
                  alt="search"
                />
              </div>
              <div>
                <div className="text-[18px] font-bold text-lightBlack">
                  CoFounder Smart-Search
                </div>
                <div className="pt-2 text-[18px]">
                  Use our specialised search algorithm to help find the perfect
                  CoFounder to grow your business to success.
                </div>
              </div>
            </div>
            <div className="flex items-start pt-[25px]">
              <div className="pr-[30px]">
                <img
                  className="min-w-[27px] "
                  src="/assets/images/test/Heart.svg"
                  alt="search"
                />
              </div>
              <div>
                <div className="text-[18px] font-bold text-lightBlack">
                  CoFounder Smart-Search
                </div>
                <div className="pt-2 text-[18px]">
                  Use our specialised search algorithm to help find the perfect
                  CoFounder to grow your business to success.
                </div>
              </div>
            </div>
            <div className="pl-[56px]">
              <Link href="/register">
                <a className="mt-6 inline-flex items-center justify-center whitespace-nowrap  bg-gradient-to-r from-[#FAA00F] to-[#FA640F] px-6 py-3 text-lg font-medium text-white shadow-sm transition duration-200 hover:bg-orange-500 active:bg-orange-800">
                  Join for free
                </a>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-[50%]">
            <img
              src="/assets/images/test/girl.png"
              alt="CoFoundersLab - THE STARTUP COMMUNITY"
              // width={550}
              className="h-full w-full"
              // height={300}
            />
          </div>
        </div>
        {/* FIND COFOUNDER */}
        <div className="mx-auto mt-16 flex w-full flex-col md:max-w-full lg:max-w-7xl lg:flex-row">
          <div className="w-full bg-[#0588FF] p-10 lg:w-[50%]">
            <div className="border-b-2 border-b-white">
              <p className="mb-4 text-[32px] text-white">Lorem ipsum dolor</p>
              <p className="mb-4 text-xl text-white">
                Nunc justo duis lacinia tristique et. A ultricies ut vestibulum
                fusce imperdiet tincidunt nunc. Habitasse sagittis sed nibh
                vitae.
              </p>
            </div>
            <div className="mt-5">
              <ul className="flex w-full list-disc flex-col flex-wrap lg:flex-row lg:flex-nowrap lg:justify-evenly">
                <li className="text-white lg:w-52">
                  {' '}
                  Magna sem scelerisque non iaculis turpis mi ornare.
                </li>
                <li className="text-white lg:w-44">
                  Egestas diam rhoncus quam a est.{' '}
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-[50%]">
            <img
              src="/assets/images/test/banner.png"
              alt="CoFoundersLab - THE STARTUP COMMUNITY"
              // width={550}
              className="h-full w-full"
              // height={300}
            />
          </div>
        </div>
        <div className="mx-auto pt-[56px] md:max-w-full lg:max-w-7xl">
          <div className="pb-5 text-center text-[40px] px-4 font-bold text-lightBlack">
            Benefits of joining
          </div>
          <div className="grid grid-cols-1 gap-[5rem] lg:grid-cols-3">
            <div className="flex min-h-[202px] flex-col bg-[#0588FF] px-5   text-center  uppercase text-white">
              <div className="">
                <div>
                  <div className="pt-2 text-[55px] font-bold">Start</div>
                  <p className=" text-[20px]">
                    Magna sem scelerisque non iaculis t
                  </p>
                </div>
              </div>
              <div className="mt-[auto] w-max bg-white px-6 text-[32px] font-bold text-[#0588FF]">
                1
              </div>
            </div>
            <div className="flex min-h-[202px] flex-col bg-[#0588FF] px-5   text-center  uppercase text-white">
              <div className="">
                <div>
                  <div className="pt-2 text-[55px] font-bold">GROW</div>
                  <p className=" text-[20px]">
                    Magna sem scelerisque non iaculis t
                  </p>
                </div>
              </div>
              <div className="mt-[auto] w-max bg-white px-6 text-[32px] font-bold text-[#0588FF]">
                2
              </div>
            </div>
            <div className="flex min-h-[202px] flex-col bg-gradient-to-r from-[#FA710F] to-[#FA990F] px-5   text-center  uppercase text-white">
              <div className=" flex h-[80%] items-center justify-center">
                <div>
                  <div className="text-[40px] font-bold">
                    Fund Your business
                  </div>
                </div>
              </div>
              <div className="mt-[auto] w-max bg-white px-6 text-[32px] font-bold text-[#FA790F]">
                3
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial mx-auto pt-[40px] md:max-w-full lg:max-w-7xl">
          <div className="py-[40px] text-center text-[40px] font-bold text-lightBlack">
            Testimonial
          </div>
          <Carousel showDots={true} responsive={responsive}>
            <div className="relative z-[1] p-[32px]">
              <div className="flex max-w-[841px] items-start">
                <img
                  src="/assets/images/test/avatar.png"
                  className="min-h-[84px] min-w-[84px]"
                />
                <div className="pl-4">
                  <div className="text-[36px] font-[500] text-lightBlack">
                    Meis Amor
                  </div>
                  <div className="text-[24px]">
                    Director,{' '}
                    <span className="text-primaryBlue">ONP company</span>
                  </div>
                  <div className="py-[24px]">
                    Nisi scelerisque eu ultrices vitae auctor eu. Ultrices
                    tincidunt arcu non sodales neque sodales ut. Pulvinar etiam
                    non quam lacus suspendisse. Tellus integer feugiat
                    scelerisque varius.
                  </div>
                </div>
              </div>
              <img
                className="absolute  top-[0px] right-[25px]  z-[2]"
                src="/assets/images/test/comma.svg"
              />
              <img
                className="absolute  bottom-[0px] left-[25px]  z-[2]"
                src="/assets/images/test/comma-close.svg"
              />
            </div>
            <div className="relative z-[1] p-[32px]">
              <div className="flex items-start">
                <img
                  src="/assets/images/test/avatar.png"
                  className="min-h-[84px] min-w-[84px]"
                />
                <div className="pl-4">
                  <div className="text-[36px] font-[500]">Meis Amor</div>
                  <div className="text-[24px]">
                    Director,{' '}
                    <span className="text-primaryBlue">ONP company</span>
                  </div>
                  <div className="py-[24px]">
                    Nisi scelerisque eu ultrices vitae auctor eu. Ultrices
                    tincidunt arcu non sodales neque sodales ut. Pulvinar etiam
                    non quam lacus suspendisse. Tellus integer feugiat
                    scelerisque varius.
                  </div>
                </div>
              </div>
              <img
                className="absolute  top-[0px] right-[25px]  z-[2]"
                src="/assets/images/test/comma.svg"
              />
              <img
                className="absolute  bottom-[0px] left-[25px]  z-[2]"
                src="/assets/images/test/comma-close.svg"
              />
            </div>
          </Carousel>
        </div>
        <div className="py-[50px]">
          <div className="flex flex-col bg-primaryBlue py-14 text-white lg:relative  lg:flex-row">
            <div className="mx-auto md:max-w-full lg:max-w-7xl z-10">
              <div className="grid grid-cols-1  gap-[5rem] px-4 lg:grid-cols-3">
                <div className="col-span-full lg:col-span-2">
                  <div className="grid grid-cols-1  lg:grid-cols-2">
                    <li>Find Your PERFECT Cofounder</li>
                    <li>Downloadable resources</li>
                    <li>Perfect Your Pitch for Investors</li>
                    <li>Accelerate your business with dedicated programs</li>
                  </div>
                </div>

                <div className='col-span-full lg:col-span-1'>
                  <div className="mx-auto flex h-[50px] w-[150px] items-center justify-center bg-white text-[20px] font-bold text-black lg:mx-0">
                    Start
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto hidden md:block lg:absolute lg:bottom-0 lg:right-20">
              <img
                className="h-[300px] z-[-1]"
                src="/assets/images/test/baba.png"
                alt="baba"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
