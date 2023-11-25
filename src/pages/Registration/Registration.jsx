import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Registration = () => {
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // load districts
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistrict(data));

    // load upazilas
    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => setUpazila(data));
  }, []);

  const bloodGroups = ["A+", " A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const onSubmit = (data) => {
    const { password, confirmPassword } = data;
    if (password == confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
      return;
    }

    console.log(data);
  };

  return (
    <div className="container mx-auto mb-16">
      <h3 className="text-4xl text-center font-bold my-16 font-montserrat">
        Please Registration
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
              className="select select-bordered w-full max-w-xs"
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
              className="select select-bordered w-full max-w-xs"
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;
