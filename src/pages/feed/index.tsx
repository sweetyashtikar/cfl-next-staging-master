import { CheckIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import useUser from '@/hooks/useUser';

import Loader from '@/components/common/Loader';
import NewPost from '@/components/feed/new-post';
import PostCard from '@/components/feed/post';
import RigthSideBar from '@/components/feed/right-sidebar';
import { Layout, Meta } from '@/components/layout';
import ProfilePicture from '@/components/ProfilePicture';

import { API_URL, NEXT_URL } from '@/config';
import { IUser } from '@/context/AuthContext';
import { parseCookies } from '@/helpers';
import { sessionGet } from '@/helpers/fetchers';

import profile from '../settings/profile';

export interface IPoll {
  _id: string;
  text: string;
  poll_options: IPollOption[];
}
interface IPollOption {
  votes: string[];
  createdAt: string;
  publishedAt: string;
  _id: string;
  text: string;
}
export interface IPOST {
  _id: string;
  text: string;
  media: any[];
  user: IUser;
  commentsCount: number;
  liked_by_users: string[];
  createdAt: string;
  updatedAt: string;
  poll: IPoll;
}

export interface IComment {
  id: string;
  text: string;
  user: IUser;
  feed_post: string;
  createdAt: string;
  updatedAt: string;
}

function Feed({ token }: { token: string }) {
  const { user } = useUser();
  const { query } = useRouter();

  const fetchUrl = query.group ? `groups/${query.group}` : '';

  const { data: group, isLoading: isGroupLoading } = useSWR(
    fetchUrl,
    sessionGet
  );

  const [posts, setPosts] = useState<IPOST[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerUrl, setBannerUrl] = useState('');
  const [ProfileImagefile, setProfileImagefile] = useState(null);
  const [ProfileImageurl, setProfileImageurl] = useState('');

  const params = {
    ...query,
    user_id: user?.id,
  };

  const fetchFeedPostApi = () => {
    return axios(`${API_URL}/feed-posts?${qs.stringify(params)}`);
  };

  const loadPosts = async () => {
    setIsLoading(true);

    try {
      const response = await fetchFeedPostApi();
      if (response?.data) {
        setPosts(response.data as IPOST[]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [query, user]);

  useEffect(() => {
    if (group) {
      setBannerUrl(group.profileBanner?.url);
      setProfileImageurl(group.icon?.url);
    }
  }, [group]);

  const handleClickDelete = (id: string) => {
    return axios.delete(`${NEXT_URL}/api/session/feed-posts/${id}`).then(() => {
      setPosts((list) => list.filter((item) => item._id !== id));
    });
  };

  const handleLikesChangeOnPost = (postId: string, likedByUsers: string[]) => {
    setPosts((list) =>
      list.map((p) =>
        p._id === postId ? { ...p, liked_by_users: likedByUsers } : p
      )
    );
  };

  const coverChange = (e: any) => {
    let file = e.target.files[0];
    setBannerFile(file);
    console.log(file, 'file');
    if (file) {
      let url = URL.createObjectURL(file);
      console.log(url, 'url');
      setBannerUrl(url);
    }
  };

  const ProfileImageChange = (e: any) => {
    let file = e.target.files[0];
    setProfileImagefile(file);
    console.log(file, 'file');
    if (file) {
      let url: any = URL.createObjectURL(file);
      setProfileImageurl(url);
    }
  };

  return (
    <Layout
      showLeftSidebar
      meta={
        <Meta
          title="Feed - CoFoundersLab"
          description="Share on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <div
        className="block justify-between sm:flex"
        style={{ backgroundColor: '#F3F3F3' }}
      >
        {(isLoading || isGroupLoading) && (
          <div className="fixed top-0 left-0 z-50 grid h-full w-full place-items-center bg-[#ffffffa0]">
            <Loader />
          </div>
        )}

        <div className="m-10 ml-4 mr-4 lg:w-4/6">
          {query.group && group && (
            <>
              <section
                aria-labelledby="group-profile-overview-title"
                className="mb-6"
              >
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <h2 className="sr-only" id="group-profile-overview-title">
                    Profile Overview
                  </h2>
                  <div
                    className="relative h-[250px] w-full !bg-cover !bg-center !bg-no-repeat"
                    style={{ background: `url(${bannerUrl}` }}
                  />
                  <div className="relative mt-[-150px] p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div className="sm:flex sm:items-center sm:space-x-5">
                        <div className="relative flex-shrink-0">
                          <ProfilePicture
                            className="mx-auto h-[180px] w-[180px] overflow-hidden rounded-full border-4 border border-slate-200"
                            profile={profile}
                            profileURL={ProfileImageurl}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative px-6 pl-4 pb-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div className="sm:flex sm:items-center sm:space-x-5">
                        <div className="relative flex-shrink-0">
                          {group.premium && (
                            <div className="absolute right-[30px] flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white bg-orange-600 text-white">
                              <CheckIcon width={20} height={20} />
                            </div>
                          )}
                        </div>
                        <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                          <div className="educationCard">
                            <p className="text-xl font-bold text-[#4E5D78] sm:text-2xl">
                              {`${group.name}`}
                            </p>

                            <div className="right-[30px] mt-1 ml-2 flex h-[30px] w-[30px] rounded-full border border-white text-white">
                              <img src="/assets/images/check.svg" alt="check" />
                            </div>
                          </div>

                          <p className="mt-4 mb-4 text-lg font-medium text-gray-500 sm:mt-0">
                            {group.tagline || 'Group tagline'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2 className="sr-only" id="quick-links-title">
                    Quick links
                  </h2>
                </div>
              </section>

              <section aria-labelledby="about-group" className="mb-6">
                <div className="overflow-hidden rounded-lg bg-white  py-4 shadow">
                  <div className="px-0 pb-0">
                    <div className="border-0 border-slate-100 sm:col-span-6">
                      <dt className="mobHead border-b-2 border-slate-100 px-8 pt-3 text-xl font-semibold text-[#4E5D78]">
                        About
                      </dt>
                    </div>
                    <dl className="justify grid grid-cols-1 gap-x-4 gap-y-8 px-8 pb-4 text-lg text-base text-gray-500 sm:grid-cols-3">
                      <div className="sm:col-span-6">
                        <dd
                          className="mt-1 max-w-full  pb-2 text-sm text-gray-500"
                          dangerouslySetInnerHTML={{
                            __html:
                              group.description?.replace(/\n/g, '<br />') ||
                              `Hi, this is a group.`,
                          }}
                        />
                      </div>
                    </dl>
                  </div>
                </div>
              </section>
            </>
          )}

          <NewPost onSubmit={loadPosts} token={token} />

          {posts.map((post) => (
            <PostCard
              key={post._id}
              data={post}
              onDelete={() => handleClickDelete(post._id)}
              onLikesChange={(list) => handleLikesChangeOnPost(post._id, list)}
            />
          ))}
        </div>
        <RigthSideBar />
      </div>
    </Layout>
  );
}

export default Feed;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);

  const user = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  return {
    props: {
      token: token ? token : '',
    },
  };
};
