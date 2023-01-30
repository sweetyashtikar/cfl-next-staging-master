import { CogIcon } from '@heroicons/react/outline';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';

import RigthSideBar from '@/components/feed/right-sidebar';
import { Layout, Meta } from '@/components/layout';
import Notification from '@/components/notifications/notification';

import { API_URL } from '@/config';
import { IUser } from '@/context/AuthContext';
import { parseCookies } from '@/helpers';
import { sessionGet } from '@/helpers/fetchers';

export type NotificationType = {
  _id: string;
  action: string;
  userSender: IUser;
  userReceiver: IUser;
  references: {};
  published_at: string;
  isSeen: boolean;
};

function Notifications() {
  const { data } = useSWR<NotificationType[]>('notifications/user', sessionGet);

  return (
    <Layout showLeftSidebar meta={<Meta title="Notifications" />}>
      <div
        className="flex justify-between"
        style={{ backgroundColor: '#F3F3F3' }}
      >
        <div className="mx-8 my-10 w-full lg:w-8/12">
          <div
            className="flex justify-between rounded-t-lg bg-white py-2 px-4"
            style={{ alignItems: 'center', height: '60px' }}
          >
            <div className="font-bold">Notifications</div>
            <CogIcon className="h-6 cursor-pointer " />
          </div>
          {data?.length === 0 && (
            <div className="mx-auto mt-7 w-64 rounded-lg bg-gray-400 p-4 text-center font-semibold text-white">
              Nothing new here
            </div>
          )}
          {data
            ?.filter((notification) => {
              if (notification?.userSender?.profile?.firstName) {
                return notification;
              } else {
                return;
              }
            })
            .map((notification: NotificationType) => (
              <Notification
                key={notification?._id}
                notification={notification}
              />
            ))}
        </div>
        <RigthSideBar />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);

  const user = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  if (!user?.error) {
    return {
      props: {
        token: token ? token : '',
      },
    };
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};

export default Notifications;
