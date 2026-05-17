import React from "react";

import SkillCard from "./SkillCard";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

// Tech shows your skills as racing dashboard cards.
const Tech = () => {
  return (
    <section className='skills-overview-section w-full'>
      <div className='skills-overview-header'>
        <p>MY EXPERTISE</p>
        <h2>SKILLS <span>OVERVIEW</span></h2>
      </div>

      <div className='skills-dashboard-grid'>
        {/* Create one skill card for each technology from constants/index.js. */}
        {technologies.map((technology) => (
          <SkillCard key={technology.name} technology={technology} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "");
