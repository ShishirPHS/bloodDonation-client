import PropTypes from "prop-types";
import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBin4Fill } from "react-icons/ri";

const DonationRequestRow = ({ request, idx }) => {
  return (
    <tr>
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
  );
};

DonationRequestRow.propTypes = {
  request: PropTypes.object,
  idx: PropTypes.number,
};

export default DonationRequestRow;
