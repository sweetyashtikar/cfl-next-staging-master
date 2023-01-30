import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

import { useSearchContext } from '@/context/SearchContext';

function Hits({ searchState, searchResults }: any) {
  const validQuery = searchState.query?.length >= 3; // 3 is the minimum query length

  const router = useRouter();
  const searchContext: any = useSearchContext();

  useEffect(() => {
    if (validQuery) {
      searchContext.setHits(searchResults?.hits);
    } else {
      if (searchContext.hits.length) {
        searchContext.setHits([]);
      }
    }
  }, [searchResults?.hits]);

  return (
    <>
      {searchResults?.hits.length === 0 && validQuery && (
        <p>No results found!</p>
      )}

      {searchResults?.hits.length > 0 && validQuery && (
        <div className="absolute left-[10px] w-full cursor-pointer rounded-md bg-white shadow-lg">
          {searchResults.hits.map((hit: any, index: number) => (
            <div tabIndex={index} key={hit.objectID}>
              <p
                className={`${
                  index + 1 !== searchResults.hits.length &&
                  'border-b-[1px] border-slate-300'
                } py-[5px] pl-[10px]`}
                onClick={() => router.push(`/profile/${hit.slug}`)}
              >
                {hit.firstName} {hit.lastName}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default connectStateResults(Hits);
