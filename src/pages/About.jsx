import React, { useState } from "react";
import { FaCode, FaGraduationCap, FaLaptopCode, FaChessKnight } from 'react-icons/fa';

const About = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="max-w-4xl text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">About Me</h1>
          
          <div className="mx-auto w-full max-w-xs md:max-w-md mb-10 relative">
            {!imageLoaded && (
              <div className="h-64 w-64 md:h-72 md:w-72 mx-auto flex items-center justify-center bg-gray-800 rounded-xl border-2 border-gray-700">
                <div className="animate-pulse rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            )}
            <img 
              src="/logoXL.jpg" 
              alt="Muhammad Ahmed Raza" 
              className={`h-64 w-64 md:h-72 md:w-72 object-cover rounded-xl mx-auto shadow-lg border-2 border-gray-700 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          <div className="space-y-6 text-left max-w-2xl mx-auto bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
            <p className="text-gray-300 leading-relaxed text-lg">
              Hi, I'm Muhammad Ahmed Raza, but most people know me as Mark (an
              acronym of my name). I'm a MERN stack developer with experience in
              building web, mobile, and desktop applications. Besides the MERN
              ecosystem, I also work with React Native, C++, and Electron.js.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Currently, I'm pursuing a BS in Computer Science at the Virtual
              University of Pakistan, where I'm expanding my knowledge and refining
              my skills.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Beyond development, I enjoy exploring different operating systems,
              playing chess, and experimenting with system-level tweaks. I proudly
              use Arch Linux as my daily driver, which keeps me curious and
              constantly learning.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
            <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700 shadow-lg">
              <div className="flex items-center mb-4">
                <FaCode className="text-orange-500 text-2xl mr-3" />
                <h3 className="text-xl font-bold">Technical Skills</h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>MERN Stack</li>
                <li>React Native</li>
                <li>Electron.js</li>
                <li>C++ Programming</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            
            <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700 shadow-lg">
              <div className="flex items-center mb-4">
                <FaGraduationCap className="text-orange-500 text-2xl mr-3" />
                <h3 className="text-xl font-bold">Education</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <span className="font-medium block">BS in Computer Science</span>
                  <span className="text-sm">Virtual University of Pakistan</span>
                </li>
                <li>
                  <span className="font-medium block">Web Development</span>
                  <span className="text-sm">Self-taught & Online Courses</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700 shadow-lg">
              <div className="flex items-center mb-4">
                <FaLaptopCode className="text-orange-500 text-2xl mr-3" />
                <h3 className="text-xl font-bold">Experience</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <span className="font-medium block">Freelance Developer</span>
                  <span className="text-sm">Building custom web and mobile solutions</span>
                </li>
                <li>
                  <span className="font-medium block">Open Source Contributor</span>
                  <span className="text-sm">Various GitHub projects</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700 shadow-lg">
              <div className="flex items-center mb-4">
                <FaChessKnight className="text-orange-500 text-2xl mr-3" />
                <h3 className="text-xl font-bold">Interests</h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Chess</li>
                <li>Linux customization</li>
                <li>System-level optimization</li>
                <li>Open source software</li>
                <li>Learning new technologies</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 max-w-md mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 text-orange-500">Get In Touch</h3>
            <p className="text-gray-300 mb-6">
              Interested in working together or have questions? Feel free to reach out!
            </p>
            <a 
              href="mailto:developer.mahmedraza1@gmail.com"
              className="inline-block px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-lg"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
