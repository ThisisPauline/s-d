import logo from "../assets/logo.svg"
import burger from "../assets/burger.svg"
import * as React from 'react';
import './header.css';
import { Link } from "react-router-dom";

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = () => {
    return (
        <header className="header">
        <div className = "loga-nav">
          <Link to = "/"><img className = "logo" src={logo} alt="logo-Sür" /></Link>
          <p><Link to="/ArticlesAdded">Independant sellers</Link></p>
        </div>
        <h1 className="header-text">F*ck fashion</h1>
      </header>
    )
};

export default Header;


