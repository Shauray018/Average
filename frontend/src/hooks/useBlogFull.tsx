import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
interface BlogData {
    title: string;
    content: string;
    author: {
        name: string;
        // Add more properties of author if needed
    };
    // Add more properties of blogData as per its structure
}
export function useBlogFull() {
    const [loading, setLoading] = useState<boolean>(true);
    const [blogData, setBlogData] = useState<BlogData | null>(null); // Use BlogData type here
    const { id } = useParams<{ id: string }>();

    const getBlog = async () => {
        try {
            const response = await axios.get(`${config.backendUrl}/api/v1/blog/${id}`, {
                headers: {
                    'Authorization': `${localStorage.getItem('Authorization')}`
                }
            });
            console.log(response.data);
            if (response.data.post) {
                setBlogData(response.data.post as BlogData); // Ensure response.data.post is typecasted to BlogData
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            console.error("Error fetching blog post:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlog();
    }, [id]);

    return { blogData, loading };
}
