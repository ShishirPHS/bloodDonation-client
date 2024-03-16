import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useRef } from "react";

const BloodDonateModal = ({ id, closeModal }) => {
  const [userData] = useUser();
  const axiosPublic = useAxiosPublic();
  const modalBtnRef = useRef(null);

  useEffect(() => {
    if (modalBtnRef.current) {
      modalBtnRef.current.click();
    }
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [closeModal]);

  const handleSubmit = () => {
    document.getElementById("submit")?.click();
  };

  const handleBloodDonation = (e) => {
    e.preventDefault();

    handleStatusChange("inprogress");
  };

  const handleStatusChange = (status) => {
    const editedDonation = {
      donationStatus: status,
      donorName: userData.name,
      donorEmail: userData.email,
    };

    axiosPublic.patch(`/donations/${id}`, editedDonation).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Now this donation requests is in progress",
          icon: "success",
        });
        closeModal();
      }
    });
  };

  return (
    <>
      <button
        className="bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out hidden"
        ref={modalBtnRef}
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Donate
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Donate Blood</h3>
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
          </div>
          <div className="divider m-0"></div>
          {/* modal body */}
          <div>
            <form
              style={{ boxShadow: "0px 4px 10px 5px rgba(167,167,167,0.3)" }}
              onSubmit={handleBloodDonation}
              className="p-4 rounded-lg my-5"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donor Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  readOnly
                  value={userData?.name || ""}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donor Email</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  readOnly
                  value={userData?.email || ""}
                />
              </div>
              <button id="submit" type="submit"></button>
            </form>
          </div>
          <div className="divider"></div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out"
            >
              Donate
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

BloodDonateModal.propTypes = {
  id: PropTypes.string,
  closeModal: PropTypes.func,
};

export default BloodDonateModal;
