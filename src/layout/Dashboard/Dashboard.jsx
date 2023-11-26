import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 container mx-auto">
      <div className="min-h-screen col-span-2 bg-[#F9F9F9] p-5">
        <div className="dashboard">
          <ul>
            <li>
              <NavLink to="/dashboard/donorHome">Donor Home</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="min-h-screen col-span-10 p-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
