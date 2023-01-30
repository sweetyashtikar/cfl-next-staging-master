import { useRouter } from 'next/router';
import qs from 'qs';
import useSWR from 'swr';

import AdvisorProfileCard from '@/components/search/Card';

import { sessionGet } from '@/helpers/fetchers';

import AdvisorsSkeleton from './AdvisorsSkeleton';
import NoAdvisorsResult from './NoAdvisorsResult';
import Error from '../common/Error';

const PAGE_SIZE = 12;

export default function AdvisorsList({ advisor }: any) {
  const router = useRouter();
  const { page, ...params } = router.query;

  const offset = page ? (parseInt(page.toString()) - 1) * PAGE_SIZE : 0;
  const fetchUrl = `advisor-profiles/?_limit=${PAGE_SIZE}&_start=${offset}&${qs.stringify(
    params
  )}`;

  const { data: advisors, error } = useSWR(fetchUrl, sessionGet);

  if (!advisors && !error) {
    return <AdvisorsSkeleton />;
  }

  if (error) {
    return <Error />;
  }

  if (advisors.length <= 0) {
    return <NoAdvisorsResult />;
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {advisors.map((profile: any) => (
        <li
          key={profile._id}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <AdvisorProfileCard advisor={advisor} profile={profile} />
        </li>
      ))}
    </ul>
  );
}
