import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'  // ✅ Job categories carousel
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Contact from './About'

const Home = () => {
  // ✅ Fetch all jobs on page load
  useGetAllJobs();

  // ✅ Get logged-in user from redux store
  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    // ✅ If recruiter logs in, redirect them to companies dashboard
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]); // ✅ Added dependencies

  return (
    <div className=' bg-blue-50'>
      {/* ✅ Navbar */}
      <div className='border-t border-gray-300'>

      <Navbar />
      </div>

      {/* ✅ Hero Section */}
      <HeroSection />

      {/* ✅ Categories Section */}
      <CategoryCarousel />

      {/* ✅ Latest Jobs Section */}
      <LatestJobs />

      {/* ✅ Footer */}
      <Footer />

     
    </div>
  )
}

export default Home
