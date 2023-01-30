import { Menu, Transition } from '@headlessui/react';
import {
  ChatAlt2Icon,
  ChevronLeftIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useSWR, { useSWRConfig } from 'swr';

import styles from '@/styles/Messages.module.css';

import useUser from '@/hooks/useUser';

import Forbidden from '@/components/Forbidden';
import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';
import Loading from '@/components/Loading';
import ProfilePicture from '@/components/ProfilePicture';

import { NEXT_URL } from '@/config/index';
import { sessionGet } from '@/helpers/fetchers';
import * as ga from '@/helpers/ga';
import { classNames } from '@/helpers/index';

export interface IFormProps {
  body: string;
  to: string;
  toUser: string;
}

const Message = ({ position, profile, body, timestamp, read, readAt }: any) => (
  <>
    {position === 'left' ? (
      <>
        <div className="mr-auto ml-auto mt-2 mb-0 text-base text-[#4E5D78]">
          {moment(timestamp).format('MMMM D, YYYY')}
        </div>
        <div className="msgWidth mt-2 flex w-full max-w-xs space-x-3 p-4">
          <div className="relative mt-auto mb-5 flex-shrink-0">
            <Link href={`/profile/${profile?.slug}`}>
              <ProfilePicture
                className="h-10 w-10 rounded-full"
                profile={profile}
              />
            </Link>
            <img
              className="absolute right-0 top-7"
              src={'/assets/images/Messages/Online.svg'}
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="flexTo">
              <div
                className="bgMessageBackground rounded-b-sm rounded-tr-2xl rounded-tl-2xl rounded-br-2xl pl-7 pr-7 pt-5 pb-5"
                style={{ width: '100%' }}
              >
                <p className="text-base text-white">{body}</p>
              </div>

              <Menu
                as="div"
                className="relative inline-block flex items-center text-left"
              >
                <div>
                  <Menu.Button>
                    <img
                      className="ml-3 w-5"
                      src={'/assets/images/Messages/Options.svg'}
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Report
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="mt-1.5 flex">
              <time
                dateTime={timestamp}
                title={moment(timestamp).format('MMMM Do YYYY')}
                className="text-xs leading-none text-gray-500"
              >
                {moment(timestamp).fromNow()}
              </time>
            </div>
          </div>
        </div>
      </>
    ) : (
      <div className="msgWidth mt-2 ml-auto flex w-full max-w-xs justify-end space-x-3 p-4">
        <div className="flex flex-col items-end">
          <div className="flexTo">
            <Menu
              as="div"
              className="relative mr-3 inline-block flex items-center text-left"
            >
              <div>
                <Menu.Button>
                  <img
                    className="mr-5 w-5"
                    src={'/assets/images/Messages/Options.svg'}
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Delete
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <div
              className="bgSenderBackground rounded-bl-lg rounded-tl-lg rounded-tr-lg pl-5 pr-5 pt-5 pb-5 text-lg text-white"
              style={{ width: '100%' }}
            >
              <p className="text-base text-black">{body}</p>
            </div>
          </div>
          <div className="mt-1.5 flex items-center">
            <time
              dateTime={timestamp}
              title={`Sent at ${moment(timestamp).format(
                'MMMM Do YYYY h:mm:ss a'
              )}`}
              className="text-xs leading-none text-gray-500"
            >
              {moment(timestamp).fromNow()}
            </time>

            {/* {read ? (
              <time
                dateTime={readAt}
                title={`Read at ${moment(readAt).format(
                  'MMMM Do YYYY h:mm:ss a'
                )}`}
              >
                <CheckCircleIcon
                  className="ml-2 h-4 w-4 text-gray-500"
                  aria-hidden="true"
                />
              </time>
            ) : (
              <CheckIcon
                className="ml-2 h-4 w-4 text-gray-500"
                aria-hidden="true"
              />
            )} */}
          </div>
        </div>
        <div className="mt-auto mb-5 flex-shrink-0">
          <Link href={`/profile/${profile?.slug}`}>
            <ProfilePicture
              className="h-10 w-10 rounded-full"
              profile={profile}
            />
          </Link>
        </div>
      </div>
    )}
  </>
);

export default function Messages() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();
  const { slug } = router.query;
  const messagesEndRef = useRef<HTMLHeadingElement>(null);
  const { loading, loggedOut, user } = useUser();
  const { mutate } = useSWRConfig();
  const [interlocutor, setInterlocutor] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [connections, setConnections] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  const [flag, setFlag] = useState(false);
  const PAGE_LIMIT = 50;

  // const { data: connections } = useSWR(
  //   user ? `connections/me?status=accepted&_sort=createdAt:DESC&_start=0&_limit=${PAGE_LIMIT}` : null,
  //   sessionGet
  // );

  const nextPage = () => {
    setPage(page + 1);
  };

  const getData = async () => {
    setLoader(true);
    const pageNum: number = (page - 1) * PAGE_LIMIT;
    const data: any = await axios.get(
      `${NEXT_URL}/api/session/connections/me?_where[_or][0][status]=message&_where[_or][1][status]=accepted&_sort=updatedOn:DESC&_start=${pageNum}&_limit=${PAGE_LIMIT}`
    );
    if (data.data.length == 0) {
      setFlag(true);
    }
    nextPage();
    setConnections(connections.concat(data.data));
    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const { data: chat } = useSWR(
    slug && slug[0] ? `connections/${slug[0]}` : null,
    sessionGet,
    { refreshInterval: 5000 }
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (
      chat?.messages?.length > 0 &&
      chat?.messages?.some(
        (x: any) => x.read === false && x.authorProfile !== user?.profile?.id
      )
    ) {
      (async () => {
        try {
          await axios.post(
            `${NEXT_URL}/api/session/connections/mark-read/${chat?.id}`,
            {}
          );
          mutate(`connections/${chat?.id}`);
          mutate('me');
        } catch (e: any) {}
      })();
    }
  }, [chat]);

  useEffect(() => {
    if (chat) {
      const interloc = chat.profiles.filter(
        (x: any) => x.id !== user?.profile?.id
      )[0];
      setInterlocutor(interloc);
    }
  }, [chat?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [chat?.id]);

  const { register, handleSubmit, formState, reset } = useForm<IFormProps>({
    defaultValues: {
      body: '',
      to: '',
    },
  });
  const { isSubmitting, isDirty } = formState;
  const onSubmit: SubmitHandler<IFormProps> = async (data) => {
    if (!interlocutor?.id) {
      toast.error('Invalid chat id');
      return;
    }
    try {
      data.to = interlocutor?.id;
      data.toUser = interlocutor?.user;
      await axios.post(`${NEXT_URL}/api/session/messages`, data);
      await mutate(
        `connections/me?_where[_or][0][status]=message&_where[_or][1][status]=accepted`
      );
      await mutate(`connections/${chat?.id}`);
      scrollToBottom();
      reset();
      ga.event('send_message', {
        event_category: 'engagement',
        event_label: 'Send message',
      });
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  const renderMessages = () => {
    if (!chat.messages) return null;
    return chat.messages.map((message: any, i: number) => (
      <Message
        key={i}
        profile={
          message.authorProfile === user?.profile?.id
            ? user?.profile
            : interlocutor
        }
        body={message.body}
        timestamp={message.createdAt}
        position={
          message.authorProfile === user?.profile?.id ? 'right' : 'left'
        }
        read={message.read}
        readAt={message.readAt}
      />
    ));
  };

  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !flag) {
      console.log(bottom);
      getData();
    }
  };

  if (loading) return <Loading />;
  if (loggedOut) return <Forbidden />;

  return (
    <Layout
      showLeftSidebar
      meta={
        <Meta
          title="Messages - CoFoundersLab"
          description="Messages on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      footer={null}
    >
      <div
        className={classNames(
          styles.chatWrapper,
          'border-t border-gray-200 bg-gray-100 pt-4 pb-4'
        )}
      >
        <div className="mx-auto mt-6 ml-0 h-full  max-w-7xl md:ml-4 ">
          <div className="h-full rounded-lg  ">
            <div className="relative h-full divide-y divide-gray-200 md:grid md:grid-cols-12 md:divide-y-0 md:divide-x">
              <aside className="asideChat absolute w-full divide-y divide-gray-200 bg-white shadow shadow-lg md:relative  md:col-span-5 md:shadow-none  lg:col-span-3">
                <div className=" w-full">
                  <Link
                    href="/messages"
                    aria-label="Back to conversations list"
                    className={classNames(
                      chat ? 'inline-flex md:hidden' : 'hidden',
                      'relative -mr-4 items-center rounded-tl-lg px-3 py-2 text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600'
                    )}
                  >
                    <ChevronLeftIcon
                      className="h-8 w-8 text-gray-400"
                      aria-hidden="true"
                    />
                  </Link>
                  <div className="flexTo border-transparent px-4 pt-4 text-xl font-extrabold tracking-tight text-gray-900 lg:col-span-2 lg:block">
                    <div className="relative w-full ">
                      <input
                        className=" mb-3.5  h-[42px]  w-full rounded-md border border-[#4E5D7866] py-1.5 pl-8 text-[14px] font-[400]	"
                        placeholder="Search"
                      />
                      <img
                        className="absolute top-3.5 left-3 "
                        src={'/assets/images/Messages/Search.svg'}
                      />
                    </div>
                    <div className="ml-[20px] flex max-h-[42px] min-w-[42px] items-center justify-center rounded-md bg-gray-100">
                      <img src={'/assets/images/Messages/Star.svg'} />
                    </div>
                  </div>
                </div>
                <nav
                  className={classNames(chat && 'hidden md:block', 'flex-1  ')}
                  aria-label="Messages"
                >
                  <div
                    className={
                      'absolute top-0 bottom-0 right-0 left-0 z-10 bg-white opacity-80 ' +
                      (loader ? '' : 'hidden')
                    }
                  >
                    <div className="flex h-full items-center justify-center py-20">
                      <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                  </div>
                  <ul
                    role="list"
                    className={classNames(
                      styles.chatsList,
                      'relative z-0 min-h-0  overflow-y-auto  p-4'
                    )}
                    onScroll={handleScroll}
                  >
                    {connections &&
                      connections.map((connection: any) => {
                        const interloc = connection.profiles.filter(
                          (x: any) => x.id !== user?.profile?.id
                        )[0];
                        return (
                          <li key={connection.id}>
                            <Link
                              href={`/messages/${connection.id}`}
                              className="focus:outline-none"
                            >
                              <div
                                className={classNames(
                                  slug && slug[0] === connection.id
                                    ? 'bg-[#e9eaea94]'
                                    : '',
                                  'relative flex items-center space-x-3 rounded-lg p-[18px] focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 hover:bg-gray-50'
                                )}
                              >
                                <div className="relative flex-shrink-0">
                                  <ProfilePicture
                                    profile={interloc}
                                    className="h-10 w-10 overflow-hidden rounded-full"
                                  />
                                  <img
                                    className="absolute right-0 top-8"
                                    src={'/assets/images/Messages/Online.svg'}
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="flexTo items-center justify-between text-sm font-medium text-gray-900">
                                    <div className="mr-[10px]">
                                      {`${interloc?.firstName} ${interloc?.lastName}`}
                                    </div>
                                    {/* <div className='ml-[0px]'>
                                      {moment(
                                        connection.messages[
                                          connection.messages.length - 1
                                        ].createdAt
                                      ).format('D,MM,YYYY') ==
                                      moment(currentDate).format(
                                        'D,MM,YYYY'
                                      ) ? (
                                        <p>
                                          {moment(
                                            connection.messages[
                                              connection.messages.length - 1
                                            ].createdAt
                                          ).format('h:mm a')}
                                        </p>
                                      ) : (
                                        <p>
                                          {moment(
                                            connection.messages[
                                              connection.messages.length - 1
                                            ].createdAt
                                          ).fromNow()}{' '}
                                        </p>
                                      )}
                                    </div> */}
                                  </p>
                                  <p className="flexTo mt-2 justify-between truncate text-sm text-gray-500">
                                    <div>
                                      {connection.messages.length > 0
                                        ? connection.messages[
                                            connection.messages.length - 1
                                          ].body
                                        : interloc?.tagline}
                                    </div>
                                    <div>
                                      {connection.messages.length > 0 &&
                                        connection.messages.some(
                                          (x: any) =>
                                            x.read === false &&
                                            x.authorProfile !==
                                              user?.profile?.id
                                        ) && (
                                          <span className="ml-3 inline-flex items-center bg-[#FF5630] px-1.5 py-0.5 text-xs font-medium text-white group-hover:bg-red-200">
                                            1
                                          </span>
                                        )}
                                      <img
                                        src={
                                          '/assets/images/Messages/unFavStar.svg'
                                        }
                                      />
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </nav>
              </aside>
              <div
                className={classNames(
                  !chat && 'hidden md:block',
                  'inboxChat h-full divide-y divide-gray-200 pt-14 shadow md:col-span-7 md:pt-0  lg:col-span-9'
                )}
              >
                {chat ? (
                  <div className="flex h-full flex-col">
                    <div className="flex h-0 flex-grow flex-col overflow-auto ">
                      <div className=" flex items-center justify-between divide-y  divide-gray-200 border-b-2">
                        <h1 className=" flex items-center px-6 py-6 text-xl font-extrabold tracking-tight text-gray-900 lg:col-span-2  ">
                          <div className="mr-4">
                            <ProfilePicture
                              profile={interlocutor}
                              className="h-10 w-10 overflow-hidden rounded-full"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-base font-medium text-gray-900">
                              {interlocutor?.firstName}
                            </p>
                            <p className="flex items-center text-xs font-medium text-gray-400 ">
                              Active Now{' '}
                              <span className="ml-2">
                                <img src="/assets/images/online.svg" />
                              </span>
                            </p>
                          </div>
                        </h1>
                        <h1 className=" divider flex items-center px-5 py-5 text-xl  font-extrabold  ">
                          <ul className="flex items-center">
                            <li className="mr-4">
                              <img src="/assets/images/voice.svg" />
                            </li>
                            <li className="mr-4">
                              <img src="/assets/images/video.svg" />
                            </li>
                            <li className="mr-0">
                              <img src="/assets/images/info.svg" />
                            </li>
                          </ul>
                        </h1>
                      </div>

                      <Message
                        profile={
                          chat.authorProfile === user?.profile?.id
                            ? user?.profile
                            : interlocutor
                        }
                        body={chat.message}
                        timestamp={chat.createdAt}
                        position={
                          chat.authorProfile === user?.profile?.id
                            ? 'right'
                            : 'left'
                        }
                      />

                      {renderMessages()}

                      <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t-2 border-gray-200 p-4">
                      <form onSubmit={handleSubmit(onSubmit)} className="flex">
                        <div className="relative w-full">
                          <input
                            {...register('body')}
                            type="text"
                            className=" w-full flex-grow items-center rounded-md border-2 border border-gray-200 bg-gray-100 px-6 py-4 text-base"
                            placeholder="Type something here..."
                            maxLength={500}
                          />
                          <img
                            className="absolute top-5 right-10 mr-2"
                            src={'/assets/images/Messages/Attachments.svg'}
                          />
                          <img
                            className="absolute top-5 right-5"
                            src={'/assets/images/Messages/Emojis.svg'}
                          />
                        </div>

                        <button
                          type="submit"
                          // disabled={isSubmitting || !isDirty}
                          className="text-blue relative -ml-px ml-6 inline-flex items-center rounded-md bg-[#EBF2FF] bg-blue-600 px-6 py-4 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 disabled:bg-gray-500"
                        >
                          {/* Send */}
                          {/* <PaperAirplaneIcon
                            className="ml-2 h-5 w-5 rotate-90"
                            aria-hidden="true"
                          /> */}
                          <img src={'/assets/images/Messages/SendImage.svg'} />
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col">
                    <div className="m-auto text-center">
                      <ChatAlt2Icon
                        className="mx-auto h-12 w-12 text-gray-400"
                        aria-hidden="true"
                      />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        Start a conversation
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Get started by connecting with other people.
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/search"
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          <SearchIcon
                            className="-ml-1 mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Find a CoFounder
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script id="manage-customerly-hide" strategy="lazyOnload">
        {`
          setTimeout(() => {
            if(window.customerly) {
              window.customerly.hide();
            }
          }, 200);
        `}
      </Script>
    </Layout>
  );
}
