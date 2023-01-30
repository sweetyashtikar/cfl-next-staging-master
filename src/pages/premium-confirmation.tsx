import { StarIcon } from '@heroicons/react/outline';
import confetti from 'canvas-confetti';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import Stripe from 'stripe';

import { Layout, Meta } from '@/components/layout';

import * as ga from '@/helpers/ga';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
});

const features = [
  {
    name: 'Find a CoFounder',
    description:
      'You now have access to extra filters to find your perfect match faster.',
    href: '/search',
    hrefText: 'Start searching',
    icon: StarIcon,
  },
  {
    name: 'Learning Center',
    description: 'Access the learning center with hours of startup knowledge.',
    href: 'https://learn.cofounderslab.com',
    hrefText: 'Start learning',
    icon: StarIcon,
  },
  {
    name: 'Partners & benefits',
    description:
      "Benefit from the deals we've curated with our partners for you.",
    href: '/search',
    hrefText: 'Start saving',
    icon: StarIcon,
  },
];

export default function PremiumConfirmation({ session }: any) {
  useEffect(() => {
    if (session) {
      setTimeout(() => {
        ga.event('purchase', {
          transaction_id: session.subscription,
          value: session.amount_total / 100,
          currency: 'USD',
          items: [
            {
              name:
                session.amount_total === 2900
                  ? 'Monthly Premium'
                  : 'Yearly Premium',
              category: 'Subscription',
              quantity: 1,
              price: session.amount_total / 100,
            },
          ],
        });
      }, 200);
    }
  }, [session]);

  const count = 300;
  const defaults = {
    origin: { y: 0.55 },
  };

  const fire = (particleRatio: number, opts: any) => {
    confetti({
      ...defaults,
      ...opts,
      ...{
        particleCount: Math.floor(count * particleRatio),
      },
    });
  };

  const popConfetti = () => {
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    popConfetti();
  });

  return (
    <Layout
      meta={
        <Meta
          title="Thank you for joining Premium - CoFoundersLab"
          description="Thank you for joining premium on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <div className="overflow-hidden bg-white">
        <div className="relative">
          {/* Decorative background image and gradient */}
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
              <img
                src="/assets/images/congratulations-splash.jpg"
                alt="Happy group of entrepreneurs"
                className="-mt-28 h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-white bg-opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
          </div>

          {/* Callout */}
          <section
            aria-labelledby="sale-heading"
            className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-60 pb-20 text-center sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <h2
                id="sale-heading"
                className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
              >
                Congratulations!
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
                You are now a premium member
              </p>
            </div>
          </section>

          {/* Testimonials */}
          <section
            aria-labelledby="testimonial-heading"
            className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32"
          >
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <h2
                id="testimonial-heading"
                className="text-center text-2xl font-extrabold text-orange-600 sm:text-3xl"
              >
                Start using your superpowers
              </h2>

              <dl className="mt-20 space-y-16 text-center lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                {features.map((feature) => (
                  <div key={feature.name}>
                    <dt>
                      <p className="text-lg font-medium leading-6 text-gray-900">
                        {feature.name}
                      </p>
                    </dt>
                    <dd className="mt-4 px-10 text-base text-gray-500">
                      <p>{feature.description}</p>

                      <p className="mt-5">
                        <a
                          href={feature.href}
                          target="_blank"
                          className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-blue-600 px-5 py-2 text-base font-medium text-white hover:bg-blue-700"
                          rel="noreferrer"
                        >
                          {feature.hrefText}
                        </a>
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </div>

        <div className="pb-10 text-center">
          <button
            className="inline bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent active:opacity-70"
            onClick={() => {
              popConfetti();
            }}
          >
            More confetti
          </button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { session_id },
}) => {
  let session = null;
  if (session_id) {
    session = await stripe.checkout.sessions.retrieve(session_id.toString());
  }
  return {
    props: {
      session,
    },
  };
};
