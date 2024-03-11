import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root/Root";
import Home from "../pages/Home/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Dashboard from "../layout/Dashboard/Dashboard";
import DonorHome from "../pages/Dashboard/DonorHome/DonorHome";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests/MyDonationRequests";
import CreateDonationRequests from "../pages/Dashboard/CreateDonationRequests/CreateDonationRequests";
import UpdateDonationRequest from "../pages/Dashboard/UpdateDonationRequest/UpdateDonationRequest";
import Profile from "../pages/Dashboard/Profile/Profile";
import UpdateProfile from "../pages/Dashboard/UpdateProfile/UpdateProfile";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllBloodDonationRequest from "../pages/Dashboard/AllBloodDonationRequest/AllBloodDonationRequest";
import AdminRoute from "./AdminRoute/AdminRoute";
import ContentManagement from "../pages/Dashboard/ContentManagement/ContentManagement";
import AddBlog from "../pages/Dashboard/AddBlog/AddBlog";
import VolunteerHome from "../pages/Dashboard/VolunteerHome/VolunteerHome";
import AllBloodDonation from "../pages/Dashboard/AllBloodDonation/AllBloodDonation";
import VolunteerRoute from "./VolunteerRoute/VolunteerRoute";
import AdminOrVolunteerRoute from "./AdminOrVolunteerRoute/AdminOrVolunteerRoute";
import Blog from "../pages/Blog/Blog";
import Search from "../pages/Search/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/search",
        element: <Search></Search>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "updateProfile/:email",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "donorHome",
        element: <DonorHome></DonorHome>,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests></MyDonationRequests>,
      },
      {
        path: "updateRequest/:id",
        element: <UpdateDonationRequest></UpdateDonationRequest>,
      },
      {
        path: "create-donation-requests",
        element: <CreateDonationRequests></CreateDonationRequests>,
      },
      // admin only routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <AdminRoute>
            <AllBloodDonationRequest></AllBloodDonationRequest>
          </AdminRoute>
        ),
      },
      // admin or volunteer route
      {
        path: "content-management",
        element: (
          <AdminOrVolunteerRoute>
            <ContentManagement></ContentManagement>
          </AdminOrVolunteerRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <AdminOrVolunteerRoute>
            <AddBlog></AddBlog>
          </AdminOrVolunteerRoute>
        ),
      },
      // volunteer only route
      {
        path: "volunteerHome",
        element: (
          <VolunteerRoute>
            <VolunteerHome></VolunteerHome>
          </VolunteerRoute>
        ),
      },
      {
        path: "allBlood-donation-request",
        element: (
          <VolunteerRoute>
            <AllBloodDonation></AllBloodDonation>
          </VolunteerRoute>
        ),
      },
    ],
  },
]);

export default router;
