import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import DonorCard from "../../../components/DonorCard/DonorCard";

const AllDonors = () => {
  const axiosPublic = useAxiosPublic();

  // load all donors
  const { data: allDonors = [], isLoading } = useQuery({
    queryKey: ["allDonors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allDonors");
      return res.data;
    },
  });

  return (
    <div>
      {isLoading ? (
        <div className="text-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {allDonors.length > 0 ? (
            // display all donors as default
            <>
              <h2 className="text-center font-bold text-xl mb-14">
                All Donors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {allDonors.map((donor) => (
                  <DonorCard key={donor._id} donor={donor}></DonorCard>
                ))}
              </div>
            </>
          ) : (
            <h2 className="text-center font-semibold py-10">
              No donors found.
            </h2>
          )}
        </>
      )}
    </div>
  );
};

export default AllDonors;
