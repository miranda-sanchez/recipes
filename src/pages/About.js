import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main>
      <h2>About Us</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
        molestiae sed quidem porro unde quia veritatis pariatur temporibus illum
        incidunt? Quidem odio blanditiis veritatis dolorum aliquam porro dolor
        doloremque unde.
      </p>
      <Link to="/">
        <button>Go back Home</button>
      </Link>
    </main>
  );
};

export default About;
