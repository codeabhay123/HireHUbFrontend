import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { JOB_API_END_POINT } from "@/utils/constant";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import axios from "axios";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();

  // input handler
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // select company handler
  const selectchangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="py-10">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-3xl border border-gray-200 rounded-lg shadow-md mx-auto bg-white"
        >
          {/* Back Button */}
          <div className="flex items-center mb-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded-md"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h2 className="text-xl font-semibold flex-1 text-center text-gray-800">
              Post a New Job
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label className="text-sm text-gray-600">Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="e.g. Software Engineer"
                value={input.title}
                onChange={changeEventHandler}
                className="my-1 rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="e.g. Responsible for building web apps"
                value={input.description}
                onChange={changeEventHandler}
                className="my-1 rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                placeholder="e.g. React, Node.js, MongoDB"
                value={input.requirements}
                onChange={changeEventHandler}
                className="my-1 rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Salary</Label>
              <Input
                type="text"
                name="salary"
                placeholder="e.g. 600000/year"
                value={input.salary}
                onChange={changeEventHandler}
                className="my-1 rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="e.g. Bengaluru, India"
                value={input.location}
                onChange={changeEventHandler}
                className="my-1 rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Job Type</Label>
              <Select
                onValueChange={(value) =>
                  setInput({ ...input, jobType: value })
                }
              >
                <SelectTrigger className="w-full my-1 rounded-md">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Experience</Label>
              <Input
                type="text"
                name="experience"
                placeholder="e.g. 2 years / Fresher / Silver"
                value={input.experience}
                onChange={changeEventHandler}
                className="my-1 rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">No. of Positions</Label>
              <Input
                type="number"
                name="position"
                placeholder="e.g. 3"
                value={input.position}
                onChange={changeEventHandler}
                className="my-1 rounded-md"
              />
            </div>
          </div>

          {companies.length > 0 && (
            <div className="mt-5">
              <Label className="text-sm text-gray-600">Select Company</Label>
              <Select onValueChange={selectchangeHandler}>
                <SelectTrigger className="w-full mt-1 rounded-md">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company.name.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...
              </>
            ) : (
              "Post New Job"
            )}
          </Button>

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-semibold text-center my-4">
              *Please register a company before posting a job
            </p>
          )}
        </form>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default PostJob;
