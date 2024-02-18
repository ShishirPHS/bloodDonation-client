import BlogCard from "../../components/BlogCard/BlogCard";
import usePublishedBlogs from "../../hooks/usePublishedBlogs";

const Blog = () => {
  const [publishedBlogs, isLoading] = usePublishedBlogs();

  return (
    <div className="container mx-auto py-24">
      <h3 className="text-center font-bold text-5xl font-montserrat mb-14">
        Blogs
      </h3>
      {isLoading ? (
        <div className="container mx-auto py-8">
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      ) : (
        <div>
          {publishedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog}></BlogCard>
              ))}
            </div>
          ) : (
            <div>
              <h2 className="text-center font-semibold">
                No Blogs Are Available
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
