import { useRouter } from 'next/router';

const PremiumBanner = () => {
  const router = useRouter();

  const handleBannerClick = () => {
    router.push('https://seanc48410.clickfunnels.com/optin1673876724612');
  };

  return (
    <div
      className="flex cursor-pointer items-center justify-center bg-blue-600 py-2"
      onClick={handleBannerClick}
    >
      <p className="flex flex-col text-center text-xs font-bold uppercase text-white md:text-base lg:text-lg xl:flex-row xl:text-xl">
        <span>*** Be The FIRST to hear about LAUNCH beta program.</span>{' '}
        <span>Your personal dedicated growth partner - Click Here ***</span>
      </p>
    </div>
  );
};

export default PremiumBanner;
