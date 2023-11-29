import { Link } from "react-router-dom";

const ContentManagement = () => {
  return (
    <div>
      <h2 className="text-center font-bold font-montserrat text-3xl mt-5 mb-10">
        Content Management
      </h2>
      <div className="flex justify-end">
        <Link to="/dashboard/content-management/add-blog">
          <button className="bg-[#EF3D32] px-9 py-4 text-white hover:bg-[#4E4E4E] transition-all duration-500 ease-in-out">
            Add Blog
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContentManagement;
