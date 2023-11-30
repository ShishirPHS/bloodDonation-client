import { Outlet } from "react-router-dom";
import Navbar from "../../pages/Home/Navbar/Navbar";
import Footer from "../../pages/Shared/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
