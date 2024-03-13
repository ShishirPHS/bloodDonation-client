import PropTypes from "prop-types";
import "./DonorCard.css";

const DonorCard = ({ donor }) => {
  const { name, email, photo } = donor;

  return (
    <div className="donorCard rounded-lg p-3">
      <div>
        <img
          className="h-[250px] object-cover w-full"
          src={photo}
          alt={`Image of ${name}`}
        />
      </div>
      <div className="font-bold p-3">
        <h4>
          Donor Name: <span className="font-semibold">{name}</span>
        </h4>
        <h5>
          Donor Email: <span className="font-semibold">{email}</span>
        </h5>
      </div>
    </div>
  );
};

DonorCard.propTypes = {
  donor: PropTypes.object,
};

export default DonorCard;
