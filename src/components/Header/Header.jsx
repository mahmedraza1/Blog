import React, { useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBolt } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: "Home", path: "/", active: true },
    { label: "Blogs", path: "/blogs", active: true },
    { label: "About", path: "/about", active: true },
    {
      label: "Work With Me",
      path: "https://www.fiverr.com/mahmedraza1",
      external: true,
    },
    { label: "Add Post", path: "/add-post", active: authStatus },
    { label: "Login", path: "/login", active: !authStatus },
    { label: "Sign Up", path: "/signup", active: !authStatus },
  ];

  return (
    <header className="w-full text-gray-100 border-b border-gray-200/40 p-4 md:p-6 relative">
      <nav className="flex items-center justify-between md:justify-around">
        <NavLink to="/" className="flex items-center gap-2">
          <p className="bg-orange-500 hover:bg-orange-500/90 transition-all duration-300 rounded-lg p-2 md:p-3">
            <FaBolt className="text-gray-100 text-lg md:text-xl" />
          </p>
          <p className="text-xl md:text-2xl font-bold">Muhammad Ahmed Raza</p>
        </NavLink>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-100 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <RiCloseLine className="h-6 w-6" />
          ) : (
            <RiMenu3Line className="h-6 w-6" />
          )}
        </button>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  target={item.external ? "_blank" : "_self"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 font-bold"
                      : "text-gray-100 hover:text-orange-500"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ) : null
          )}
          { authStatus && (
            <li>
              <LogoutBtn />
            </li>
          ) }
        </ul>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-700 z-50 transition-all duration-300 ease-in-out">
            <ul className="flex flex-col p-4 space-y-3">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.label}>
                    <NavLink
                      to={item.path}
                      target={item.external ? "_blank" : "_self"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-orange-500 font-bold block w-full py-2"
                          : "text-gray-100 hover:text-orange-500 block w-full py-2"
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ) : null
              )}
              { authStatus && (
                <li className="py-2">
                  <LogoutBtn onClick={() => setIsMenuOpen(false)} />
                </li>
              ) }
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
