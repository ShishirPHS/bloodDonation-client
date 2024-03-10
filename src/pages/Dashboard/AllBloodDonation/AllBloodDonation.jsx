import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import DonationRequestRow from "../../../components/shared/DonationRequestRow/DonationRequestRow";
import useAllDonationCount from "../../../hooks/useAllDonationCount";
import { FaFilter } from "react-icons/fa";
import useUser from "../../../hooks/useUser";

const AllBloodDonation = () => {
  const allDonationsCount = useAllDonationCount();
  const [currentPage, setCurrentPage] = useState(0);
  const axiosPublic = useAxiosPublic();
  const [userData] = useUser();

  const [filter, setFilter] = useState("all");

  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(allDonationsCount / itemsPerPage);

  const pages = [];
  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i);
  }

  // load data for pagination table(all donation)
  const { data: allDonationRequests = [], refetch } = useQuery({
    queryKey: ["allDonations", currentPage],
    queryFn: async () => {
      const result = await axiosPublic.get(
        `/allDonation/pagination?page=${currentPage}&size=${itemsPerPage}`
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

  const filteredDonationRequests =
    filter === "all"
      ? allDonationRequests
      : allDonationRequests.filter(
          (request) => request.donationStatus === filter
        );

  return (
    <div>
      <h2 className="font-montserrat font-bold text-3xl text-center mt-5 mb-10">
        All Blood Donation Requests
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
                  <button onClick={() => handleFilterBtn("pending")}>
                    Pending
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFilterBtn("inprogress")}>
                    In Progress
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFilterBtn("done")}>Done</button>
                </li>
                <li>
                  <button onClick={() => handleFilterBtn("canceled")}>
                    Canceled
                  </button>
                </li>
              </ul>
            </details>
          </div>
          <div className="overflow-x-auto bg-white px-4 pb-4 pt-10">
            <table className="table table-xs">
              <thead className="bg-[#EFE9E9]">
                <tr>
                  <th className="py-3">#</th>
                  <th>Recipient Name</th>
                  <th>Recipient Location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Donation Status</th>
                  <th>Donor Information</th>
                  {userData.role !== "volunteer" && (
                    <>
                      <th>Edit</th>
                      <th>Delete</th>
                    </>
                  )}
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonationRequests?.map((request, idx) => (
                  <DonationRequestRow
                    key={idx}
                    request={request}
                    idx={idx}
                    refetchPaginationTable={refetch}
                  ></DonationRequestRow>
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

export default AllBloodDonation;
