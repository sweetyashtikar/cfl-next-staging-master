import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';

import useUser from '@/hooks/useUser';

import { NEXT_URL } from '@/config';
import { IComment } from '@/pages/feed';

import WriteComment from './WriteComment';
import Modal from '../Modal';

interface IProps {
  comment: IComment;
  onDelete(id: string): void;
  onUpdate(): void;
}

const Comment = ({
  comment: { id, user, createdAt, text, feed_post: postId },
  onDelete,
  onUpdate,
}: IProps) => {
  const { user: loggedInUser } = useUser();

  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [isCommentEditing, setCommentEditing] = useState(false);

  const {
    profile: { firstName, lastName, profilePicture },
  } = user;

  const fullName = `${firstName} ${lastName}`;

  const handleDelete = () => {
    axios
      .delete(`${NEXT_URL}/api/session/feed-post-comments/${id}`)
      .then(() => onDelete(id));
  };

  return (
    <>
      {isCommentEditing ? (
        <>
          <WriteComment
            isEditing
            postId={postId}
            commentId={id}
            value={text}
            onSubmit={() => {
              onUpdate();
              setCommentEditing(false);
            }}
          />
          <div className="ml-16">
            <button
              className="text-xs text-blue-800"
              onClick={() => setCommentEditing(false)}
            >
              Cancel Editing
            </button>
          </div>
        </>
      ) : (
        <div className="mt-3 flex gap-5" id={id}>
          <img
            className="h-10 w-11 rounded-full"
            src={profilePicture?.formats?.thumbnail.url}
            alt="profile"
          />
          <div className="w-full rounded bg-gray-100 px-5  py-3">
            <div className="flex justify-between">
              <div>
                <span className="block font-bold">{fullName}</span>
                <small>{moment(createdAt).format('DD-MM-YYYY, hh:mm A')}</small>
              </div>
              {user?.id === loggedInUser?.id && (
                <div>
                  <button onClick={() => setCommentEditing(true)}>
                    <PencilAltIcon className="h-4 w-4" color="#4E5D78" />
                  </button>{' '}
                  <button onClick={() => setDeleteConfirmationModalOpen(true)}>
                    <TrashIcon className="h-4 w-4" color="#4E5D78" />
                  </button>
                </div>
              )}
            </div>
            <p className="py-3">{text}</p>
          </div>
        </div>
      )}

      <Modal
        title="Delete Comment"
        open={isDeleteConfirmationModalOpen}
        footer={
          <>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setDeleteConfirmationModalOpen(false)}
            >
              Cancel
            </button>
          </>
        }
        onClose={() => setDeleteConfirmationModalOpen(false)}
      >
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this comment?
        </p>
      </Modal>
    </>
  );
};

export default Comment;
