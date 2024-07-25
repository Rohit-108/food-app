import Logo1 from "../assets/img/Logo1.png";
import {
  
  BuildingOfficeIcon,
 
  HomeIcon,
 
  
  PhoneIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/solid';
import { Link } from "react-router-dom"; // imported Link for client side routing
import { useNavigate } from "react-router-dom";
import useOnline from "./hooks/useOnline";
import useAuth from "./hooks/useAuth";
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const Title = () => (
  <Link to="/">
    <img
      className="logo"
      src={Logo1}
      alt="Food Villa"
      title="Food Villa"
    />
  </Link>
);


const Header = () => {
  const navigate = useNavigate();
  const [getLocalStorage, , clearLocalStorage] = useLocalStorage("user");
  const [isLoggedin, setIsLoggedin] = useAuth();
  const cartItem = useSelector(store => store.cart.items)

  useEffect(() => {
    if (getLocalStorage === null) {
      setIsLoggedin(false);
    }
  }, [getLocalStorage]);

  
  const isOnline = useOnline();
  return (
    <div className="header">
      <Title />

      {/* if user is logged in then display userName */}
      {isLoggedin && (
        <div className="user-name">Hi {getLocalStorage?.userName}!</div>
      )}

      <div className="nav-items">
        <ul>
          <li>
          
            <Link to="/" className="link"> <HomeIcon className=' icon' />{' '}Home</Link>
          </li>
          <li>
         
            <Link to="/about" className="link"> <BuildingOfficeIcon className=' icon' />{' '}About</Link>
          </li>

          <li>
          
            <Link to="/contact" className="link"><PhoneIcon className=' icon' />{' '}Contact</Link>
          </li>
          <li>
          
            <Link to="/Cart" className="link"><ShoppingBagIcon className='icon' />{' '}Cart-{cartItem.length}</Link>
          </li>
          <li>
            {/* use conditional rendering for login and logout */}
            {isLoggedin ? (
              <button
                className="logout-btn"
                onClick={() => {
                  clearLocalStorage();
                  setIsLoggedin(false);
                }}
              >
                Logout
                <span
                  className={isOnline ? "login-btn-green" : "login-btn-red"}
                >
                  {" "}
                  ●
                </span>
              </button>
            ) : (
              <button className="login-btn" onClick={() => navigate("/login")}>
                Login
                <span
                  className={isOnline ? "login-btn-green" : "login-btn-red"}
                >
                  {" "}
                  ●
                </span>
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Header;
