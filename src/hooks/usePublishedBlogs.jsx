import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePublishedBlogs = () => {
  const axiosPublic = useAxiosPublic();
  // load published blogs
  const { data: publishedBlogs = [], isLoading } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      const result = await axiosPublic.get("/publishedBlogs");
      return result.data;
    },
  });

  return [publishedBlogs, isLoading];
};

export default usePublishedBlogs;
