import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Featured = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <div className="bg-[url(https://i.ibb.co/yVSbJk6/2.jpg)] bg-cover my-28">
      <div className="py-44">
        <h2
          className="font-montserrat font-semibold text-5xl text-center text-white"
          data-aos="fade-up"
        >
          Join with us and save life
        </h2>
        <p
          className="text-white text-center mt-6 text-xl max-w-[1000px] mx-auto font-poppins"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          Together, we can make a difference in the lives of those in need. Join
          our community of donors and be a hero in someones story.
        </p>
      </div>
    </div>
  );
};

export default Featured;
