import PropTypes from "prop-types";
import { FaAnglesRight } from "react-icons/fa6";

const BlogCard = ({ blog }) => {
  const { thumbnailImage, blogTitle, content } = blog;

  const words = content.split(" ");
  const wordsPerParagraph = 25;

  if (words.length <= wordsPerParagraph) {
    // Return the original paragraph if it's already wordsPerParagraph words or less
    return words;
  }

  const slicedParagraph = words.slice(0, wordsPerParagraph).join(" ");

  return (
    <div className="border rounded-xl">
      <img className="w-full" src={thumbnailImage} alt="" />
      <div className="p-5">
        <h3 className="text-3xl font-bold font-montserrat mb-7 text-[#111111]">
          {blogTitle}
        </h3>
        <p
          style={{ lineHeight: "30px" }}
          className="font-medium text-[#666666] mb-6"
        >
          {slicedParagraph}...
        </p>
        <a
          href="#"
          className="font-bold text-xl flex items-center hover:text-[#FF0000]"
        >
          Read More
          <span className="text-base ml-2">
            <FaAnglesRight></FaAnglesRight>
          </span>
        </a>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object,
};

export default BlogCard;
