import useUser from "../../../hooks/useUser";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAddress from "../../../hooks/useAddress";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProfile = () => {
  const userData = useUser();
  const [district, upazila] = useAddress();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { updateUserInfo } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const bloodGroups = ["A+", " A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    // Set default values after fetching data

    if (userData) {
      setValue("name", userData?.name);
      setValue("bloodGroup", userData?.bloodGroup);
      setValue("district", userData?.district || "");
      setValue("upazila", userData?.upazila || "");
    }
  }, [userData, setValue, district.length, upazila.length]);

  const onSubmit = async (data) => {
    console.log(data);
    const { name, district, upazila, bloodGroup } = data;

    const imageFile = { image: data.photo[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const user = {
        name,
        email: userData.email,
        photo: res.data.data.display_url,
        bloodGroup,
        district,
        upazila,
        role: "donor",
        status: "active",
      };

      axiosPublic.put(`/users/${userData._id}`, user).then((res) => {
        if (res.data.modifiedCount > 0) {
          updateUserInfo(user?.name, user?.photo);

          Swal.fire({
            title: "Profile Updated Successfully",
            icon: "success",
          });
          navigate("/dashboard/profile");
        } else {
          Swal.fire({
            title: "Something went wrong!",
            text: "It seems nothing has changed or something else",
            icon: "error",
          });
        }
      });
    }
  };

  return (
    <div>
      <h2 className="text-center font-montserrat font-bold text-3xl mt-5 mb-12">
        Update Profile
      </h2>
      <div className="px-5">
        <form
          className="border-2 px-10 py-12 bg-white mx-auto font-poppins"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control mb-3">
            <label className="label font-semibold">
              <span>Name *</span>
            </label>
            <input
              className="input input-bordered"
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-[#FF0000]">Name is required</p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="form-control mb-3 w-1/2">
              <label className="label font-semibold">
                <span>Avatar *</span>
              </label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input border-1 w-full"
              />
              {errors.photo?.type === "required" && (
                <p className="text-[#FF0000]">Avatar is required</p>
              )}
            </div>
            <div className="form-control mb-3 w-1/2">
              <label className="label font-semibold">
                <span>Blood Group *</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("bloodGroup", { required: true })}
              >
                <option value="">Select your blood group</option>
                {bloodGroups.map((group, idx) => (
                  <option key={idx} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              {errors.bloodGroup?.type === "required" && (
                <p className="text-[#FF0000]">Blood Group is required</p>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-4">
            <div className="form-control mb-3 w-full lg:w-1/2">
              <label className="label font-semibold">
                <span>District *</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("district", { required: true })}
              >
                <option value="">Select your district</option>
                {district.map((singleDistrict, idx) => (
                  <option key={idx} value={singleDistrict.name}>
                    {singleDistrict.name}
                  </option>
                ))}
              </select>
              {errors.district?.type === "required" && (
                <p className="text-[#FF0000]">District is required</p>
              )}
            </div>
            <div className="form-control mb-3 w-full lg:w-1/2">
              <label className="label font-semibold">
                <span>Upazila *</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("upazila", { required: true })}
              >
                <option value="">Select your upazila</option>
                {upazila.map((singleUpazila, idx) => (
                  <option key={idx} value={singleUpazila.name}>
                    {singleUpazila.name}
                  </option>
                ))}
              </select>
              {errors.upazila?.type === "required" && (
                <p className="text-[#FF0000]">Upazila is required</p>
              )}
            </div>
          </div>
          <button className="bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
