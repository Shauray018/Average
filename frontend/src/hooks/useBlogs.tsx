import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

export const useBlogs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogsData, setBlogsData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getBlogs = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/api/v1/blog/bulk`, {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      });
      console.log(response.data); // Log the data to verify its structure
      if (response.data.posts && Array.isArray(response.data.posts)) {
        setBlogsData(response.data.posts);
      } else {
        throw new Error("Data is not in expected array format");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return { loading, blogsData, error };
};