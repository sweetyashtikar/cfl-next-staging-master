import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useUser from '@/hooks/useUser';

import { Layout, Meta } from '@/components/layout';

export default function Premium() {
  const router = useRouter();
  const { loading: userLoading, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [billingInterval, setBillingInterval] = useState('month');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // setTimeout(() => {
    //   ga.event('view_female_founders_page', {
    //     event_category: 'ecommerce',
    //   });
    // }, 200);
  }, []);

  useEffect(() => {
    // Get all the elements you want to show on scroll
    const targets = document.querySelectorAll('.js-show-on-scroll');

    // Callback for IntersectionObserver
    const callback = function (entries: any) {
      entries.forEach((entry: any) => {
        // Is the element in the viewport?
        if (entry.isIntersecting) {
          // Add the fadeIn class:
          entry.target.classList.add('motion-safe:animate-fadeIn');
        } else {
          // Otherwise remove the fadein class
          entry.target.classList.remove('motion-safe:animate-fadeIn');
        }
      });
    };

    // Set up a new observer
    const observer = new IntersectionObserver(callback);
    // Loop through each of the target
    targets.forEach(function (target) {
      // Hide the element
      target.classList.add('opacity-0');
      // Add the element to the watcher
      observer.observe(target);
    });
  }, []);

  return (
    <Layout
      meta={
        <Meta
          title="Female Founders - CoFoundersLab"
          description="Female Founders on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <div
        className={
          (showModal == true ? '' : 'hidden') +
          ' h-modal fixed top-0 right-0 left-0 z-50 w-full overflow-y-auto overflow-x-hidden bg-[rgba(0,0,0,0.5)] md:inset-0 md:h-full'
        }
      >
        <div className="relative top-[50%] mx-auto h-full w-full max-w-2xl translate-y-[-50%] p-4 md:h-auto">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Video Title
              </h3>
              <div
                className="ml-auto inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setShowModal(false);
                }}
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
              </div>
            </div>

            {showModal == true ? (
              <div className="video-container">
                <iframe
                  className="responsive-iframe"
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/9xwazD5SyVg"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : null}

            {/* <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                      <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                  </div> */}
          </div>
        </div>
      </div>

      <div className="max-w-8xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 justify-between md:grid-cols-2">
          <div>
            <div className="mb-3 text-center md:text-left">
              <Image
                src="/assets/images/female-founders/logo.png"
                width={450}
                height={210}
                alt="Female Founders"
              />
            </div>
            <h2 className="max-w-[400px] text-center font-montserrat text-3xl font-medium text-[#4A4A4A] md:text-left">
              THE FASTEST GROWING FEMALE FOUNDERS COMMUNITY ON THE INTERNET
            </h2>
            <div className="mt-5 flex flex-1 justify-center gap-10 md:justify-start">
              <div>
                <a
                  href="#"
                  className="block rounded-md bg-ffGreen py-2 px-5 text-white transition-opacity duration-300 hover:opacity-80"
                >
                  Join Now
                </a>
              </div>
              <div
                className="cursor-pointer transition-opacity duration-300 hover:opacity-80"
                onClick={() => setShowModal(true)}
              >
                <Image
                  src="/assets/images/female-founders/learn-more.png"
                  width={145}
                  height={40}
                  alt="learn more button"
                />
              </div>
            </div>
          </div>
          <div className="z-10 flex items-center justify-center">
            <Image
              src="/assets/images/female-founders/banner-image.png"
              width={650}
              height={550}
              alt="Banner Image"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#fafafa] py-10">
        <div className="max-w-8xl relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="z-1 absolute right-0 top-[-150px] h-[250px] w-[250px]">
            <Image
              src="/assets/images/female-founders/ellipse.png"
              layout="fill"
              alt="ellipse"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-start">
              <Image
                src="/assets/images/female-founders/section-2.png"
                width={450}
                height={450}
                alt="Banner Image"
              />
            </div>
            <div className="flex max-w-[450px] flex-col items-center justify-center">
              <h2 className="pb-6 font-montserrat text-3xl font-medium text-[#4A4A4A]">
                Helping Women in Business{' '}
                <span className="text-[#006760]">
                  Take Massive Action, Stay Accountable &amp; Succeed.
                </span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Tristique vel, ultricies amet fames ac ac imperdiet. Donec
                praesent egestas neque magna donec amet, interdum. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Tristique vel,
                ultricies amet fames ac ac imperdiet. Donec praesent.{' '}
                <span className="cursor-pointer font-semibold hover:text-[#006760]">
                  Read More...
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 py-24">
        <div>
          <Image
            src={'/assets/images/female-founders/bg-green.png'}
            layout="fill"
            alt="background image"
          />
        </div>
        <div className="relative mx-auto max-w-7xl rounded-md bg-white px-4 shadow-2xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-2 md:gap-0">
            <div>
              <h2 className="mb-5 text-4xl font-semibold">
                Weekly Live Events
              </h2>
              <p className="mb-10 max-w-[450px] leading-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Tristique vel, ultricies amet fames ac ac imperdiet. Donec
                praesent tempus egestas neque magna donec amet, interdum
                praesent tempus egestas neque magna donec amet, interdum
              </p>
              <div>
                <a
                  href="#"
                  className="rounded-md bg-ffGreen py-2 px-5 text-white transition-opacity duration-300 hover:opacity-80"
                >
                  Join Now
                </a>
              </div>
            </div>
            <div
              className="flex cursor-pointer items-center justify-center"
              onClick={() => setShowModal(true)}
            >
              {/* <div className="video-container">
                <iframe
                  className="responsive-iframe"
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/9xwazD5SyVg"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div> */}
              <div className="absolute z-10 h-[39px] w-[52px]">
                <Image
                  src="/assets/images/female-founders/playIcon.png"
                  height={39}
                  width={52}
                  alt="play Icon"
                />
              </div>
              <Image
                src="/assets/images/female-founders/video-thumb.png"
                height={315}
                width={560}
                alt="video thumb"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-0 mx-auto max-w-7xl overflow-x-clip bg-white px-4 py-14 sm:px-6 md:overflow-visible lg:px-8">
        <div className="z-1 absolute left-[-50px] top-[-100px] h-[250px] w-[250px] md:left-0">
          <Image
            src="/assets/images/female-founders/ellipse.png"
            layout="fill"
            alt="ellipse"
          />
        </div>
        <div className="z-1 absolute right-[-100px] top-[-100px] h-[250px] w-[250px] md:right-0">
          <Image
            src="/assets/images/female-founders/ellipse.png"
            layout="fill"
            alt="ellipse"
          />
        </div>

        <div className="z-1 absolute left-[-100px] bottom-[-50px] h-[250px] w-[250px] md:left-0">
          <Image
            src="/assets/images/female-founders/ellipse.png"
            layout="fill"
            alt="ellipse"
          />
        </div>
        <div className="z-1 absolute right-[-100px] bottom-[-100px] h-[250px] w-[250px] md:right-0">
          <Image
            src="/assets/images/female-founders/ellipse.png"
            layout="fill"
            alt="ellipse"
          />
        </div>

        <div className="mx-auto max-w-md text-center font-montserrat">
          <h2 className="mb-4 text-5xl font-extrabold">
            {"WHAT'S"} <span className="text-ffGreen">INSIDE</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique
            vel, ultriciesLorem ipsum dolor sit amet, consectetur adipiscing
            elit.{' '}
          </p>
        </div>
        <div className="relative mt-[80px] h-[640px] py-[20px]">
          <div className="absolute left-[50%] top-[50%] z-10 h-[233px] w-[195px] translate-x-[-50%] translate-y-[-50%]">
            <Image
              src="/assets/images/female-founders/centerImage.png"
              layout="fill"
              alt=""
            />
          </div>
          <div className="flex flex-row justify-center gap-5">
            <div className="js-show-on-scroll relative top-[-50px] mb-[15px] h-[300px] w-[300px] rounded-tl-[100px] bg-black bg-one bg-cover">
              <p className="px-10 pt-12 text-sm text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptate mollitia sed facere sit, maiores quos hic quasi sint,
                itaque harum pariatur quia numquam neque nisi quo aliquam
                asperiores ad. Possimus.
              </p>
              <p className="absolute bottom-0 px-5 pb-2 text-3xl text-black drop-shadow-1px">
                01
              </p>
            </div>
            <div className="js-show-on-scroll relative h-[300px] w-[300px] rounded-tr-[100px] bg-black bg-two bg-cover">
              <p className="px-10 pt-12 text-sm text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptate mollitia sed facere sit, maiores quos hic quasi sint,
                itaque harum pariatur quia numquam neque nisi quo.
              </p>
              <p className="absolute right-0 bottom-0 px-5 pb-2 text-3xl text-black drop-shadow-1px">
                02
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-5">
            <div className="js-show-on-scroll relative top-[-50px] mb-5 h-[300px] w-[300px] rounded-bl-[100px] bg-black bg-three bg-cover">
              <p className="px-10 pt-12 pr-24 text-sm text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptate mollitia sed facere sit, maiores quos hic quasi sint,
                itaque harum pariatur quia numquam neque nisi quo aliquam.
              </p>
              <p className="absolute right-0 bottom-0 px-5 pb-2 text-3xl text-black drop-shadow-1px">
                03
              </p>
            </div>
            <div className="js-show-on-scroll h-[300px] w-[300px] rounded-br-[100px] bg-black bg-four bg-cover">
              <p className="px-10 pt-12 pl-24 text-sm text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptate mollitia sed facere sit, maiores quos hic quasi sint,
                itaque harum pariatur quia numquam neque nisi quo aliquam.
              </p>
              <p className="absolute bottom-0 px-5 pb-2 text-3xl   text-black drop-shadow-1px">
                04
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-md text-center">
          <div>
            <a
              href="#"
              className="rounded-md bg-ffGreen py-2 px-5 text-white transition-opacity duration-300 hover:opacity-80"
            >
              JOIN THE COMMUNITY
            </a>
          </div>
        </div>
      </div>

      <div className="clippath bg-[#f5f5f5] py-24">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 justify-between md:grid-cols-2">
            <div className="flex items-center justify-center">
              <h2 className="max-w-[250px] text-center text-2xl font-semibold text-[#2C6260] md:max-w-[350px] md:text-left md:text-4xl">
                BUILT BY WOMAN, FOR WOMEN. A CULTURE PUTTING FEMALE FOUNDERS
                FIRST.
              </h2>
            </div>
            <div className="z-10 flex items-center justify-center">
              <Image
                src="/assets/images/female-founders/builtByWoman.png"
                width={650}
                height={550}
                alt="Banner Image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="relative z-10 mt-[-230px] py-32 pb-16">
        <Image src="/assets/images/female-founders/bluebg.png" layout="fill" />
      </div> */}
      <div className="mt-[-280px] bg-[#1B2441] pt-48 pb-24 md:mt-[-240px]">
        <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row gap-10">
            <div className="flex-shrink">
              <div className="drop-shadow-5px ">
                <Image
                  src="/assets/images/female-founders/ross.png"
                  width={185}
                  height={250}
                  alt="ross"
                />
              </div>
            </div>
            <div className="font-montserrat">
              <h2 className="text-3xl font-light text-white">Michelle Ross</h2>
              <p className="mt-5 max-w-[550px] font-light leading-7 text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Tristique vel, ultricies amet fames ac ac imperdiet. Donec
                praesent tempus egestas neque magna donec amet, interdum
              </p>
              {/* <p className="mt-12 flex">
                <span className="flex flex-shrink cursor-pointer flex-row items-center rounded-full bg-ffGreen py-2 px-5 font-medium text-white transition-opacity duration-300 hover:opacity-80">
                  More About Michele Ross
                  <span className="ml-2 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white px-2 text-black ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </span>
                </span>
              </p> */}
            </div>
          </div>
        </div>
        <div className="js-show-on-scroll relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-10 rounded-tr-[80px] rounded-bl-[80px] bg-[#2F304C] p-10 font-montserrat">
            <h2 className="text-center text-3xl font-light text-white">
              Mission Statement
            </h2>
            <div>
              <Image
                src="/assets/images/female-founders/start.png"
                height={25}
                width={25}
                alt="quote start"
              />
            </div>
            <p className="mx-auto mt-5 max-w-[600px] text-center text-xl font-light leading-8 text-white">
              I’m building this community for the unapologetically ambitious -
              Those who strive for more who put in the hours to build a life
              they know they deserve.
            </p>
            <div className="text-right">
              <Image
                src="/assets/images/female-founders/end.png"
                height={25}
                width={25}
                alt="quote end"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
