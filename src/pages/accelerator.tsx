import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';

import { Header, Layout, Meta } from '@/components/layout';

const memebership = [
  {
    id: 1,
    title: 'Live Interactive Accelerator',
    desc: '10 companies in each module, 4 months in a comprehensive 17 week program',
    src: '/assets/accelerator/live-chat.png',
  },
  {
    id: 2,
    title: 'World Class Mentors and Advisors',
    desc: 'Live interaction and critical feedback on your company',
    src: '/assets/accelerator/advisors.png',
  },
  {
    id: 3,
    title: 'Market Validation',
    desc: 'Get clarity and validate what your end customer wants and the price point they will pay',
    src: '/assets/accelerator/market-fit.png',
  },
  {
    id: 4,
    title: 'Go To Market Strategy',
    desc: 'Develop your launch and roll out game-plan. Strategy for Customer engagement and building your competitive edge.',
    src: '/assets/accelerator/feedback.png',
  },
  {
    id: 5,
    title: 'Building Your Pitch',
    desc: 'Building your perfect pitch deck and presentation that you’ll need for investors.',
    src: '/assets/accelerator/financial-model.png',
  },
  {
    id: 6,
    title: 'Operationalize Your business',
    desc: 'Crystallize your vision, validate your research, and build your successful business strategy.',
    src: '/assets/accelerator/planing.png',
  },
];
const testimonails = [
  {
    id: 1,
    title: 'Dave Lucas ',
    prof: 'Chief Executive Officer of Yigdoo',
    desc: 'I feel considerably more confident about our business plan and strategy than before the program. Worth every cent.',
    src: '/assets/accelerator/Headshot - Dave Lucas, Chief Executive Officer of Yigdoo.png',
  },
  {
    id: 2,
    title: 'Mary Tucker ',
    prof: 'President and Co-Founder of Experio',
    desc: 'We found two key advisors through their network with the domain expertise to help bring our product to market.',
    src: '/assets/accelerator/Headshot - Mary Tucker, President and Co-Founder of Experio.png',
  },
  {
    id: 3,
    title: 'Harsh Maheshwari',
    prof: 'Co-founder and CEO of Linkusol Technologies',
    desc: 'I have already recommended this program to a few start-up founder who have recently started. I am confident that I will be able to apply what I have learned and bring growth to my business!',
    src: '/assets/accelerator/Headshot - Harsh Maheshwari, Co-founder and CEO of Linkusol Technologies.jpg',
  },
  {
    id: 4,
    title: 'David Kelly',
    prof: 'Chief Executive Officer of Bobtrak',
    desc: 'The program helped me fill in many of the gaps in my knowledge about startup strategy, and it gave us tool to use to get past challenges.  Highly recommended.',
    src: '/assets/accelerator/Headshot - David Kelly, CEO of Bobtrak.png',
  },
  {
    id: 3,
    title: 'Connor Halline',
    prof: 'Chief Executive Officer of Fact or Fiction',
    desc: "I've learned a lot from the various experts who have shared with us the knowledge and insights they have gained from their combined decades of experience.",
    src: '/assets/accelerator/Headshot - Connor Halline, CEO of Fact or Fiction.png',
  },
];
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1170, min: 480 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
  },
};
const Accelerator: NextPage = () => {
  return (
    <Layout
      meta={
        <Meta
          title="Accelerator - CoFoundersLab"
          description="Turbocharge Your Startup Growth on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      header={<Header sticky={true} />}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex min-h-[400px] flex-wrap items-center justify-center px-5  pt-5 md:flex-nowrap md:justify-between md:pt-[60px] ">
          <div>
            <p className="text-center text-lg font-bold text-gray-600 sm:text-5xl md:text-left  lg:text-6xl">
              StartUp Accelerator
            </p>
            <p className=" mt-3 max-w-xl text-center text-2xl font-semibold text-gray-500 md:text-left">
              Turbocharge Your Startup Growth
            </p>
            <div className="flex justify-center md:justify-start">
              <button className=" mt-20 mb-10 rounded-full bg-[#2F80ED] py-3.5 px-11 text-2xl  font-normal text-[#fff]  ">
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSckHwucrO2mlZOt2iqdgTDN0DfLa0kNU5vFxe0lE1hpMk6ZMA/viewform">
                  Apply Now
                </Link>
              </button>
            </div>
          </div>
          <div>
            <Image
              src="/assets/growth/accelrator.jpeg"
              width={550}
              height={350}
              alt="Accelerator Herosection image"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-100">
        <div className="mx-auto max-w-7xl  pt-[64px]">
          <p className=" mb-4 px-3 text-center text-lg font-bold text-gray-600 md:px-0 md:text-3xl">
            Startup Accelerator Is a 4 Month Live Interactive Program <br />
            To Start, Grow, and Fund Your Business
          </p>
          <p className=" px-3 text-center text-xs md:px-0  md:text-lg  ">
            Save Time And Money... Avoid Critical Pitfalls In Starting And
            Scaling Your Business
          </p>
          <div className="flex  justify-center">
            <button className="mb-[64px] mt-[50px] rounded-full bg-[#2F80ED] py-4 px-[50px]  text-2xl font-normal text-[#fff]">
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSckHwucrO2mlZOt2iqdgTDN0DfLa0kNU5vFxe0lE1hpMk6ZMA/viewform">
                Apply Now
              </Link>
            </button>
          </div>
          <div className="  flex min-h-[600px] w-full flex-wrap items-center justify-center gap-x-5 gap-y-5 ">
            {memebership.map((item) => {
              return (
                <div
                  key={item.id}
                  className=" flex h-[300px] w-[300px] flex-col items-center justify-center gap-y-5 gap-x-2.5 rounded-2xl bg-white px-1.5  pt-5 lg:basis-[30%]"
                >
                  <div className="my-3">
                    <Image
                      src={item.src}
                      width={65}
                      height={68}
                      alt={item.title}
                    />
                  </div>
                  <div className="flex-1 ">
                    <p className="  mb-3 text-center font-bold text-[#000]">
                      {item.title}
                    </p>
                    <p className=" my-3 max-w-[320px] text-center leading-7 text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="  flex justify-center">
          <button className=" my-[60px] rounded-full bg-[#2F80ED] py-4 px-12  text-2xl font-normal text-[#fff]">
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSckHwucrO2mlZOt2iqdgTDN0DfLa0kNU5vFxe0lE1hpMk6ZMA/viewform">
              Apply Now
            </Link>
          </button>
        </div>
      </div>
      <div className="mx-auto  max-w-7xl px-5 py-[64px] ">
        <Carousel
          autoPlay={true}
          responsive={responsive}
          removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
          showDots={true}
          infinite={true}
        >
          {testimonails.map((item) => {
            return (
              <div
                key={item.id}
                className="  mb-20 flex min-h-[350px] max-w-[384px] flex-col items-center"
              >
                <div className="mb-3 ">
                  <Image
                    src={item.src}
                    height={128}
                    width={128}
                    alt={item.title}
                    className=" rounded-full brightness-125"
                  />
                </div>
                <div>
                  <p className="my-3 max-w-[350px] text-center text-base font-extrabold text-gray-900 sm:max-w-[200px] md:max-w-[350px] md:text-lg">
                    {item.title}
                  </p>
                  <p className="mb-3 max-w-[500px] text-center text-sm font-bold  text-gray-900 sm:max-w-[200px] md:max-w-[500px] md:text-base">
                    {item.prof}
                  </p>
                </div>

                <p className="mb-3 max-w-[360px] text-center text-sm  font-normal  leading-7  text-gray-600 sm:max-w-[200px]  md:max-w-[360px] md:text-lg  ">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </Carousel>
      </div>
    </Layout>
  );
};

export default Accelerator;
