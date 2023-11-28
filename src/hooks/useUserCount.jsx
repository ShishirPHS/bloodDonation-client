import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useUserCount = () => {
  const axiosPublic = useAxiosPublic();
  const [usersCount, setUsersCount] = useState(null);

  axiosPublic.get("/allUsers").then((res) => {
    setUsersCount(res.data.count);
  });
  return usersCount;
};

export default useUserCount;
