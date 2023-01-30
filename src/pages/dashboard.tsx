import { Dialog, Transition } from '@headlessui/react';
import {
  AcademicCapIcon,
  AnnotationIcon,
  CashIcon,
  ChatAlt2Icon,
  ChevronRightIcon,
  InformationCircleIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';

import useUser from '@/hooks/useUser';

import Forbidden from '@/components/Forbidden';
import { Layout, Meta } from '@/components/layout';
import Loading from '@/components/Loading';

interface IFeature {
  name: string;
  description: string;
  href?: string;
  onClick?: () => void;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

const cta = [
  {
    id: 1,
    title: 'Find a CoFounder',
    description: 'Use filters to get the perfect CoFounder',
    href: '/search',
    icon: UsersIcon,
  },
  {
    id: 2,
    title: 'Start a course',
    description: '15 Courses to choose from',
    href: 'https://learn.cofounderslab.com/',
    icon: AcademicCapIcon,
  },
  {
    id: 3,
    title: 'Discuss',
    description: 'Endless conversations with founders',
    href: '/discuss',
    icon: ChatAlt2Icon,
  },
];
const recomend = [
  {
    id: 1,
    title: 'Find a CoFounder',
    desc: 'Use filters to get the perfect CoFounder',
    img: '/assets/dashboard/recomend1.png',
    path: '#',
  },
  {
    id: 2,
    title: 'Start a course',
    desc: '15 Courses to choose from',
    img: '/assets/dashboard/recomend2.png',
    path: '#',
  },
  {
    id: 3,
    title: 'Discuss',
    desc: 'Endless conversations with founders',
    img: '/assets/dashboard/recomend3.png',
    path: '#',
  },
];
const raise = [
  {
    id: 1,
    title: 'Find an investor',
    desc: 'Potential to connect you to more than 200+ VCs that are actively investing in startups just like yours',
    img: '/public/assets/dashboard/investor.png',
    path: 'https://funden.app/register/cofounderslab',
  },
  // {
  //   id: 2,
  //   title: 'Pitch to an investor with Expert Dojo ',
  //   desc: 'Access to major institutional and authorized investors to give your startup a competitive advantage.',
  //   img: investor,
  // },
  // {
  //   id: 3,
  //   title: 'Non-dilutive capital with Pipe',
  //   desc: 'Have instant access to your annual cash flow.',
  //   img: capital,
  // },
];
const community = [
  {
    id: 1,
    title: 'Communities',
    desc: 'Join the dynamic community of innovators, entrepreneurs & industry leaders.',
    img: '/assets/dashboard/communicate.png',
    path: '#',
  },
  {
    id: 2,
    title: 'Forum ',
    desc: 'Join forums on various platforms for the exchange of business expertise.',
    img: '/assets/dashboard/forum.png',
    path: '#',
  },
  {
    id: 3,
    title: 'Events',
    desc: 'Get exclusive access to events on the platform to network your business.',
    img: '/assets/dashboard/events.png',
    path: '#',
  },
];
const connect = [
  {
    id: 1,
    title: 'Find a CoFounder',
    desc: 'Find the perfect CoFounder based on interests, skills, and location.',
    img: '/assets/dashboard/founder.png',
    path: '/search',
  },
  {
    id: 2,
    title: 'Talk to an advisor',
    desc: 'Get professional advice from industry experts.',
    img: '/assets/dashboard/team.png',
    path: 'https://advisors.cofounderslab.com/',
  },
  {
    id: 3,
    title: 'Update your profile',
    desc: 'Optimize your quality of connections.',
    img: '/assets/dashboard/conversation.png',
    path: '/settings/profile',
  },
  // {
  //   id: 4,
  //   title: 'Find a Startup',
  //   desc: 'Be a pioneer member of an innovative startup.',
  //   img: startup,
  // },
  {
    id: 5,
    title: 'Messaging',
    desc: 'We can take this out, as we have a message icon at the top right.',
    img: '/assets/dashboard/email.png',
    path: '#',
  },
];
const collaborate = [
  // {
  //   id: 1,
  //   title: 'Video Chat',
  //   desc: "we do not beed to use 'CFL' in features",
  //   img: video,
  // },
  // {
  //   id: 2,
  //   title: '‘Scheduling’ provided by Undock',
  //   desc: 'Real-time scheduling and calendar sharing.',
  //   img: schdule,
  // },
  // {
  //   id: 3,
  //   title: 'Advisor Search',
  //   desc: 'Manage sales and marketing activities through HubSpot.',
  //   img: advisor,
  // },
  // {
  //   id: 4,
  //   title: 'Real-time Collaboration via Allo',
  //   desc: 'Real-time project management and visual discussion with Allo.',
  //   img: collobrate,
  // },
  {
    id: 1,
    title: 'Discuss',
    desc: 'Join endless conversations with entrepreneurs.',
    img: '/assets/dashboard/video.png',
    path: '/discuss',
  },
  {
    id: 2,
    title: 'Collaborate with our partners',
    desc: "CoFoundersLab has partnered up with some the most prestigious companies that'll help benefit you through your startup journey.",
    img: '/assets/dashboard/advisor.png',
    path: '/partners',
  },
];
const educate = [
  {
    id: 1,
    title: 'Learning Center',
    desc: 'Access to 16 modules, hundreds of hours of content, and amazing advisors with one click.',
    img: '/public/assets/dashboard/learn.png',
    path: 'https://learn.cofounderslab.com',
  },
  {
    id: 2,
    title: 'How to build a rockstar team',
    desc: 'Build a rockstar team with like-minded people.',
    img: '/public/assets/dashboard/foundation.png',
    path: 'https://learn.cofounderslab.com/p/building-a-rockstar-team',
  },
  // {
  //   id: 3,
  //   title: 'Holloway Publishing',
  //   desc: 'Need to know how does this feature benefit members.',
  //   img: publish,
  // },
  // {
  //   id: 4,
  //   title: 'Audvisor (Audible Mentoring)',
  //   desc: 'Hear and learn from the professionals in a specific industry.',
  //   img: mentor,
  // },
  // {
  //   id: 5,
  //   title: 'CFL Academy (Coming Soon)',
  //   desc: 'A great place to develop company concepts and gain practical experience.',
  //   img: acedmy,
  // },
];
const testimonial = [
  {
    id: 1,
    title: 'Tim Collins',
    profession: 'Marketing Director',
    desc: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.."',
    img: '/assets/dashboard/testimonial1.png',
  },
  {
    id: 2,
    title: 'Tim Collins',
    profession: 'Marketing Director',
    desc: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.."',
    img: '/assets/dashboard/testimonial2.png',
  },
  {
    id: 3,
    title: 'Tim Collins',
    profession: 'Marketing Director',
    desc: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.."',
    img: '/assets/dashboard/testimonial3.png',
  },
  {
    id: 4,
    title: 'Tim Collins',
    profession: 'Marketing Director',
    desc: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.."',
    img: '/assets/dashboard/testimonial3.png',
  },
  {
    id: 5,
    title: 'Tim Collins',
    profession: 'Marketing Director',
    desc: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.."',
    img: '/assets/dashboard/testimonial3.png',
  },
];
const faqs = [
  {
    question:
      "What's the difference between Basic Membership and Premium Membership? How do I get a Premium membership?",
    answer:
      'Premium members enjoy advanced features such as priority listing in search results, unlimited messaging, recommended candidates, and access to special entrepreneur resources. Basic members can complete basic searches for CoFounders and initiate conversations with up to 3 potential CoFounder candidates each month. See the <a href="/premium#benefits" class=" text-blue-600 hover:text-blue-500">full comparison</a> between Basic and Premium membership.<br><br><a href="/premium#benefits"><span class="btn btn-wired btn-wired-yellow  text-blue-600 hover:text-blue-500">Go Premium today</span></a>',
  },
  {
    question: 'How do I cancel my Premium membership subscription?',
    answer:
      'If you would like to cancel your Premium membership please visit your <a href="/dashboard/settings" class="text-blue-600 hover:text-blue-500">Settings</a> page. Your Premium membership will be effectively canceled at the end of its current term.',
  },
  {
    question: 'How does messaging work?',
    answer:
      '<p> Premium members have unlimited messaging capabilities. They can message as many candidates as they please as often as they like. </p>' +
      "<p> Basic members can initiate a conversation with up to 3 potential candidates each month. Messaging back and forth with a single candidate does not count against your monthly limit. Replying to a message you've received also does not count against your monthly limit. </p>" +
      '<p><br>You can find out how many initial messages you have remaining by visiting your <a href="/dashboard/messages" class="text-blue-600 hover:text-blue-500">Message Center</a>. Messages do not roll over from one month to another. The monthly limit resets for all Basic members on the 1st of each month (January 1st, February 1st, etc.)',
  },
  {
    question: 'How do I hide or delete my profile?',
    answer:
      '<p>Most members look to delete their profile because they have put their project on' +
      " hold or don't wish to be displayed in the search results. For this reason, we" +
      ' have developed two features to help you hide your name and profile while still' +
      " having access to the platform's resources.</p> <p><em>Don't want your name" +
      ' visible? </em>You can remain anonymous by <a href="/profile/" class="text-blue-600 hover:text-blue-500">' +
      ' checking the box "Use alias"</a> when editing your name on your profile. You can then stay' +
      ' hidden under a pseudonym until you are comfortable sharing your real name.</p>' +
      " <p><em>Don't want your profile listed? </em>If your project is on hold or you've" +
      ' found your match, just select "Hidden" under' +
      ' <a href="/dashboard/settings" class="text-blue-600 hover:text-blue-500">' +
      ' "Profile" in "Account settings"</a> and it will remove you from the search' +
      " results until you're ready to get back in the game.</p> <p>If you would like your" +
      ' account deleted completely, please visit your' +
      ' <a href="/dashboard/settings" class="text-blue-600 hover:text-blue-500">Settings</a> page.</p>',
  },
  {
    question: 'How can I get my profile to the top of the search results?',
    answer:
      '<p>Search results are ordered first by Premium members, then by Basic members.<br><strong>' +
      ' <a href="/premium#benefits" class="text-blue-600 hover:text-blue-500">Upgrade to Premium membership</a> ' +
      ' to ensure that your profile is always listed' +
      ' toward the top of the search results</strong>.</p> <p>After membership status, the' +
      ' search results are then ordered by members who have most recently logged into their' +
      ' account. Staying active by logging in frequently is another great way to get your' +
      ' profile featured.</p>',
  },
  {
    question:
      "I'm not receiving many responses to my messages. What's the deal?",
    answer:
      "<p>There may be a few reasons for this. Some are simply out of your control so don't" +
      ' fret too much!</p> <p>We do our best to ensure that our community consists of highly' +
      ' qualified candidates and rely on the crowd to rank and surface the most promising' +
      ' entrepreneurs. However, some entrepreneurs are passively seeking a CoFounder and' +
      ' simply ignore all requests. Others who are actively searching may lack the courtesy' +
      " of notifying you if they're just not interested. In most cases, they may not be" +
      " interested simply because they didn't feel you were a good fit.</p> <p>To improve" +
      ' the chance of eliciting a reply, try a few of the following tips:</p> <p>First, be' +
      ' sure to personalize your message. Why do you feel that this person in particular' +
      ' would be a good potential candidate, especially when there are thousands of other' +
      ' people to consider? What unique assets or skills do you bring that complement that' +
      ' person?</p> <p>Next, you may be due for a touch-up of your profile. In addition to' +
      ' completing your profile (or getting it as close to 100% as possible), make sure that' +
      ' you have written an insightful summary and added more skills, certifications (if' +
      ' applicable), and maybe even some events you frequently attend. A video, even one' +
      ' taken from your smartphone or webcam, will help give your profile some life and help' +
      " you stand out. Make sure you've connected your CoFoundersLab profile to your social" +
      ' media pages like Linkedin, Facebook and Twitter; this helps potential candidates do' +
      ' a little more digging on you to determine if it makes sense to connect.</p>',
  },
  {
    question: 'Can I use this site if I already have started a business?',
    answer:
      "<p>Yes, especially if you are looking for advisers and interns. If you've already" +
      'launched your business, and are looking to bring on a CoFounder; be prepared to' +
      'share in key decisions and be willing to grant significant equity. By "significant"' +
      'consider somewhere in the neighborhood of 5% or more.</p> <p>Still have questions?' +
      ' <a href="/contact" class="text-blue-600 hover:text-blue-500">Contact us</a>.</p>',
  },
];

const MainFeature = (feature: IFeature) => {
  const LinkWrapper = ({ action, children }: any) => (
    <Link href={action}>
      <a>{children}</a>
    </Link>
  );
  const ButtonWrapper = ({ action, children }: any) => (
    <a onClick={action} className="cursor-pointer">
      {children}
    </a>
  );

  const ClickWrapper = feature.href ? LinkWrapper : ButtonWrapper;

  return (
    <div className="mb-5">
      <dt className="flex flex-row items-center lg:flex-col lg:items-start">
        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-600 text-white">
          <ClickWrapper action={feature.href || feature.onClick}>
            {feature.icon && (
              <feature.icon className="h-6 w-6" aria-hidden="true" />
            )}
          </ClickWrapper>
        </span>
        <p className="ml-4 text-lg font-medium leading-6 tracking-tight text-gray-900 hover:text-blue-600 lg:mt-5 lg:ml-0">
          <ClickWrapper action={feature.href || feature.onClick}>
            {feature.name} <span className="ml-2 inline-block">&rarr;</span>
          </ClickWrapper>
        </p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500 lg:ml-0">
        {feature.description}
      </dd>
    </div>
  );
};

const SmallFeature = (feature: IFeature) => {
  return (
    <div className="mb-6">
      <dt>
        {feature.icon ? (
          <feature.icon
            className="absolute h-6 w-6 text-blue-600"
            aria-hidden="true"
          />
        ) : (
          <ChevronRightIcon
            className="absolute h-6 w-6 text-blue-600"
            aria-hidden="true"
          />
        )}
        <p className="ml-9 text-lg font-medium leading-6 tracking-tight text-gray-900">
          {feature.href ? (
            <Link href={feature.href}>
              <a className="hover:text-blue-600">{feature.name}</a>
            </Link>
          ) : (
            <a
              onClick={feature.onClick}
              className="cursor-pointer hover:text-blue-600"
            >
              {feature.name}
            </a>
          )}
        </p>
      </dt>
      <dd className="mt-2 ml-9 text-base text-gray-500">
        {feature.description}
      </dd>
    </div>
  );
};

const Modal = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 sm:align-middle">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <InformationCircleIcon
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="py-2 text-xl font-medium leading-6 text-gray-900"
                  >
                    How to
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Ideally here would be a short video or gif that shows the
                      user how to perform a certain action. It should be quick
                      and to the point, under 10 seconds.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 justify-center sm:mt-4 sm:flex">
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default function Dashboard() {
  const { loading, loggedOut, user, mutate } = useUser();
  const [open, setOpen] = useState(false);

  if (loading) return <Loading />;
  if (loggedOut) return <Forbidden />;

  const connectContent = () => (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:py-20 lg:px-8">
        <div>
          <p className="text-4xl font-extrabold tracking-wide text-gray-900">
            Connect
          </p>
          <p className="mt-4 text-lg text-gray-500">
            Find CoFounders, team members, advisors, and investors from a
            community of more than 400K members
          </p>
        </div>
        <dl className="mt-12 lg:col-span-1 lg:mt-0">
          {[
            {
              name: 'Find a CoFounder',
              href: '/search',
              description:
                'Find the perfect CoFounder based on interests, skills, and location.',
              icon: UsersIcon,
            },
            {
              name: 'Talk to an advisor',
              href: 'https://advisors.cofounderslab.com/',
              description: 'Get professional advice from industry experts.',
              icon: AnnotationIcon,
            },
          ].map((feature) => (
            <MainFeature key={feature.name} {...feature} />
          ))}
        </dl>
        <dl className="mt-12 lg:col-span-1 lg:mt-0">
          {[
            {
              name: 'Update your profile',
              href: '/settings/profile',
              description: 'Optimize your quality of connections.',
            },
          ].map((feature) => (
            <SmallFeature key={feature.name} {...feature} />
          ))}
        </dl>
      </div>
    </div>
  );

  const collaborateContent = () => (
    <div className="border-t border-b border-gray-200 bg-gray-100">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:py-20 lg:px-8">
        <div>
          <p className="text-4xl font-extrabold tracking-wide text-gray-900">
            Collaborate
          </p>
          <p className="mt-4 text-lg text-gray-500">
            Connect, message, and video Chat with over 625,000 entrepreneurs.
          </p>
        </div>
        <dl className="mt-12 lg:col-span-1 lg:mt-0">
          {[
            {
              name: 'Discuss',
              href: '/discuss',
              description: 'Join endless conversations with entrepreneurs.',
              icon: ChatAlt2Icon,
            },
          ].map((feature) => (
            <MainFeature key={feature.name} {...feature} />
          ))}
        </dl>
        <dl className="mt-12 lg:col-span-1 lg:mt-0">
          {[
            {
              name: 'Collaborate with our partners',
              href: '/partners',
              description:
                "CoFoundersLab has partnered up with some the most prestigious companies that'll help benefit you through your startup journey. ",
            },
            // {
            //   name: 'Schedule a video call',
            //   description:
            //     'Live video chat with other members in the community.',
            //   icon: InformationCircleIcon,
            //   onClick: () => {
            //     setOpen(true);
            //   },
            // },
            // {
            //   name: 'Connect with other members',
            //   description: 'Make valuable connections within the community.',
            //   icon: InformationCircleIcon,
            //   onClick: () => {
            //     setOpen(true);
            //   },
            // },
          ].map((feature) => (
            <SmallFeature key={feature.name} {...feature} />
          ))}
        </dl>
      </div>
    </div>
  );

  const educateContent = () => (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:py-20 lg:px-8">
        <div>
          <p className="text-4xl font-extrabold tracking-wide text-gray-900">
            Educate
          </p>
          <p className="mt-4 text-lg text-gray-500">
            Grow your knowledge and expertise to get your startup from Zero to
            One.
          </p>
        </div>
        <dl className="mt-12 lg:col-span-1 lg:mt-0">
          {[
            {
              name: 'Learning Center',
              href: 'https://learn.cofounderslab.com',
              description:
                'Access to 16 modules, hundreds of hours of content, and amazing advisors with one click.',
              icon: AcademicCapIcon,
            },
          ].map((feature) => (
            <MainFeature key={feature.name} {...feature} />
          ))}
        </dl>
        <dl className="mt-12 lg:col-span-1 lg:mt-0">
          {[
            // {
            //   name: 'Actionable insights in a micro-podcast',
            //   href: '/partners',
            //   // href: '/partners/audvisor',
            //   description: 'Hear and learn from global business leaders.',
            // },
            // {
            //   name: 'Startup Books Bundle',
            //   href: '/partners',
            //   // href: '/partners/holloway',
            //   description:
            //     'Educate your startup with our exclusive business books.',
            // },
            {
              name: 'How to build a rockstar team',
              href: 'https://learn.cofounderslab.com/p/building-a-rockstar-team',
              description: 'Build a rockstar team with like-minded people.',
            },
          ].map((feature) => (
            <SmallFeature key={feature.name} {...feature} />
          ))}
        </dl>
      </div>
    </div>
  );

  const raiseContent = () => (
    <div className="border-t border-b border-gray-200 bg-gray-100">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:py-20 lg:px-8">
        <div>
          <p className="text-4xl font-extrabold tracking-wide text-gray-900">
            Raise
          </p>
          <p className="mt-4 text-lg text-gray-500">
            Learn how to pitch to investors, create a pitch deck, and practice
            your pitch.
          </p>
        </div>
        <dl className="mt-12 lg:col-span-1 lg:mt-0">
          {[
            {
              name: 'Find an investor',
              href:
                user &&
                `https://funden.app/register/cofounderslab?first_name=${user?.profile?.firstName}&last_name=${user?.profile?.lastName}&email=${user.email}`,
              description:
                'Potential to connect you to more than 200+ VCs that are actively investing in startups just like yours',
              icon: CashIcon,
            },
          ].map((feature) => (
            <MainFeature key={feature.name} {...feature} />
          ))}
        </dl>

        {/* <dl className="mt-12 lg:mt-0 lg:col-span-1">
          {[
            {
              name: 'Startup Accelerator',
              href: '/partners',
              // href: '/partners/expert-dojo',
              description:
                'Join the 8-week program to access essential tools for success.',
            },
            {
              name: 'Non-dilutive capital',
              href: '/partners',
              // href: '/partners/pipe',
              description:
                'Grow on your terms. Instant access to your cash flow.',
            },
          ].map((feature) => (
            <SmallFeature key={feature.name} {...feature} />
          ))}
        </dl> */}
      </div>
    </div>
  );

  // function SampleNextArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={` none absolute top-40 -z-20  bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] lg:right-[-40px] lg:z-10 `}
  //       style={{
  //         ...style,
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         width: '42px',
  //         height: '41px',
  //         borderRadius: '4px',
  //         backgroundColor: '#2F80ED',
  //       }}
  //       onClick={onClick}
  //     >
  //       <Image src={Images.right} />
  //     </div>
  //   );
  // }

  // function SamplePrevArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={` absolute top-40 -z-20  bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] lg:left-[-40px] lg:z-10`}
  //       style={{
  //         ...style,
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         width: '42px',
  //         height: '41px',
  //         borderRadius: '4px',
  //         backgroundColor: '#2F80ED',
  //       }}
  //       onClick={onClick}
  //     >
  //       <Image src={Images.left} />
  //     </div>
  //   );
  // }

  // var settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  //   responsive: [
  //     {
  //       breakpoint: 1224,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         infinite: true,
  //         dots: true,
  //         arrow: false,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };
  return (
    <Layout
      meta={
        <Meta
          title="Dashboard - CoFoundersLab"
          description="Dashboard on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      {/* <div className="laptop:flex-no-wrap mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-[75px] gap-y-[75px] pt-[59px] pb-[51px]">
        <div className=" relative h-[449px] w-[469px] rounded-full bg-[#F1F1F1]">
          <div className="absolute bottom-[43px]">
            <Image src={Images.heroSection} height={380} width={555} />
          </div>
        </div>
        <div>
          <p className="text-center font-Quicksand text-[58px] font-bold text-[#2F80ED] lg:text-left">
            Welcome Tim Collins,
          </p>
          <p className="text-center font-Quicksand text-[58px] font-bold text-[#282B4D] lg:text-left">
            To Your New <br /> Dashboard
          </p>
          <p className="my-[15px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D] lg:text-left">
            CoFoundersLab enables you to connect with members, collaborate on
            ideas, <br /> and be educated to bring your startup to the next
            level.
          </p>
          <div className="text-center lg:text-left">
            <button className="  rounded-lg bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] px-[18px] py-[15px] text-left font-Quicksand text-[14px] font-normal text-white  ">
              View Premium features
            </button>
          </div>
        </div>
      </div> */}
      {/* .......Recomend for you..... */}
      {/* <div className="mx-auto max-w-7xl pt-[45px] ">
        <p className=" text-center font-Quicksand text-[30px] font-bold text-[#282B4D] md:text-[58px]">
          Recommended For you
        </p>
        <p className="mb-[15px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
          Start the process of turning your startup into a lucrative business.
        </p>
        <div className="relative mt-[61px] flex flex-wrap items-center justify-center gap-x-[20px] gap-y-[20px] bg-[#F8F7FC] pt-[20px] pb-[55px] lg:justify-start">
          <div className="absolute top-[-32%] hidden lg:block">
            <Image src={Images.recomend} />
          </div>
          {recomend.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex h-[310px] w-[376px] flex-col items-center justify-center bg-white px-[10px] shadow-[0_7px_44px_#B9B9B929] lg:basis-[30%] "
              >
                <img src={item.img.src} alt="" />
                <p className="mt-[25px] text-center font-Quicksand text-[23px] font-bold text-[#282B4D]">
                  {item.title}
                </p>
                <p className="mt-[8px] mb-[29px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
                  {item.desc}
                </p>
                <button className="hover:cursor-pointer">
                  <Link href={item.path}>
                    <Image src={Images.leftArrow} />
                  </Link>
                </button>
              </div>
            );
          })}
        </div>
      </div> */}

      {/* ......Connect.... */}
      {/* <div className="mx-auto max-w-7xl pt-[45px] ">
        <p className=" text-center font-Quicksand text-[58px] font-bold text-[#282B4D]">
          Connect
        </p>
        <p className="mb-[15px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
          Find CoFounders, team members, advisors, and investors from a
          community of more than 400K members
        </p>
        <div className="relative mt-[43px] flex flex-wrap items-center justify-center gap-x-[20px] gap-y-[20px] bg-[#F8F7FC] pt-[20px] pb-[55px] lg:justify-start">
          <div className="absolute top-[-22%] left-[23%] -z-10 hidden lg:block">
            <Image src={Images.connect} />
          </div>
          {connect.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex h-[310px] w-[376px] flex-col items-center justify-center bg-white px-[10px] shadow-[0_7px_44px_#B9B9B929] lg:basis-[30%] "
              >
                <img src={item.img.src} alt="" />
                <p className="mt-[25px] text-center font-Quicksand text-[23px] font-bold text-[#282B4D]">
                  {item.title}
                </p>
                <p className="mt-[8px] mb-[29px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
                  {item.desc}
                </p>
                <button className="hover:cursor-pointer">
                  <Link href={item.path}>
                    <Image src={Images.leftArrow} />
                  </Link>
                </button>
              </div>
            );
          })}
        </div>
      </div> */}
      {/* ......collaborate...... */}
      {/* <div className="mx-auto max-w-7xl pt-[45px] ">
        <p className=" text-center font-Quicksand text-[58px] font-bold text-[#282B4D]">
          Collaborate
        </p>
        <p className="mb-[15px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
          Connect, message, and video Chat with over 625,000 entrepreneurs.
        </p>
        <div className="relative mt-[43px] flex flex-wrap items-center justify-center gap-x-[20px] gap-y-[20px] bg-[#F8F7FC] pt-[20px] pb-[55px] lg:justify-start">
          <div className=" absolute top-[-42%] left-[10%] -z-10  hidden lg:block">
            <Image src={Images.collobrateSection} />
          </div>
          {collaborate.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex h-[310px] w-[376px] flex-col items-center justify-center bg-white px-[10px] shadow-[0_7px_44px_#B9B9B929] lg:basis-[30%] "
              >
                <img src={item.img.src} alt="" />
                <p className="mt-[25px] text-center font-Quicksand text-[23px] font-bold text-[#282B4D]">
                  {item.title}
                </p>
                <p className="mt-[8px] mb-[29px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
                  {item.desc}
                </p>

                <button className="hover:cursor-pointer">
                  <Link href={item.path}>
                    <Image src={Images.leftArrow} />
                  </Link>
                </button>
              </div>
            );
          })}
        </div>
      </div> */}
      {/* ......Educate........ */}
      {/* <div className="mx-auto max-w-7xl pt-[45px] ">
        <p className=" text-center font-Quicksand text-[58px] font-bold text-[#282B4D]">
          Educate
        </p>
        <p className="mb-[15px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
          Grow your knowledge and expertise to get your startup from Zero to
          One.
        </p>
        <div className="relative mt-[43px] flex flex-wrap items-center justify-center gap-x-[20px] gap-y-[20px] bg-[#F8F7FC] pt-[20px] pb-[55px] lg:justify-start">
          <div className=" absolute top-[-42%] left-[24%] -z-10 hidden lg:block">
            <Image src={Images.educateSection} />
          </div>
          {educate.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex h-[310px] w-[376px] flex-col items-center justify-center bg-white px-[10px] shadow-[0_7px_44px_#B9B9B929] lg:basis-[30%]  "
              >
                <img src={item.img.src} alt="" />
                <p className="mt-[25px] text-center font-Quicksand text-[23px] font-bold text-[#282B4D]">
                  {item.title}
                </p>
                <p className="mt-[8px] mb-[29px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
                  {item.desc}
                </p>
                <button className="hover:cursor-pointer">
                  <Link href={item.path}>
                    <Image src={Images.leftArrow} />
                  </Link>
                </button>
              </div>
            );
          })}
        </div>
      </div> */}
      {/* ......Raise........ */}
      {/* <div className="mx-auto max-w-7xl pt-[45px] ">
        <p className=" text-center font-Quicksand text-[58px] font-bold text-[#282B4D]">
          Raise
        </p>
        <p className="mb-[15px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
          Learn how to pitch to investors, create a pitch deck, and practice
          your pitch.
        </p>
        <div className="relative mt-[43px] flex flex-wrap items-center justify-center gap-x-[20px] gap-y-[20px] bg-[#F8F7FC] pt-[20px] pb-[55px] lg:justify-start">
          <div className=" absolute left-[34%] top-[-40%] hidden lg:block ">
            <Image src={Images.raiseSection} />
          </div>
          {raise.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex h-[310px] w-[376px] flex-col items-center justify-center bg-white px-[10px] shadow-[0_7px_44px_#B9B9B929] lg:basis-[30%] "
              >
                <img src={item.img.src} alt="" />
                <p className="mt-[20px] text-center font-Quicksand text-[20px] font-bold text-[#282B4D]">
                  {item.title}
                </p>
                <p className="mt-[8px] mb-[15px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
                  {item.desc}
                </p>
                <button className="hover:cursor-pointer">
                  <Link href={item.path}>
                    <Image src={Images.leftArrow} />
                  </Link>
                </button>
              </div>
            );
          })}
        </div>
      </div> */}
      {/* ......Community....... */}
      {/* <div className="mx-auto max-w-7xl pt-[45px] ">
        <p className=" text-center font-Quicksand text-[58px] font-bold text-[#282B4D]">
          Community
        </p>
        <p className="mb-[15px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
          Get access to over 400,000 potential CoFounders, team members, and
          advisors on the largest startup platform on the planet.
        </p>
        <div className="relative mt-[43px] flex flex-wrap items-center justify-center gap-x-[20px] gap-y-[20px] bg-[#F8F7FC] pt-[20px] pb-[55px] lg:justify-start">
          <div className=" absolute top-[-41%] left-[15%] -z-10 hidden lg:block">
            <Image src={Images.communitySection} />
          </div>
          {community.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex h-[310px] w-[376px] flex-col items-center justify-center bg-white shadow-[0_7px_44px_#B9B9B929] lg:basis-[30%]  "
              >
                <img src={item.img.src} alt="" />
                <p className="mt-[25px] text-center font-Quicksand text-[23px] font-bold text-[#282B4D]">
                  {item.title}
                </p>
                <p className="mt-[8px] mb-[29px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
                  {item.desc}
                </p>
                <button className="hover:cursor-pointer">
                  <Link href={item.path}>
                    <Image src={Images.leftArrow} />
                  </Link>
                </button>
              </div>
            );
          })}
        </div>
      </div> */}
      {/* <div className="mx-auto my-[42px] max-w-7xl bg-slate-50">
        <p className=" text-center font-Quicksand text-[58px] font-bold text-[#282B4D]">
          Watch Case Studies
        </p>
        <p className="mxt-[15px] mb-[52px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
          Watch case studies from successful entrepreneurs to learn how to
          manage, grow, and turn around a <br /> startup.
        </p>
        <Slider {...settings}>
          {testimonial.map((item, index) => {
            return (
              <div
                key={item.id}
                className=" flex  h-[310px] flex-col items-center justify-center bg-white "
              >
                <img src={item.img.src} />
                <p className="mt-[25px] text-center font-Quicksand text-[23px] font-bold leading-7 text-[#282B4D]">
                  {item.title}
                </p>
                <p className=" text-center font-Quicksand text-[23px] font-bold leading-5 text-[#282B4D]">
                  {item.profession}
                </p>
                <p className="mt-[20px] mb-[29px] text-center font-Quicksand text-[16px] font-normal text-[#282B4D]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </Slider>
      </div> */}
      <div className="border-t-2 border-b border-gray-200 bg-gray-100">
        <div className="relative pt-12">
          <h2 className="text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Welcome {user && user?.profile?.firstName},
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">
            Dive right in or scroll to learn more about everything we can do for
            you
          </p>
        </div>
        <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
          <dl className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {cta.map((item) => (
              <Link key={item.id} href={item.href}>
                <div className="relative cursor-pointer overflow-hidden rounded-lg bg-white px-4 pt-5 pb-5 shadow hover:bg-blue-100 sm:px-6 sm:pt-6">
                  <dt>
                    <div className="absolute rounded-md bg-blue-600 p-3">
                      <item.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="ml-16 text-2xl font-semibold text-gray-900">
                      {item.title}
                    </p>
                  </dt>
                  <dd className="ml-16 flex items-baseline">
                    <p className="truncate text-sm font-medium text-gray-500">
                      {item.description}
                    </p>
                  </dd>
                </div>
              </Link>
            ))}
          </dl>
        </div>
      </div>

      {connectContent()}
      {collaborateContent()}
      {educateContent()}
      {raiseContent()}

      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Can’t find the answer you’re looking for? Reach out to our{' '}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  customer support
                </a>{' '}
                team.
              </p>
            </div>
            <div className="mt-12 lg:col-span-2 lg:mt-0">
              <dl className="space-y-12">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-lg font-medium leading-6 text-gray-900">
                      {faq.question}
                    </dt>
                    <dd
                      className="mt-2 text-base text-gray-500"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    ></dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} setOpen={setOpen} />
    </Layout>
  );
}
