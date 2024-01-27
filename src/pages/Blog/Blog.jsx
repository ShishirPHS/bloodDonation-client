import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import BlogCard from "../../components/BlogCard/BlogCard";

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  // load published blogs
  const { data: publishedBlogs = [] } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      const result = await axiosPublic.get("/publishedBlogs");
      return result.data;
    },
  });

  console.log(publishedBlogs);

  return (
    <div className="container mx-auto py-24">
      <h3 className="text-center font-bold text-4xl font-montserrat mb-14">
        Blogs
      </h3>
    </div>
  );
};

export default Blog;
