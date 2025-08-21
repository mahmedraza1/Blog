import React from "react";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { logout } from "../../store/authslice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/", active: true },
    { label: "Blogs", path: "/blogs", active: true },
    { label: "About", path: "/about", active: true },
    {
      label: "Work With Me",
      path: "https://www.fiverr.com/mahmedraza1",
      external: true,
    },
    { label: "Login", path: "/login", active: !authStatus },
    { label: "Sign Up", path: "/signup", active: !authStatus },
  ];

  return (
    <header className="w-full text-gray-100 border-b border-gray-200/40">
      <nav className="">
        <a href="/" className="flex items-center gap-2">
                    <p className="bg-orange-500 hover:bg-orange-500/90 transition-all duration-300 rounded-lg p-3">
                      <FaBolt className="text-gray-100 text-xl" />
                    </p>
                    <p className="text-2xl font-bold">Muhammad Ahmed Raza</p>
                  </a>
                  <ul>
                    {
                      navItems.map((item) => 
                      item.active ? (
                        <li key={item.label}>
                          <a href={item.path} target={item.external ? "_blank" : "_self"}>
                            {item.label}
                          </a>
                        </li>
                      ): null
                      )
                    }
                  </ul>
      </nav>
      
</header>
  );
};

export default Header;
