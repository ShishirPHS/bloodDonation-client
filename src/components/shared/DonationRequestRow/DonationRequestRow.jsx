import PropTypes from "prop-types";
import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBin4Fill } from "react-icons/ri";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useMyDonationRequests from "../../../hooks/useMyDonationRequests";
import { Link, useLocation } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import { BsThreeDotsVertical } from "react-icons/bs";
import DonationRequestsViewBtn from "../../DonationRequestsViewBtn/DonationRequestsViewBtn";

const DonationRequestRow = ({ request, idx, refetchPaginationTable }) => {
  const [, refetch] = useMyDonationRequests();
  const {
    _id,
    recipientName,
    recipientDistrict,
    recipientUpazila,
    donationDate,
    donationTime,
    donationStatus,
  } = request;
  const [userData] = useUser();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();

  const handleDonationDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/donations/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            text: "Donation Request Deleted Successfully",
            icon: "success",
          });
          refetch();
          refetchPaginationTable();
        }
      }
    });
  };

  const handleStatusChange = (status) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const editedDonation = {
          donationStatus: status,
          donorName: userData.name,
          donorEmail: userData.email,
        };

        axiosPublic.patch(`/donations/${_id}`, editedDonation).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Status Updated Successfully",
              icon: "success",
            });
            refetchPaginationTable();
          }
        });
      }
    });
  };

  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{recipientName}</td>
      <td>
        {recipientDistrict}, {recipientUpazila}
      </td>
      <td>{donationDate}</td>
      <td>{donationTime}</td>
      {location.pathname !== "/donation-requests" && (
        <>
          <td>{donationStatus}</td>
          <td>
            {request?.donorName}
            <br />
            {request?.donorEmail}
          </td>
          {userData.role !== "volunteer" && (
            <>
              <td className="text-base">
                <Link to={`/dashboard/updateRequest/${_id}`}>
                  <button className="bg-[#EF3D32] text-white p-[15px] rounded-md hover:bg-[#4E4E4E]">
                    <LuFileEdit></LuFileEdit>
                  </button>
                </Link>
              </td>
              <td className="text-base">
                <button
                  onClick={() => handleDonationDelete(_id)}
                  className="bg-[#EF3D32] text-white p-[15px] rounded-md hover:bg-[#4E4E4E]"
                >
                  <RiDeleteBin4Fill></RiDeleteBin4Fill>
                </button>
              </td>
            </>
          )}
          <td>
            <details className="dropdown dropdown-left dropdown-end">
              <summary className="btn bg-[#EF3D32] text-white py-2 my-1 px-4 rounded-md hover:bg-[#4E4E4E]">
                <BsThreeDotsVertical></BsThreeDotsVertical>
              </summary>
              <ul className="action-btn p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 top-[50%]">
                {donationStatus === "pending" &&
                  donationStatus !== "inprogress" &&
                  donationStatus !== "done" && (
                    <>
                      <li>
                        <button
                          onClick={() => handleStatusChange("inprogress")}
                        >
                          In Progress
                        </button>
                      </li>
                    </>
                  )}
                {donationStatus === "inprogress" &&
                  donationStatus !== "done" &&
                  donationStatus !== "canceled" && (
                    <>
                      <li>
                        <button onClick={() => handleStatusChange("done")}>
                          Done
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleStatusChange("canceled")}>
                          Canceled
                        </button>
                      </li>
                    </>
                  )}
                {donationStatus === "done" && (
                  <li className="hover:text-[#EF3D32] font-semibold">
                    Already Done
                  </li>
                )}
                {donationStatus === "canceled" && (
                  <li className="hover:text-[#EF3D32] font-semibold">
                    This Donation Request is canceled
                  </li>
                )}
              </ul>
            </details>
          </td>
        </>
      )}
      <td className="flex justify-center">
        <DonationRequestsViewBtn id={_id}></DonationRequestsViewBtn>
      </td>
    </tr>
  );
};

DonationRequestRow.propTypes = {
  request: PropTypes.object,
  idx: PropTypes.number,
  refetchPaginationTable: PropTypes.func,
};

export default DonationRequestRow;
