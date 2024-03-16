import useAuth from "../../hooks/useAuth";

const BloodDonateModal = () => {
  const { user } = useAuth();

  const handleSubmit = () => {
    document.getElementById("submit")?.click();
  };

  const handleBloodDonation = (e) => {
    e.preventDefault();

    console.log("blood donated");
  };

  return (
    <>
      <button
        className="bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Donate
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Donate Blood</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost">✕</button>
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
                  value={user?.displayName}
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
                  value={user?.email}
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

export default BloodDonateModal;
