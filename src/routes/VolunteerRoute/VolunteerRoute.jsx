import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import PropTypes from "prop-types";
import useUser from "../../hooks/useUser";

const VolunteerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const [userData, isLoading] = useUser();
  const isVolunteer = userData?.role === "volunteer";

  if (loading || isLoading) {
    return (
      <div className="container mx-auto flex items-center justify-center h-[70vh]">
        <div
          className="animate-spin inline-block w-10 h-10 border-[5px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (user && isVolunteer) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

VolunteerRoute.propTypes = {
  children: PropTypes.node,
};

export default VolunteerRoute;
