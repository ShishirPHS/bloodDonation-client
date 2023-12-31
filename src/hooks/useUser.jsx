import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  return [userData, isLoading];
};

export default useUser;
