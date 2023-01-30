import { ClipboardIcon, StarIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import { toast } from 'react-toastify';

import useUser from '@/hooks/useUser';

import { Header, Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';

const features = [
  {
    name: 'Save Your Money',
    description:
      'Grow your startup capabilities by paying a fraction of the price.',
    icon: StarIcon,
  },
  {
    name: 'Hand Picked Partners',
    description:
      'Curated partnerships that will help any startup meet their goals.',
    icon: StarIcon,
  },
  {
    name: 'Instant Access',
    description:
      'No wait, no fuss! Redeem your offers immediately and start saving.',
    icon: StarIcon,
  },
];

const partners = [
  // {
  //   title: 'Allo',
  //   href: 'http://allo.io',
  //   tag: 'Whiteboard Tool',
  //   code: '1GQ73n9E',
  //   offer: '20% off either monthly or annual plans for the first year.',
  //   description: (
  //     <>
  //       Allo is a startup's dream come true, combining remote collaboration and
  //       documentation with light project management.
  //     </>
  //   ),
  //   more: (
  //     <>
  //       <p>
  //         Allo's standard pricing: monthly subscriptions are $12 per
  //         member/month, and annual subscriptions are $9 per member/month.
  //       </p>
  //       <p>
  //         With our CoFoundersLab offer you can have 20% off either the monthly,
  //         or annual plans for the first year. Saving you $28.80 per year paid
  //         monthly and $58 if purchased annually/upfront, for each playing user!
  //       </p>
  //       <p>
  //         Allo is a startup's dream come true, combining remote collaboration
  //         and documentation with light project management. Clients say ""Allo
  //         brings many of our tools together. It combines the advantages of
  //         Trello, Miro, and PowerPoint. It really improves our workflow and
  //         makes our lives less complicated."" Give Allo a try today.
  //       </p>
  //     </>
  //   ),
  //   imageUrl: '/assets/images/partners/partner-sample.png',
  // },
  // {
  //   title: 'Brex',
  //   href: 'http://brex.com/cofounders',
  //   tag: 'Fintech - Bank/Card',
  //   offer:
  //     '25,000 points after spending $1,000 on the Brex Card + 30,000 bonus points through in-platform milestones.',
  //   description:
  //     'Brex is reimagining financial systems so every growing company can realize their full potential.',
  //   imageUrl: '/assets/images/partners/partner-sample.png',
  // },
  {
    title: 'Soona',
    href: 'https://soona.co/',
    tag: 'Product/People Content',
    code: 'CFL2021',
    offer: 'First photo free (value $39) and first headshot free (value $39).',
    description:
      'Soona is leading the market in cool images of people and products, particularly for DTC and E-commerce business.',
    imageUrl: '/assets/images/partners/Soona.jpg',
  },
  {
    title: 'Pipe',
    href: 'http://pipe.com/cofounderslab',
    tag: 'Non-equity funding',
    offer: '12 months of waived trade fees.',
    description:
      'Pipe is a trading platform where companies can trade their recurring revenue streams for upfront capital with institutional investors directly without debt or dilution.',
    imageUrl: '/assets/images/partners/Pipe.jpg',
  },
  {
    title: 'SlideBean',
    href: 'https://app.slidebean.com/upgrade/starter?frequency=yearly&coupon=COFLAB50OFF1YEAR',
    tag: 'Pitch Deck Templates & more',
    offer: '50% off on our Starter and Premium Plans.',
    description:
      'Slidebean is a tool that makes it easier for presenters to create professional-looking slides by taking care of the design element.',
    imageUrl: '/assets/images/partners/Slidebean.jpg',
  },
  {
    title: 'Unbounce',
    href: 'https://unbounce.com/cofounderslab',
    tag: 'Landing pages & web tools',
    offer:
      '14 day free trial, 20% off for a whole year or 20% off for 3 months on packages.',
    description:
      'Unbounce is a drag-and-drop builder that lets you create and publish your own landing pages, without needing a developer to code them.',
    imageUrl: '/assets/images/partners/Unbounce.jpg',
  },
  {
    title: 'Hubspot',
    href: 'https://www.hubspot.com/',
    tag: 'CRM/Marketing',
    offer: 'Free for the first 3 months.',
    description:
      'HubSpot is an inbound marketing and sales platform that helps companies to attract visitors, convert leads, and close customers.',
    imageUrl: '/assets/images/partners/Hubspot.jpg',
  },
  {
    title: 'Customerly',
    href: 'https://www.customerly.io/',
    tag: 'CRM & Customer service automation',
    code: 'COFOUNDERSLAB',
    offer: '$250 OFF on Startup or Pro plans.',
    description:
      'Customerly is the all-in-one platform with a simple goal: to bridge the gap between you and your customers.',
    imageUrl: '/assets/images/partners/Customerly.jpg',
  },
  {
    title: 'Undock',
    href: 'https://get.undock.com/founder?utm_source=partners&utm_medium=web&utm_campaign=cofounderslab',
    tag: 'Schedule Meetings',
    offer: 'Forever Free Offer',
    description:
      'Undock is super calender with scheduling that works like autocomplete. Say hello to the fastest way to find time to meet with anyone. With Undock you schedule, host and document all your meetings.',
    imageUrl: '/assets/images/partners/undock.png',
  },
];

const Partners: NextPage = () => {
  const { loading, loggedOut, user } = useUser();

  return (
    <Layout
      meta={
        <Meta
          title="Partners & benefits - CoFoundersLab"
          description="Partners & benefits on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      header={<Header sticky={true} />}
    >
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-14 px-4 sm:py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-2 inline-block rounded-full bg-blue-600 px-3 py-px text-sm font-semibold uppercase tracking-wider text-white">
              Partners &amp; benefits
            </h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Growth Partners
            </p>
            <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
              Get access to our partners and benefit from the deals we&apos;ve
              curated with them for you
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-gray-200 bg-gray-100 pt-12 pb-14">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              We work with the best
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Partnerships that drive your startup from Zero to One.
            </p>
          </div>
          <dl className="space-y-10 text-center lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-lg font-medium leading-6 text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-3 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-16 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-white sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Featured partners
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-lg gap-6 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner.title}
                className="flex flex-col overflow-hidden rounded-lg shadow"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={partner.imageUrl}
                    alt=""
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-600">
                      {partner.tag}
                    </p>
                    <div className="mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {partner.title}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        {partner.offer}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-grow flex-col justify-between bg-white px-6 pt-4 pb-6">
                  <p className="text-base text-gray-500">
                    {partner.description}
                  </p>
                  <div className="mt-6 flex items-center gap-5">
                    {user && user.role?.type === 'premium' ? (
                      <>
                        <a
                          href={partner.href}
                          target="_blank"
                          className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
                          rel="noreferrer"
                        >
                          Redeem
                        </a>
                        {partner.code && (
                          <button
                            onClick={async () => {
                              await navigator.clipboard.writeText(partner.code);
                              toast.success('Copied to clipboard');
                            }}
                            className="inline-flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 px-4 py-3 text-base font-medium text-gray-400 hover:bg-gray-50 active:bg-white"
                          >
                            Use code: {partner.code}
                            <ClipboardIcon className="ml-2 h-6 w-6" />
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <Link
                          href="/premium"
                          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
                        >
                          Redeem
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Partners;
