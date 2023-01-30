import OpenReplay from '@openreplay/tracker';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import useUser from '@/hooks/useUser';

type User = any;

const tracker = new OpenReplay({
  projectKey: `${process.env.NEXT_PUBLIC_OPENREPLAY_KEY}`,
  ingestPoint: 'https://or.cofounderslab.com/ingest',
});

type OpenReplayType = {
  tracker: any;
  identified: User | boolean;
  identifyUser: (u: User) => void;
  initialized: boolean;
};

type OpenReplayProviderType = {
  children: any;
};

export const OpenReplayContext = createContext<OpenReplayType>({
  tracker,
  identified: false,
  identifyUser: (_u: User) => {},
  initialized: false,
});

export const OpenReplayProvider = ({ children }: OpenReplayProviderType) => {
  const [identified, setIdentified] = useState<User | boolean>(false);
  const [initialized, setInitialized] = useState(false);
  const { user } = useUser();

  const initialize = useCallback(() => {
    tracker.start();
    setInitialized(true);
    console.debug('OpenReplay initialized');
  }, []);

  const identifyUser = useCallback(
    (u: User) => {
      if (!u) return;
      if (!initialized) {
        initialize();
      }
      tracker.setUserID(u?.email);
      tracker.setMetadata('role', u?.role?.type);
      setIdentified(u);
      console.debug('OpenReplay identified');
    },
    [initialized, initialize]
  );

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  useEffect(() => {
    identifyUser(user);
  }, [identified, initialized, user]);

  return (
    <OpenReplayContext.Provider
      value={{
        tracker,
        identified,
        identifyUser,
        initialized,
      }}
    >
      {children}
    </OpenReplayContext.Provider>
  );
};

export default function useOpenReplay() {
  const openReplayContext = useContext(OpenReplayContext);

  return openReplayContext;
}
