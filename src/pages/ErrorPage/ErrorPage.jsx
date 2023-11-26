import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io"; 

const ErrorPage = () => {
  return (
    <div>
      <div className="bg-[url(https://i.ibb.co/sV4L9cc/error-page-banner.webp)] bg-cover bg-no-repeat object-cover">
        <div className="py-[100px] bg-[#00000080] flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold text-center text-white font-montserrat">
            404 PAGE
          </h2>
          <Link to="/">
            <button className="hover:text-red-500 text-center uppercase font-poppins mt-5 text-white flex items-center">
              <IoIosArrowBack className="mr-2"></IoIosArrowBack>
              Back to home
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-[#F9FAFB]">
        <div className="flex flex-col items-center justify-center py-[148px]">
          <h1 className="text-[170px] font-semibold font-montserrat text-[#EF3D32]">
            4<span className="text-[#DD1D11]">0</span>4
          </h1>
          <p className="max-w-[820px] text-center font-poppins">
            Sorry but we could not find the page you are looking for. Please
            check to make sure you have typed the URL correctly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
