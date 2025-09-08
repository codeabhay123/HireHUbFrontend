import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();  // ✅ useNavigate

  // 🔹 Logout handler
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/"); // ✅ redirect after logout
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white-100 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 ">
        
        {/* 🔹 Logo Section */}
        <div className="flex items-center gap-2">
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")} // ✅ use navigate instead of negative
          >
            Hire<span className="text-[#7e27f0]">Hub</span>
          </h1>
        </div>
        {/* 🔹 Navigation Menu */}
        <ul className="flex font-medium items-center gap-6">
          {user && user.role === "recruiter" ? (
            // ✅ Recruiter Menu
            <>
              <li>
                <Link
                  to="/admin/companies"
                  className="hover:text-[#e32525] transition"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/jobs"
                  className="hover:text-[#e84233] transition"
                >
                  Jobs
                </Link>
              </li>
             
            </>
          ) : (
            // ✅ Student/Visitor Menu
            <>
              <li>
                <Link to="/" className="hover:text-[#ef3636] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-[#e22f2f] transition">
                  Jobs
                </Link>
                
              </li>
              <li>
                <Link to="/browse" className="hover:text-[#e9404b] transition">
                  Browse
                </Link>
              </li>
               <li>
                <Link
                  to="/about"
                  className="hover:text-[#f43d46] transition"
                >
                  About
                </Link>
              </li>
                  <li>
                <Link
                  to="/contact"
                  className="hover:text-[#f43d46] transition"
                >
                  Support
                </Link>
              </li>
                <li>
                <Link
                  to="/terms"
                  className="hover:text-[#f43d46] transition"
                >
                Policy
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* 🔹 Right Section (Login/Signup OR Profile Avatar) */}
        <div className="flex items-center gap-4">
          {!user ? (
            // ✅ If NOT logged in → Show Login & Signup
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-gray-300 hover:border-[#F83002] hover:text-[#F83002] transition-all duration-200"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-[#6A38C2] to-[#5b30a6] hover:from-[#5b30a6] hover:to-[#4c2890] text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            // ✅ If logged in → Show Profile Avatar + Popover Menu
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-gray-200 hover:ring-[#F83002] transition-all duration-200 shadow-md hover:shadow-lg">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || user?.profilePic || ""}
                    alt="Profile"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-[#6A38C2] to-[#F83002] text-white font-semibold">
                    {user?.fullname || user?.name
                      ? (user?.fullname || user?.name).charAt(0).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              {/* 🔹 Popover Content (Profile Info + Actions) */}
              <PopoverContent className="w-80 p-0 border-0 shadow-xl bg-white rounded-xl overflow-hidden">
                <div className="p-6">
                  {/* Profile Header */}
                  <div className="flex gap-4 items-center">
                    <Avatar className="w-14 h-14 ring-2 ring-gray-100">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          user?.profilePic ||
                          "https://github.com/shadcn.png"
                        }
                        alt="Profile"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-[#6A38C2] to-[#F83002] text-white font-semibold text-lg">
                        {user?.fullname || user?.name
                          ? (user?.fullname || user?.name)
                              .charAt(0)
                              .toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {user?.fullname || user?.name || "User"}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {user?.profile?.bio ||
                          user?.email ||
                          "No information available"}
                      </p>
                    </div>
                  </div>

                  {/* Profile Actions */}
                  <div className="mt-6 flex flex-col gap-2">
                    {user && user.role === "student" && (
                      <Link to="/profile">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 py-3 px-4 hover:bg-gray-50 text-gray-700 hover:text-[#6A38C2] transition-all duration-200 rounded-lg"
                        >
                          <User2 size={18} /> View Profile
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={logoutHandler}
                      variant="ghost"
                      className="w-full justify-start gap-3 py-3 px-4 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-200 rounded-lg"
                    >
                      <LogOut size={18} /> Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
