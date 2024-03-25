import React, { useState } from "react";
import { FaBars, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";

const Nav = () => {
  // Controlling the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeModal}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeModal}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/lets-talk" onClick={closeModal}>
                <button>Let's talk</button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Navbar for small screens */}
        {/* Button to trigger the modal */}
        <div className="mobile-toggler d-lg-none">
          <button
            data-bs-toggle="modal"
            data-bs-target="#navModal"
            onClick={() => setIsModalOpen(true)}
          >
            <FaBars />
          </button>
        </div>

        {/* Modal */}
        <div
          className={`modal fade ${isModalOpen ? "show" : ""}`}
          id="navModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={!isModalOpen}
          data-bs-backdrop="false"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <img src={logo} alt="Logo" />
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body">
                <ul>
                  <li className="modal-line">
                    <Link
                      className="nav-link"
                      to="/"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="modal-line">
                    <Link
                      className="nav-link"
                      to="/about"
                      onClick={() => setIsModalOpen(false)}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/lets-talk" onClick={() => setIsModalOpen(false)}>
                      <button>Let's talk</button>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="modal-footer">
                <ul>
                  <li>
                    <Link
                      to="https://www.linkedin.com/in/miranda--sanchez/"
                      onClick={closeModal}
                    >
                      <FaLinkedin className="icon" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://github.com/miranda-sanchez"
                      onClick={closeModal}
                    >
                      <FaGithub className="icon" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
