import RecommendSections from '@/components/common/RecommendSections';
import UpcomingEvents from '@/components/common/UpcomingEvents';

const RigthSideBar = () => {
  return (
    <div className="h-full">
      {/* You Might Like */}
      <RecommendSections />

      {/* Events */}
      <UpcomingEvents />
    </div>
  );
};

export default RigthSideBar;
