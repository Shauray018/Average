import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

export const AuthSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  async function sendRequest(){
    try { 
      const response = await axios.post(`${config.backendUrl}/api/v1/user/signup`, formData);
      const token = response.data.jwt;
      localStorage.setItem("Authorization",token);
      navigate("/blogs")
    } catch(e) { 
      alert("Error while signing up")
    }
  }
//@ts-ignore
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="flex justify-center h-screen items-center flex-col">
      <div className="flex justify-center font-extrabold text-3xl font-body">
        Create an account
      </div>
      <div className="flex justify-center font-body text-zinc-500 pt-2">
        Already have an account? <div className="underline pl-2"><a href="/signin">Login</a></div>
      </div>
      <div className="pt-5">
        <LabelInput patch="name" change={onChangeHandler} value={formData.name} />
      </div>
      <div className="pt-5">
        <LabelInput patch="email" change={onChangeHandler} value={formData.email} />
      </div>
      <div className="pt-5">
        <LabelInput patch="password" change={onChangeHandler} value={formData.password} />
      </div>
      <button className="bg-black hover:bg-gray-100 text-slate-200 font-semibold py-2 px-40 border border-gray-400 rounded shadow mt-5"
        onClick={sendRequest}>
        Sign up
      </button>
    </div>
  );
};
//@ts-ignore
export function LabelInput({ patch, change, value }) {
  return (
    <div className="w-96">
      <div className="relative w-full min-w-[200px] h-10">
        <input
          className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
          name={patch}
          placeholder=" "
          onChange={change}
          value={value}
        />
        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
          {patch}
        </label>
      </div>
    </div>
  );
}
