import { createContext } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./navbar/Sidebar";

export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  return (
    <NavbarContext.Provider value={{}}>
      <Navbar />
      {children}
    </NavbarContext.Provider>
  );
};
