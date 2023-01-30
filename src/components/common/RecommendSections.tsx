import { useRouter } from 'next/router';
import qs from 'qs';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import useUser from '@/hooks/useUser';

import Loader from '@/components/common/Loader';
import MessageModal from '@/components/message/Modal';

import { sessionGet } from '@/helpers/fetchers';

interface IRecommendSection {
  isLarge?: boolean;
}

// const RECOMMEND_USERS_DATE = '15/12/2022';

const RecommendSections = (props: IRecommendSection) => {
  const { isLarge = false } = props;

  const [showMessage, setShowMessage] = useState(false);
  const [offset, setOffset] = useState(0);
  const [users, setUsers] = useState([]);

  const { user, loggedOut } = useUser();
  const router = useRouter();
  const isPremiumUser = user?.role?.type === 'premium';
  // const isDateToBeShown = isToday(RECOMMEND_USERS_DATE);

  const params = {
    role: user?.profile?.role,
    skills: user?.profile?.skills,
    country: user?.profile?.countryCode,
    interests: user?.profile?.interests,
  };

  const fetchUrl =
    isPremiumUser && !loggedOut
      ? `profiles/recommend-search?&_start=${offset}&_limit=3&${qs.stringify(
          params
        )}`
      : '';

  const { data, isLoading } = useSWR(fetchUrl, sessionGet);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleConnect = () => {
    if (loggedOut) {
      router.push('/login');
      return;
    }

    if (isPremiumUser) {
      router.push('/search');
    } else {
      setShowMessage(true);
    }
  };

  const handleIgnore = (userId: string | number) => {
    if (loggedOut) {
      router.push('/login');
      return;
    }

    if (users.length === 1) {
      setOffset((prevState) => prevState + 3);
    }
    setUsers((prevState) =>
      prevState.filter((item: any) => item.id !== userId)
    );
  };

  return (
    <div className="mb-5 rounded-xl border bg-white py-3">
      <div className="flex items-center justify-between border-b-2 px-6 pb-3">
        <span className="font-bold text-GrayScale">You Might Like</span>
      </div>

      {isLoading ? (
        <div className="mt-4 mb-2">
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        </div>
      ) : (
        <>
          {!loggedOut && users?.length > 0 && isPremiumUser ? (
            // isDateToBeShown ? (
            <>
              {users.map((userItem: any) => (
                <div key={userItem.id}>
                  <div
                    className={`flex gap-5 p-6 pb-4 md:flex-col ${
                      isLarge ? 'lg:flex-row' : 'xl:flex-row'
                    }`}
                  >
                    <img
                      className="h-14 w-14 rounded-full"
                      src={userItem?.profilePicture?.url}
                      alt="profile"
                    />
                    <div>
                      <span className="block font-[500]">{`${userItem?.firstName} ${userItem?.lastName}`}</span>
                      <small className="text-[#4E5D7899]">
                        {userItem?.role}
                      </small>
                    </div>
                  </div>
                  <div
                    className={`flex gap-5 px-6 pb-3 md:flex-col ${
                      isLarge ? 'lg:flex-row' : 'xl:flex-row'
                    }`}
                  >
                    <button
                      className="border-lack body-text w-full rounded-md border border-gray-500 py-1 px-4 text-black"
                      onClick={() => handleIgnore(userItem.id)}
                    >
                      Ignore
                    </button>
                    <button
                      className="w-full rounded-md bg-blue-600 py-1 px-4 text-white"
                      onClick={handleConnect}
                    >
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <h3 className="text-md mt-4 mb-2 text-center font-normal text-gray-500">
              No users found
            </h3>
          )}
        </>
      )}

      <MessageModal
        open={showMessage}
        profile={RecommendSections}
        handleClose={() => setShowMessage(false)}
      />
    </div>
  );
};

export default RecommendSections;
