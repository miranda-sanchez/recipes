import React from "react";
import { Link } from "react-router-dom";
import img1 from "../img/plate1.png";
import img2 from "../img/plate2.png";

const About = () => {
  return (
    <main className="AboutUs">
      <section className="content">
        <h2>About Us</h2>
        <p>
          This website was made for the purpose of practicing ReactJs. All
          illustrations were made by me, Miranda Sanchez. Thank you very much
          for visiting it!
        </p>
        <Link to="/">
          <button className="back-home-btn">Go back Home</button>
        </Link>
      </section>
      <figure>
        <img src={img1} alt="Illustration of a plate with food" />
        <img src={img2} alt="Illustration of a plate with pizza" />
      </figure>
    </main>
  );
};

export default About;
