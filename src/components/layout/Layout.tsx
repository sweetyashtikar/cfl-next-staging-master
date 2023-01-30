import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import useUser from '@/hooks/useUser';

import { classNames } from '@/helpers/index';

import Footer from './Footer';
import Header from './Header';
import LeftSideBar from './left-sidebar';

interface ILayoutProps {
  meta?: ReactNode;
  headerBanner?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
  children?: ReactNode;
  className?: string;
  showLeftSidebar?: boolean;
  handleSearch?: (searchTerm: string) => void;
  bgColor?: string;
}

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  const { loggedOut } = useUser();
  const BgColor = !loggedOut ? 'bg-gray-100' : '';
  return (
    <div
      className={classNames(
        `flex h-full w-full flex-col ${
          props.bgColor ? props.bgColor : BgColor
        }  antialiased`,
        props.className
      )}
    >
      {props.meta}
      {/* {typeof props.headerBanner !== 'undefined' ? (
        props.headerBanner
      ) : (
        <HeaderBanner />
      )} */}
      {typeof props.header !== 'undefined' ? (
        props.header
      ) : (
        <Header sticky handleSearch={props.handleSearch} />
      )}

      {typeof props.sidebar !== 'undefined' ? (
        <div className=" ">{props.children}</div>
      ) : (
        <div
          className={`mx-auto flex w-full max-w-[100vw] px-0 sm:px-5 lg:max-w-[90vw] xl:max-w-[80vw] ${
            !!props.showLeftSidebar ? 'justify-between' : 'justify-center'
          } ${props.bgColor ? props.bgColor : BgColor}`}
        >
          {(!loggedOut || router.pathname.includes('feed')) &&
            !!props.showLeftSidebar && <LeftSideBar />}
          <div
            className="w-full md:w-[75%] lg:w-[82%] lg:pl-0
            xl:w-5/6"
          >
            {props.children}
          </div>
        </div>
      )}

      {typeof props.footer !== 'undefined' ? props.footer : <Footer />}
    </div>
  );
}
