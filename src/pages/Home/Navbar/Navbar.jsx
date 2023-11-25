import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink to="donation-requests">Donation Requests</NavLink>
      </li>
      <li>
        <NavLink to="blog">Blog</NavLink>
      </li>
      <li>
        <NavLink to="dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="dashboard">Funding</NavLink>
      </li>
      <li>
        <NavLink to="dashboard">Login</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar justify-between container mx-auto">
      <div className="navbar-start w-auto">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        <img src={"https://i.ibb.co/z21K1ts/logo.webp"} alt="" />
      </div>
      <div className="navbar-end w-auto hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
    </div>
  );
};

export default Navbar;
