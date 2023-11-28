import PropTypes from "prop-types";

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
    </tr>
  );
};

UserTableRow.propTypes = {
  user: PropTypes.object,
  idx: PropTypes.number,
};

export default UserTableRow;
