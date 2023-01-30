import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useSessionFetch(path: string | null) {
  const { data, error, mutate } = useSWR(
    path ? `/api/session/${path}` : null,
    fetcher
  );

  const loading = path !== null && !data && !error;

  return {
    loading,
    data,
    error,
    mutate,
  };
}
