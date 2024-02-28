import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  const today = new Date();
  return (
    <footer>
      <ul className="footer-nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="#">Let's talk</Link>
        </li>
      </ul>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/miranda--sanchez/">
            <FaLinkedin className="icon" />
          </a>
        </li>
        <li>
          <a href="https://github.com/miranda-sanchez">
            <FaGithub className="icon" />
          </a>
        </li>
      </ul>
      <span>Miranda Sanchez &copy; {today.getFullYear()}</span>
    </footer>
  );
};

export default Footer;
