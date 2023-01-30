// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL): void => {
  if (
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS &&
    typeof window.gtag !== 'undefined'
  ) {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (action: any, params: any): void => {
  if (
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS &&
    typeof window.gtag !== 'undefined'
  ) {
    window.gtag('event', action, params);
  }
};
