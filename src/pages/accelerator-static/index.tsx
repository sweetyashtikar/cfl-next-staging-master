import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';

import useUser from '@/hooks/useUser';

import { Header, Layout, Meta } from '@/components/layout';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

const responsiveQuote = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

const AllEvents = [
  {
    image: '/assets/images/auth-splash.jpg',
    topic: ['Weekly Q&A', 'Pitch practise', 'Exclusive Slack channel'],
    title: 'Dummy information about the event',
    hostImage: '/assets/images/homepage/heather-dawson.jpg',
    by: 'Heather Dawson',
    date: 'April 08, 2022',
  },
  {
    image: '/assets/images/auth-splash.jpg',
    topic: ['Weekly Q&A', 'Pitch practise', 'Exclusive Slack channel'],
    title: 'Dummy information about the event',
    hostImage: '/assets/images/homepage/heather-dawson.jpg',
    by: 'Heather Dawson',
    date: 'April 08, 2022',
  },
  {
    image: '/assets/images/auth-splash.jpg',
    topic: ['Weekly Q&A', 'Pitch practise', 'Exclusive Slack channel'],
    title: 'Dummy information about the event',
    hostImage: '/assets/images/homepage/heather-dawson.jpg',
    by: 'Heather Dawson',
    date: 'April 08, 2022',
  },
  {
    image: '/assets/images/auth-splash.jpg',
    topic: ['Weekly Q&A', 'Pitch practise', 'Exclusive Slack channel'],
    title: 'Dummy information about the event',
    hostImage: '/assets/images/homepage/heather-dawson.jpg',
    by: 'Heather Dawson',
    date: 'April 08, 2022',
  },
];

const Accelerator: NextPage = () => {
  const router = useRouter();
  const { user, loggedOut } = useUser();

  // useEffect(() => {
  //   if (user && !loggedOut) {
  //     if (user.onboarded) {
  //       router.push('/feed');
  //     } else {
  //       router.push('/onboarding');
  //     }
  //   }
  // }, [user, loggedOut]);

  const comprehensiveModulesOne = [
    {
      title: 'Program 1:',
      description: 'Overview of the Startup<br />Journey',
    },
    {
      title: 'Program 2:',
      description: 'The Pitch Deck: Business Model Essentials',
    },
    {
      title: 'Program 3:',
      description: 'Developing or Gaining Traction With Your MVP',
    },
    {
      title: 'Program 4:',
      description: 'Build Your Team',
    },
    {
      title: 'Program 5:',
      description: 'Legal: Understaning The<br />Fundamentals',
    },
  ];

  const comprehensiveModulesTwo = [
    {
      title: 'Program 6:',
      description: 'The 6-Month Lean Marketing Plan for any Startup',
    },
    {
      title: 'Program 7:',
      description: 'Financial Projection &amp;<br />Modeling',
    },
    {
      title: 'Program 8:',
      description:
        'Mastering The Fundraising Game <span style="white-space:nowrap;">Part I</span>',
    },
    {
      title: 'Program 9:',
      description:
        'Mastering The Fundraising Game <span style="white-space:nowrap;">Part II</span>',
    },
    {
      title: 'Program 10:',
      description: 'Prepare &amp; Practicing Your Pitch',
    },
  ];

  const buildYourBusinessCards = [
    {
      icon: '/assets/images/accelerator/icon1.png',
      title:
        'Get Your Specific Questions Answered From 80 Vetted Advisors &amp; Mentors',
    },
    {
      icon: '/assets/images/accelerator/icon2.png',
      title: 'Find Your Perfect CoFounder &amp;<br />Build Togather',
    },
    {
      icon: '/assets/images/accelerator/icon3.png',
      title: 'Build &amp; Validate<br /> Your MVP',
    },
    {
      icon: '/assets/images/accelerator/icon4.png',
      title: 'Perfect Your Pitch &amp; Raise Capital<br />With Our Members',
    },
    {
      icon: '/assets/images/accelerator/icon5.png',
      title: 'Stay Accountable<br />&amp; Collaborate',
    },
    {
      icon: '/assets/images/accelerator/icon6.png',
      title: 'Fill Your Inbox With Potential<br />Opportunities',
    },
  ];

  const acceleratorData = [
    {
      name: 'Steve Lehman',
      title: 'Chairman,<br />Business Rockstars',
      photo: '/assets/images/accelerator/steve-lehman.png',
    },
    {
      name: 'Joshua Wenner',
      title: 'President,<br />CoFoundersLab',
      photo: '/assets/images/accelerator/joshua-wenner.png',
    },
    {
      name: 'Erica Duignan Minnihan',
      title: 'Founder at 1000 Angels &amp; Reign Ventures',
      photo: '/assets/images/accelerator/erica-duignan-minnihan.png',
    },
    {
      name: 'Steven McClurg',
      title: 'CEO Theseus Capital',
      photo: '/assets/images/accelerator/steve-mcclurg.png',
    },
  ];

  const businessSectorsData = [
    {
      name: 'Steve Lehman',
      title: 'Chairman,<br />Business Rockstars',
      photo: '/assets/images/accelerator/steve.jpeg',
    },
    {
      name: 'Sean Walsh',
      title: 'Creative Director',
      photo: '/assets/images/team/sean-walsh.png',
    },
    {
      name: 'Erica Duignan Minnihan',
      title: 'Founder at 1000 Angels &amp; Reign Ventures',
      photo: '/assets/images/accelerator/erica-duignan-minnihan.png',
    },
    {
      name: 'Joshua Wenner',
      title: 'President,<br />CoFoundersLab',
      photo: '/assets/images/accelerator/joshua-wenner.png',
    },
    {
      name: 'Pernille Lopez',
      title: 'Former CEO IKEA North America',
      photo: '/assets/images/accelerator/pernille-lopez.png',
    },
    {
      name: 'Thom Beers',
      title: 'Former CEO Fremantle Media North America',
      photo: '/assets/images/accelerator/thom-beers.png',
    },
    {
      name: 'Andy Schuon',
      title: 'Founder Revolt TV with Sean Diddy',
      photo: '/assets/images/accelerator/andy-schuon.png',
    },
    // {
    //   name : "Joshua Wenner",
    //   title: "Founder Revolt TV with Sean Diddy",
    //   photo : "/assets/images/accelerator/joshua-wenner2.png",
    // },
    {
      name: 'Hoon Chung',
      title: 'Global Operating Executive',
      photo: '/assets/images/accelerator/hoon-chung.png',
    },
    {
      name: 'Alicia Syrett',
      title: 'Founder &amp; CEO, Pantegrion Capital LLC',
      photo: '/assets/images/accelerator/alicia-syrett.png',
    },
    {
      name: 'David Ronick',
      title: 'Founder, WinWin CoFounder, Stash',
      photo: '/assets/images/accelerator/david-ronick.png',
    },
    {
      name: 'Steve Lehman',
      title: 'Chairman,<br />Business Rockstars',
      photo: '/assets/images/accelerator/steve.jpeg',
    },
    {
      name: 'Sean Walsh',
      title: 'Creative Director',
      photo: '/assets/images/team/sean-walsh.png',
    },
    {
      name: 'Erica Duignan Minnihan',
      title: 'Founder at 1000 Angels &amp; Reign Ventures',
      photo: '/assets/images/accelerator/erica-duignan-minnihan.png',
    },
    {
      name: 'Joshua Wenner',
      title: 'President,<br />CoFoundersLab',
      photo: '/assets/images/accelerator/joshua-wenner.png',
    },
    {
      name: 'Pernille Lopez',
      title: 'Former CEO IKEA North America',
      photo: '/assets/images/accelerator/pernille-lopez.png',
    },
  ];

  const successStoriesData = [
    {
      name: 'Christian Videbaek',
      imageUrl: '/assets/images/accelerator/christian-videbaek.webp',
      story:
        'I got access to investors and learned what they focus on when they invest money in a startup. I was challenged on my way of thinking about Football Tribes which, was uncomfortable and hard work at times, and therefore extremely valuable for the journey I have ahead. I can highly recommend this experience to anyone out there.',
    },
    {
      name: 'Brian Teacher, Australian Open Winner, 1981, Entrepreneur',
      imageUrl: '/assets/images/accelerator/brian.webp',
      story:
        'I  had an idea in my head about a tennis app (Full Court Tennis) that would connect players and coaches. From an idea to Beta, CoFoundersLab Accelerator has been there to help me with the journey. I watched, listened, and learned from so many amazing people. I feel like CoFoundersLab has helped to shortcut the process and helped me to avoid costly mistakes. THANK YOU!!!!',
    },
    {
      name: 'Christian Videbaek',
      imageUrl: '/assets/images/accelerator/christian-videbaek.webp',
      story:
        'I got access to investors and learned what they focus on when they invest money in a startup. I was challenged on my way of thinking about Football Tribes which, was uncomfortable and hard work at times, and therefore extremely valuable for the journey I have ahead. I can highly recommend this experience to anyone out there.',
    },
    {
      name: 'Brian Teacher, Australian Open Winner, 1981, Entrepreneur',
      imageUrl: '/assets/images/accelerator/brian.webp',
      story:
        'I  had an idea in my head about a tennis app (Full Court Tennis) that would connect players and coaches. From an idea to Beta, CoFoundersLab Accelerator has been there to help me with the journey. I watched, listened, and learned from so many amazing people. I feel like CoFoundersLab has helped to shortcut the process and helped me to avoid costly mistakes. THANK YOU!!!!',
    },
    {
      name: 'Christian Videbaek',
      imageUrl: '/assets/images/accelerator/christian-videbaek.webp',
      story:
        'I got access to investors and learned what they focus on when they invest money in a startup. I was challenged on my way of thinking about Football Tribes which, was uncomfortable and hard work at times, and therefore extremely valuable for the journey I have ahead. I can highly recommend this experience to anyone out there.',
    },
    {
      name: 'Brian Teacher, Australian Open Winner, 1981, Entrepreneur',
      imageUrl: '/assets/images/accelerator/brian.webp',
      story:
        'I  had an idea in my head about a tennis app (Full Court Tennis) that would connect players and coaches. From an idea to Beta, CoFoundersLab Accelerator has been there to help me with the journey. I watched, listened, and learned from so many amazing people. I feel like CoFoundersLab has helped to shortcut the process and helped me to avoid costly mistakes. THANK YOU!!!!',
    },
  ];

  const topNavigation = () => <></>;

  const heroContent = () => {
    return (
      <div className="mx-auto px-4 py-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="xs:mb-8 max-w-xl">
              <h2 className="mb-6 max-w-lg font-sans text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:leading-tight">
                A <span className="text-blue-600">Comprehensive</span> and{' '}
                <span className="text-blue-600">Dedicated Program</span> To
                Accelerate <span className="text-blue-600">Your StartUp</span>
              </h2>
              <p className="text-base text-2xl text-gray-600">
                Mentorship. Accountablilty. Resources
              </p>
              {user?.role?.type != 'premium' && (
                <Link href="/premium">
                  <a className="mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-orange-600 px-6 py-3 text-lg font-medium text-white shadow-sm transition duration-200 hover:bg-orange-500 active:bg-orange-800">
                    Join Today
                  </a>
                </Link>
              )}
              {user?.role?.type == 'premium' && (
                <Link href="/accelerator/access">
                  <a className="mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-orange-600 px-6 py-3 text-lg font-medium text-white shadow-sm transition duration-200 hover:bg-orange-500 active:bg-orange-800">
                    Access Now
                  </a>
                </Link>
              )}
            </div>
          </div>
          <div className="-mx-4 flex items-center justify-center">
            <img src="/assets/images/homepage/group.jpeg" alt="" />
          </div>
        </div>
      </div>
    );
  };

  const partnersContent = () => {
    return (
      <div className="bg-gray-50 py-8 px-4">
        <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-6xl">
          <div className="grid grid-cols-2 gap-16 md:flex">
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <p className="inline-block whitespace-nowrap rounded-full px-2 py-3 text-2xl font-semibold tracking-wider text-gray-800">
                As seen:
              </p>
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img
                className="mt-3 h-10 grayscale filter"
                src="/assets/images/partner-logos/fortune.png"
                alt="fortune"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img
                className="mt-0 h-12 grayscale filter"
                src="/assets/images/partner-logos/msn-logo.png"
                alt="MSN"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img
                className="mt-2 h-14 grayscale filter"
                src="/assets/images/partner-logos/entrepreneur-logo.png"
                alt="Entrepreneur"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img
                className="mt-3 h-12 grayscale filter"
                src="/assets/images/partner-logos/Yahoo-Finance-Logo.png"
                alt="Entrepreneur"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const preAcceleratorContent = () => {
    return (
      <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8 lg:py-20">
        <div className="grid gap-8 gap-y-10 lg:grid-cols-2">
          <div>
            <img
              className="w-full object-cover"
              src="/assets/images/accelerator/startup-laptop.png"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="max-w-xl md:pt-2">
              <div className="max-w-xl md:mx-auto lg:max-w-2xl">
                <img
                  className="max-w-[350px]"
                  src="/assets/images/accelerator/cfl-accelerator-logo-blue.png"
                  alt="CoFoundersLab Accelerator Logo"
                />
              </div>
              <p className="mt-11 mb-8 text-base italic leading-10 text-gray-700 md:text-lg">
                The top startup accelerator in the country with a comprehensive
                curriculum helping founders transition from employee to
                entrepreneur, test their startup ideas, live mentor
                interactions, a group of 10 companies in a module. build a team,
                find Co Founders/Advisors, build/validate MVP, perfect pitch,
                get their first customers, raise funding, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const quoteContent = () => {
    return (
      <div className="bg-gray-600 py-20 px-4">
        <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-6xl">
          {/* <div className="grid grid-cols-2 gap-16 md:flex sm:grid-cols-1">
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img className='rounded w-96 h-48 sm:max-w-[200px] sm:max-h-[250px]' src="/assets/images/team/Steve-Circle.webp" alt="" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <p className='m-0 md:mt-2 lg:mt-10 text-white text-xl sm:full-width sm:text-center md:text-left'>"We designed the CoFoundersLab StartUp Accelerator Program to help you learn while you grow with the essential support &amp; resources needed to start, grow &amp; fund your business."<br />
              <span className='m-0 text-white text-xl font-bold'>- Steve Lehman - CoFounderLabs</span></p>
            </div>
          </div> */}
          <div className="flex flex-col justify-between gap-5 md:flex-row">
            <div className="text-bold order-1 text-center text-3xl text-white md:text-left">
              Are you ready to accelrate your startup?
            </div>
            <div className="order-2 flex justify-center text-center align-middle md:text-left">
              <Link href="/premium">
                <a className="inline-block cursor-pointer rounded-lg border border-white bg-white px-5 py-3 text-center font-bold text-gray-600 hover:bg-gray-600 hover:text-white">
                  Yes, I am ready.
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ourFoundersContent = () => {
    return (
      <div className="bg-white py-20 px-4">
        <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-6xl">
          <h2 className="mb-6 max-w-xl text-center font-sans text-4xl font-bold leading-normal tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            Hear From Some Of{' '}
            <span className="text-blue-600">Our Founders</span> In The Startup
            Accelerator
          </h2>
        </div>
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 grid gap-8 gap-y-10 pt-14 lg:grid-cols-3">
            <div className="md:pb-15 max-w-full sm:pb-20">
              <iframe
                title="Doug"
                className="h-full w-full"
                src="https://player.vimeo.com/video/343026087?autoplay=0&amp;title=0&amp;byline=0&amp;wmode=transparent&amp;autopause=0"
                frameBorder="0"
                id="fitvid842487"
              ></iframe>
              <h2 className="mt-6 mb-2 text-center font-sans text-xl font-bold text-gray-900">
                Meet Doug,
              </h2>
              <p className="text-center font-sans text-xl">Founder of SYbor</p>
            </div>
            <div className="md:pb-15 max-w-full sm:pb-20">
              <iframe
                title="Allison"
                className="h-full w-full"
                src="https://player.vimeo.com/video/343042063?autoplay=0&amp;title=0&amp;byline=0&amp;wmode=transparent&amp;autopause=0"
                frameBorder="0"
                id="fitvid512818"
              ></iframe>
              <h2 className="mt-6 mb-2 text-center font-sans text-xl font-bold text-gray-900">
                Meet Allison,
              </h2>
              <p className="text-center font-sans text-xl">Founder of RSVP</p>
            </div>
            <div className="md:pb-15 max-w-full sm:pb-20">
              <iframe
                title="pidgeon"
                className="h-full w-full"
                src="https://player.vimeo.com/video/343026548?autoplay=0&amp;title=0&amp;byline=0&amp;wmode=transparent&amp;autopause=0"
                frameBorder="0"
                id="fitvid634122"
              ></iframe>
              <h2 className="mt-6 mb-2 text-center font-sans text-xl font-bold text-gray-900">
                Meet Pradeep,
              </h2>
              <p className="text-center font-sans text-xl">
                Founder of Pidgeon
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const comprehensiveContent = () => {
    return (
      <div className="bg-gray-50 py-20 px-4">
        <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-6xl">
          <h2 className=" mb-6 max-w-2xl text-center font-sans text-4xl font-bold leading-normal tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            A <span className="text-blue-600">Comprehensive 20 week</span>{' '}
            Program
          </h2>
          <p className="mx-auto mb-20 text-center">
            There has never been a better time to build a startup. CoFoundersLab
            Accelerator gets you prepared for the next step into an Accelerator.
            We provideeverything you need from our modules and mentors, who
            combined, have built some of the world&apos;s most successful
            startups.
          </p>
        </div>
        <div className="mx-auto max-w-7xl rounded-l-md border border-orange-300 pl-4">
          <div className="grid grid-cols-1 gap-5 pr-0 md:grid-cols-5">
            <div className="col-span-3">
              <h3 className="mt-10 mb-8 pl-4 text-2xl">What&apos;s Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="col-span-1 px-4">
                  {comprehensiveModulesOne?.map((module, index) => (
                    <div className="mb-10" key={`moduleOne_${index}`}>
                      <b className="font-sans text-xl">{module.title}</b>
                      <p
                        className="font-sans text-xl"
                        dangerouslySetInnerHTML={{ __html: module.description }}
                      ></p>
                    </div>
                  ))}
                </div>
                <div className="col-span-1 px-4">
                  {comprehensiveModulesTwo?.map((module, index) => (
                    <div className="mb-10" key={`moduleTwo_${index}`}>
                      <b className="font-sans text-xl">{module.title}</b>
                      <p
                        className="font-sans text-xl"
                        dangerouslySetInnerHTML={{ __html: module.description }}
                      ></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="col-span-2 mb-4 md:mb-0"
              style={{
                backgroundImage:
                  'url(' +
                  '/assets/images/accelerator/pexels-fauxels-3184433_1.png' +
                  ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="h-96 w-full md:block"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const buildYourBusinessContent = () => {
  //   return (
  //     <div className="bg-white pt-20 px-4">
  //       <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-6xl">
  //         <h2 className="max-w-xl mb-6 font-sans text-4xl font-bold text-center leading-normal tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
  //           Hear From Some Of <span className='text-blue-600'>Our Founders</span> In The Accelerator
  //         </h2>
  //       </div>

  //       <div className="mt-24 max-w-7xl mx-auto">
  //         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
  //           {buildYourBusinessCards.map( (business,index) => (
  //             <div className="pt-6 mb-20" key={"businessCards_"+index}>
  //               <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
  //                 <div className="-mt-14">
  //                   <div className='text-center'>
  //                     <span className="inline-flex items-center justify-center rounded-full">
  //                       <img src={business.icon} alt={business.title} className='h-15 w-15' />
  //                     </span>
  //                   </div>
  //                   <h3 className="mt-4 text-lg font-medium text-gray-700 tracking-tight text-center" dangerouslySetInnerHTML={{__html: business.title}}></h3>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const theAcceleratorContent = () => {
  //   return (
  //     <div className="bg-gray-50 py-20 px-4">
  //       <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-6xl">
  //         <h2 className="max-w-md mb-6 font-sans text-4xl mb-6 font-bold text-center leading-normal tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
  //           Who Will You Learn From In <span className='text-blue-600'>The Accelerator?</span>
  //         </h2>
  //       </div>
  //       <div className='max-w-7xl pl-4 mx-auto mt-16'>
  //         <div className='grid grid-cols-1 md:grid-cols-4 gap-5 pr-4 '>
  //           { acceleratorData?.map( (data,index) =>
  //             (<div className='col-span-1 mb-4' key={"acceleratorData_"+index}>
  //               <div className="text-center">
  //                 <div className='bg-blue-600 h-36 text-center overflow-visible pt-2 mb-28'>
  //                       <img src={data.photo} alt={data.name} className='mx-auto mt-10' />
  //                 </div>
  //                 <h3 className='text-xl font-bold text-gray-800 mb-4'>{data.name}</h3>
  //                 <p className='font-sans' dangerouslySetInnerHTML={{__html: data.title}}></p>
  //               </div>
  //             </div>)
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const businessSectorContent = () => {
    return (
      <div className="bg-gray-50 py-20 px-4">
        <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-6xl">
          <h2 className="mb-6 mb-6 max-w-md text-center font-sans text-4xl font-bold leading-normal tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            {/* And Many More Highly Curated Advisors Across All <span className='text-blue-600'>Business Sectors</span> */}
            Who Will You Learn From In{' '}
            <span className="text-blue-600">The Accelerator?</span>
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-7xl pl-4">
          <div className="grid grid-cols-1 gap-5 pr-4 md:grid-cols-5 ">
            {businessSectorsData?.map((data, index) => (
              <div className="col-span-1 mb-4" key={`business_${index}`}>
                <div className="text-center">
                  <div className="mb-5 h-36 overflow-visible pt-2 text-center">
                    <img
                      src={data.photo}
                      alt={data.name}
                      className="mx-auto h-full rounded-full"
                    />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-gray-800">
                    {data.name}
                  </h3>
                  <p
                    className="font-sans"
                    dangerouslySetInnerHTML={{ __html: data.title }}
                  ></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const upcomingEvents = () => {
    return (
      <div className="lg:py-22 overflow-hidden bg-white py-16">
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
            <h2 className="text-center font-sans text-4xl font-bold leading-normal text-gray-900">
              Exclusive access to CoFoundersLab weekly events
            </h2>
            <Carousel responsive={responsive}>
              {AllEvents.map((event, index) => (
                <blockquote className="mt-10" key="index">
                  <div className="mx-5 mx-auto rounded-md bg-white p-5 text-center text-2xl font-medium leading-9 text-gray-900 first-letter:max-w-3xl">
                    <img
                      className="mx-auto mb-5 w-full rounded-md"
                      src={event.image}
                      alt={event.image}
                    />
                    <div className="mb-5 flex flex-row flex-wrap text-left">
                      {event.topic.map((v, i) => {
                        return (
                          <span
                            key={`topic_${i}`}
                            className="mr-2 mb-2 rounded-md bg-blue-600 px-2 text-sm text-white"
                          >
                            {v}
                          </span>
                        );
                      })}
                    </div>
                    <p className="mb-5 text-left font-semibold">
                      {event.title}
                    </p>
                    <div className="flex flex-row">
                      <div className="flex-shrink-1 mr-3">
                        <img
                          className="mx-auto h-12 w-12 rounded-full shadow-md"
                          src={event.hostImage}
                          alt={event.by}
                        />
                      </div>
                      <div className="flex-grow-1 leading-relaxed">
                        <p className="text-left text-sm font-normal">
                          By <span className="font-semibold">{event.by}</span>
                        </p>
                        <p className="text-left text-sm font-normal">
                          {event.date}
                        </p>
                      </div>
                    </div>
                    {/* <p>&ldquo;{event.title}&rdquo;</p> */}
                  </div>
                </blockquote>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    );
  };

  const bigJoinNow = () => {
    return (
      <div className="bg-blue-600 py-20 px-4 text-white">
        <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-6xl">
          <img
            src="/white-logo.png"
            alt=""
            className="mx-auto mb-10 max-w-[450px]"
          />
          <img
            src="/assets/images/accelerator/pricing.png"
            alt=""
            className="mx-auto mt-6"
          />
          <h2 className="mt-8 text-center font-sans text-5xl font-bold text-white">
            Now Only $199
          </h2>
          <p className="m-0 mt-2 text-center font-sans text-4xl font-bold text-white">
            Join The CoFoundersLab Startup Accelerator Now!
          </p>
          <p className="mt-5 text-center">
            <a target="_blank" href="/premium">
              <img
                className="mx-auto cursor-pointer"
                src="/assets/images/accelerator/join-now.png"
                alt="join now"
              />
            </a>
          </p>
        </div>
      </div>
    );
  };

  const accessNow = () => {
    return (
      <div className="bg-blue-600 py-20 px-4 text-white">
        <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-6xl">
          <img
            src="/white-logo.png"
            alt=""
            className="mx-auto mb-10 max-w-[450px]"
          />
          <p className="m-0 mt-2 text-center font-sans text-4xl font-bold text-white">
            Join The CoFoundersLab Startup Accelerator Now!
          </p>
          <p className="mt-5 text-center">
            <Link href="/accelerator/access">
              <a className="mt-5 inline-block bg-white p-5 px-20 text-2xl text-blue-600">
                Access Now
              </a>
            </Link>
          </p>
        </div>
      </div>
    );
  };

  const successStories = () => {
    return (
      <div className="py-20 px-4 text-white">
        <div className="mx-auto mb-20 max-w-2xl sm:px-6 lg:max-w-6xl">
          <h2 className="mb-6 mb-6 max-w-3xl text-center font-sans text-4xl font-bold leading-normal tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            Our <span className="text-blue-600">Success Stories</span> Gallery
          </h2>
        </div>
        <div className="mx-auto max-w-7xl">
          <ul
            role="list"
            className="grid gap-10 space-y-12 lg:items-start lg:gap-x-12 lg:gap-y-12 lg:space-y-0"
          >
            <Carousel responsive={responsiveQuote}>
              {successStoriesData.map((data, index) => (
                <li key={`${data.name}_${index}`}>
                  <div className="space-y-4">
                    <div className="p-5 sm:col-span-2">
                      <div className="space-y-4">
                        <div className="mb-8 text-lg">
                          <p className="text-center text-gray-500">
                            {data.story}
                          </p>
                        </div>
                        <div className="space-y-1 text-lg font-medium leading-6">
                          <img
                            className="mx-auto mb-8 w-48 rounded-full object-cover shadow-lg"
                            src={data.imageUrl}
                            alt=""
                          />
                          <h3 className="text-center font-bold text-gray-900">
                            - {data.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </Carousel>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Layout
      meta={
        <Meta
          title="CoFoundersLab: World's Largest Network of Entrepreneurs"
          description="The leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      header={<Header sticky={true} />}
    >
      {heroContent()}
      {partnersContent()}
      {preAcceleratorContent()}
      {quoteContent()}
      {ourFoundersContent()}
      {comprehensiveContent()}
      {upcomingEvents()}
      {/* {buildYourBusinessContent()} */}
      {/* {theAcceleratorContent()} */}
      {businessSectorContent()}
      {user?.role?.type == 'premium' ? accessNow() : bigJoinNow()}
      {successStories()}

      <Script id="manage-fb" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '255712149875009');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt="noscript"
          src="https://www.facebook.com/tr?id=255712149875009&ev=PageView&noscript=1"
        />
      </noscript>
    </Layout>
  );
};

export default Accelerator;
