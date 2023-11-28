import { Link } from "react-router-dom";
import useUser from "../../../hooks/useUser";

const Profile = () => {
  const userData = useUser();

  return (
    <div>
      <h2 className="font-montserrat font-bold text-center text-3xl mt-5 mb-12">
        Profile Info
      </h2>
      <div className="bg-white p-6">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-[100px] rounded-full"
            src={userData.photo}
            alt={`photo of user`}
          />
          <p className="font-semibold font-poppins mt-2">Profile Picture</p>
        </div>
        <div className="flex flex-col justify-center items-center font-poppins mt-3">
          <p>
            <span className="font-semibold">Name:</span> {userData.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {userData.email}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {userData.upazila},
            {userData.district}
          </p>
          <p>
            <span className="font-semibold">Blood Group: </span>
            {userData.bloodGroup}
          </p>
          <Link to={`/dashboard/updateProfile/${userData.email}`}>
            <button className="mt-5  bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out">
              Update Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
