import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
import useUser from "../../hooks/useUser";
import { IoIosArrowBack } from "react-icons/io";

const Dashboard = () => {
  const [userData] = useUser();

  return (
    // TODO: Have to create a responsive layout
    <div className="grid grid-cols-5 container mx-auto">
      <div className="min-h-screen col-span-1 bg-[#4E4E4E] p-5">
        <div className="dashboard">
          <ul>
            <li>
              <NavLink to="/dashboard/profile">Profile</NavLink>
            </li>
            {/* nav links for admin */}
            {userData?.role === "admin" &&
              userData?.role !== "donor" &&
              userData?.role !== "volunteer" && (
                <>
                  <li>
                    <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/allUsers">All Users</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/all-blood-donation-request">
                      All Blood Donation Request
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/create-donation-requests">
                      Create Donation Requests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/content-management">
                      Content Management
                    </NavLink>
                  </li>
                </>
              )}
            {/* nav links for donor */}
            {userData?.role === "donor" &&
              userData?.role !== "admin" &&
              userData?.role !== "volunteer" && (
                <>
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
                </>
              )}
            {/* nav links for volunteer */}
            {userData?.role === "volunteer" &&
              userData?.role !== "donor" &&
              userData?.role !== "admin" && (
                <>
                  <li>
                    <NavLink to="/dashboard/volunteerHome">
                      Volunteer Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/allBlood-donation-request">
                      All Blood Donation Request
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/create-donation-requests">
                      Create Donation Requests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/content-management">
                      Content Management
                    </NavLink>
                  </li>
                </>
              )}
            <div className="h-[1px] w-full bg-white my-4"></div>
            <li>
              <NavLink className="flex items-center justify-start" to="/">
                <IoIosArrowBack className="mr-2"></IoIosArrowBack>
                <span>Back to Home</span>
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
