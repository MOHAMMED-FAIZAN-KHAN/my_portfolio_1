import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

// App is the main layout of the portfolio.
// It decides the order in which every section appears on the page.
const App = () => {
  return (
    // BrowserRouter allows navigation-related components like Link to work.
    <BrowserRouter>
      {/* Main page background and stacking context for the whole website. */}
      <div className='relative z-0 bg-primary'>
        {/* Hero area uses a special background image from Tailwind config. */}
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>

        {/* These are the main portfolio sections shown one after another. */}
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />

        {/* Contact has the animated stars behind it. */}
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
