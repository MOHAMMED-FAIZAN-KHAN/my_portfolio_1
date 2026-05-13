import React from "react";

import SkillCard from "./SkillCard";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

// Tech shows your skills as rotating 3D balls.
const Tech = () => {
  return (
    <div className='w-full'>
      <h2 className='text-white font-bold md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center mb-12'>
        Skills Achieved
      </h2>
      <div className='flex flex-row flex-wrap justify-center gap-12 px-20 py-24 w-full'>
        {/* Create one skill card for each technology from constants/index.js. */}
        {technologies.map((technology) => (
          <SkillCard key={technology.name} technology={technology} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
