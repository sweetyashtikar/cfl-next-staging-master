import {
  ChatAltIcon,
  SearchIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import axios from 'axios';
import { toast } from 'react-toastify';
import useSWR, { useSWRConfig } from 'swr';

import useUser from '@/hooks/useUser';

import Loader from '@/components/common/Loader';
import ConnectionsPage from '@/components/connections/Page';
import Forbidden from '@/components/Forbidden';
import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';
import Loading from '@/components/Loading';
import ProfilePicture from '@/components/ProfilePicture';

import { NEXT_URL } from '@/config/index';
import { sessionGet } from '@/helpers/fetchers';

export interface IConnectionProps {}

export interface IFormProps {
  message: string;
  profile: string;
}

export default function Connection() {
  const { loading, loggedOut, user } = useUser();

  const { mutate } = useSWRConfig();
  const { data: connections, isLoading } = useSWR(
    user
      ? `/connections/me?_limit=-1&status=pending&authorProfile=${user?.profile?.id}`
      : null,
    sessionGet
  );

  const handleAccept = async (id: string) => {
    try {
      await axios.put(`${NEXT_URL}/api/session/connections/accept/${id}`, {});
      mutate(
        `/connections/me?_limit=-1&status=pending&authorProfile=${user?.profile?.id}`
      );
      toast('You have accepted the connection');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleIgnore = async (id: string) => {
    try {
      await axios.put(`${NEXT_URL}/api/session/connections/ignore/${id}`, {});
      mutate(
        `/connections/me?_limit=-1&status=pending&authorProfile=${user?.profile?.id}`
      );
      mutate(
        `/connections/me?status=ignored&authorProfile=${user?.profile?.id}`
      );
      toast('You have ignored the connection');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  if (loading) return <Loading />;
  if (loggedOut) return <Forbidden />;

  return (
    <Layout
      meta={
        <Meta
          title="Pending Connections - CoFoundersLab"
          description="Pending Connections on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <ConnectionsPage>
        <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
          <div className="divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h2
                id="notes-title"
                className="text-lg font-medium text-gray-900"
              >
                Pending connections
              </h2>
            </div>
            {connections && connections.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-200">
                {connections.map((request: any) => (
                  <li
                    key={request.id}
                    className="col-span-1 flex flex-col text-center"
                  >
                    <div className="px-4 py-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5">
                      <div className="relative flex items-center space-x-5">
                        <div className="flex-shrink-0">
                          <Link
                            href={`/profile/${request?.authorProfile?.slug}`}
                          >
                            <div className="relative h-12 w-12 cursor-pointer rounded-full hover:ring-2 hover:ring-blue-400 hover:ring-offset-2">
                              <ProfilePicture
                                className="h-12 w-12 overflow-hidden rounded-full"
                                profile={request?.authorProfile}
                              />
                              <span
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="text-left">
                          <h1>
                            <Link
                              href={`/profile/${request?.authorProfile?.slug}`}
                              className="font-bold text-gray-900 hover:underline"
                            >
                              {`${request?.authorProfile?.firstName} ${request?.authorProfile?.lastName}`}
                            </Link>
                            <span className="mx-1 text-sm font-medium text-gray-500">
                              -
                            </span>
                            <span className="text-sm font-medium text-gray-600">
                              {request?.authorProfile?.tagline}
                            </span>
                          </h1>
                          <p className="text-sm font-normal text-gray-500">
                            <ChatAltIcon
                              className="mr-1 inline h-4 w-4 text-gray-400"
                              aria-hidden="true"
                            />
                            {request?.message}
                          </p>
                        </div>
                      </div>
                      <div className="justify-stretch mt-6 flex flex-col-reverse items-center space-y-4 space-y-reverse md:mt-0 md:flex-row md:space-y-0 md:space-x-3">
                        <button
                          type="button"
                          onClick={() => handleIgnore(request.id)}
                          className="inline-flex justify-center rounded-md px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-100"
                        >
                          Ignore
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAccept(request.id)}
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <div className="m-auto py-10 text-center">
                  {!isLoading ? (
                    <div className="flex flex-col">
                      <UserGroupIcon
                        className="mx-auto h-12 w-12 text-gray-400"
                        aria-hidden="true"
                      />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No pending connections
                      </h3>
                      <div className="mt-6">
                        <Link
                          href="/search"
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          <SearchIcon
                            className="-ml-1 mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Find a CoFounder
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <Loader />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </ConnectionsPage>
    </Layout>
  );
}
