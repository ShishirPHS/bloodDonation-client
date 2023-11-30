import useAuth from "../../../hooks/useAuth";

const VolunteerHome = () => {
  const { user } = useAuth();

  return (
    <div>
      <h4 className="font-semibold text-xl font-montserrat mt-10 mb-5">
        Hi, {user.displayName}. Welcome to our organization.
      </h4>
    </div>
  );
};

export default VolunteerHome;
