import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useDonationCount = () => {
  const { user } = useAuth();
  const [donationsCount, setDonationsCount] = useState(null);
  const axiosPublic = useAxiosPublic();

  axiosPublic.get(`/donationsCount/${user?.email}`).then((res) => {
    setDonationsCount(res.data.count);
  });

  return donationsCount;
};

export default useDonationCount;
