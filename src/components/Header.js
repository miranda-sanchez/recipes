import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.PNG";
import { FaSearch } from "react-icons/fa";

function Header({ search, setSearch }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <header className="Header">
      <div className="header-container">
        <Link to="/">
          <figure>
            <img src={logo} alt="Logo" />
          </figure>
        </Link>
        <form
          className="d-flex"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            id="searchPosts"
            className="form-control me-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={handleSearch}
          />
          <button className="btn btn-outline-success" type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="gradient"></div>
    </header>
  );
}

export default Header;
