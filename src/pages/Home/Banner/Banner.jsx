import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-[url(https://i.ibb.co/cN2MTTz/banner.webp)] bg-cover">
      <div className="flex flex-col items-center justify-center py-36">
        <div>
          <h5 className="font-montserrat text-3xl text-white text-left">
            Donate Blood, Safe Life!
          </h5>
          <h1 className="mt-10 mb-5 font-bold uppercase text-left font-montserrat text-6xl text-white ">
            <span> Your blood</span> <br />
            <span>can bring smile</span>
            <br />
            <span>in other person face</span>
          </h1>
          <div>
            <Link to="/registration">
              <button className="bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out">
                Join as a donor
              </button>
            </Link>
            <Link to="/search">
              <button className="ml-4 bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out">
                Search Donors
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
