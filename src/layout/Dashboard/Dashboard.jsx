import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-5 container mx-auto">
      <div className="min-h-screen col-span-1 bg-[#4E4E4E] p-5">
        <div className="dashboard">
          <ul>
            <li>
              <NavLink to="/dashboard/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/donorHome">Donor Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-donation-requests">
                My Donation Requests
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/create-donation-requests">
                Create Donation Requests
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="min-h-screen bg-[#efe9e9] col-span-4 p-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
