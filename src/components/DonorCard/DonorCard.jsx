import PropTypes from "prop-types";

const DonorCard = ({ donor }) => {
  const { name, photo } = donor;

  return (
    <div>
      <img src={photo} alt={`Image of ${name}`} />
    </div>
  );
};

DonorCard.propTypes = {
  donor: PropTypes.object,
};

export default DonorCard;
