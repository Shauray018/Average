import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/useBlogs";
import { useUser } from "../hooks/useUser";
import DOMPurify from 'dompurify';

export function Blogs() {
  const { loading, blogsData, error } = useBlogs();
  const { id , name} = useUser();

  if (!id) {
    return <div>
      <AppBar authorName={`${name}`} />
      <div>Loading...</div>
      </div>
    ;
  }

  if (loading) {
    return (
      <div>
        <AppBar authorName={`${name}`} />
        <div className="flex justify-center">
          <div role="status" className="w-full max-w-4xl p-6 animate-pulse">
            <div className="border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                <div className="w-24 h-4 bg-gray-300 rounded mr-2"></div>
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-full h-8 bg-gray-300 rounded mb-4"></div>
              <div className="w-full h-24 bg-gray-300 rounded mb-4"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </div>
            {/* Repeat the skeleton loader as many times as needed */}
            <div className="border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                <div className="w-24 h-4 bg-gray-300 rounded mr-2"></div>
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-full h-8 bg-gray-300 rounded mb-4"></div>
              <div className="w-full h-24 bg-gray-300 rounded mb-4"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </div>
          
            <div className="border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                <div className="w-24 h-4 bg-gray-300 rounded mr-2"></div>
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-full h-8 bg-gray-300 rounded mb-4"></div>
              <div className="w-full h-24 bg-gray-300 rounded mb-4"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
 

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <header className=" sticky top-0 z-50 bg-white"> 
      <AppBar authorName={`${name}`} />
      </header>
      {blogsData.length > 0 ? (
        blogsData.map((post) => {
          const sanitizedContent = DOMPurify.sanitize(post.content);
          return (
            <div key={post.id}>
              
              <BlogCard
                id={post.id}
                title={post.title}
                authorName={post.author?.name || "shauray"}
                content={sanitizedContent}
                publishedDate="12 June, 2023"
              />
            </div>
          );
        })
      ) : (
        <div>No blogs available</div>
      )}
    </div>
  );
}