import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

// SectionWrapper is a higher-order component.
// It wraps normal sections with shared padding, scroll animation, and an anchor id.
const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      // This motion.section controls the animation when the section scrolls into view.
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        {/* This invisible span makes navbar links scroll to the correct section. */}
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        {/* This renders the original component that was wrapped. */}
        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
