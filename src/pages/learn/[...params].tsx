import { useRouter } from 'next/router';
import Script from 'next/script';
import { ParsedUrlQuery } from 'querystring';

import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';
import Loading from '@/components/Loading';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const posts = [
  {
    title: 'Playbook To Launch Your Startup',
    slug: 'playbook-to-launch-your-startup',
    sub_text:
      'Learn how to build a minimum viable product. Launch your startup. Grow your business.',
    description:
      "Increase your chances of building a successful startup. \n\nBringing a product or service to market involves a steep learning curve full of trial and errors. With this course, you will leapfrog forward by getting access to a comprehensive roadmap on how to launch a startup. Why do it the hard way? Build on top of what others have learned. We often hear about billion-dollar startup success stories, but little about how they did it. We're here to provide that information. We cover it all — from building your Minimum Viable Product (MVP) to testing your assumptions, reiterating, and finding your product market fit as quickly as possible.",
    description2:
      '<h2 style="font-size:26px;font-weight:bold;margin-bottom:10px;">Why you need this course</h2>' +
      '<ul style="list-style-type:circle;margin-left:20px;">' +
      '<li style="margin-bottom:5px;font-size:18px;">A great idea is 1% of the work. Execution is 99%</li>' +
      '<li style="margin-bottom:5px;font-size:18px;">Your idea won\'t likely resonate with the market at first. How do you adjust?</li>' +
      '<li style="margin-bottom:5px;font-size:18px;">There are best practices to follow to increase your success rate; most people don’t know them</li>' +
      '<li style="margin-bottom:5px;font-size:18px;">Why take the long road to success when you can get a nice short cut?</li>' +
      '</ul>',
    href: '/learn/playbook-to-launch-your-startup',
    promo_url: '',
    cover_url: 'https://www.filepicker.io/api/file/zR8yatSISHe9mgiKgvr5',
    category: { name: 'Article' },
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '6 min',
    author: {
      name: 'Erica Duigna',
      about:
        'Erica has been an early-stage investor for over a decade and also started and sold her own company in the health & wellness space, Mamatini. Erica developed her understanding of how to get great products to market while Managing Director of the New York City DreamIt accelerator, where she worked closely with some of today’s fastest growing tech startups helping them get off the ground.' +
        '<br /><br />She was also the founding Executive Director of Golden Seeds, an early stage venture capital investment group and founding Executive Director at STAR Angel Network, a venture investment network for athletes and celebrities. In that time she has made and managed investments in more than 50 startups.' +
        '<br /><br />Erica holds an MBA in Finance from Columbia Business School and a BS in Business Economics from UCLA.',
      href: '/learn/course',
      imageUrl: 'https://www.filepicker.io/api/file/zm778gPCTaetfeSrPEpO',
      facebookUrl: '',
      twitterUrl: '',
      linkedinUrl: '',
    },
    faqs: [
      {
        title: 'Why is this course important?',
        description:
          'Building a business is immensely complex and time-consuming. Most people who attempt to do it make a tremendous amount of mistakes early on, most of which can be avoided with the right guidance. This course strives to help entrepreneurs excel faster by providing a framework that they can use use to launch their business. Ultimately, this course will save entrepreneurs a lot of time and money by giving them the proper lay of the land.',
      },
      {
        title: 'What can I expect to learn from this course?',
        description:
          'By taking this course, you will learn the basic framework of how to efficiently prepare, plan, and launch a startup. You don’t need to go it alone and take the long, windy road. Give yourself that extra knowledge base that will allow you to make smart and efficient decisions early on.',
      },
      {
        title: 'Are there any prerequisites?',
        description:
          'There are no restrictions to attend this course. Anyone that is interested in having access to this knowledge can attend. Regardless of where you are in the world, you can still attend!',
      },
    ],
    curriculum: [
      {
        title: 'The Preparation',
        data: [
          {
            title: 'It all starts with an idea',
            url: '676561119',
            embedCode: '17388383be',
            videoLength: '3:41',
          },
          {
            title: 'Do you need business model?',
            url: '676561534',
            embedCode: '0cc245a500',
            videoLength: '4:21',
          },
          {
            title:
              'Assessing Market Opportunity and performing competitive analysis',
            url: '676565247',
            embedCode: '444cf601a7',
            videoLength: '17:15',
          },
          {
            title: 'What are the various legal structures for businesses?',
            url: '676562828',
            embedCode: '692c11b21d',
            videoLength: '13:42',
          },
          {
            title: 'How to find, structure, and manage your team',
            url: '676566552',
            embedCode: '7f5bd6eb85',
            videoLength: '15:03',
          },
        ],
      },
      {
        title: 'The Plan',
        data: [
          {
            title: 'Do you need to build a Minimum Viable Product (MVP)?',
            url: '676567517',
            embedCode: '206cffc468',
            videoLength: '17:36',
          },
          {
            title: 'Building your startup',
            url: '676568339',
            embedCode: '0018eb8c9e',
            videoLength: '3:21',
          },
          {
            title: 'Building, measuring, and learning from your MVP',
            url: '676568961',
            embedCode: '7c7ddd08b4',
            videoLength: '13:05',
          },
          {
            title: 'Determining product/market fit',
            url: '676816696',
            embedCode: '8861f8309e',
            videoLength: '17:43',
          },
          {
            title: "Can't find product market fit? How to iterate and pivot",
            url: '676817007',
            embedCode: '8bcd9906af',
            videoLength: '4:56',
          },
        ],
      },
      {
        title: 'The take off',
        data: [
          {
            title: 'From idea to plan',
            url: '676818575',
            embedCode: 'bdf886aa92',
            videoLength: '1:50',
          },
          {
            title: 'How to break into the market',
            url: '676822013',
            embedCode: '04a309845d',
            videoLength: '16:10',
          },
          {
            title: 'Understanding your customer',
            url: '676825334',
            embedCode: '78ec4884e5',
            videoLength: '8:53',
          },
          {
            title: 'How to set goals and expectations',
            url: '676828860',
            embedCode: '1fe777e8eb',
            videoLength: '9:27',
          },
          {
            title: 'Traction channels: Which ones can work for you?',
            url: '676831097',
            embedCode: 'a67258c37d',
            videoLength: '21:13',
          },
        ],
      },
    ],
  },
  {
    title: 'Boost your conversion rates',
    slug: 'boost-your-conversion-rates',
    href: '/learn/',
    category: { name: 'Article' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '6 min',
    author: {
      name: 'Roel Aufderehar',
      href: '/learn/course',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'How to use search engine optimization to drive sale',
    slug: 'how-to-search',
    href: '/learn/course',
    category: { name: 'Video' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '4 min',
    author: {
      name: 'Brenna Goyette',
      href: '/learn/course',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experiences',
    slug: 'improve-your-customer',
    href: '/learn/course',
    category: { name: 'Case Study' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '/learn/course',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];

export default function CoursePage() {
  const router = useRouter();
  const { params }: any = router.query;
  if (!params) return <Loading />;

  const slug = params[0];
  const videoCode = params[1] || null;
  const embedCode = params[2] || null;

  // can create later
  //const { data: course } = useSWR(`/courses/${slug}`, apiFetcher);
  //if(!course) return <Forbidden />;
  const post = posts.find((p) => {
    return p.slug == slug;
  });

  const watchVideo = (e: any) => {
    e.preventDefault();
    const href = e.target.href || '#';
    router.push(href);
  };

  if (!post) return <Loading />;

  const curriculum = (p: any) => {
    return p.curriculum?.map((group: any, index: number) => {
      return (
        <div className="mt-5 bg-gray-200" key={'curriculum2_' + index}>
          <div className="w-full border-b-[1px] border-white bg-gray-300 p-2 text-base font-bold">
            {group.title}
          </div>
          {group.data.map((item: any, index2: number) => {
            return (
              <div className="flex flex-col" key={'item2_' + index2}>
                <div className="flex flex-row items-center border-b-[1px] border-white p-2 hover:bg-blue-200">
                  <div className="flex flex-shrink">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,14.598V9.402c0-0.385,0.417-0.625,0.75-0.433l4.5,2.598c0.333,0.192,0.333,0.674,0,0.866l-4.5,2.598 C10.417,15.224,10,14.983,10,14.598z"></path>
                    </svg>
                  </div>
                  <div className="leading-0 flex flex-grow px-1 font-sans text-sm font-light">
                    {item.title}{' '}
                    {item.videoLength ? '(' + item.videoLength + ')' : ''}
                  </div>
                  <div className="flex flex-shrink">
                    <a
                      href={slug + '/' + item?.url + '/' + item?.embedCode}
                      onClick={watchVideo}
                      className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-500"
                    >
                      Start
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  const Courses = () => {
    return (
      <>
        <div
          className="w-full overflow-hidden bg-cover bg-center bg-no-repeat text-center"
          style={{
            background: "url('" + post.cover_url + "')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            position: 'relative',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0',
              zIndex: 0,
            }}
          ></div>
          <div
            className="mx-auto max-w-7xl px-5 pt-[150px] pb-[120px]"
            style={{ zIndex: 1, position: 'relative' }}
          >
            <h1 className="text-5xl font-bold text-white">{post.title}</h1>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl text-white">
              {post.sub_text}
            </h2>
            <a className="pt-5 pb-5" href="">
              Free for premium users
            </a>
          </div>
        </div>
        <div className="bg-white px-5">
          <div
            className="mx-auto max-w-3xl pt-[100px] pb-[100px] text-center text-lg font-extralight md:text-left"
            dangerouslySetInnerHTML={{
              __html: post.description.replace(/\n/g, '<br />'),
            }}
          ></div>
        </div>
        <div className="bg-gray-100 px-5">
          <div
            className="mx-auto max-w-3xl pt-[100px] pb-[100px] text-center text-lg font-normal md:text-left"
            dangerouslySetInnerHTML={{ __html: post.description2 || '' }}
          ></div>
        </div>
        <div className="bg-white px-5">
          <div className="mx-auto max-w-3xl pt-[50px] pb-[50px] text-center text-lg font-normal">
            <a
              className="text-blue-600 hover:text-blue-700"
              href="https://accelerator.cofounderslab.com/"
              target="_blank"
              rel="noreferrer"
            >
              Join the CoFoundersLab Startup Accelerator
            </a>
            <p className="mt-2">
              and get free access to all courses as part of your Accelerator
              membership.
            </p>
          </div>
        </div>
        <div className="bg-gray-100 px-5">
          <div className="mx-auto max-w-3xl pt-[100px] pb-[100px] text-lg font-normal">
            <h2 className="mb-5 text-center text-3xl md:text-left">
              Course Curricullum
            </h2>
            {curriculum(post)}
          </div>
        </div>
        <div className="bg-white px-5">
          <div className="mx-auto max-w-3xl pt-[100px] pb-[100px] text-lg font-normal">
            <h2 className="text-center text-3xl md:text-left">
              Your Instructor
            </h2>
            <div className="flex flex-col md:flex-row">
              <div className="text-center">
                <img
                  src={post?.author?.imageUrl}
                  alt={post?.author?.name}
                  className="mx-auto h-[150px] w-[150px] rounded-full p-2"
                />
                <p className="font-medium">{post.author.name}</p>
              </div>
              <div
                className="xs:max-w-2xl mt-5 max-w-xl text-center font-extralight md:mt-0 md:px-5 md:text-left"
                dangerouslySetInnerHTML={{ __html: post.author.about || '' }}
              ></div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 px-5">
          <div className="mx-auto max-w-3xl pt-[100px] pb-[100px] text-lg font-normal">
            <h2 className="mb-10 text-center text-3xl md:text-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="float-left mr-2 h-10 w-10 text-gray-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>{' '}
              Frequently Asked Questions
            </h2>
            {post.faqs?.map((faq, index) => {
              return (
                <div key={'faq_' + index} className="text-center md:text-left">
                  <h3 className="mb-5 text-xl font-bold">{faq?.title}</h3>
                  <p className="mb-5 font-extralight">{faq?.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white px-5">
          <div className="mx-auto max-w-3xl pt-[100px] pb-[100px] text-lg font-normal">
            <h2 className="mb-5 text-center text-3xl md:text-left">
              Course Curricullum
            </h2>
            {curriculum(post)}
          </div>
        </div>
      </>
    );
  };

  const VideoCodePage = (p: any, vdc: string, embc: string) => {
    return (
      <div
        className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8"
        style={{ zIndex: 1, position: 'relative' }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="max-h-auto order-2 flex-shrink pt-5 md:order-1 md:max-h-[800px] md:w-64  md:overflow-y-scroll md:pt-0">
            <Link
              href="/learn"
              // onClick={watchVideo}
              className="hover:bg-blue:700 rounded bg-blue-600 p-1 px-4 font-medium text-white"
            >
              Back
            </Link>
            <h1 className="mr-5 mt-5 text-center text-2xl font-bold">
              {p.title}
            </h1>
            {p.curriculum.map((group: any, index: number) => {
              return (
                <div className="w-full" key={'gk_' + index}>
                  <h2 className="mt-6 mb-2 font-bold">{group.title}</h2>
                  {group.data.map((item: any, index2: number) => {
                    return (
                      <a
                        className={
                          item.url == vdc
                            ? 'block w-full border-b-[1px] border-gray-200 bg-blue-200 p-3 text-sm font-medium last:border-b-0'
                            : 'block w-full border-b-[1px] border-gray-200 p-3 text-sm last:border-b-0 hover:bg-blue-200'
                        }
                        key={'ik_' + index2}
                        href={
                          '/learn/' +
                          p.slug +
                          '/' +
                          item?.url +
                          '/' +
                          item?.embc
                        }
                        onClick={watchVideo}
                      >
                        {item.title} ({item.videoLength})
                      </a>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="order-1 mx-auto max-w-4xl flex-grow justify-end md:order-2">
            <iframe
              width="100%"
              className="h-full max-h-full"
              src={
                'https://player.vimeo.com/video/' +
                vdc +
                '?h=' +
                embc +
                '&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
              }
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={p.title}
            ></iframe>
            <Script
              id="manage-gtag"
              strategy="lazyOnload"
              src={`https://player.vimeo.com/api/player.js`}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout meta={<Meta title="Course" description="" />}>
      {videoCode ? VideoCodePage(post, videoCode, embedCode) : Courses()}
    </Layout>
  );
}
