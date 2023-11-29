import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
const useAllDonationCount = () => {
  const [allDonationsCount, setAllDonationsCount] = useState(null);
  const axiosPublic = useAxiosPublic();

  axiosPublic.get("/allDonationsCount").then((res) => {
    setAllDonationsCount(res.data.count);
  });

  return allDonationsCount;
};

export default useAllDonationCount;
