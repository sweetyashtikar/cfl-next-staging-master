import { ErrorBoundary } from '@sentry/nextjs';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { SocialProfileJsonLd } from 'next-seo';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

import { OpenReplayProvider } from '@/hooks/useOpenReplay';

import Customerly from '@/components/Customerly';
import FacebookPixel from '@/components/FacebookPixel';
import GoogleAnalytics from '@/components/GoogleAnalytics';

import { AuthProvider } from '@/context/AuthContext';
import { SearchProvider } from '@/context/SearchContext';
import { apiGet } from '@/helpers/fetchers';

declare global {
  interface Window {
    fbq: any;
    ga: any;
    gtag: any;
  }
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.debug(`web vitals`, metric);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SocialProfileJsonLd
        type="Organization"
        name="CoFoundersLab"
        url={'https://cofounderslab.com/'}
        sameAs={[
          'https://twitter.com/CoFoundersLab',
          'https://www.instagram.com/cofounderslab/',
          'https://www.linkedin.com/company/cofounderslab',
          'https://www.facebook.com/CoFoundersLab/',
        ]}
      />
      <SWRConfig value={{ fetcher: apiGet }}>
        <AuthProvider>
          <OpenReplayProvider>
            <ErrorBoundary
              fallback={({ error, componentStack, resetError }) => (
                <>
                  <div>You have encountered an error</div>
                  <div>{error.toString()}</div>
                  <div>{componentStack}</div>
                  <button
                    onClick={() => {
                      resetError();
                    }}
                  >
                    Click here to reset!
                  </button>
                </>
              )}
            >
              <SearchProvider>
                <Component {...pageProps} />
              </SearchProvider>
            </ErrorBoundary>
            <ToastContainer position="top-center" className="z-[9999999999]" />
            <GoogleAnalytics />
            <Customerly />
            <FacebookPixel />
          </OpenReplayProvider>
        </AuthProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
