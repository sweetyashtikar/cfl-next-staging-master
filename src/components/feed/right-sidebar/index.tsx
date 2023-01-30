import RecommendSections from '@/components/common/RecommendSections';
import UpcomingEvents from '@/components/common/UpcomingEvents';

const RigthSideBar = () => {
  return (
    <div className="mt-10 hidden h-full w-2/6 lg:block">
      {/* You Might Like */}
      <RecommendSections isLarge />

      {/* Events */}
      <UpcomingEvents isLarge />

      {/* Banner */}
      <div className="mt-[30px] rounded-xl">
        <img
          className="rounded-xl"
          src="/assets/images/banner/banner.png"
          alt="banner"
        />
      </div>
    </div>
  );
};

export default RigthSideBar;
