import PropTypes from "prop-types";
import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBin4Fill } from "react-icons/ri";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useMyDonationRequests from "../../../hooks/useMyDonationRequests";
import { Link } from "react-router-dom";

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
  const axiosPublic = useAxiosPublic();

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

  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{recipientName}</td>
      <td>
        {recipientDistrict}, {recipientUpazila}
      </td>
      <td>{donationDate}</td>
      <td>{donationTime}</td>
      <td>{donationStatus}</td>
      <td></td>
      <td className="text-base">
        <Link to={`/dashboard/updateRequest/${_id}`}>
          <button className="bg-[#EF3D32] text-white p-2 rounded-md hover:bg-[#4E4E4E]">
            <LuFileEdit></LuFileEdit>
          </button>
        </Link>
      </td>
      <td className="text-base">
        <button
          onClick={() => handleDonationDelete(_id)}
          className="bg-[#EF3D32] text-white p-2 rounded-md hover:bg-[#4E4E4E]"
        >
          <RiDeleteBin4Fill></RiDeleteBin4Fill>
        </button>
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
