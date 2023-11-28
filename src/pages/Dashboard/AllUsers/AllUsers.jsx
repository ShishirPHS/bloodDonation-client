import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useState } from "react";
import UserTableRow from "../../../components/UserTableRow/UserTableRow";
import useUserCount from "../../../hooks/useUserCount";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const axiosPublic = useAxiosPublic();
  const usersCount = useUserCount();

  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(usersCount / itemsPerPage);

  const pages = [];
  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i);
  }

  // load data for pagination table
  const { data: allUsers = [] } = useQuery({
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

  return (
    <div>
      <h2>all users page</h2>
      <div>
        <div>
          <div className="overflow-x-auto bg-white p-4">
            <table className="table table-xs">
              <thead className="bg-[#EFE9E9]">
                <tr>
                  <th className="py-3">#</th>
                  <th>Avatar</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.map((user, idx) => (
                  <UserTableRow key={idx} user={user} idx={idx}></UserTableRow>
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
