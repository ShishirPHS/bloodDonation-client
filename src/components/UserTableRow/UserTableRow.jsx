import PropTypes from "prop-types";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./UserTableRow.css";

const UserTableRow = ({ user, idx }) => {
  const { photo, email, name, status } = user;
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
      <td>
        <details className="dropdown dropdown-left dropdown-end">
          <summary className="btn bg-[#EF3D32] text-white py-2 px-4 rounded-md hover:bg-[#4E4E4E]">
            <BsThreeDotsVertical></BsThreeDotsVertical>
          </summary>
          <ul className="action-btn p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 top-[50%]">
            {status === "active" && status !== "blocked" && (
              <li>
                <button>Block</button>
              </li>
            )}

            {status === "blocked" &&
              status !==
                "active"(
                  <li>
                    <button>Unblock</button>
                  </li>
                )}

            <li>
              <button>Make Volunteer</button>
            </li>
            <li>
              <button>Make Admin</button>
            </li>
          </ul>
        </details>
      </td>
    </tr>
  );
};

UserTableRow.propTypes = {
  user: PropTypes.object,
  idx: PropTypes.number,
};

export default UserTableRow;
