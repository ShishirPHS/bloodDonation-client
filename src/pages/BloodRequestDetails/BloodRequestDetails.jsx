import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import BloodDonateModal from "../../components/BloodDonateModal/BloodDonateModal";

const BloodRequestDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  // load specific donation request data
  const { data: donationRequestData = {}, isLoading } = useQuery({
    queryKey: ["singleDonationRequest"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/donation/${id}`);
      return result.data;
    },
  });

  const {
    requesterName,
    requesterEmail,
    recipientName,
    recipientDistrict,
    recipientUpazila,
    hospitalName,
    fullAddress,
    donationDate,
    donationTime,
    requestMessage,
  } = donationRequestData;

  return (
    <div>
      <div className="container mx-auto py-32">
        <h2 className="text-center font-bold text-3xl mb-16">
          Details of Blood Donation Request
        </h2>
        {isLoading ? (
          <div className="text-center py-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div>
            <div className="flex gap-6 text-xl">
              <p className="w-1/2 text-right font-bold">Requester Name :</p>
              <p className="w-1/2">{requesterName}</p>
            </div>
            <div className="flex gap-6 text-xl">
              <p className="w-1/2 text-right font-bold">Requester Email :</p>
              <p className="w-1/2">{requesterEmail}</p>
            </div>
            <div className="flex gap-6 text-xl">
              <p className="w-1/2 text-right font-bold">Recipient Name :</p>
              <p className="w-1/2">{recipientName}</p>
            </div>
            <div className="flex gap-6 text-xl">
              <p className="w-1/2 text-right font-bold">Recipient District :</p>
              <p className="w-1/2">{recipientDistrict}</p>
            </div>
            <div className="flex gap-6 text-xl">
              <p className="w-1/2 text-right font-bold">Recipient Upazila :</p>
              <p className="w-1/2">{recipientUpazila}</p>
            </div>
            <div className="flex gap-6 text-xl">
              <p className="w-1/2 text-right font-bold">Hospital Name :</p>
              <p className="w-1/2">{hospitalName}</p>
            </div>
            <div className="flex gap-6 text-xl">
              <p className="w-1/2 text-right font-bold">Full Address :</p>
              <p className="w-1/2">{fullAddress}</p>
            </div>
            <div className="flex gap-6 text-xl">
              <p className="w-1/2 text-right font-bold">Donation Date :</p>
              <p className="w-1/2">{donationDate}</p>
            </div>
            <div className="flex gap-6 text-xl">
              <p className="w-1/2 text-right font-bold">Donation Time :</p>
              <p className="w-1/2">{donationTime}</p>
            </div>
            <div className="flex gap-6 text-xl">
              <p className="w-1/2 text-right font-bold">Request Message :</p>
              <p className="w-1/2">{requestMessage}</p>
            </div>
          </div>
        )}
        {/* blood donate modal */}
        <div className="mt-12 flex justify-center">
          <BloodDonateModal></BloodDonateModal>
        </div>
      </div>
    </div>
  );
};

export default BloodRequestDetails;
