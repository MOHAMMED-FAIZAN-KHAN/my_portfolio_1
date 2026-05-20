import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

// Navbar is the fixed top menu used to move between page sections.
const Navbar = () => {
  // active stores which nav item is currently selected.
  const [active, setActive] = useState("");
  // toggle controls whether the mobile dropdown menu is open.
  const [toggle, setToggle] = useState(false);
  // scrolled becomes true after the user scrolls down, so the navbar gets a background.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check the current scroll position and update navbar background state.
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Listen for page scrolling when the component is mounted.
    window.addEventListener("scroll", handleScroll);

    // Remove the listener when Navbar is removed to avoid memory leaks.
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        {/* Logo/name link sends the user back to the top of the page. */}
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* Change logo.svg in src/assets if you want a different logo image. */}
          <img src={logo} alt='logo' className='w-10 h-10 object-contain' />
          <p className='text-[18px] font-bold cursor-pointer flex '>
            {/* Change this text to update the name shown in the navbar. */}
            <span className='sm:block hidden text-white'>Mohammed Faizan Khan</span> &nbsp;
            <span className='sm:block hidden text-white'> | Developer</span>
          </p>
        </Link>

        {/* Desktop navigation links. Hidden on small screens. */}
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button and dropdown. Shown only on small screens. */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            {/* Mobile navigation links. */}
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
