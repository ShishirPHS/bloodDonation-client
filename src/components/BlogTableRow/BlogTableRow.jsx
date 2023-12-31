import PropTypes from "prop-types";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUser from "../../hooks/useUser";

const BlogTableRow = ({ blog, idx, refetch }) => {
  const { _id, blogTitle, thumbnailImage, content, status } = blog;
  const axiosPublic = useAxiosPublic();
  const [userData] = useUser();

  const handleBlogDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/blogs/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            text: "Blog Deleted Successfully",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const handlePublishUnPublish = (status) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const editedBlog = {
          blogTitle,
          thumbnailImage,
          content,
          status: status,
        };

        axiosPublic.put(`/blog/${_id}`, editedBlog).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Blog Publish Status Updated Successfully",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{blogTitle}</td>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={thumbnailImage} alt={`Image of ${blogTitle}`} />
          </div>
        </div>
      </td>
      <td>{content.slice(0, 50)}...</td>
      <td>{status}</td>
      {userData?.role !== "volunteer" && (
        <>
          <td>
            {status === "draft" ? (
              <button
                onClick={() => handlePublishUnPublish("published")}
                className="bg-[#EF3D32] text-white p-2 rounded-md hover:bg-[#4E4E4E] w-[80px]"
              >
                Publish
              </button>
            ) : (
              <button
                onClick={() => handlePublishUnPublish("draft")}
                className="bg-[#EF3D32] text-white p-2 rounded-md hover:bg-[#4E4E4E] w-[80px]"
              >
                Unpublish
              </button>
            )}
          </td>
          <td className="text-base">
            <button
              onClick={() => handleBlogDelete(_id)}
              className="bg-[#EF3D32] text-white p-2 rounded-md hover:bg-[#4E4E4E]"
            >
              <RiDeleteBin4Fill></RiDeleteBin4Fill>
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

BlogTableRow.propTypes = {
  blog: PropTypes.object,
  idx: PropTypes.number,
  refetch: PropTypes.func,
};

export default BlogTableRow;
