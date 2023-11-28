import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useMyDonationRequests from "../../../hooks/useMyDonationRequests";
import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBin4Fill } from "react-icons/ri";

const DonorHome = () => {
  const { user } = useAuth();
  const [ownDonationRequests] = useMyDonationRequests();

  const recentThree = ownDonationRequests.slice(-3);
  console.log(recentThree);

  return (
    <div>
      <h4 className="font-semibold text-xl font-montserrat mt-10 mb-5">
        Hi, {user.displayName}. Welcome to our organization.
      </h4>
      <h3 className="mb-10 text-3xl font-montserrat font-bold text-center">Your Recent Requests</h3>

      {ownDonationRequests.length > 0 && (
        <div>
          <div className="overflow-x-auto bg-white p-4">
            <table className="table table-xs">
              <thead className="bg-[#EFE9E9]">
                <tr>
                  <th className="py-3">#</th>
                  <th>Recipient Name</th>
                  <th>Recipient Location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Donation Status</th>
                  <th>Donor Information</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {recentThree?.map((request, idx) => (
                  <tr key={idx}>
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
                ))}
              </tbody>
            </table>
          </div>
          {ownDonationRequests.length > 3 && (
            <div className="flex justify-center items-center mt-10">
              <Link to="/dashboard/my-donation-requests">
                <button className="btn bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out rounded-none">
                  View My All Requests
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DonorHome;
