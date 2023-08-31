import AppFeatures from './AppFeatures';
import FeaturedProjects from './FeaturedProjects';
import AppDescription from './AppDescription';

function Featured() {
  return (
    <div>
    <div className="flex items-center justify-center flex-col text-white bg-blue-200 relative px-5 z-[1] py-24 gap-24 md:py-20 md:gap-32 lg:py-30 lg:gap-40">
      {/* ------------- Features ------------ */}

      <AppFeatures />

      
      {/* -------------Featured Projects ------------ */}
      <FeaturedProjects />
    </div>
    <div className="flex items-center justify-center flex-col text-white bg-cyan-50 relative px-5 z-[1] py-24 gap-24 md:py-48 md:gap-32 lg:py-60 lg:gap-40">
      <AppDescription />
      </div>
      </div>
  );
}

export default Featured;
