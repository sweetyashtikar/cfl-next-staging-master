import Script from 'next/script';

import useUser from '@/hooks/useUser';

export default function GoogleAnalytics() {
  const { loading, user } = useUser();
  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <>
          <Script
            id="manage-gtag"
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <Script id="manage-ga" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
              gtag('config', 'UA-23726719-1');
            `}
          </Script>
          {!loading && user && (
            <Script id="manage-ga-auth" strategy="lazyOnload">
              {`
                gtag('set', 'userId', '${user?.email}');
                gtag('set', 'user_properties', {
                  type: '${user.role?.type === 'premium' ? 'Premium' : 'Free'}',
                  ${user?.profile && `role: '${user?.profile?.role}',`}
                  ${
                    user?.profile &&
                    `lookingFor: '${user?.profile?.lookingFor}',`
                  }
                });
              `}
            </Script>
          )}
        </>
      )}
    </>
  );
}
