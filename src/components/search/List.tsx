import { useRouter } from 'next/router';
import qs from 'qs';
import useSWR from 'swr';

import ProfileCard from '@/components/search/Card';

import { useSearchContext } from '@/context/SearchContext';
import { sessionGet } from '@/helpers/fetchers';

import NoSearchResult from './NoSearchResults';
import SearchSkeleton from './SearchSkeleton';
import Error from '../common/Error';

const PAGE_SIZE = 12;

export default function SearchList({ advisor }: any) {
  const router = useRouter();
  const { page, ...params } = router.query;

  const searchContext: any = useSearchContext();

  const offset = page ? (parseInt(page.toString()) - 1) * PAGE_SIZE : 0;
  const fetchUrl = `profiles/search?_sort=profilePicture:DESC,legacyProfilePicture:DESC,createdAt:DESC&_limit=${PAGE_SIZE}&_start=${offset}&${qs.stringify(
    params
  )}`;

  const { data: profiles, error } = useSWR(fetchUrl, sessionGet);

  if (!profiles && !error) {
    return <SearchSkeleton />;
  }

  if (error) {
    return <Error />;
  }

  if (profiles.length <= 0) {
    return <NoSearchResult />;
  }

  const renderProfiles = searchContext.hits.length
    ? searchContext.hits
    : profiles;

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 "
    >
      {renderProfiles.map((profile: any) => (
        <li
          key={profile._id}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <ProfileCard advisor={advisor} profile={profile} />
        </li>
      ))}
    </ul>
  );
}
