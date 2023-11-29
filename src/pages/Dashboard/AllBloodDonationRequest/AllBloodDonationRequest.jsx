import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import DonationRequestRow from "../../../components/shared/DonationRequestRow/DonationRequestRow";
import useAllDonationCount from "../../../hooks/useAllDonationCount";

const AllBloodDonationRequest = () => {
  const allDonationsCount = useAllDonationCount();
  const [currentPage, setCurrentPage] = useState(0);
  const axiosPublic = useAxiosPublic();

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

  return (
    <div>
      <h2 className="font-montserrat font-bold text-3xl text-center mt-5 mb-10">
        All Blood Donation Request
      </h2>
      <div>
        <div>
          <div className="overflow-x-auto bg-white p-4">
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
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allDonationRequests?.map((request, idx) => (
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

export default AllBloodDonationRequest;
