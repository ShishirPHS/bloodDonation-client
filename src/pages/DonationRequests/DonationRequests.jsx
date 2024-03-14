import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DonationRequestRow from "../../components/shared/DonationRequestRow/DonationRequestRow";

const DonationRequests = () => {
  const axiosPublic = useAxiosPublic();

  const { data: pendingDonatioRequests = [], refetch } = useQuery({
    queryKey: ["pendingDonationRequests"],
    queryFn: async () => {
      const res = await axiosPublic("/pendingDonations");
      return res.data;
    },
  });

  return (
    <div>
      <div className="container mx-auto py-20">
        <h2 className="text-center">this is donation requests page.</h2>
        <div>
          <div className="overflow-x-auto bg-white p-4 py-10">
            <table className="table table-xs">
              <thead className="bg-[#EFE9E9]">
                <tr>
                  <th className="py-3">#</th>
                  <th>Requester Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingDonatioRequests?.map((request, idx) => (
                  <DonationRequestRow
                    key={idx}
                    request={request}
                    idx={idx}
                    refetchPaginationTable={refetch}
                  ></DonationRequestRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequests;
