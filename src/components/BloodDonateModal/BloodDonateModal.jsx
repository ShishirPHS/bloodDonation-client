const BloodDonateModal = () => {
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
          <h3 className="font-bold text-2xl">Donate Blood</h3>
          {/* a form will appear here */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BloodDonateModal;
