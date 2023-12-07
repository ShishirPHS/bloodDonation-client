import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

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

  return <div></div>;
};

export default Blog;
