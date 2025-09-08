import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Bookmark, Heart, Share2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  
  // 🔹 DEBUG: Log the job data to see what we're receiving
  useEffect(() => {
    console.log("🔍 Job prop received:", job);
    console.log("🔍 Company data:", job?.company);
    console.log("🔍 Company name:", job?.company?.name);
    console.log("🔍 Company logo:", job?.company?.logo);
  }, [job]);

  const toggleLike = () => setIsLiked(!isLiked);
  
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
  }

  // 🔹 Add fallback handling for company data
  const companyName = job?.company?.name || "Unknown Company";
  const companyLogo = job?.company?.logo || "https://cdn-icons-png.flaticon.com/128/300/300221.png";

  return (
    <div className="w-full max-w-md mx-auto sm:mx-0 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md bg-white border border-gray-200 transform transition-all duration-300">
      
      

      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm text-gray-400 truncate pr-2">
          {daysAgoFunction(job?.createdAt) === 0 
            ? "Posted Today" 
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full h-8 w-8 sm:h-9 sm:w-9 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition flex-shrink-0"
          size="icon"
        >
          <Bookmark className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 hover:text-purple-600 transition" />
        </Button>
      </div>
{/* Company Info */}
<div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border border-gray-200 shadow-sm flex-shrink-0">
    <AvatarImage 
      src={job?.company?.logo || "https://cdn-icons-png.flaticon.com/128/300/300221.png"} 
      alt={job?.company?.name || "Company Logo"} 
    />
  </Avatar>
  <div className="min-w-0 flex-1">
    <h2 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
      {job?.company?.name || "Unknown Company"}
    </h2>
    <p className="text-xs sm:text-sm text-gray-500 truncate">
      {job?.location || "Location not specified"}
    </p>
  </div>
</div>


      {/* Rest of your component remains the same... */}
      <div className="mb-3 sm:mb-4">
        <h1 className="font-bold text-lg sm:text-xl text-gray-900 mb-1 sm:mb-2 line-clamp-2">
          {job?.title || "Untitled Job"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3 leading-relaxed">
          {job?.description || "No description available."}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
        {job?.position && (
          <Badge className="bg-blue-50 text-blue-700 font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm hover:bg-blue-100">
            {job.position} {job.position > 1 ? "Positions" : "Position"}
          </Badge>
        )}
        {job?.jobType && (
          <Badge className="bg-red-50 text-red-600 font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm hover:bg-red-100">
            {job.jobType}
          </Badge>
        )}
        {job?.salary && (
          <Badge className="bg-purple-50 text-purple-700 font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm hover:bg-purple-100">
            {(job.salary / 100000).toFixed(1)} LPA
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-4 sm:mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex-1 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-purple-600 hover:bg-purple-500 transition text-white shadow-sm hover:shadow-md"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border-gray-300 text-teal-600 hover:bg-teal-50 hover:text-teal-700 transition flex-shrink-0"
        >
          Save
        </Button>
      </div>

      {/* Footer Icons */}
      <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-5 text-gray-500">
        <Heart
          onClick={toggleLike}
          className={`h-4 w-4 sm:h-5 sm:w-5 cursor-pointer transition ${
            isLiked ? "text-red-500 fill-red-500" : "text-gray-400"
          } hover:scale-110`}
        />
        <Share2 className="h-4 w-4 sm:h-5 sm:w-5 cursor-pointer hover:text-blue-500 transition hover:scale-110" />

        {job?.applications?.length > 0 && (
          <div className="ml-auto text-xs text-gray-400 hidden sm:block">
            {job.applications.length} applicant{job.applications.length > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default Job;