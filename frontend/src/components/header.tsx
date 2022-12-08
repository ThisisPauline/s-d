import logo from "../assets/logo.svg"
import burger from "../assets/burger.svg"
import * as React from 'react';
import './header.css';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = () => {
    return (
        <header className="header">
        <div className = "loga-nav">
          <img className = "logo" src={logo} alt="logo-Sür" />
          <img className = "burger" src = {burger} alt = "" />
        </div>
        <h1 className="header-text">F*uck fashion</h1>
      </header>
    )
};

export default Header;


