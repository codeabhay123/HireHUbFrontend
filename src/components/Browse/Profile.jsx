import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

//const skills = ["Html", "Css", "JavaScript", "Nodejs", "MongoDB"];
const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  



  

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage    src={user?.profile?.profilePhoto || user?.profilePic || ""}
                    alt="Profile" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {" "}
                {user?.fullname}{" "}
              </h2>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                {user?.bio}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="mt-4 md:mt-0 px-4 py-2 flex items-center gap-2"
          >
            <Pen className="h-4 w-4" /> Edit Profile
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-500" />
            <span className="text-black-800 font-medium">{user?.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Contact className="text-gray-500" />
            <span className="text-black-800 font-medium">
              {user?.phoneNumber}
            </span>
          </div>
        </div>
        {/* Skills */}
        <div className="mt-6">
          <Label className="text-lg font-semibold mb-2 block">Skills</Label>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(user?.profile?.skills) &&
            user.profile.skills.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge
                  key={index}
               className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium 
             hover:bg-purple-600 hover:text-white transition-colors duration-200"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
  
        <div className="mt-6">
          <Label className="text-lg font-semibold mb-2 block">Resume</Label>
          {isResume ? (
            <div className="flex gap-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  const resumeUrl = user?.profile?.resume;
                  if (resumeUrl) {
                    // Google Docs Viewer - Always opens PDFs inline in browser
                    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(resumeUrl)}&embedded=true`;
                    window.open(viewerUrl, '_blank');
                  }
                }}
                className="text-purple-600 hover:underline font-medium"
              >
                📄 View Resume
              </a>


            </div>
          ) : (
            <span className="text-gray-400">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-lg my-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Applied Jobs
        </h2>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
