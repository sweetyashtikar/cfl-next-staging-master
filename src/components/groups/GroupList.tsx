import { useRouter } from 'next/router';
import useSWR from 'swr';

import { sessionGet } from '@/helpers/fetchers';

import GroupCard from './GroupCard';
import NoGroupsFound from './NoSearchResults';
import Skeleton from './Skeleton';
import Error from '../common/Error';

const PAGE_SIZE = 12;

const GroupList = () => {
  const router = useRouter();
  const { page } = router.query;

  const offset = page ? (parseInt(page.toString()) - 1) * PAGE_SIZE : 0;
  const fetchUrl = `groups/?&_limit=${PAGE_SIZE}&_start=${offset}`;

  const { data: groups, error } = useSWR(fetchUrl, sessionGet);

  if (!groups && !error) {
    return <Skeleton />;
  }

  if (error) {
    return <Error />;
  }

  if (groups.length <= 0) {
    return <NoGroupsFound />;
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
    >
      {groups.map((group: any) => (
        <li
          key={group._id}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <GroupCard
            key={group.id}
            id={group.id}
            name={group.name}
            description={group.description}
            icon={group.icon?.url}
            members={group.users_permissions_users}
          />
        </li>
      ))}
    </ul>
  );
};

export default GroupList;
