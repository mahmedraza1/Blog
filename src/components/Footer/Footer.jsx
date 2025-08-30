import React from "react";
import { FaLink, FaBolt } from "react-icons/fa6";
import {
  FaStar,
  FaHome,
  FaBook,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full border-t border-t-gray-200/40 md:px-8 px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto mb-8 gap-8">
        <div className="flex flex-col md:col-span-2 gap-4">
          <span className="flex items-center gap-2">
            <p className="bg-orange-500 hover:bg-orange-500/90 transition-all duration-300 rounded-lg p-3">
              <FaBolt className="text-gray-100 text-xl" />
            </p>
            <p className="text-2xl font-bold">Muhammad Ahmed Raza</p>
          </span>
          <div className="flex flex-col gap-4 items-start">
            <p className="text-gray-200 w-full md:w-11/12">
              I created this space as a digital archive of my experiences and
              learnings. Through these blogs, I share the insights and stories
              that shaped me.
            </p>
            <Link to="https://github.com/mahmedraza1">
              <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-500/90 transition-all duration-300 hover:-translate-0.5 cursor-pointer px-4 py-2 rounded-lg font-semibold shadow">
                <FaGithub className="text-gray-100 text-xl" /> Github
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <span className="flex flex-col gap-2">
            <NavLink to="/" className={({isActive}) => isActive ? "text-orange-500 font-bold" : "text-gray-200 hover:text-orange-500"}>
              <span className="flex items-center gap-2">
                <FaHome /> Home
              </span>
            </NavLink>
            <NavLink to="/blogs" className={({isActive}) => isActive ? "text-orange-500 font-bold" : "text-gray-200 hover:text-orange-500"}>
              <span className="flex items-center gap-2">
                <FaBook /> Blogs
              </span>
            </NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "text-orange-500 font-bold" : "text-gray-200 hover:text-orange-500"}>
              <span className="flex items-center gap-2">
                <MdPerson /> About
              </span>
            </NavLink>
            <NavLink to="https://www.fiverr.com/mahmedraza1" className={({isActive}) => isActive ? "text-orange-500 font-bold" : "text-gray-200 hover:text-orange-500"}>
              <span className="flex items-center gap-2">
                <FaLink /> Work With Me
              </span>
            </NavLink>
          </span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-white font-semibold mb-4">Contact With Me</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full border-2 object-cover border-b-orange-500"
                src="/logo.jpg"
                alt="logo"
              />
              <span>
                <h3 className="text-white font-medium">Muhammad Ahmed Raza</h3>
                <p className="text-gray-400 text-sm">@mahmedraza1</p>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <NavLink
                to="https://github.com/mahmedraza1"
                target="_blank"
                className="group bg-gray-500/40 transition-all duration-300 hover:-translate-y-0.5 rounded-lg border border-stone-500 shadow h-10 w-10 flex items-center justify-center"
              >
                <FaGithub className="text-gray-100 group-hover:text-gray-500" />
              </NavLink>
              <NavLink
                to="https://linkedin.com/in/mahmedraza1"
                target="_blank"
                className="group bg-gray-500/40  transition-all duration-300 hover:-translate-y-0.5 rounded-lg border border-stone-500 shadow h-10 w-10 flex items-center justify-center"
              >
                <FaLinkedin className="text-gray-100 group-hover:text-indigo-500" />
              </NavLink>
              <NavLink
                to="mailto:developer.mahmedraza1@gmail.com"
                target="_blank"
                className="group bg-gray-500/40  transition-all duration-300 hover:-translate-y-0.5 rounded-lg border border-stone-500 shadow h-10 w-10 flex items-center justify-center"
              >
                <FaEnvelope className="text-gray-100 group-hover:text-orange-500" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-t-gray-200/40 flex justify-start items-start md:items-center md:justify-between flex-col md:flex-row max-w-6xl mx-auto">
        <span>
          <p className="text-gray-300">
            © 2025 Muhammad Ahmed Raza. All rights reserved.
          </p>
          <p className="text-gray-300/80 text-sm mt-1">
            Built with ❤️ using React JS
          </p>
        </span>
        <button
          onClick={window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex cursor-pointer items-center gap-2 mt-4 bg-gray-500/40 hover:bg-gray-500/60 transition-all duration-300 hover:-translate-y-0.5 rounded-lg border border-stone-500 shadow px-3 py-2"
        >
          <FaArrowUp className="text-gray-100 text-sm" />
          <p className="text-sm">Back to Top</p>
        </button>
      </div>
    </div>
  );
};

export default Footer;
