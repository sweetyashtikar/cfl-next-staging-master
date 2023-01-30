import Link from '@/components/Link';

import * as ga from '@/helpers/ga';

const PremiumAccessLink = () => {
  return (
    <Link
      href="/premium"
      className="inline-flex items-center rounded-full bg-orange-100 px-3 py-0.5 text-xs font-medium leading-5 text-orange-800"
      onClick={() => {
        ga.event('click_menu_premium_cta', {
          event_category: 'ecommerce',
        });
      }}
    >
      &#9734; Get premium to access
    </Link>
  );
};

export default PremiumAccessLink;
