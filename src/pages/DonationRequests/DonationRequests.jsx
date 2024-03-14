import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const DonationRequests = () => {
  const axiosPublic = useAxiosPublic();

  const { data: pendingDonatioRequests = [] } = useQuery({
    queryKey: ["pendingDonationRequests"],
    queryFn: async () => {
      const res = await axiosPublic("/pendingDonations"); 
      return res.data;
    },
  });

  console.log(pendingDonatioRequests);

  return (
    <div>
      <div className="container mx-auto py-28">
        <h2 className="text-center">this is donation requests page.</h2>
      </div>
    </div>
  );
};

export default DonationRequests;
