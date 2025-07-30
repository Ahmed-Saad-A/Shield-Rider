import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1F2937] text-gray-300 py-6 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center text-sm">
        <p>
          © {new Date().getFullYear()} All rights reserved. Developed by{" "}
          <span className="text-orange-400 font-semibold hover:text-orange-300 hover:drop-shadow-md transition duration-300 cursor-pointer">
            Ahmed Saad
          </span>
        </p>

        <div className="mt-2 md:mt-0 flex space-x-6">
          <a
            href="https://github.com/Ahmed-Saad-A"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 hover:drop-shadow-md transition duration-300"
          >
            GitHub
          </a>
          <a
            href="mailto:ahmed.saad.bayoumi.farag@gmail.com"
            className="hover:text-orange-400 hover:drop-shadow-md transition duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
