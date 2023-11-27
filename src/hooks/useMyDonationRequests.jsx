import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useMyDonationRequests = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: ownDonationRequests = [] } = useQuery({
    queryKey: ["myDonationRequests", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/donations/${user?.email}`);
      return res.data;
    },
  });

  return [ownDonationRequests];
};

export default useMyDonationRequests;
