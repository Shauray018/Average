import { useBlogFull } from "../hooks/useBlogFull";
import { AvatarHandler } from "../components/AppBar";
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization if needed
import { AppBar } from "../components/AppBar";
import { useUser } from "../hooks/useUser";


export const Blog = () => {
    const { name } = useUser();
    const { blogData, loading } = useBlogFull();
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!blogData) {
        return <div>Error loading blog post</div>;
    }

    // Sanitize blog content if needed
    const sanitizedContent = DOMPurify.sanitize(blogData.content);

    return (
        <div>
            <AppBar authorName={`${name}`} />
            
        <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl p-20">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <div className="text-5xl font-extrabold font-body pb-10">{blogData.title}</div>
                        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                    </div>
                    <div className="flex flex-col pl-11">
                        <div className="pb-3 pl-2 font-medium">Author</div>
                        <div className="flex items-center">
                            <div className="inline-flex items-center justify-center w-12 h-8 text-md text-white bg-gray-500 rounded-full">
                                <AvatarHandler name={blogData.author.name} />
                            </div>
                            <div className="pl-3 text-2xl font-body font-black">{blogData.author.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};