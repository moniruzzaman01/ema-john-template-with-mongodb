import React from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";

function Header() {
  const [user] = useAuthState(auth);
  const hangleLogout = () => {
    signOut(auth);
  };
  return (
    <nav className="header">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <div>
        <Link to="/shop">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/about">About</Link>
        {user ? (
          <span
            onClick={hangleLogout}
            style={{
              color: "gray",
              marginLeft: "30px",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {user?.displayName ? user?.displayName : "user"}
          </span>
        ) : (
          <Link to="./login">Login/SignUp</Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
