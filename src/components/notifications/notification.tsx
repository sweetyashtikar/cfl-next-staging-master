import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';

import { NEXT_URL } from '@/config';
import { NotificationType } from '@/pages/notifications';

import CommentIcon from './CommentIcon';
import LikeIcon from './LikeIcon';
import UserIcon from './UserIcon';
import Link from '../Link';

enum ActionType {
  COMMENT = 'commented',
  LIKE = 'liked',
  SHARE = 'shared',
  FOLLOW = 'followed',
  CONNECTION_REQUEST = 'connectionRequest',
  DISCUSSION_REPLY = 'discussionReply',
  POSTED = 'posted',
  MESSAGED = 'messaged',
}

const Notification = ({ notification }: { notification: NotificationType }) => {
  console.log('notification', notification);
  const {
    userSender: { profile: senderProfile },
  } = notification;

  const profilePictureUrl =
    senderProfile?.profilePicture?.format?.thumbnail ||
    senderProfile?.profilePicture?.url;

  const getNotificationRelatedURL = (
    actionType: string,
    references?: any
  ): string => {
    let url: string = '';
    switch (actionType) {
      case ActionType.CONNECTION_REQUEST:
        url = '/connections/pending';
        break;
      case ActionType.LIKE:
        url = `/feed/${references?.postId}`; //?pid=${references.postId}`;
        break;
      case ActionType.COMMENT:
        url = `/feed/${references?.postId}?cmntiId=${references?.commentId}`; //?pid=${references.postId}`;
        break;
      case ActionType.DISCUSSION_REPLY:
        url = `/discuss/${references?.discussionSlug}?rid=${references?.discussionReplyId}`;
        break;
      case ActionType.POSTED:
        url = `/feed/${references?.postId}`;
        break;
      case ActionType.MESSAGED:
        url = `/messages/${references?.connectionId}`;
        break;
      default:
        url = '#';
        break;
    }
    return url;
  };

  const markAsSeen = (id: string) => {
    axios.put(`${NEXT_URL}/api/session/notifications/seen/${id}`, {});
  };

  return (
    <Link
      href={getNotificationRelatedURL(
        notification.action,
        notification.references
      )}
      onClick={() => markAsSeen(notification?._id)}
    >
      <div className="flex h-16 items-center justify-start border-t bg-white px-4 hover:bg-gray-50">
        <div className="mr-4">
          {notification.action === ActionType.COMMENT && <CommentIcon />}
          {(notification.action === ActionType.DISCUSSION_REPLY ||
            notification.action === ActionType.POSTED ||
            notification.action === ActionType.MESSAGED) && <CommentIcon />}
          {notification.action === ActionType.CONNECTION_REQUEST && (
            <UserIcon />
          )}
          {notification.action === ActionType.FOLLOW && <UserIcon />}
          {notification.action === ActionType.LIKE && <LikeIcon />}
          {notification.action === ActionType.SHARE && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="8" fill="#FFAB00" />
              <circle cx="8" cy="8" r="8" fill="white" fillOpacity="0.8" />
              <path
                d="M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z"
                fill="white"
              />
              <path
                d="M10.75 7.40416C10.75 6.98994 10.4142 6.65416 10 6.65416C9.58579 6.65416 9.25 6.98994 9.25 7.40416H10.75ZM10 8.66732V9.41732C10.4142 9.41732 10.75 9.08153 10.75 8.66732H10ZM8.8 7.91732C8.38579 7.91732 8.05 8.2531 8.05 8.66732C8.05 9.08153 8.38579 9.41732 8.8 9.41732V7.91732ZM5.30235 8.39204C5.15031 8.77734 5.33942 9.21294 5.72472 9.36497C6.11002 9.517 6.54562 9.3279 6.69765 8.9426L5.30235 8.39204ZM9.38648 8.02777L8.82418 8.52408C8.83104 8.53186 8.83807 8.53949 8.84525 8.54698L9.38648 8.02777ZM9.25 7.40416V8.66732H10.75V7.40416H9.25ZM10 7.91732H8.8V9.41732H10V7.91732ZM6.69765 8.9426C6.81099 8.65536 7.00008 8.45096 7.29554 8.26559L6.49838 6.99495C6.00016 7.30752 5.55965 7.73994 5.30235 8.39204L6.69765 8.9426ZM7.29554 8.26559C7.54365 8.10994 7.81815 8.05563 8.08196 8.09776L8.31848 6.61652C7.68424 6.51525 7.04396 6.65266 6.49838 6.99495L7.29554 8.26559ZM8.08196 8.09776C8.34719 8.1401 8.61021 8.28166 8.82418 8.52408L9.94878 7.53147C9.52094 7.04674 8.9513 6.71756 8.31848 6.61652L8.08196 8.09776ZM8.84525 8.54698L9.45877 9.18652L10.5412 8.14811L9.9277 7.50857L8.84525 8.54698Z"
                fill="#FFAB00"
              />
            </svg>
          )}
        </div>

        <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
          <Image src={profilePictureUrl} alt="User" layout="fill" />
        </div>

        <div>
          <p
            className={`font-medium ${
              notification.isSeen ? 'text-slate-500' : null
            }`}
          >
            {`${notification?.userSender.profile?.firstName} ${
              notification?.userSender.profile?.lastName
            } ${
              notification?.action === ActionType.COMMENT
                ? 'Commented on your post'
                : notification?.action === ActionType.FOLLOW
                ? 'Followed you.'
                : notification?.action === ActionType.LIKE
                ? 'Liked your post.'
                : notification?.action === ActionType.CONNECTION_REQUEST
                ? 'sent you Connection Request'
                : notification?.action === ActionType.DISCUSSION_REPLY
                ? 'replied in Discussion'
                : notification?.action === ActionType.POSTED
                ? 'created a new post!'
                : notification?.action === ActionType.MESSAGED
                ? 'messaged you.'
                : ''
            }`}
          </p>
          <p className="text-sm text-gray-400">
            {moment.utc(notification?.published_at).local().toNow(true)} ago
          </p>
        </div>

        {!notification?.isSeen && (
          <div className="ml-auto mr-2 h-2 w-2 rounded-full bg-rose-500" />
        )}
      </div>
    </Link>
  );
};

export default Notification;
