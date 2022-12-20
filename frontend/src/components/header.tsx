
import * as React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import TopMenu from "./top-menu";
import Marquee from "react-fast-marquee";

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
      <div className="marquee"> 
      <Marquee speed={120} gradient={false} direction={"right"} pauseOnHover={true} gradientWidth={3000} gradientColor={[1, 255, 255]} style={{fontSize: "2em", backgroundColor: "#000000", color:"white", height:"6vh"}}>
   CLOTHES HAVE NO GENDER CLOTHES HAVE NO GENDER CLOTHES HAVE NO GENDER CLOTHES HAVE NO GENDER CLOTHES HAVE NO GENDER CLOTHES HAVE NO GENDER CLOTHES HAVE NO GENDER 
</Marquee>
</div>
    </header>
  );
};

export default Header;
