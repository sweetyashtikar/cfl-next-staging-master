import { StarIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useUser from '@/hooks/useUser';

import { Layout, Meta } from '@/components/layout';

import { NEXT_URL } from '@/config/index';
import * as ga from '@/helpers/ga';
import { classNames } from '@/helpers/index';
import getStripe from '@/helpers/stripe-client';

const features = [
  {
    name: 'Pitch To Investors',
    image: '/assets/images/premium/undraw_term_sheet_re_ju7s.svg',
    icon: StarIcon,
    description:
      'Qualify to pitch to angel investors and get the funding your startup needs.',
  },
  {
    name: 'Partner Perks',
    image: '/assets/images/premium/undraw_portfolio_update_re_jqnp.svg',
    icon: StarIcon,
    description:
      'Benefit from CoFoundersLab partnerships with exclusive offers with Hubspot, Unbounce, Soona, Slidebean, and more.',
  },
  {
    name: 'Weekly LIVE Events',
    image: '/assets/images/premium/undraw_video_call_re_4p26.svg',
    icon: StarIcon,
    description:
      'Interact with prominent entrepreneurs and innovators through Q&As, AMAs and Pitch practices.',
  },
  {
    name: 'Member Spotlight',
    image: '/assets/images/premium/undraw_project_feedback_re_cm3l.svg',
    icon: StarIcon,
    description:
      'Receive more exposure through on emails, website, and social media platforms.',
  },
  {
    name: 'An Expansive Learning Center',
    image: '/assets/images/premium/undraw_online_learning_re_qw08.svg',
    icon: StarIcon,
    description:
      'Access to our learning center that includes 15 modules and hours of startup knowledge.',
  },
  {
    name: 'A Community For Growth',
    image: '/assets/images/premium/undraw_community_re_cyrm.svg',
    icon: StarIcon,
    description:
      'Collaborate with CoFounders and investors through unlimited messages.',
  },
];

const tiers = [
  {
    name: 'Free',
    href: '#',
    description: 'Quis suspendisse ut fermentum neque vivamus non tellus.',
  },
  {
    name: 'Premium',
    href: '#',
    priceMonthly: 59,
    description:
      'Orci volutpat ut sed sed neque, dui eget. Quis tristique non.',
  },
];

const sections = [
  {
    name: 'Connect',
    features: [
      {
        name: 'Search for a CoFounder',
        description: 'Search for CoFounders, advisors, or team members.',
        tiers: { Free: true, Premium: true },
      },
      {
        name: 'Direct Message',
        description: 'Send private messages to other community members.',
        tiers: { Free: true, Premium: true },
      },
      {
        name: 'Video Chat',
        description:
          'Live video chat with CoFounders, advisors, and investors.',
        tiers: { Free: true, Premium: true },
      },
    ],
  },
  {
    name: 'Collaborate',
    features: [
      {
        name: 'Access to Q&A, AMA, Pitch Practices',
        description: "Gain access to influential entrepreneurs' community.",
        tiers: { Premium: true },
      },
      {
        name: 'Learning Center',
        description:
          'Start-up, growth, and leadership courses for entrepreneurs.',
        tiers: { Premium: true },
      },
    ],
  },
  {
    name: 'Educate',
    features: [
      {
        name: 'Partner Perks',
        description:
          'Stay ahead of offers from CoFoundersLab partners like Hubspot, Slidebean, Founders Institute, and Pepperdine.',
        tiers: { Premium: true },
      },
      {
        name: "Who's Viewed My Profile",
        description: 'See who has viewed your profile.',
        tiers: { Premium: true },
      },
      {
        name: 'Recommended Candidates',
        description:
          'Our unique CoFounder matching algorithm recommends candidates.',
        tiers: { Premium: true },
      },
      {
        name: 'Pitch To An Investor',
        description:
          'Qualify to pitch to angel investors for a check or Qualify to pitch to angel investors to potentially receive an investment',
        tiers: { Premium: true },
      },
    ],
  },
];

const testimonials = [
  {
    name: 'Roberto Inetti',
    title: 'CoFounder/CEO',
    company: 'JobNow',
    text: "Six months ago, we didn't have a company, but today we are looking at a very promising future with JobNow, and it all started thanks to CoFoundersLab.",
  },
  {
    name: 'Dan Stoyan',
    title: 'CoFounder',
    company: 'DealzCity',
    text: "I've been looking for such a website the whole time! $29/month to find a CoFounder that can help bring my million dollar idea to life? It's a no-brainer.",
  },
  {
    name: 'Maitry Vaghela',
    title: 'Founder',
    company: 'ener7',
    text: 'CoFoundersLab is an invaluable resource for all founders!',
  },
];

const includedFeatures = [
  'Unlimited Search to Find Your Perfect CoFounder.',
  'Exclusive access and discounts to our Partners to arm your business for success.',
  'Exclusive Access to our WEEKLY LIVE events to keep your business accountable.',
  'Dedicated learning center to arm you & your business with the tools you need to grow.',
  'Qualify your ideas to pitch to veteran investors and fund your business.',
  'Expand your network with a diverse & engaged network of Founders, Mentors & Innovators.',
];

export default function Premium() {
  const router = useRouter();
  const { loading: userLoading, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [billingInterval, setBillingInterval] = useState('month');

  useEffect(() => {
    setTimeout(() => {
      ga.event('view_premium_page', {
        event_category: 'ecommerce',
      });
    }, 200);
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    if (!userLoading && user) {
      try {
        const { data: session } = await axios.post<any, any>(
          `${NEXT_URL}/api/stripe/checkout`,
          {
            plan: billingInterval,
            promo: 'pepperdine',
          }
        );

        ga.event('begin_checkout', {
          items: [
            {
              name:
                billingInterval === 'month'
                  ? 'Monthly Premium'
                  : 'Yearly Premium',
              category: 'Subscription',
              quantity: 1,
              price: billingInterval === 'month' ? 29 : 299,
            },
          ],
        });
        const stripe = await getStripe();
        stripe!.redirectToCheckout({ sessionId: session.id });
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      } finally {
      }
    } else {
      setLoading(false);
      toast('Please log in to purchase a subscription.');
      router.push('/login');
    }
  };

  return (
    <Layout
      meta={
        <Meta
          title="Pepperdine Exclusive 30 Days Free Premium - CoFoundersLab"
          description="Pepperdine Exclusive 30 Days Free Premium on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="pt-8 sm:pt-12 lg:pt-16">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                Accelerate your Startup
              </h2> */}
              <div className="mb-6 flex items-center justify-center">
                <Image
                  src="/assets/images/c.svg"
                  alt="CoFoundersLab Logo"
                  width={60}
                  height={60}
                />
                <span className="ml-4 mr-4 -mt-2 text-5xl font-extrabold text-gray-300">
                  &times;
                </span>
                <Image
                  src="/assets/images/partner-logos/pepperdine.svg"
                  alt="Pepperdine Logo"
                  width={300}
                  height={70}
                />
              </div>
              <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                Grab your{' '}
                <span className="block w-full bg-gradient-to-r from-cyan-600 to-orange-500 bg-clip-text text-transparent lg:inline">
                  EXCLUSIVE
                </span>{' '}
                <span className="md:block">30 Days Free Premium</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Unlock premium features to take your startup to the next level.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white pb-4 sm:mt-16 sm:pb-16 lg:pb-20">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50" />
            <div className="max-w-8xl relative mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg ring-2 ring-orange-500 transition delay-200 hover:ring-orange-600 lg:flex lg:max-w-none">
                <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                  <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    Premium Membership
                  </h3>
                  <p className="mt-6 text-base text-gray-500">
                    Get the tools. Learn the skills. Accelerate your startup
                    journey.
                  </p>
                  <div className="mt-8">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 bg-white pr-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
                        What&apos;s included
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-200" />
                    </div>
                    <ul
                      role="list"
                      className="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0"
                    >
                      {includedFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start lg:col-span-1"
                        >
                          <div className="flex-shrink-0">
                            <CheckCircleIcon
                              className="h-5 w-5 text-green-600"
                              aria-hidden="true"
                            />
                          </div>
                          <p className="text-normal ml-3 text-gray-700">
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 py-8 px-6 text-center shadow-inner lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
                  <p className="text-lg font-medium leading-6 text-gray-500">
                    Start, Grow &amp; Fund Your{' '}
                    <span className="lg:block">Business for Only</span>
                  </p>
                  <div className="mt-4 flex items-center justify-center">
                    {billingInterval === 'month' ? (
                      <>
                        <p>
                          <span className="text-5xl font-extrabold text-gray-900">
                            $29
                          </span>
                          <span className="ml-1 text-base font-medium text-gray-500">
                            / month
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-5xl font-extrabold text-gray-900">
                          $299
                        </p>
                        <div className="text-left">
                          <p>
                            <span className="ml-1 inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                              $49 off
                            </span>
                          </p>
                          <p className="ml-1 text-base font-medium text-gray-500">
                            / year
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="relative my-3 flex self-center rounded-lg bg-gray-100 p-0.5 shadow-inner">
                    <button
                      type="button"
                      onClick={() => setBillingInterval('month')}
                      className={classNames(
                        billingInterval === 'month'
                          ? 'border-gray-200 bg-white shadow-sm'
                          : '',
                        'relative w-1/2 whitespace-nowrap rounded-md border border-transparent py-2 text-sm font-medium text-gray-800 focus:z-10 sm:px-8'
                      )}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingInterval('year')}
                      className={classNames(
                        billingInterval === 'year'
                          ? 'border-gray-200 bg-white'
                          : '',
                        'relative ml-0.5 w-1/2 whitespace-nowrap rounded-md border border-transparent py-2 text-sm font-medium text-gray-800 focus:z-10 sm:px-8'
                      )}
                    >
                      Annual
                    </button>
                  </div>
                  <div className="mt-6">
                    <div className="rounded-md shadow">
                      <button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="relative flex w-full items-center justify-center rounded-md border border-transparent bg-orange-600 px-5 py-3 text-lg font-medium text-white transition duration-200 hover:bg-orange-500 active:bg-orange-800 disabled:bg-gray-400"
                      >
                        {loading || userLoading ? (
                          <svg
                            className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          'Get Premium'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-t-xl px-10">
        <div className="flex justify-center">
          <svg
            className="h-6 w-6 animate-bounce text-orange-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      <div className="relative bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            The Premium Features
          </h2>
          <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
            Maximize your startup&apos;s potential with access to amazing tools,
            and features.
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root rounded-lg bg-white px-6 pb-8 ring-2 ring-gray-200 transition delay-200 hover:ring-gray-300">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center rounded-md">
                          <img
                            src={feature.image}
                            alt={feature.name}
                            className="max-h-40"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-b border-gray-200 bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Join hundreds of thousands of founders just like you
          </h2>
          <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
            Entrepreneurs use CoFoundersLab every day to accelerate their
            business
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, i) => (
                <div key={i}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="mb-8 inline-block h-8 w-8 text-gray-400"
                    viewBox="0 0 975.036 975.036"
                  >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                  </svg>
                  <p className="text-lg leading-relaxed">{testimonial.text}</p>
                  <span className="mt-8 mb-6 inline-block h-1 w-10 rounded bg-blue-600"></span>
                  <h2 className="font-medium tracking-wider text-gray-900">
                    {testimonial.name}
                  </h2>
                  <p className="font-light text-gray-500">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
