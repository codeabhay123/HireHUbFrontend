import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import Job from '../JobdPage/Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '../../hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector((store) => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 px-4">
                <h1 className="font-bold text-xl my-6 text-gray-800">
                    Search Results ({allJobs.length})
                </h1>

                {/* Responsive grid: 1 col (mobile), 2 cols (tablet), 3 cols (desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allJobs.map((job) => (
                        <Job key={job._id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Browse
