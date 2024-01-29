import PropTypes from "prop-types";
import { FaAnglesRight } from "react-icons/fa6";

const BlogCard = ({ blog }) => {
  const { thumbnailImage, blogTitle, content } = blog;

  const words = content.split(" ");
  const wordsPerParagraph = 25;

  if (words.length <= wordsPerParagraph) {
    return words;
  }

  const slicedParagraph = words.slice(0, wordsPerParagraph).join(" ");

  return (
    <div
      style={{ boxShadow: "0px 4px 10px 5px rgba(38,35,35,0.3)" }}
      className="border rounded-xl flex flex-col"
    >
      <div className="flex-grow">
        <img
          className="w-full h-[280px] rounded-tr-xl rounded-tl-xl"
          src={thumbnailImage}
          alt=""
        />
        <h3 className="text-3xl p-5 pb-0 font-bold font-montserrat mb-7 text-[#111111]">
          {blogTitle}
        </h3>
      </div>
      <div className="p-5 pt-0">
        <div>
          <p
            style={{ lineHeight: "30px" }}
            className="font-medium text-[#666666] mb-6"
          >
            {slicedParagraph}...
          </p>
          <button className="font-bold text-xl flex justify-start items-center hover:text-[#FF0000]">
            Read More
            <span className="text-base ml-2">
              <FaAnglesRight></FaAnglesRight>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object,
};

export default BlogCard;
