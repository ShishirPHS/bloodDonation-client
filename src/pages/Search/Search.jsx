import { IoSearchSharp } from "react-icons/io5";
import useAddress from "../../hooks/useAddress";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Search = () => {
  const [district, upazila] = useAddress();
  const axiosPublic = useAxiosPublic();

  const [searchCriteria, setSearchCriteria] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  const setInputChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  // load all donors
  const { data: allDonors = [] } = useQuery({
    queryKey: ["allDonors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allDonors");
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");

    console.log(searchCriteria);

    try {
      const res = await axiosPublic.get("/donors/search", {
        params: searchCriteria,
      });
      console.log(res);
      setSearchResults(res.data);
    } catch (error) {
      console.error("Error searching donors:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto py-28">
        <h2 className="text-center text-3xl font-bold mb-14">Search Donor</h2>
        {/* search form */}
        <div>
          <form className=" w-full text-white" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-3 px-5">
              <div>
                <label className="label" htmlFor="bloodGroup">
                  <span className="label-text">Blood Group</span>
                </label>
                <select
                  required
                  className="text-lg text-black select select-bordered w-full"
                  name="bloodGroup"
                  onChange={setInputChange}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="label" htmlFor="district">
                  <span className="label-text">District</span>
                </label>
                <select
                  className="text-lg text-black select select-bordered w-full"
                  name="district"
                  onChange={setInputChange}
                >
                  <option value="">Select District</option>
                  {district?.map((singleDistrict, idx) => (
                    <option key={idx} value={singleDistrict.name}>
                      {singleDistrict.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="upazila">
                  <span className="label-text">Upazila</span>
                </label>
                <select
                  className="text-lg text-black select select-bordered w-full"
                  name="upazila"
                  onChange={setInputChange}
                >
                  <option value="">Select Upazila</option>
                  {upazila?.map((singleUpazila, idx) => (
                    <option key={idx} value={singleUpazila.name}>
                      {singleUpazila.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="btn bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out flex mx-auto my-12"
              type="submit"
            >
              <IoSearchSharp className="text-lg"></IoSearchSharp> Search
            </button>
          </form>
        </div>
        {/* donor list */}
        <div>
          {searchResults.length > 0 ? (
            <>
              {searchResults.map((donor, index) => (
                <div key={index}>
                  <div>Name: {donor.name}</div>
                  <div>Email: {donor.email}</div>
                </div>
              ))}
            </>
          ) : (
            // display all donors as default
            <>
              <h2 className="text-center font-bold text-2xl">All Donors</h2>
              <div>
                {allDonors.map((donor, index) => (
                  <div key={index}>
                    <div>Name: {donor.name}</div>
                    <div>Email: {donor.email}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
