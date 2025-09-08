import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: [],
    file: null,
  });
  const [skillInput, setSkillInput] = useState("");

  // ✅ FIX: Correct property paths for bio and skills
  useEffect(() => {
    if (!user) return;
    setInput({
      fullname: user.fullname || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      bio: user.profile?.bio || "", // ✅ Fixed: user.profile.bio
      skills: Array.isArray(user.profile?.skills) ? user.profile.skills : [], // ✅ Fixed: user.profile.skills
      file: null,
    });
  }, [user, open]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0] ?? null;
    setInput((prev) => ({ ...prev, file }));
  };

  const addSkillHandler = () => {
    if (skillInput.trim() && !input.skills.includes(skillInput.trim())) {
      setInput((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkillHandler = (skill) => {
    setInput((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("bio", input.bio);
      
      // ✅ Send skills as JSON string (your backend expects this)
      formData.append("skills", JSON.stringify(input.skills));

      if (input.file) {
        formData.append("file", input.file);
      }

      console.log("→ sending update:", {
        fullname: input.fullname,
        email: input.email,
        phoneNumber: input.phoneNumber,
        bio: input.bio,
        skills: input.skills,
        file: input.file?.name,
      });

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log("← response:", res.data);

      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated successfully");
        setOpen(false);
      } else {
        toast.error(res.data?.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target === e.currentTarget) {
      e.preventDefault();
      addSkillHandler();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullname" className="text-right">Name</Label>
            <Input
              id="fullname"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="col-span-3"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              type="email"
              className="col-span-3"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">Phone</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              type="tel"
              className="col-span-3"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Bio */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">Bio</Label>
            <Input
              id="bio"
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              className="col-span-3"
              placeholder="Tell us about yourself"
            />
          </div>

          {/* Skills */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="skills" className="text-right">Skills</Label>
            <div className="col-span-3 space-y-2">
              <div className="flex gap-2">
                <Input
                  id="skills"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Enter a skill"
                  onKeyPress={handleKeyPress}
                />
                <Button type="button" onClick={addSkillHandler} size="sm">
                  Add
                </Button>
              </div>
              
              {/* Display current skills */}
              {input.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {input.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-purple-600"
                        onClick={() => removeSkillHandler(skill)}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">Resume</Label>
            <div className="col-span-3">
              <input
                id="file"
                name="file"
                type="file"
               
                onChange={fileChangeHandler}
                accept=".pdf,.doc,.docx,image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              <p className="text-xs text-gray-500 mt-1">PDF, DOC, or image files only</p>
            </div>
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4" disabled onClick={submitHandler}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Updating...
              </Button>
            ) : (
              <Button onClick={submitHandler} className="w-full my-4">
                Update Profile
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;