import cookie from 'cookie';

export function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || '' : '');
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export function formatAmountForDisplay(
  amount: number,
  currency: string
): string {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(amount);
}

export function formatAmountForStripe(
  amount: number,
  currency: string
): number {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

export const truncate = (str: string, max: number, suffix: string) =>
  str.length < max
    ? str
    : `${str.substring(
        0,
        str.substring(0, max - suffix.length).lastIndexOf(' ')
      )}${suffix}`;

export const getContent = (messageText: string) => {
  // Youtube iframe logic
  const regExp =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

  return messageText
    .split(' ')
    .map((item) => {
      const match = item.match(regExp);

      if (match?.[0]) {
        const textLink = match[0];
        let videoId = textLink.split('v=')[1];
        if (videoId) {
          const ampersandPosition = videoId.indexOf('&');
          if (ampersandPosition != -1) {
            videoId = videoId.substring(0, ampersandPosition);
          }
          return `<iframe class="youtube-preview" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen />`;
        }
      }

      return item;
    })
    .join(' ')
    .replaceAll(
      'style="width: 100%; cursor: pointer; outline: none; text-decoration: none; color: black;"',
      'style="display: none;"'
    );
};
