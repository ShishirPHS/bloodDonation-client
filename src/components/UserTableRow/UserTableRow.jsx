import PropTypes from "prop-types";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./UserTableRow.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UserTableRow = ({ user, idx, refetch }) => {
  const {
    _id,
    photo,
    email,
    name,
    status,
    bloodGroup,
    district,
    upazila,
    role,
  } = user;
  const axiosPublic = useAxiosPublic();

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
        const editedUser = {
          name,
          email,
          photo,
          bloodGroup,
          district,
          upazila,
          role,
          status: status,
        };

        axiosPublic.put(`/users/${_id}`, editedUser).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "User Status Updated Successfully",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleRoleChange = (role) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const editedUser = {
          name,
          email,
          photo,
          bloodGroup,
          district,
          upazila,
          role: role,
          status,
        };

        axiosPublic.put(`/users/${_id}`, editedUser).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "User Role Updated Successfully",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <tr>
      <td>{idx + 1}</td>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={photo} alt={`Image of ${name}`} />
          </div>
        </div>
      </td>
      <td>{email}</td>
      <td>{name}</td>
      <td>{status}</td>
      <td>{role}</td>
      <td>
        <details className="dropdown dropdown-left dropdown-end">
          <summary className="btn bg-[#EF3D32] text-white py-2 px-4 rounded-md hover:bg-[#4E4E4E]">
            <BsThreeDotsVertical></BsThreeDotsVertical>
          </summary>
          <ul className="action-btn p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 top-[50%]">
            {status === "active" && status !== "blocked" && (
              <li>
                <button onClick={() => handleStatusChange("blocked")}>
                  Block
                </button>
              </li>
            )}

            {status === "blocked" && status !== "active" && (
              <li onClick={() => handleStatusChange("active")}>
                <button>Unblock</button>
              </li>
            )}
            {role === "donor" && role !== "volunteer" && role !== "admin" && (
              <li>
                <button onClick={() => handleRoleChange("volunteer")}>
                  Make Volunteer
                </button>
              </li>
            )}
            {role !== "admin" && (
              <li>
                <button onClick={() => handleRoleChange("admin")}>
                  Make Admin
                </button>
              </li>
            )}
          </ul>
        </details>
      </td>
    </tr>
  );
};

UserTableRow.propTypes = {
  user: PropTypes.object,
  idx: PropTypes.number,
  refetch: PropTypes.func,
};

export default UserTableRow;
