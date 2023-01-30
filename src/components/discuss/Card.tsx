import { Menu, Transition } from '@headlessui/react';
import { ChatAltIcon, PlusCircleIcon } from '@heroicons/react/outline';
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  FlagIcon,
  StarIcon,
} from '@heroicons/react/solid';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import useSWR from 'swr';

import useUser from '@/hooks/useUser';

import Link from '@/components/Link';
import ProfilePicture from '@/components/ProfilePicture';

import { NEXT_URL } from '@/config/index';
import { apiFetcher } from '@/helpers/fetchers';
import { classNames } from '@/helpers/index';

export interface IDiscussionCardProps {
  data: any;
  loadReplies?: boolean;
  allowReply?: boolean;
  loadVotes?: boolean;
}

export interface IFormProps {
  body: string;
  discussion: string;
  // profile: string;
}

const Author = ({ data, children }: any) => (
  <>
    {/* profile picture */}
    <div className="flex-shrink-0">
      <Link href={`/profile/${data?.profile?.slug}`}>
        <img
          className="h-10 w-10 rounded-full"
          src={data?.profile?.profilePicture?.url}
          alt=""
        />
      </Link>
    </div>
    {/* author info */}
    <div className="min-w-0 flex-1">
      <p className="flex space-x-4">
        <Link
          href={`/profile/${data?.profile?.slug}`}
          className="text-sm font-bold text-gray-600 hover:underline"
        >
          {`${data?.profile?.firstName} ${data?.profile?.lastName}`}
        </Link>
        <time
          dateTime={data?.createdAt}
          title={moment(data?.createdAt).format('MMMM Do YYYY')}
          className="text-xs text-gray-500"
        >
          {moment(data?.createdAt).fromNow()}
        </time>
      </p>
      <p className="text-sm text-gray-500">{data?.profile?.tagline}</p>
    </div>
    {children}
  </>
);

const AddReply = ({ discussion }: any) => {
  const { loading, user } = useUser();
  const { mutate } = useSWRConfig();

  const { register, handleSubmit, formState, reset } = useForm<IFormProps>({
    defaultValues: {
      discussion: discussion?.id,
      // profile: user?.profile?.id,
      body: '',
    },
  });
  const { isSubmitting, isDirty } = formState;
  const onSubmit: SubmitHandler<IFormProps> = async (data) => {
    try {
      await axios.post(`${NEXT_URL}/api/session/discussion-replies`, data);
      reset();
      mutate(`/discussion-replies?discussion=${discussion.id}`);
      toast('Your reply was posted');
    } catch (e: any) {
      toast.error(e.response.data?.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <div className="mt-6 flex flex-col items-center">
        <hr className="w-full" />
        <span className="mx-auto -mt-3 flex h-6 items-center justify-center rounded-full border bg-white px-3 text-xs text-blue-600">
          <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center space-x-4 rounded-md px-4 py-3 focus-within:bg-gray-50 hover:bg-gray-50"
      >
        <div className="flex-shrink-0">
          <Link href={`/profile/${user?.profile?.slug}`}>
            <ProfilePicture
              className="h-10 w-10 overflow-hidden rounded-full"
              profile={user?.profile}
            />
          </Link>
        </div>
        <div className="w-full">
          <div className="flex items-center space-x-3">
            <textarea
              {...register('body', { required: true })}
              disabled={!discussion}
              className="w-full flex-grow resize-none rounded border-gray-300 px-3 text-sm"
              placeholder="Type a comment"
              rows={1}
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!discussion || isSubmitting || !isDirty}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#377DFF] px-4 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 disabled:bg-gray-500"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const Reply = ({ data }: any) => {
  const { loading, user } = useUser();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  useEffect(() => {
    if (user && data) {
      if (data?.upvotes?.includes(user?.profile?.id)) {
        setIsUpvoted(true);
      } else {
        setIsUpvoted(false);
      }
      if (data?.downvotes?.includes(user?.profile?.id)) {
        setIsDownvoted(true);
      } else {
        setIsDownvoted(false);
      }
    }
  }, [user, data]);

  const handleUpvote = async () => {
    try {
      await axios.post(
        `${NEXT_URL}/api/session/discussion-replies/${data?.id}/vote`,
        {
          score: 1,
        }
      );
      toast('You upvoted this comment');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleDownvote = async () => {
    try {
      await axios.post(
        `${NEXT_URL}/api/session/discussion-replies/${data?.id}/vote`,
        {
          score: -1,
        }
      );
      toast('You downvoted this comment');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this comment?') == true) {
      try {
        await axios.delete(
          `${NEXT_URL}/api/session/discussion-replies/${data?.id}`
        );
        toast('You deleted this comment');
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  };

  return (
    <>
      <div className="flex space-x-4 rounded-md px-4 py-3 hover:bg-gray-50">
        <div className="flex-shrink-0">
          <Link href={user ? `/profile/${data?.profile?.slug}` : '/login'}>
            <ProfilePicture
              className="h-10 w-10 overflow-hidden rounded-full"
              profile={data?.profile}
            />
          </Link>
        </div>
        <div>
          <div className="-mt-1 flex space-x-4">
            <div className="min-w-0 flex-1">
              <p className="flex items-center space-x-4">
                <Link
                  href={user ? `/profile/${data?.profile?.slug}` : '/login'}
                  className="heading-text text-sm font-semibold hover:underline"
                >
                  {`${data?.profile?.firstName} ${data?.profile?.lastName}`}
                </Link>
                {data?.profile?.cflTeam && (
                  <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                    CoFoundersLab Team
                  </span>
                )}
                <time
                  dateTime={data?.createdAt}
                  title={moment(data?.createdAt).format('MMMM Do YYYY')}
                  className="body-text text-xs"
                >
                  {moment(data?.createdAt).fromNow()}
                </time>
              </p>
              <p className="text-sm text-gray-500 xl:sr-only">
                {data?.profile?.tagline}
              </p>
            </div>
          </div>
          <div
            className="heading-text mt-4 text-sm"
            dangerouslySetInnerHTML={{ __html: data?.body }}
          ></div>

          {/* like and reply for comments */}
          <div className="body-text mt-3 flex space-x-6 text-xs">
            <div
              className="cursor-pointer hover:underline"
              onClick={() => console.log('like comment:', data)}
            >
              Like
            </div>
            <div
              className="cursor-pointer hover:underline"
              onClick={() => console.log('reply to comment:', data)}
            >
              Reply
            </div>
          </div>

          {/* up vote and down vote for replies */}
          {/* <div className="flex space-x-6">
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                onClick={handleUpvote}
                className={classNames(
                  isUpvoted
                    ? 'text-blue-600 hover:text-blue-300'
                    : 'text-gray-500 hover:text-blue-300',
                  'inline-flex space-x-2'
                )}
              >
                <ArrowSmUpIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </span>
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                onClick={handleDownvote}
                className={classNames(
                  isDownvoted
                    ? 'text-blue-600 hover:text-blue-300'
                    : 'text-gray-500 hover:text-blue-300',
                  'inline-flex space-x-2'
                )}
              >
                <ArrowSmDownIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </span>
            {user?.profile?.cflTeam && (
              <span className="inline-flex items-center text-sm">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex space-x-2 text-gray-500 hover:text-blue-300"
                >
                  Delete
                </button>
              </span>
            )}
          </div>
         */}
        </div>
      </div>
    </>
  );
};

export default function DiscussionCard({
  data,
  loadReplies,
  loadVotes,
  allowReply,
}: IDiscussionCardProps) {
  const router = useRouter();
  const { loading, user } = useUser();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const { data: replies } = useSWR(
    loadReplies && data ? `/discussion-replies?discussion=${data?.id}` : null,
    apiFetcher
  );
  const [freshLoad, setFreshLoad] = useState(true);

  const { rid: replyIdToFocus } = router.query;

  const goToElement = () => {
    const element = document.getElementById(replyIdToFocus as string);
    window.scrollTo({
      top: element?.offsetTop,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (replyIdToFocus !== undefined && freshLoad && replies?.length > 0) {
      setTimeout(goToElement, 0);
      setFreshLoad(false);
    }
  }, [replies]);

  useEffect(() => {
    if (user && data) {
      if (data?.upvotes?.includes(user?.profile?.id)) {
        setIsUpvoted(true);
      } else {
        setIsUpvoted(false);
      }
      if (data?.downvotes?.includes(user?.profile?.id)) {
        setIsDownvoted(true);
      } else {
        setIsDownvoted(false);
      }
    }
  }, [user, data]);

  const handleUpvote = async () => {
    if (user) {
      try {
        await axios.post(
          `${NEXT_URL}/api/session/discussions/${data?.id}/vote`,
          {
            score: 1,
          }
        );
        toast('You upvoted this discussion');
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      router.push('/login');
    }
  };

  const handleDownvote = async () => {
    if (user) {
      try {
        await axios.post(
          `${NEXT_URL}/api/session/discussions/${data?.id}/vote`,
          {
            score: -1,
          }
        );
        toast('You downvoted this discussion');
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      router.push('/login');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this discussion?') == true) {
      try {
        await axios.delete(`${NEXT_URL}/api/session/discussions/${data?.id}`);
        toast('You deleted this discussion');
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  };

  return (
    <>
      <article
        className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
        aria-labelledby={'question-title-' + data?.id}
      >
        <div className="flex space-x-3">
          <h2 id={'question-title-' + data?.id} className="min-w-0 flex-1">
            <Link
              href={user ? `/discuss/${data?.slug}` : '/login'}
              className="text-lg font-bold text-[#4E5D78] hover:underline"
            >
              {data?.title}
            </Link>
          </h2>
          {/* card options */}
          <div className="mt-1 flex flex-shrink-0 self-start">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                {/* <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Open options</span>
                  <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button> */}
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
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'flex px-4 py-2 text-sm'
                          )}
                        >
                          <StarIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Add to favorites</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'flex px-4 py-2 text-sm'
                          )}
                        >
                          <FlagIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Report content</span>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        {/* author info */}
        <div className={`my-4 flex space-x-3 ${!loadVotes ? 'sr-only' : ''}`}>
          {/* profile picture */}
          <div className="flex-shrink-0">
            <Link href={user ? `/profile/${data?.profile?.slug}` : '/login'}>
              <ProfilePicture
                className="h-10 w-10 overflow-hidden rounded-full"
                profile={data?.profile}
              />
            </Link>
          </div>
          {/* author info */}
          <div className="min-w-0 flex-1">
            <p className="flex space-x-4">
              <Link
                href={user ? `/profile/${data?.profile?.slug}` : '/login'}
                className="text-base font-bold text-[#4E5D78] hover:underline"
              >
                {`${data?.profile?.firstName} ${data?.profile?.lastName}`}
              </Link>
              {data?.profile?.cflTeam && (
                <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                  CoFoundersLab Team
                </span>
              )}
              <time
                dateTime={data?.createdAt}
                title={moment(data?.createdAt).format('MMMM Do YYYY')}
                className="text-sm text-gray-500"
              >
                {moment(data?.createdAt).fromNow()}
              </time>
            </p>
            <p className="text-base text-[#4e5d7899]">
              {data?.profile?.tagline}
            </p>
          </div>
        </div>
        <div
          className="mt-2 space-y-4 text-lg font-medium text-[#4e5d7899]"
          dangerouslySetInnerHTML={{ __html: data?.body }}
        />

        {loadVotes && (
          <div className="mt-6 flex justify-between space-x-8">
            <div className="flex space-x-6">
              <span className="inline-flex items-center text-sm">
                <button
                  type="button"
                  onClick={handleUpvote}
                  className={classNames(
                    isUpvoted
                      ? 'text-blue-600 hover:text-blue-300'
                      : 'text-gray-500 hover:text-blue-300',
                    'inline-flex space-x-2'
                  )}
                >
                  <ArrowSmUpIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </span>
              <span className="inline-flex items-center text-sm">
                <span className="font-medium text-gray-500 hover:text-gray-800">
                  {data?.score}
                </span>
                <span className="sr-only">upvotes</span>
              </span>
              <span className="inline-flex items-center text-sm">
                <button
                  type="button"
                  onClick={handleDownvote}
                  className={classNames(
                    isDownvoted
                      ? 'text-blue-600 hover:text-blue-300'
                      : 'text-gray-500 hover:text-blue-300',
                    'inline-flex space-x-2'
                  )}
                >
                  <ArrowSmDownIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </span>
              <span className="inline-flex items-center text-sm">
                <Link
                  href={user ? `/discuss/${data?.slug}` : '/login'}
                  className="inline-flex space-x-2 font-medium text-gray-500 hover:text-gray-500"
                >
                  <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                  <span>{data?.repliesCount}</span>
                  <span className="sr-only">replies</span>
                </Link>
              </span>
              {user?.profile?.cflTeam && (
                <span className="inline-flex items-center text-sm">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex space-x-2 text-gray-500 hover:text-blue-300"
                  >
                    Delete
                  </button>
                </span>
              )}
              {/* TODO: discussion views */}
              {/* <span className="inline-flex items-center text-sm">
              <button
                type="button"
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <EyeIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">{data?.views}</span>
                <span className="sr-only">views</span>
              </button>
            </span> */}
            </div>
            {/* TODO: share discussion */}
            {/* <div className="flex text-sm">
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <ShareIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">Share</span>
              </button>
            </span>
          </div> */}
          </div>
        )}
        {allowReply && <AddReply discussion={data} />}

        {replies && replies.length > 0 && (
          <>
            <div className="mt-6 flex flex-col items-center">
              <hr className="w-full" />
              <span className="mx-auto -mt-3 flex h-6 items-center justify-center rounded-full border bg-white px-3 text-xs text-blue-600">
                <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>

            <ul role="list" className="space-y-6">
              {replies.map((reply: any, i: number) => (
                <li key={reply.id} id={reply.id}>
                  <Reply data={reply} />
                </li>
              ))}
            </ul>
          </>
        )}
      </article>
    </>
  );
}
