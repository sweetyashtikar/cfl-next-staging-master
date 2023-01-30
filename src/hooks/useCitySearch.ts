import qs from 'qs';

import useSessionFetch from '@/hooks/useSessionFetch';

export default function useCitySearch(searchText: string) {
  const query = qs.stringify({
    _where: {
      _or: [
        // { id_eq: searchText },
        { name_contains: searchText },
        // { region_contains: searchText },
        // { regionCode_contains: searchText },
        { country_contains: searchText },
        // { countryCode_contains: searchText },
      ],
    },
  });
  return useSessionFetch(searchText ? `cities?${query}` : null);
}

export function useCityByID(searchText: string) {
  const query = qs.stringify({
    _where: {
      id_eq: searchText,
    },
  });
  return useSessionFetch(searchText ? `cities?${query}` : null);
}
