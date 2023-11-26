import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAddress from "../../hooks/useAddress";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Registration = () => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { createUser, updateUserInfo } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [district, upazila] = useAddress();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const bloodGroups = ["A+", " A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const onSubmit = async (data) => {
    const {
      email,
      name,
      bloodGroup,
      district,
      upazila,
      password,
      confirmPassword,
    } = data;
    if (password == confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
      return;
    }

    const imageFile = { image: data.photo[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      console.log("img uploaded to the imageBB");

      const user = {
        name,
        email,
        photo: res.data.data.display_url,
        bloodGroup,
        district,
        upazila,
        role: "donor",
        status: "active",
      };

      createUser(email, password)
        .then((result) => {
          console.log(result.user);

          updateUserInfo(name, user.photo);

          axiosPublic.post("/users", user).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Registration Successful",
                icon: "success",
              });
              reset();
              navigate("/");
            }
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: error.message,
            icon: "error",
          });
        });
    }

    console.log(data);
  };

  return (
    <div className="container mx-auto mb-16">
      <h3 className="text-4xl text-center font-bold my-16 font-montserrat">
        Please Registration!
      </h3>
      <form
        className="border-2 px-10 py-12 w-[90%] lg:w-3/4 xl:w-2/4 mx-auto font-poppins"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control mb-3">
          <label className="label font-semibold">
            <span>Email *</span>
          </label>
          <input
            className="input input-bordered"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-[#FF0000]">Email is required</p>
          )}
        </div>
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
        <div className="form-control mb-3">
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
        <div className="form-control mb-3">
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
        <div className="form-control mb-3">
          <label className="label font-semibold">
            <span>Password *</span>
          </label>
          <input
            className="input input-bordered"
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password?.type === "required" && (
            <p className="text-[#FF0000]">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-[#FF0000]">Password must be 6 characters</p>
          )}
        </div>
        <div className="form-control mb-3">
          <label className="label font-semibold">
            <span>Confirm Password *</span>
          </label>
          <input
            className="input input-bordered"
            type="password"
            placeholder="Confirm your Password"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword?.type === "required" && (
            <p className="text-[#FF0000]">Confirmation Password is required</p>
          )}
          {passwordMatch ? (
            <p></p>
          ) : (
            <p className="text-[#FF0000]">Password did not match</p>
          )}
        </div>
        <button className="bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
