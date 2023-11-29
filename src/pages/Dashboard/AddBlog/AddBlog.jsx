import { useForm } from "react-hook-form";
import useUser from "../../../hooks/useUser";

const AddBlog = () => {
  const [userData] = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2 className="text-3xl font-montserrat font-bold text-center mt-5 mb-10">
        Add Blog
      </h2>
      <div className="px-5">
        <form
          className="border-2 px-10 py-12 w-full bg-white mx-auto font-poppins mb-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control mb-3">
            <label className="label font-semibold">
              <span>Blog Title *</span>
            </label>
            <input
              className="input input-bordered"
              placeholder="Blog Title"
              type="text"
              {...register("blogTitle", { required: true })}
            />
            {errors.blogTitle?.type === "required" && (
              <p className="text-[#FF0000]">Blog Title is required</p>
            )}
          </div>
          <div className="form-control mb-3">
            <label className="label font-semibold">
              <span>Thumbnail Image *</span>
            </label>
            <input
              type="file"
              {...register("thumbnailImage", { required: true })}
              className="file-input border-1 w-full"
            />
            {errors.thumbnailImage?.type === "required" && (
              <p className="text-[#FF0000]">Thumbnail Image is required</p>
            )}
          </div>
          <div className="form-control mb-3">
            <label className="label font-semibold">
              <span>Blog Content *</span>
            </label>
            <textarea
              className="border-2 rounded-lg p-4"
              {...register("content", { required: true })}
              placeholder="Blog Content"
              rows="4"
              cols="50"
            ></textarea>
            {errors.content?.type === "required" && (
              <p className="text-[#FF0000]">Blog Content is required</p>
            )}
          </div>
          <button
            disabled={userData?.status !== "active"}
            className="bg-[#EF3D32] px-9 disabled:cursor-not-allowed disabled:bg-gray-400 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
