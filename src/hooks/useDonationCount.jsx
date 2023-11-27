import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useDonationCount = () => {
  const [donationsCount, setDonationsCount] = useState(null);
  const axiosPublic = useAxiosPublic();

  axiosPublic.get("/donationsCount").then((res) => {
    setDonationsCount(res.data.count);
  });

  return donationsCount;
};

export default useDonationCount;
