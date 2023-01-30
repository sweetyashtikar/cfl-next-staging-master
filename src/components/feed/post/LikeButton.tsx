import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useUser from '@/hooks/useUser';

interface IProps {
  likedByUsers: string[];
  onClick(likedByUser: boolean): void;
}

const LikeButton = ({ likedByUsers, onClick }: IProps) => {
  const { user: loggedInUser, loggedOut } = useUser();
  const router = useRouter();
  const isAlreadyLiked = likedByUsers.some((id) => id === loggedInUser?.id);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (isAlreadyLiked) {
      setLiked(true);
    }
  }, []);

  const handleClick = () => {
    setLiked(!liked);
    if (loggedOut) {
      router.push('/login');
      return;
    }

    onClick(!liked);
  };

  return (
    <span className="flex cursor-pointer gap-2 items-center justify-center " onClick={handleClick}>
      {liked ? (
        <HeartIconSolid className="h-6 w-6 text-red-600" />
      ) : (
        <HeartIconOutline className="h-6 w-6" color="#4E5D78" />
      )}{' '}
      {liked ? 'Liked' : 'Like'}
    </span>
  );
};

export default LikeButton;
