import { useParams } from "react-router-dom";

const BloodRequestDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="container mx-auto">
        <h2>this is blood request details page. Details of {id}.</h2>
      </div>
    </div>
  );
};

export default BloodRequestDetails;
