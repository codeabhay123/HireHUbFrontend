import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import FilterCard from '../JobdPage/FilterCard'
import Job from '../JobdPage/Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className=' bg-blue-50'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 '>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
              {
  filterJobs.length <= 0 ? (
    <div className="flex-1 flex flex-col items-center justify-center h-64 text-center">
      <div className="text-6xl text-gray-300 mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        {searchedQuery ? `No Jobs Found for "${searchedQuery}"` : "No Jobs Available"}
      </h3>
      <p className="text-gray-500">
        {searchedQuery 
          ? "Try changing your search term or filters."
          : "Please check back later."}
      </p>
    </div>
  ) : (
    <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterJobs.map((job) => (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            key={job?._id}
          >
            <Job job={job} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

                </div>
            </div>


        </div>
    )
}

export default Jobs