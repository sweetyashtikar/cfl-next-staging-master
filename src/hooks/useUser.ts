import useSWR from 'swr';

import { IUser, useAuth } from '@/context/AuthContext';

export default function useUser() {
  const auth = useAuth();
  const { data, mutate, error } = useSWR<IUser, any>('me', auth.hasSession, {
    shouldRetryOnError: false,
    refreshInterval: 600000, // 10 minutes
  });

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
