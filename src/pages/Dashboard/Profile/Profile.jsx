import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const axiosPublic = useAxiosPublic();

  axiosPublic.get(`/users/${user.email}`).then((res) => setUserData(res.data));

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
          <button className="mt-5  bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
