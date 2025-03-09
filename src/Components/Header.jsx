import React from "react";
import { Link, NavLink } from "react-router-dom";
import ProfileImg from '../assets/images/profile-user.png';

export default function Header() {
  return (
    <header>
      <Link className="site-logo" to="/">
        #VanTours
      </Link>
      <nav>
        <NavLink
          to="host"
          style={({ isActive }) => {
            return {
              color: isActive ? "black" : "",
              textDecorationLine: isActive ? "underline" : null,
            };
          }}
        >
          Host
        </NavLink>
        <NavLink
          to="about"
          style={({ isActive }) => {
            return {
              color: isActive ? "black" : "",
              textDecorationLine: isActive ? "underline" : null,
            };
          }}
        >
          About
        </NavLink>
        <NavLink
          to="van"
          style={({ isActive }) => {
            return {
              color: isActive ? "black" : "",
              textDecorationLine: isActive ? "underline" : null,
            };
          }}
        >
          Vans
        </NavLink>
        <NavLink
          className="login-link"
          to="login"
          style={({ isActive }) => {
            return {
              color: isActive ? "black" : "",
              textDecorationLine: isActive ? "underline" : null,
            };
          }}
        >
          <img className="login-icon" src={ProfileImg} alt="acount's icon" />
        </NavLink>
      </nav>
    </header>
  );
}
