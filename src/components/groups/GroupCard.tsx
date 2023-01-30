import Image from 'next/image';
import { useRouter } from 'next/router';

import useUser from '@/hooks/useUser';

interface IProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  members: any[];
}

const GroupCard = ({ id, name, description, icon, members }: IProps) => {
  const { user } = useUser();
  const router = useRouter();

  const handleView = () => {
    const isMember = members.find((member) => member.id === user?.id);
    if (isMember) {
      router.push(`/feed?group=${id}`);
    } else {
      router.push('/premium');
    }
  };

  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
        <Image src={icon} alt="User" layout="fill" />
      </div>
      <div
        className="flex flex-col px-4 pt-2 pb-4"
        style={{ height: 'calc(100% - 160px)' }}
      >
        <div className="mb-1 text-lg line-clamp-1">{name}</div>
        <div className="mb-4 text-sm text-gray-600 line-clamp-2">
          {description}
        </div>
        <button
          className="mt-auto w-full rounded-md bg-blue-600 py-1 px-4 text-white"
          onClick={handleView}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
