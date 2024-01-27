import PropTypes from "prop-types";

const BlogCard = ({ blog }) => {
  const { thumbnailImage } = blog;
  return (
    <div>
      <img src={thumbnailImage} alt="" />
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object,
};

export default BlogCard;
