import { useParams } from "react-router-dom";
import useUser from "../../../hooks/useUser";

const UpdateProfile = () => {
  const { id } = useParams();
  const userData = useUser();
  console.log(userData);
  return <div>update user profile from here</div>;
};

export default UpdateProfile;
