import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useState } from "react";
import UserTableRow from "../../../components/UserTableRow/UserTableRow";
import useUserCount from "../../../hooks/useUserCount";
import { FaFilter } from "react-icons/fa";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const axiosPublic = useAxiosPublic();
  const usersCount = useUserCount();
  const [filter, setFilter] = useState("all");

  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(usersCount / itemsPerPage);
  const pages = [];

  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i);
  }

  // load data for pagination table
  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["allUsersPaginationTable", currentPage],
    queryFn: async () => {
      const result = await axiosPublic.get(
        `http://localhost:5000/allUsers/pagination?page=${currentPage}&size=${itemsPerPage}`
      );
      return result.data;
    },
  });

  const handlePreviousBtn = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextBtn = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilterBtn = (status) => {
    setFilter(status);
    setCurrentPage(0);
  };

  const filteredUsers =
    filter === "all"
      ? allUsers
      : allUsers.filter((user) => user.status === filter);

  return (
    <div>
      <h2 className="text-center font-bold text-3xl mt-5 mb-10 font-montserrat">
        All Users
      </h2>
      <div>
        <div>
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
                  <button onClick={() => handleFilterBtn("active")}>
                    Active
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFilterBtn("blocked")}>
                    Blocked
                  </button>
                </li>
              </ul>
            </details>
          </div>

          <div className="overflow-x-auto bg-white px-4 py-8">
            <table className="table table-xs">
              <thead className="bg-[#EFE9E9]">
                <tr>
                  <th className="py-3">#</th>
                  <th>Avatar</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map((user, idx) => (
                  <UserTableRow
                    key={idx}
                    user={user}
                    idx={idx}
                    refetch={refetch}
                  ></UserTableRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="pagination">
            <button onClick={handlePreviousBtn}>Previous</button>
            {pages?.map((page) => (
              <button
                className={currentPage === page ? "selected" : ""}
                onClick={() => setCurrentPage(page)}
                key={page}
              >
                {page + 1}
              </button>
            ))}
            <button onClick={handleNextBtn}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
