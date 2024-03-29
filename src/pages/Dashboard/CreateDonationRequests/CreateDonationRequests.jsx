import { useForm } from "react-hook-form";
import useAddress from "../../../hooks/useAddress";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUser from "../../../hooks/useUser";

const CreateDonationRequests = () => {
  const axiosPublic = useAxiosPublic();
  const [userData] = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [district, upazila] = useAddress();
  const { user } = useAuth();

  const time = [
    "12:00 AM",
    "01:00 AM",
    "02:00 AM",
    "03:00 AM",
    "04:00 AM",
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const onSubmit = async (data) => {
    const donation = {
      requesterName: data.requesterName,
      requesterEmail: data.requesterEmail,
      recipientName: data.recipientName,
      recipientDistrict: data.recipientDistrict,
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      donationStatus: "pending",
    };
    axiosPublic.post("/create-donation", donation).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          text: "Donation request created Successfully",
          icon: "success",
        });
        reset();
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl mt-5 mb-12 font-bold text-center font-montserrat">
        Create your donation request
      </h2>
      <div className="px-5">
        <form
          className="border-2 px-10 py-12 w-full bg-white mx-auto font-poppins mb-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control mb-3">
            <label className="label font-semibold">
              <span>Requester Name *</span>
            </label>
            <input
              className="input input-bordered"
              readOnly
              defaultValue={user?.displayName}
              type="text"
              {...register("requesterName", { required: true })}
            />
          </div>
          <div className="form-control mb-3">
            <label className="label font-semibold">
              <span>Requester Email *</span>
            </label>
            <input
              className="input input-bordered"
              defaultValue={user.email}
              {...register("requesterEmail", { required: true })}
            />
          </div>
          <div className="form-control mb-3">
            <label className="label font-semibold">
              <span>Recipient Name *</span>
            </label>
            <input
              className="input input-bordered"
              type="text"
              placeholder="Recipient Name"
              {...register("recipientName", { required: true })}
            />
            {errors.recipientName?.type === "required" && (
              <p className="text-[#FF0000]">Recipient Name is required</p>
            )}
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-4">
            <div className="form-control mb-3 w-full lg:w-1/2">
              <label className="label font-semibold">
                <span>Recipient District *</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("recipientDistrict", { required: true })}
              >
                <option value="">Select recipient district</option>
                {district.map((singleDistrict, idx) => (
                  <option key={idx} value={singleDistrict.name}>
                    {singleDistrict.name}
                  </option>
                ))}
              </select>
              {errors.recipientDistrict?.type === "required" && (
                <p className="text-[#FF0000]">Recipient District is required</p>
              )}
            </div>
            <div className="form-control mb-3 w-full lg:w-1/2">
              <label className="label font-semibold">
                <span>Recipient Upazila *</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("recipientUpazila", { required: true })}
              >
                <option value="">Select recipient upazila</option>
                {upazila.map((singleUpazila, idx) => (
                  <option key={idx} value={singleUpazila.name}>
                    {singleUpazila.name}
                  </option>
                ))}
              </select>
              {errors.recipientUpazila?.type === "required" && (
                <p className="text-[#FF0000]">Recipient Upazila is required</p>
              )}
            </div>
          </div>
          <div className="form-control mb-3">
            <label className="label font-semibold">
              <span>Hospital Name *</span>
            </label>
            <input
              className="input input-bordered"
              type="text"
              placeholder="Hospital Name(Where the donor will go to donate blood)"
              {...register("hospitalName", { required: true })}
            />
            {errors.hospitalName?.type === "required" && (
              <p className="text-[#FF0000]">Hospital Name is required</p>
            )}
          </div>
          <div className="form-control mb-3">
            <label className="label font-semibold">
              <span>Full Address *</span>
            </label>
            <input
              className="input input-bordered"
              type="text"
              placeholder="Full Address(Ex: Zahir Raihan Rd, Dhaka)"
              {...register("fullAddress", { required: true })}
            />
            {errors.fullAddress?.type === "required" && (
              <p className="text-[#FF0000]">Full Address is required</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control mb-3 col-span-1">
              <label className="label font-semibold">
                <span>Donation Date *</span>
              </label>
              <input
                className="input input-bordered w-full "
                type="date"
                {...register("donationDate", { required: true })}
              />
              {errors.donationDate?.type === "required" && (
                <p className="text-[#FF0000]">Donation Date is required</p>
              )}
            </div>
            <div className="form-control mb-3 col-span-1">
              <label className="label font-semibold">
                <span>Donation Time *</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("donationTime", { required: true })}
              >
                <option value="">Select Donation Time</option>
                {time.map((hour, idx) => (
                  <option key={idx} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              {errors.donationTime?.type === "required" && (
                <p className="text-[#FF0000]">Donation Time is required</p>
              )}
            </div>
          </div>
          <div className="form-control mb-3">
            <label className="label font-semibold">
              <span>Request Message *</span>
            </label>
            <input
              className="input input-bordered"
              type="text"
              placeholder="Request Message(Write why you need blood)"
              {...register("requestMessage", { required: true })}
            />
            {errors.requestMessage?.type === "required" && (
              <p className="text-[#FF0000]">Request Message is required</p>
            )}
          </div>
          <button
            disabled={userData?.status !== "active"}
            className="bg-[#EF3D32] px-9 disabled:cursor-not-allowed disabled:bg-gray-400 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out"
          >
            Create Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequests;
