import { useState } from "react";

import Logo1 from "../assets/img/Logo1.png";

import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="header flex justify-between items-center w-[100vw] h-[80px] bg-headerBg text-lightTextColor rounded-[5px]  font-bold fixed top-0 left-0 z-[999] overflow-y-hidden shadow-navbarShadow">
      <Link to="/">
        <img src={Logo1} alt="food vila" className="pl-3 pt-0 pr-3 pb-4 w-[90px] h-20" />
      </Link>
      <div className="nav-items">
        <ul className=" flex mr-[30px] items-center justify-between list-none">
          <Link to="/">
            <li className="p-[10px] hover:bg-orange hover:rounded-[5px] hover:cursor-pointer hover:text-white  ">Home</li>
          </Link>
          <Link to="/about">
            <li className="p-3 hover:bg-orange hover:rounded hover:cursor-pointer hover:text-white" >About</li>
          </Link>
          <Link to="/contact">
            <li className="p-3 hover:bg-orange hover:rounded hover:cursor-pointer hover:text-white">Contact</li>
          </Link>
          <li className="p-3 text-lightTextColor border-none rounded-
          [5px] bg-transparent text-inherit font-700 cursor-pointer hover:bg-orange hover:rounded hover:cursor-pointer hover:text-white">Cart</li>
          
        </ul>
      </div>
      {isLoggedIn ? (
        <button   className=" text-lightTextColor border-none rounded-md bg-transparent text-inherit font-bold cursor-pointer  hover:bg-orange hover:rounded hover:cursor-pointer hover:text-white" onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button className="text-lightTextColor border-none rounded-[5px] bg-transparent text-inherit font-bold cursor-pointer  hover:bg-orange hover:rounded hover:cursor-pointer hover:text-white" onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </div>
  );
};

export default Header;
