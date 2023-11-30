import PropTypes from "prop-types";
import { RiDeleteBin4Fill } from "react-icons/ri";

const BlogTableRow = ({ blog, idx }) => {
  const { _id, blogTitle, thumbnailImage, content, status } = blog;

  const handleBlogDelete = (id) => {
    console.log("blog delete btn clicked", id);
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
      <td className="text-base">
        <button
          onClick={() => handleBlogDelete(_id)}
          className="bg-[#EF3D32] text-white p-2 rounded-md hover:bg-[#4E4E4E]"
        >
          <RiDeleteBin4Fill></RiDeleteBin4Fill>
        </button>
      </td>
    </tr>
  );
};

BlogTableRow.propTypes = {
  blog: PropTypes.object,
  idx: PropTypes.number,
};

export default BlogTableRow;
