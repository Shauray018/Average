import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tiptap from '../Tiptap'; // Adjust the import path according to your file structure
import { AvatarHandler } from '../components/AppBar';
import config from '../config';

interface FormData {
  title: string;
  content: string;
}

const CreateBlog: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
  });

  const navigate = useNavigate();

  const handleDescriptionChange = (richText: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: richText,
    }));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log('Title:', formData.title);
      console.log('Description:', formData.content);

      const response = await axios.post(
        `${config.backendUrl}/api/v1/blog`,
        formData,
        {
          headers: {
            Authorization: `${localStorage.getItem('Authorization')}`,
          },
        }
      );

      console.log('Response:', response.data); // Assuming backend returns data
      // Redirect to /blogs after successful submission
      navigate("/blogs");
    } catch (error) {
      console.error('Error:', error);
      // Handle error: show error message or retry logic
    }
  };

  return (
    <div>
      <div className="flex items-center gap-96 p-5">
        
        <div className="font-rome font-bold text-3xl pl-3 ml-60 cursor-pointer" onClick={() => navigate("/blogs")}>Medium</div>
       
        <div className="flex items-center justify-center ml-96">
          <button
            onClick={handleSubmit}
            type="button" // Ensure button type is 'button' to prevent form submission
            className="px-2 py-0.5 mr-6 bg-green-600 text-white text-sm rounded-full hover:bg-green-700"
          >
            Publish
          </button>
          <div className="inline-flex items-center justify-center font-body text-xl w-8 h-8 text-white bg-purple-500 rounded-full">
            <AvatarHandler name="Shauray" />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-1">
          <div className="form-group">
            <textarea
              className=" overflow-hidden h-14 resize-none w-full pl-3 ml-9 text-gray-800 text-5xl font-normal  font-rome focus:outline-none focus:ring focus:ring-white focus:border-l border-gray-300"
              placeholder="Title"
              value={formData.title}
              onChange={handleTitleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <Tiptap description={formData.content} onChange={handleDescriptionChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
