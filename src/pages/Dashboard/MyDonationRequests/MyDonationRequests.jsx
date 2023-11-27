import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBin4Fill } from "react-icons/ri";
import "./MyDonationRequests.css";
import useDonationCount from "../../../hooks/useDonationCount";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const donationsCount = useDonationCount();
  const [currentPage, setCurrentPage] = useState(0);
  const [ownDonationRequests, setOwnDonationRequests] = useState([]);

  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(donationsCount / itemsPerPage);

  const pages = [];
  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i);
  }

  useEffect(() => {
    fetch(
      `http://localhost:5000/pagination/${user?.email}?page=${currentPage}&size=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => setOwnDonationRequests(data));
  }, [currentPage, user?.email]);

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

  console.log("count", donationsCount);
  console.log("current page", currentPage);
  console.log("items per page", itemsPerPage);
  console.log(ownDonationRequests);

  return (
    <div>
      <h4 className="font-montserrat font-bold text-center text-3xl mt-5 mb-12">
        All Donation Requests
      </h4>
      {ownDonationRequests.length === 0 && (
        <p className="text-lg text-center font-poppins">
          You do not created any donation request yet
        </p>
      )}
      {ownDonationRequests.length > 0 && (
        <>
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
                  {ownDonationRequests?.map((request, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{request.recipientName}</td>
                      <td>
                        {request.recipientDistrict}, {request.recipientUpazila}
                      </td>
                      <td>{request.donationDate}</td>
                      <td>{request.donationTime}</td>
                      <td>{request.donationStatus}</td>
                      <td></td>
                      <td className="text-base">
                        <button className="bg-[#EF3D32] text-white p-2 rounded-md hover:bg-[#4E4E4E]">
                          <LuFileEdit></LuFileEdit>
                        </button>
                      </td>
                      <td className="text-base">
                        <button className="bg-[#EF3D32] text-white p-2 rounded-md hover:bg-[#4E4E4E]">
                          <RiDeleteBin4Fill></RiDeleteBin4Fill>
                        </button>
                      </td>
                    </tr>
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
        </>
      )}
    </div>
  );
};

export default MyDonationRequests;
