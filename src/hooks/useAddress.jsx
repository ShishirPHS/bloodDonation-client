import { useEffect, useState } from "react";

const useAddress = () => {
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);

  useEffect(() => {
    // load districts
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistrict(data));

    // load upazilas
    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => setUpazila(data));
  }, []);
  return [district, upazila];
};

export default useAddress;
