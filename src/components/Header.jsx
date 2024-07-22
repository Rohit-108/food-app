import { useState } from "react";

import Logo from "../assets/img/Logo.png";

import { Link } from "react-router-dom";

import useOnline from "./hooks/useOnline";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnline  = useOnline();
  

  return (
    <div className="header">
      <Link to="/">
        <img src={Logo} alt="food vila" className="logo" />
      </Link>
      <div className="nav-items">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
          <li>Cart</li>
        </ul>
      </div>
      <h1>{isOnline? ''  :'' }</h1>
      {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </div>
  );
};

export default Header;
