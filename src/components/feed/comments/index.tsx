import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { API_URL } from '@/config';
import { IComment } from '@/pages/feed';

import Comment from './Comment';
import WriteComment from './WriteComment';

interface IProps {
  postId: string;
}

const Comments = ({ postId }: IProps) => {
  const router = useRouter();

  const { cmntiId: commentIdToFocus } = router.query;

  const [comments, setComments] = useState<IComment[]>([]);

  const loadComments = () => {
    axios
      .get<IComment[]>(`${API_URL}/feed-post-comments/feed-post/${postId}`)
      .then(({ data }) => {
        setComments(data);
      });
  };

  useEffect(() => {
    loadComments();
  }, []);

  useEffect(() => {
    if (!!commentIdToFocus && comments.length > 0) {
      const element = document.getElementById(commentIdToFocus as string);
      window.scrollTo({
        top: element?.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [comments]);

  const handleDelete = (id: string) => {
    setComments((cmnts) => cmnts.filter((cmnt) => cmnt.id !== id));
  };

  return (
    <div>
      <WriteComment postId={postId} onSubmit={loadComments} />
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onUpdate={loadComments}
          onDelete={() => handleDelete(comment.id)}
        />
      ))}
    </div>
  );
};

export default Comments;
