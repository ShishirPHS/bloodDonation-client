import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    logIn(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          text: "Login Successful",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          text: "Email or Password is incorrect!",
          icon: "error",
        });
      });
  };
  return (
    <div className="container mx-auto mb-16">
      <h3 className="text-4xl text-center font-bold my-16 font-montserrat">
        Please Login!
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
            <span>Password *</span>
          </label>
          <input
            className="input input-bordered"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className="text-[#FF0000]">Password is required</p>
          )}
        </div>
        <button className="bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
