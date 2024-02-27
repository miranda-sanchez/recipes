import React from "react";
import { FaBars, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";

const Nav = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <button>Let's talk</button>
            </li>
          </ul>
        </div>

        {/* Button trigger modal */}
        <div className="mobile-toggler d-lg-none">
          <button data-bs-toggle="modal" data-bs-target="#navModal">
            <FaBars />
          </button>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="navModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
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
                ></button>
              </div>

              <div className="modal-body">
                <ul>
                  <li className="modal-line">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="modal-line">
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </li>
                  <li>
                    <button>Let's talk</button>
                  </li>
                </ul>
              </div>

              <div className="modal-footer">
                <ul>
                  <li>
                    <Link to="https://www.linkedin.com/in/miranda--sanchez/">
                      <FaLinkedin className="icon" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://github.com/miranda-sanchez">
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
