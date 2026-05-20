import { motion } from "framer-motion";

import { styles } from "../styles";
import AvatarCanvas from "./canvas/avatar";
import { logo } from "../assets";

// Hero Section
const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      
      {/* Hero Content */}
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        
        {/* Green Side Line */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#00cc44]" />

          <div className="w-1 sm:h-80 h-40" style={{ background: 'linear-gradient(-90deg, #00cc44 0%, rgba(0, 204, 68, 0) 100%)' }} />
        </div>

        {/* Hero Text */}
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm{" "}
            <span className="text-[#00cc44]" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Mohammed 
              <br/> 
              Faizan Khan
            </span>
          </h1>

          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I love coding and development, {" "}
            <br className="sm:block hidden" />
             programming webs and apps.
          </p>
        </div>
      </div>

      {/* 3D Avatar - Positioned Right */}
      <div className="absolute right-0 top-0 w-full sm:w-1/2 h-full z-0">
        <AvatarCanvas />
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-20">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
            
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
