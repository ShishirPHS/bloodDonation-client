import useAuth from "../../../hooks/useAuth";

const DonorHome = () => {
  const { user } = useAuth();

  return (
    <div>
      <h4 className="font-semibold text-xl">
        Hi, {user.displayName}. Welcome to our organization.
      </h4>
    </div>
  );
};

export default DonorHome;
