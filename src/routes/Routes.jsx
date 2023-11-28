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
    ],
  },
]);

export default router;
