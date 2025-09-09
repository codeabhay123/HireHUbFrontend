import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔹 Logout handler
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-white shadow-sm relative">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        
        {/* 🔹 Logo Section */}
        <div className="flex items-center gap-2">
          <h1
            className="text-xl md:text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Hire<span className="text-[#7e27f0]">Hub</span>
          </h1>
        </div>

        {/* 🔹 Desktop Navigation Menu - Hidden on mobile */}
        <ul className="hidden md:flex font-medium items-center gap-6">
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

        {/* 🔹 Right Section - Desktop */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* 🔹 Mobile Right Section */}
        <div className="flex md:hidden items-center gap-3">
          {/* User Avatar (Mobile) */}
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-gray-200 hover:ring-[#F83002] transition-all duration-200">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || user?.profilePic || ""}
                    alt="Profile"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-[#6A38C2] to-[#F83002] text-white font-semibold text-xs">
                    {user?.fullname || user?.name
                      ? (user?.fullname || user?.name).charAt(0).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72 p-0 border-0 shadow-xl bg-white rounded-xl overflow-hidden mr-4">
                <div className="p-4">
                  {/* Profile Header */}
                  <div className="flex gap-3 items-center">
                    <Avatar className="w-12 h-12 ring-2 ring-gray-100">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          user?.profilePic ||
                          "https://github.com/shadcn.png"
                        }
                        alt="Profile"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-[#6A38C2] to-[#F83002] text-white font-semibold">
                        {user?.fullname || user?.name
                          ? (user?.fullname || user?.name)
                              .charAt(0)
                              .toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {user?.fullname || user?.name || "User"}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {user?.profile?.bio ||
                          user?.email ||
                          "No information available"}
                      </p>
                    </div>
                  </div>

                  {/* Profile Actions */}
                  <div className="mt-4 flex flex-col gap-1">
                    {user && user.role === "student" && (
                      <Link to="/profile">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 py-2 px-3 hover:bg-gray-50 text-gray-700 hover:text-[#6A38C2] transition-all duration-200 rounded-lg text-sm"
                        >
                          <User2 size={16} /> View Profile
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={logoutHandler}
                      variant="ghost"
                      className="w-full justify-start gap-2 py-2 px-3 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-200 rounded-lg text-sm"
                    >
                      <LogOut size={16} /> Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Hamburger Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* 🔹 Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t z-50">
          <div className="px-4 py-4 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-3">
              {user && user.role === "recruiter" ? (
                // Recruiter Menu
                <>
                  <Link
                    to="/admin/companies"
                    className="block py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Companies
                  </Link>
                  <Link
                    to="/admin/jobs"
                    className="block py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Jobs
                  </Link>
                </>
              ) : (
                // Student/Visitor Menu
                <>
                  <Link
                    to="/"
                    className="block py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                  <Link
                    to="/jobs"
                    className="block py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/browse"
                    className="block py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Browse
                  </Link>
                  <Link
                    to="/about"
                    className="block py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="block py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Support
                  </Link>
                  <Link
                    to="/terms"
                    className="block py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Policy
                  </Link>
                </>
              )}
            </div>

            {/* Login/Signup buttons for mobile (when not logged in) */}
            {!user && (
              <div className="pt-4 border-t space-y-3">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 hover:border-[#F83002] hover:text-[#F83002] transition-all duration-200"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={closeMobileMenu}>
                  <Button className="w-full bg-gradient-to-r from-[#6A38C2] to-[#5b30a6] hover:from-[#5b30a6] hover:to-[#4c2890] text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;