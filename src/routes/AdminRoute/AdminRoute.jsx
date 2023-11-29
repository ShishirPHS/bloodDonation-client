import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import PropTypes from "prop-types";
import useUser from "../../hooks/useUser";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const [userData, isLoading] = useUser();
  const isAdmin = userData?.role === "admin";

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

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
