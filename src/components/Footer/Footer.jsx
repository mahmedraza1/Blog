import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="flex items-center justify-around w-screen h-[40vh] gap-5">
        <div className="flex justify-center flex-col border-r-gray-200 border-r h-full w-full">
            <div className="flex items-center justify-center text-white gap-2">
          <svg className="rounded bg-green-600" fill="#fff" height="32px" width="32px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path class="cls-1" d="M4.732,7.95335,6.90908,2h3.63639L8.36364,7.01316h2.90911L4.72725,14,6.93656,7.95135Z"></path> </g></svg>
          <p className="text-2xl font-bold">Muhammad Ahmed Raza</p>
          </div>
        </div>
        <div className="flex justify-center flex-col h-full w-full">
          <a href="#">Home</a>
          <a href="#">Blogs</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Footer;
