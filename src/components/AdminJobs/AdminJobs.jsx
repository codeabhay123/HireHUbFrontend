import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchJobByText(input));
    }, 400);

    return () => clearTimeout(timer);
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5 gap-3'>
          <Input
            className="w-72"
            placeholder="Filter by name, role"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-2">
            {input && (
              <Button
                variant="outline"
                onClick={() => setInput("")}
              >
                Clear
              </Button>
            )}
            <Button onClick={() => navigate("/admin/jobs/create")}>
              Create Job
            </Button>
          </div>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs
