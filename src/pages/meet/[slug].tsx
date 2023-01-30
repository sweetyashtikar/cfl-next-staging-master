import axios from 'axios';
import { GetServerSideProps } from 'next';
import Script from 'next/script';

import styles from '@/styles/Meet.module.css';

import { Layout, Meta } from '@/components/layout';

import { API_URL } from '@/config/index';
import { classNames } from '@/helpers/index';
import { parseCookies } from '@/helpers/index';

export default function Meet({ user, room }: any) {
  let roomUrl = `https://video.zipcan.com/Ruo0rRvX1i5I?id=${room.slug}`;
  if (user?.id === room.user?.id) {
    roomUrl += `&name=${encodeURI(room.displayName)}`;
    roomUrl += '&host=E3dl2JCNj7zk';
  }

  return (
    <Layout
      meta={
        <Meta
          title={`Meet ${room.displayName} on CoFoundersLab`}
          description="CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      footer={null}
    >
      <div className="bg-gray-100 p-2">
        <div
          className={classNames(
            styles.embedWrapper,
            'h-full rounded-lg border-t border-gray-200 bg-white shadow'
          )}
        >
          <iframe
            id="zc-embed"
            width="100%"
            height="100%"
            src={roomUrl}
            frameBorder="0"
            allow="autoplay; picture-in-picture; camera; microphone; display-capture"
            allowFullScreen
            className={classNames(styles.embed)}
          ></iframe>
        </div>
      </div>
      <Script
        strategy="lazyOnload"
        crossOrigin="anonymous"
        src={`https://api.zipcan.com/iscript.js`}
      />
      <Script id="manage-customerly-hide" strategy="lazyOnload">
        {`
          setTimeout(() => {
            if(window.customerly) {
              window.customerly.hide();
            }
          }, 300);
        `}
      </Script>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query: { slug },
}) => {
  const { token } = parseCookies(req);
  let user = null;
  try {
    const { data } = await axios.get<any>(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user = data;
  } catch {}
  const { data: room } = await axios.get(`${API_URL}/personal-rooms/${slug}`);

  if (!room) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
      room,
    },
  };
};
