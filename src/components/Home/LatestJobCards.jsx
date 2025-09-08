import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin, Building2 } from "lucide-react";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  
  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="p-4 rounded-lg bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200 w-full max-w-sm"
    >
      {/* Company Info */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="w-4 h-4 text-gray-500" />
          <h1 className="font-medium text-base text-gray-900 truncate">
            {job?.company?.name || "Unknown Company"}
          </h1>
        </div>
        <div className="flex items-center gap-1 text-gray-500 ml-6">
          <MapPin className="w-3 h-3" />
          <p className="text-sm truncate">{job?.location || "Location not specified"}</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-3">
        <h2 className="font-semibold text-lg text-gray-900 mb-2 truncate">
          {job?.title || "Untitled Job"}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3 min-h-[3rem]">
          {job?.description || "No description available."}
        </p>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap items-center gap-2">
        {job?.position && (
          <Badge className="text-blue-700 font-medium text-xs" variant="secondary">
            {job.position} {job.position > 1 ? "Positions" : "Position"}
          </Badge>
        )}
        {job?.jobType && (
          <Badge className="text-orange-700 font-medium text-xs" variant="secondary">
            {job.jobType}
          </Badge>
        )}
        {job?.salary && (
          <Badge className="text-purple-700 font-medium text-xs" variant="secondary">
            ₹{job.salary / 100000} LPA
          </Badge>
        )}
      </div>
    </div>
  );
};

export default LatestJobCards;