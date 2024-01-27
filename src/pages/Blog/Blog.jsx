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

  // console.log(publishedBlogs);

  return (
    <div className="container mx-auto py-24">
      <h3 className="text-center font-bold text-5xl font-montserrat mb-14">
        Blogs
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default Blog;
