import axios from "axios";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LabelInput } from "./AuthSignup";
import config from "../config";

export const AuthSignin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('https://backend.shauraydhingra03.workers.dev/api/v1/user/signin', {
  //       email: formData.email,
  //       password: formData.password
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       //@ts-ignore
  //       validateStatus: (status) => {
  //         return true; // Accept all HTTP status codes
  //       }
  //     });

  //     if (response.status === 200) {
  //       navigate('/');
  //     } else {
  //       console.log('Sign-in failed:', response.data);
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error('Axios error response:', error.response);
  //       console.error('Axios error message:', error.message);
  //     } else {
  //       console.error('Unexpected error:', error);
  //     }
  //   }
  // };
  async function sendRequest(){
    try { 
      const response = await axios.post(`${config.backendUrl}/api/v1/user/signin`, formData);
      const token = response.data.jwt;
      localStorage.setItem("Authorization",token);
      navigate("/blogs")
    } catch(e) { 
      alert("Error while signing up")
    }
  }

  return (
    <div className="flex justify-center h-screen items-center flex-col">
      <div className="flex justify-center font-extrabold text-3xl font-body">
        Sign in to your account
      </div>
      <div className="flex justify-center font-body text-slate-400">
        Don't have an account? <div className="underline pl-2"><a href="/signup">Sign up</a></div>
      </div>
      <div className="pt-5">
        <LabelInput patch="email" change={onChangeHandler} value={formData.email} />
      </div>
      <div className="pt-5">
        <LabelInput patch="password" change={onChangeHandler} value={formData.password} />
      </div>
      <button
        className="bg-black hover:bg-gray-100 text-slate-200 font-semibold py-2 px-40 border border-gray-400 rounded shadow mt-5"
        onClick={sendRequest}
      >
        Sign in
      </button>
    </div>
  );
};

// interface LabelInputProps {
//   patch: string;
//   change: (e: ChangeEvent<HTMLInputElement>) => void;
//   value: string;
// }
