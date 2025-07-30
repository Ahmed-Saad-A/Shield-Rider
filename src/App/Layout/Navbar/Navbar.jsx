import React from "react";
import { NavLink } from "react-router-dom";
import logo from "/src/assets/images/Logo.png" 

const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white">
        <div className="flex items-center gap-6">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 rounded-full ring-2 ring-yellow-400 shadow-md p-1 hover:scale-105 transition-transform duration-300"
          />

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-black"
                : "text-gray-500 hover:text-black transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/aply"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-black"
                : "text-gray-500 hover:text-black transition"
            }
          >
            Aply
          </NavLink>

          <NavLink
            to="/support"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-black"
                : "text-gray-500 hover:text-black transition"
            }
          >
            Support
          </NavLink>
        </div>

        <NavLink to="/login">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-5 rounded-md shadow-sm hover:shadow-md transition">
            Login
          </button>
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;
