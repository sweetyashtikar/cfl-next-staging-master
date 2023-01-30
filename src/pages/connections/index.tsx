import { MailIcon, SearchIcon, UserGroupIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

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

export interface IConnectionProps {
  data: any;
}

export interface IFormProps {
  message: string;
  profile: string;
}

export default function Connection() {
  const { loading, loggedOut, user } = useUser();

  const { data, isLoading } = useSWR(
    user
      ? `/connections/me?_limit=-1&status=accepted&authorProfile=${user?.profile?.id}`
      : null,
    sessionGet
  );
  const [connections, setConnections] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (data) {
      setConnections(data);
    }
  }, [data]);

  if (loading || loader) return <Loading />;
  if (loggedOut) return <Forbidden />;

  const handleRemove = async (e: any) => {
    let c = confirm('Are you sure?');
    if (c) {
      try {
        let elm = e.target.parentNode.parentNode.parentNode.parentNode;
        await axios.delete(`${NEXT_URL}/api/session/connections/${elm.id}`, {});
        elm.remove();
        toast('You have removed a connection');
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  const handleSort = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let queryString = '';
    if (val == 'date-asc') {
      queryString = '&_sort=updatedAt:ASC';
    } else if (val == 'date-desc') {
      queryString = '&_sort=updatedAt:DESC';
    } else {
      queryString = '';
    }
    setLoader(true);
    const res = await axios.get(
      `${NEXT_URL}/api/session/connections/me?_limit=-1&status=accepted${queryString}`,
      {}
    );
    const connData: any = res.data;
    setConnections(connData);
    setLoader(false);
  };

  return (
    <Layout
      meta={
        <Meta
          title="My Connections - CoFoundersLab"
          description="My Connections on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
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
                Accepted connections
                <select
                  className="SortOrder float-right rounded-full py-1 text-xs"
                  id="sortConnections"
                  onChange={handleSort as any}
                >
                  <option value="">Sort By</option>
                  <option value="date-asc">Date ASC</option>
                  <option value="date-desc">Date DESC</option>
                </select>
              </h2>
            </div>
            {connections && connections.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-200">
                {connections.map((connection: any) => {
                  const interlocutor = connection.profiles.filter(
                    (x: any) => x.id !== user?.profile?.id
                  )[0];
                  if (!interlocutor) return null;
                  return (
                    <li
                      id={connection.id}
                      key={connection.id}
                      className="col-span-1 flex flex-col text-center"
                    >
                      <div className="px-4 py-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5">
                        <div className="relative flex items-center space-x-5">
                          <div className="flex-shrink-0">
                            <Link href={`/profile/${interlocutor?.slug}`}>
                              <div className="relative h-12 w-12 cursor-pointer rounded-full hover:ring-2 hover:ring-blue-400 hover:ring-offset-2">
                                <ProfilePicture
                                  className="h-12 w-12 overflow-hidden rounded-full"
                                  profile={interlocutor}
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
                                href={`/profile/${interlocutor?.slug}`}
                                className="font-bold text-gray-900 hover:underline"
                              >
                                {`${interlocutor?.firstName} ${interlocutor?.lastName}`}
                              </Link>
                            </h1>
                            <p className="text-sm font-normal text-gray-500">
                              {interlocutor?.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse md:mt-0 md:flex-row md:space-x-3">
                          <button
                            className="inline-flex h-10 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={handleRemove}
                          >
                            <span>Remove</span>
                          </button>
                          <Link
                            href={`/messages/${connection.id}`}
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            <MailIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Message</span>
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex flex-col">
                <div className="m-auto py-10 text-center">
                  {!isLoading ? (
                    <>
                      <UserGroupIcon
                        className="mx-auto h-12 w-12 text-gray-400"
                        aria-hidden="true"
                      />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No connections yet
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
                    </>
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </ConnectionsPage>
    </Layout>
  );
}
