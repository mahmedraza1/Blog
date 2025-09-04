import React from "react";

const About = () => {
  return (
    <div className="max-w-6xl min-h-[60vh] my-16 flex flex-col md:flex-row items-center justify-center gap-8 bg-gray-900 text-white px-4 md:px-0">
      <div className="flex flex-col gap-4 md:w-1/2">
        <h1 className="text-4xl font-bold">About Me</h1>
        <p>
          Hi, I’m Muhammad Ahmed Raza, but most people know me as Mark (an
          acronym of my name). I’m a MERN stack developer with experience in
          building web, mobile, and desktop applications. Besides the MERN
          ecosystem, I also work with React Native, C++, and Electron.js.
        </p>
        <p>
          Currently, I’m pursuing a BS in Computer Science at the Virtual
          University of Pakistan, where I’m expanding my knowledge and refining
          my skills.
        </p>
        <p>
          Beyond development, I enjoy exploring different operating systems,
          playing chess, and experimenting with system-level tweaks. I proudly
          use Arch Linux as my daily driver, which keeps me curious and
          constantly learning.
        </p>
      </div>
      <div>
        <img src="/logoXL.jpg" alt="logo" className="h-96 w-72 object-cover rounded-xl" />
      </div>
    </div>
  );
};

export default About;
