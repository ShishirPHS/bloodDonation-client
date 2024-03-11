import { IoSearchSharp } from "react-icons/io5";
import useAddress from "../../hooks/useAddress";

const Search = () => {
  const [district, upazila] = useAddress();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
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
                <label className="label" htmlFor="blGroup">
                  <span className="label-text">Blood Group</span>
                </label>
                <select
                  required
                  className="text-lg text-black select select-bordered w-full"
                  name="blGroup"
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
                <label className="label" htmlFor="dist">
                  <span className="label-text">District</span>
                </label>
                <select
                  required
                  className="text-lg text-black select select-bordered w-full"
                  name="dist"
                >
                  <option value="all">All</option>
                  {district?.map((singleDistrict, idx) => (
                    <option key={idx} value={singleDistrict}>
                      {singleDistrict.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="upa">
                  <span className="label-text">Upazila</span>
                </label>
                <select
                  required
                  className="text-lg text-black select select-bordered w-full"
                  name="upa"
                >
                  <option value="all">All</option>
                  {upazila?.map((singleUpazila, idx) => (
                    <option key={idx} value={singleUpazila}>
                      {singleUpazila.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="btn bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out flex mx-auto mt-12"
              type="submit"
            >
              <IoSearchSharp className="text-lg"></IoSearchSharp> Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
