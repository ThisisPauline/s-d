import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import login from "../assets/user.svg";
import basket from "../assets/bag.svg"
import "./top-Menu.css"

const TopMenu = () => {
  return (
   <div>
      <div className="logo-nav">
        
        <Link to="/">
          <img className="logo" src={logo} alt="logo-Sür" />
        </Link>
        
        <div> 
          <Link to="/">
            <img className="login-icon" src={login} alt="" />
          </Link>
          <Link to="/">
            <img className="basket-icon" src={basket} alt="" />
          </Link>
          </div>
      </div>
    </div>
  );
};

export default TopMenu;
