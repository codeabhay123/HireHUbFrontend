import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Signup = () => {
  // 🔹 Local state to store input values before sending to backend
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  // 🔹 Getting global auth state from Redux
  const { loading, user } = useSelector((store) => store.auth);

  // 🔹 Redux dispatch function (to update global store if needed later)
  const dispatch = useDispatch();

  // 🔹 For redirecting after successful signup
  const navigate = useNavigate();

  // 📌 Handle text input changes (fullname, email, password, role, etc.)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // 📌 Handle file input change (profile picture / resume etc.)
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] || null });
  };

  // 📌 Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // prevent default form refresh

    // 🔹 Prepare form data to send to backend (supports file uploads)
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    // 🔹 Show loading toast while request is processing
    const toastId = toast.loading("Signing you up...");

    try {
      // 🔹 Send signup request to backend
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }, // file upload support
          withCredentials: true, // to send cookies if backend uses them
        }
      );

      // ✅ If signup is successful
      if (res.data.success) {
        toast.success("Signup successfully ✅", { id: toastId });
        navigate("/login"); // redirect user to login page
      }
    } catch (error) {
      console.error(error);

      // ❌ If signup fails, show error message
      toast.error(error.response?.data?.message || "Something went wrong ❌", {
        id: toastId,
      });
    }
  };
  useEffect(() =>{
    if(user){
      navigate("/")
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Signup Card */}
      <div className="max-w-sm mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={submitHandler} className="space-y-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Sign Up
          </h1>

          {/* Full Name Input */}
          <div>
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Your Name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="0000000000"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
              required
            />
          </div>

          {/* Role Selection (radio buttons) */}
          <div>
            <Label>Role</Label>
            <div className="flex space-x-4">
              {/* Student Role */}
              <div className="flex items-center space-x-1">
                <input
                  id="student"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  required
                />
                <Label htmlFor="student" className="cursor-pointer text-sm">
                  Student
                </Label>
              </div>

              {/* Recruiter Role */}
              <div className="flex items-center space-x-1">
                <input
                  id="recruiter"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter" className="cursor-pointer text-sm">
                  Recruiter
                </Label>
              </div>
            </div>
          </div>

          {/* File Upload (Profile Pic or Resume) */}
          <div>
            <Label htmlFor="file">Profile</Label>
            <input
              id="file"
              type="file"
              onChange={changeFileHandler}
              accept="image/*"
              className="cursor-pointer border border-gray-300 rounded-md p-1 text-sm hover:border-purple-600 transition"
            />
          </div>

          {/* Loading button vs Normal button */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}

          {/* Already have account? → Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
