import logo from "../assets/logo.svg";
import * as React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import login from "../assets/user.svg";
import basket from "../assets/bag.svg"

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <header className="header">
      <div className="logo-nav">
        <Link to="/">
          <img className="logo" src={logo} alt="logo-Sür" />
        </Link>
          <Link to="/">
            <img className="login-icon" src={login} alt="" />
          </Link>
          <Link to="/">
            <img className="basket-icon" src={basket} alt="" />
          </Link>
      </div>
      <h1 className="header-text">Give your clothes a second chance</h1>
      <Link to="/ArticlesAdded">
        <button>I want to sell my clothes</button>
      </Link>
    </header>
  );
};

export default Header;
