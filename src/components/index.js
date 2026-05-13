import { EarthCanvas, BallCanvas, ComputersCanvas, StarsCanvas } from './canvas';
import Hero from "./Hero";
import Navbar from "./Navbar";
import About from "./About";
import Tech from "./Tech";
import Experience from "./Experience";
import Works from "./Works";
import Feedbacks from "./Feedbacks";
import Contact from "./Contact";
import CanvasLoader from "./Loader";
import SkillCard from "./SkillCard";

// Re-export all components from one file so App.jsx can import them cleanly.
export {
  Hero,
  Navbar,
  About,
  Tech,
  Experience,
  Works,
  Feedbacks,
  Contact,
  CanvasLoader,
  SkillCard,
  EarthCanvas, 
  BallCanvas, 
  ComputersCanvas, 
  StarsCanvas
};
