import React from "react";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

function Footer() {
  return (
    <footer
      className="footer sm:footer-horizontal flex justify-between items-center p-4 px-6"
      style={{ backgroundColor: "#CBDCEB" }}
    >
      <aside className="flex items-center">
        <p className="font-medium" style={{ fontFamily: "Nunito" }}>
          © Copyright {new Date().getFullYear()} CQGame Pro
        </p>
      </aside>

      <div className="flex space-x-4">
        <a
          href="https://www.instagram.com/raputriella/"
          target="_blank"
          aria-label="Instagram"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-500 transition-colors"
        >
          <FaInstagram className="w-6 h-6"/>
        </a>
        <a
            href="mailto:ellarworkingfolder@gmail.com"
            target="_blank"
            aria-label="Email"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-500"
          >
            <HiOutlineMail className="w-6 h-6" />
        </a>
        <a
          href="https://github.com/ellisraputri/Project-Management-Final-Project"
          target="_blank"
          aria-label="GitHub"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-400 transition-colors"
        >
          <FaGithub className="w-6 h-6"/>
        </a>
        
      </div>
    </footer>
  );
}

export default Footer;
