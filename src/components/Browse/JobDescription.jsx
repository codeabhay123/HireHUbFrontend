import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { ArrowLeft, MapPin, Briefcase, FileText, Users, CalendarDays, Banknote } from 'lucide-react'

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const isInitiallyApplied = singleJob?.applications?.some(
    application => application.applicant === user?._id
  ) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const applyJobHandler = async () => {
    if (!user) {
      toast.error('Login to apply')
      return
    }
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      })
      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(
            res.data.job.applications.some(
              application => application.applicant === user?._id
            )
          )
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <div className="max-w-6xl mx-auto my-12 px-6 font-sans">
      {/* Back button */}
      <div className="mb-6">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="flex items-center gap-2 text-black-600 hover:text-white hover:bg-purple-600 transition rounded-lg px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ArrowLeft size={20} />
          Back
        </Button>
      </div>

      <div className="max-w-6xl mx-auto my-12 px-6 font-inter ">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-6">
          <div>
            <h1 className="font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight">
              {singleJob?.title}
            </h1>
            <div className="flex items-center gap-3 mt-5 flex-wrap">
              <Badge className="bg-red-500 text-white font-semibold hover:bg-red-600 transition text-sm px-3 py-1">
                {singleJob?.position || singleJob?.postion} Positions
              </Badge>
              <Badge className="bg-blue-500 text-white font-semibold hover:bg-blue-600 transition text-sm px-3 py-1">
                {singleJob?.jobType}
              </Badge>
              <Badge className="bg-green-400 text-white font-semibold hover:bg-green-600 transition text-sm px-3 py-1">
                {singleJob?.salary ? (singleJob.salary / 100000).toFixed(2) : 'N/A'} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? undefined : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg px-8 py-3 text-lg font-medium transition ${
              isApplied
                ? 'bg-gray-400 text-white cursor-not-allowed opacity-80'
                : 'bg-purple-600 hover:bg-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-purplr-600'
            }`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        {/* Job Info */}
        <div className="mt-10 space-y-5 text-gray-800  ">
          {[
            {
              icon: Briefcase,
              label: 'Role:',
              value: singleJob?.title,
            },
            {
              icon: MapPin,
              label: 'Location:',
              value: singleJob?.location,
            },
            {
              icon: FileText,
              label: 'Description:',
              value: singleJob?.description,
              isMultiline: true,
            },
            {
              icon: Briefcase,
              label: 'Experience:',
              value: singleJob?.experienceLevel || singleJob?.experience || 'N/A',
              suffix: ' years',
            },
            {
              icon: Banknote,
              label: 'Salary:',
              value: singleJob?.salary ? (singleJob.salary / 100000).toFixed(2) : 'N/A',
              suffix: ' LPA',
            },
            {
              icon: Users,
              label: 'Total Applicants:',
              value: singleJob?.applications?.length || 0,
            },
            {
              icon: CalendarDays,
              label: 'Posted Date:',
              value: singleJob?.createdAt ? singleJob.createdAt.split('T')[0] : 'N/A',
            },
          ].map(({ icon: Icon, label, value, suffix, isMultiline }, idx) => (
            <p
              key={idx}
              className={`flex items-${isMultiline ? 'start' : 'center'} gap-2 text-base md:text-lg`}
            >
              <Icon size={20} className="text-blue-600 mt-1" />
              <span className="font-medium text-gray-900">{label}</span>
              <span className="text-gray-700">{value}{suffix || ''}</span>
            </p>
          ))}
        </div>

        {/* Requirements */}
        {singleJob?.requirements?.length > 0 && (
          <div className="mt-10 bg-purple-50 rounded-xl p-8 shadow-sm border border-blue-100">
            <h2 className="font-semibold text-2xl md:text-3xl text-black-900 mb-5">Requirements</h2>
            <ul className="space-y-3">
              {singleJob.requirements.map((requirement, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-base text-blue-800 leading-relaxed"
                >
                  <span className="w-2.5 h-2.5 mt-2 bg-purple-600 rounded-full flex-shrink-0"></span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobDescription
