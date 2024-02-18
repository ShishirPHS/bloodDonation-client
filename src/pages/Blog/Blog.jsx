import BlogCard from "../../components/BlogCard/BlogCard";
import usePublishedBlogs from "../../hooks/usePublishedBlogs";

const Blog = () => {
  const [publishedBlogs] = usePublishedBlogs();

  return (
    <div className="container mx-auto py-24">
      <h3 className="text-center font-bold text-5xl font-montserrat mb-14">
        Blogs
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default Blog;
