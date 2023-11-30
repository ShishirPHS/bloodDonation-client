import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import BlogTableRow from "../../../components/BlogTableRow/BlogTableRow";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import "./ContentManagement.css";

const ContentManagement = () => {
  const [filter, setFilter] = useState("all");

  const axiosPublic = useAxiosPublic();
  // load data for all blogs
  const { data: allBlogs = [] } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const result = await axiosPublic.get("/blogs");
      return result.data;
    },
  });

  const handleFilterBtn = (status) => {
    setFilter(status);
  };

  const filteredBlogs =
    filter === "all"
      ? allBlogs
      : allBlogs.filter((blog) => blog.status === filter);

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
          <div className=" bg-white inline-flex  mb-2">
            <details className="dropdown">
              <summary className="btn filter-btn flex items-center hover:text-red-600">
                <FaFilter></FaFilter>
                <span className="ml-2 font-semibold">Filter by</span>
              </summary>
              <ul className="action-btn p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li>
                  <button onClick={() => handleFilterBtn("all")}>All</button>
                </li>
                <li>
                  <button onClick={() => handleFilterBtn("draft")}>
                    Draft
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFilterBtn("published")}>
                    Published
                  </button>
                </li>
              </ul>
            </details>
          </div>
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
                {filteredBlogs?.map((blog, idx) => (
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
