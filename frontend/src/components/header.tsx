
import * as React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import TopMenu from "./top-menu";

const Header = () => {
  return (
    <header className="header">
     <TopMenu />
      <h1 className="header-text">Give your clothes a second life</h1>
      <div className="flex-button">
      <Link to="/Login">
        <button className="sell">I want to sell my clothes</button>
      </Link>
      </div>
    </header>
  );
};

export default Header;
