import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DonationRequestsViewBtn = ({ id }) => {
  return (
    <Link to={`/donation-requests/details/${id}`}>
      <button className="btn bg-[#EF3D32] text-white p-[15px] rounded-md hover:bg-[#4E4E4E] my-1">
        View Details
      </button>
    </Link>
  );
};

DonationRequestsViewBtn.propTypes = {
  id: PropTypes.string,
};

export default DonationRequestsViewBtn;
