import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import BlogTableRow from "../../../components/BlogTableRow/BlogTableRow";

const ContentManagement = () => {
  const axiosPublic = useAxiosPublic();
  // load data for pagination table(all donation)
  const { data: allBlogs = [] } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const result = await axiosPublic.get("/blogs");
      return result.data;
    },
  });

  return (
    <div>
      <div>
        <div className="flex justify-end">
          <Link to="/dashboard/content-management/add-blog">
            <button className="bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out">
              Add Blog
            </button>
          </Link>
        </div>
      </div>
      <div>
        <div className="mt-16">
          <h2 className="text-center font-bold font-montserrat text-3xl mt-5 mb-10">
            Content Management
          </h2>
          <div className="overflow-x-auto bg-white p-4">
            <table className="table table-xs">
              <thead className="bg-[#EFE9E9]">
                <tr>
                  <th className="py-3">#</th>
                  <th>Blog Title</th>
                  <th>Thumbnail Image</th>
                  <th>Blog Content</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allBlogs?.map((blog, idx) => (
                  <BlogTableRow key={idx} blog={blog} idx={idx}></BlogTableRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
