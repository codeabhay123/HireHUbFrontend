import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query.trim()));
    navigate("/browse");
  };

  return (
    <section className="text-center px-4">
      <div className="flex flex-col gap-6 my-12 , bg-blue-50">
        {/* Badge */}
        <span className="mx-auto px-5 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base shadow-sm">
          🚀 No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold leading-snug">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Job</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Find thousands of opportunities tailored to your skills. Search your
          next role and start your career journey today!
        </p>

        {/* Search bar */}
        <div className="flex w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto shadow-lg border border-gray-200 rounded-full overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search jobs by role, company, or skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
            className="flex-1 px-6 py-4 text-sm sm:text-base outline-none border-none text-gray-700 placeholder-gray-500"
          />

          {/* Fixed Button */}
          <Button
            onClick={searchJobHandler}
            className="bg-[#7f53ef] hover:bg-[#6a38c2]  text px-4 py-4 rounded-none rounded-r-full   border-none outline-none min-h-[56px] flex items-center justify-center"
          >
            <Search className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline font-medium">Search</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
