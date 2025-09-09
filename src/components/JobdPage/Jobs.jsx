import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import FilterCard from "../JobdPage/FilterCard";
import Job from "../JobdPage/Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Page Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {searchedQuery
              ? `Search Results for "${searchedQuery}"`
              : "Browse Jobs"}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {filterJobs.length > 0
              ? `${filterJobs.length} job${
                  filterJobs.length > 1 ? "s" : ""
                } found`
              : "No jobs match your criteria"}
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Filters */}
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-6">
              <FilterCard />
            </div>
          </div>

          {/* Jobs List */}
          <div className="flex-1 min-w-0">
            {filterJobs.length <= 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center h-64 sm:h-80 lg:h-96 text-center bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl text-gray-300 mb-4">
                  🔍
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">
                  {searchedQuery
                    ? `No Jobs Found for "${searchedQuery}"`
                    : "No Jobs Available"}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 max-w-md">
                  {searchedQuery
                    ? "Try adjusting your search terms or filters to find more opportunities."
                    : "New job opportunities are added regularly. Please check back later."}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4 sm:space-y-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {filterJobs.map((job, index) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      className="h-full"
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Padding for mobile scroll */}
      <div className="h-4 sm:h-6 lg:hidden"></div>
    </div>
  );
};

export default Jobs;
