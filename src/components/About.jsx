import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// One service card in the About section.
// It shows an icon and a title with hover motion animation.
const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    whileHover={{ y: -10, scale: 1.02 }}
    className='xs:w-[250px] w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
  >
    <div
      className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
    >
      <img
        src={icon}
        alt='web-development'
        className='w-16 h-16 object-contain'
      />

      <h3 className='text-white text-[20px] font-bold text-center'>
        {title}
      </h3>
    </div>
  </motion.div>
);

// About introduces you and shows the services/roles you want to highlight.
const About = () => {
  return (
    <>
      {/* Section heading. */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      {/* Short personal introduction paragraph. */}
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        {/* Change this paragraph to your real introduction/about message. */}
        I'm a learning full stack developer with skills in c,c++,java, and
        python, and in frontend like html, css,little javascript and flutter.
        I'm a quick learner and collaborate easily with groups to
        create efficient, scalable, and user-friendly solutions that helps solve
        real-world problems.
         Let's work together to bring your ideas to life! 
      </motion.p>

      {/* Render one service card for each item from constants/index.js. */}
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
