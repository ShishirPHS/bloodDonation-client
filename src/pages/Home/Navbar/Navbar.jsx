import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to Log Out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Log Out Successful",
              icon: "success",
            });
            navigate("/");
          })
          .catch(() => {
            Swal.fire({
              title: "Something went wrong, try again later.",
              icon: "error",
            });
          });
      }
    });
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/donation-requests">Donation Requests</NavLink>
      </li>
      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/dashboard/donorHome">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/funding">Funding</NavLink>
          </li>
          <li>
            <button onClick={handleLogOut} className="logOut-btn">
              Log Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/registration">Registration</NavLink>
          </li>
        </>
      )}
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
        <Link to="/">
          <img
            className="w-[120px] lg:w-[200px]"
            src={"https://i.ibb.co/z21K1ts/logo.webp"}
            alt="website logo"
          />
        </Link>
      </div>
      <div className="navbar-end w-auto hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      {user && (
        <div>
          <p className="font-medium">{user?.displayName}</p>
          <img
            className="w-[40px] h-[40px] object-cover rounded-full ml-3"
            src={user?.photoURL}
            alt={`Image of ${user?.displayName}`}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
