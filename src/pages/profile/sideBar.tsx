import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import useUser from '@/hooks/useUser';

import Link from '@/components/Link';

import { useAuth } from '@/context/AuthContext';

function SideBar() {
  const { logout } = useAuth();
  let routess = useRouter();
  const { loading, loggedOut, user, mutate } = useUser();
  const [expand, setExpand] = useState(false);
  const [namedMenu, setnames] = useState(null);
  const expandFun = () => {
    if (!expand) {
      setExpand(true);
    } else {
      setExpand(false);
    }
  };

  const handleLogout = async () => {
    const req = await logout();

    if (!req) {
      return toast.error('There was an error logging out.');
    }
    //@ts-ignore
    mutate(null);
    routess.replace('/');
    toast('Logged out successfully');
    return;
  };
  const sidesMenu = [
    {
      name: 'Feed',
      href: '/feed',
      img: '/assets/images/apps.svg',
    },
    {
      name: 'Explore',
      href: '/accelerator',
      img: '/assets/images/explore.svg',
    },
    {
      name: 'Discuss',
      href: '/accelerator',
      img: '/assets/images/coment.svg',
    },
    {
      name: 'Find an Advisor',
      href: '/accelerator',
      img: '/assets/images/apps.svg',
    },
    {
      name: 'Accelerate',
      href: '/accelerator',
      img: '/assets/images/accelrte.svg',
    },
    {
      name: 'Messages',
      href: '/messages',
      img: '/assets/images/message.svg',
    },
    {
      name: 'Notifications',
      href: '/accelerator',
      img: '/assets/images/notify.svg',
    },
  ];
  const sidesMenu2 = [
    {
      name: 'Profile',
      href: `/profile/${user?.profile?.slug}`,
      img: '/assets/images/userr.svg',
    },
    {
      name: 'Settings',
      href: '/feed',
      img: '/assets/images/settings.svg',
    },
  ];
  const sideActive = (name: any) => {
    setnames(name);
  };
  console.log(namedMenu, 'namedMenu');
  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="desktopSide ">
          <div className="sideBar">
            <ul>
              {sidesMenu.map((item, index) => {
                return (
                  <li
                    key={item + index.toString()}
                    className={
                      namedMenu == item.name
                        ? 'listingSideBar active flex'
                        : 'listingSideBar flex'
                    }
                  >
                    <span>
                      <img src={item.img} />
                    </span>
                    <Link
                      onClick={() => sideActive(item.name)}
                      href={item.href ? item.href : ''}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="sideBar list2">
            <ul>
              {sidesMenu2.map((item: any, index) => {
                return (
                  <li
                    key={item.name}
                    className={
                      namedMenu == item.name
                        ? 'listingSideBar active flex'
                        : 'listingSideBar flex'
                    }
                  >
                    <span>
                      <img src={item.img} />
                    </span>
                    <Link
                      onClick={() => sideActive(item.name)}
                      href={{
                        pathname: item.href,
                        query: {
                          name: item.name,
                        },
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}

              <li className=" listingSideBar flex">
                <span>
                  <img src={'/assets/images/logout.svg'} />
                </span>
                <Link onClick={() => handleLogout()}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* -------MobileSide-------- */}
        {/* <button className='expandButton mobileeSide' onClick={()=>expandFun()}>+ Profile</button> */}
        <div className="mobileeSide p-2">
          <button
            onClick={() => expandFun()}
            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            id="headlessui-popover-button-:re:"
            type="button"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            Profile
          </button>
          <div className={expand ? 'onexpandsIDE' : 'expandsIDE'}>
            <div className="sideBar">
              <ul>
                {sidesMenu.map((item, index) => {
                  return (
                    <>
                      <li
                        key={item.name}
                        className={
                          namedMenu == item.name
                            ? 'listingSideBar active flex'
                            : 'listingSideBar flex'
                        }
                      >
                        <span>
                          <img src={item.img} />
                        </span>
                        <Link
                          onClick={() => sideActive(item.name)}
                          href={item.href ? item.href : ''}
                        >
                          {item.name}
                        </Link>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
            <div className="sideBar list2">
              <ul>
                {sidesMenu2.map((item: any, index) => {
                  return (
                    <>
                      <li
                        key={item.name}
                        className={
                          namedMenu == item.name
                            ? 'listingSideBar active flex'
                            : 'listingSideBar flex'
                        }
                      >
                        <span>
                          <img src={item.img} />
                        </span>
                        <Link
                          onClick={() => sideActive(item.name)}
                          href={item.href}
                        >
                          {item.name}
                        </Link>
                      </li>
                    </>
                  );
                })}
                <li className=" listingSideBar flex">
                  <span>
                    <img src={'/assets/images/logout.svg'} />
                  </span>
                  <Link onClick={() => handleLogout()}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
