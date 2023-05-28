import { createContext, useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";

export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Create an event listener
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <NavbarContext.Provider value={{ windowSize }}>
      <Navbar>{children}</Navbar>
    </NavbarContext.Provider>
  );
};
