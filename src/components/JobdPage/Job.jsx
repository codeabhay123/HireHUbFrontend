import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Bookmark, Heart, Share2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => setIsLiked(!isLiked);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="w-full max-w-md mx-auto sm:mx-0 p-4 rounded-2xl shadow-md bg-white border border-gray-200 transform transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-400 truncate">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Posted Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition"
        >
          <Bookmark className="h-4 w-4 text-gray-500 hover:text-purple-600 transition" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10 border border-gray-200 shadow-sm">
          <AvatarImage
            src={
              job?.company?.logo ||
              "https://cdn-icons-png.flaticon.com/128/300/300221.png"
            }
            alt={job?.company?.name || "Company Logo"}
          />
        </Avatar>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-gray-800 text-sm truncate">
            {job?.company?.name || "Unknown Company"}
          </h2>
          <p className="text-xs text-gray-500 truncate">
            {job?.location || "Location not specified"}
          </p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-3">
        <h1 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
          {job?.title || "Untitled Job"}
        </h1>
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
          {job?.description || "No description available."}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        {job?.position && (
          <Badge className="bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-full text-xs">
            {job.position} {job.position > 1 ? "Positions" : "Position"}
          </Badge>
        )}
        {job?.jobType && (
          <Badge className="bg-red-50 text-red-600 font-medium px-2 py-0.5 rounded-full text-xs">
            {job.jobType}
          </Badge>
        )}
        {job?.salary && (
          <Badge className="bg-purple-50 text-purple-700 font-medium px-2 py-0.5 rounded-full text-xs">
            {(job.salary / 100000).toFixed(1)} LPA
          </Badge>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex-1 px-3 py-2 rounded-full text-xs font-medium bg-purple-600 hover:bg-purple-500 transition text-white shadow-sm"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          className="px-3 py-2 rounded-full text-xs font-medium border-gray-300 text-teal-600 hover:bg-teal-50 hover:text-teal-700 transition"
        >
          Save
        </Button>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 mt-4 text-gray-500">
        <Heart
          onClick={toggleLike}
          className={`h-4 w-4 cursor-pointer transition ${
            isLiked ? "text-red-500 fill-red-500" : "text-gray-400"
          } hover:scale-110`}
        />
        <Share2 className="h-4 w-4 cursor-pointer hover:text-blue-500 transition hover:scale-110" />

        {job?.applications?.length > 0 && (
          <div className="ml-auto text-xs text-gray-400 hidden sm:block">
            {job.applications.length} applicant
            {job.applications.length > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default Job;
