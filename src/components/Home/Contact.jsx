import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, HelpCircle, Users, Shield, Star, Globe } from 'lucide-react';
import Footer from './Footer';
import Navbar from '../shared/Navbar';

const contactTypes = [
  {
    id: 'general',
    name: 'General Support',
    icon: <HelpCircle className="w-5 h-5" />,
    details: 'Questions about HireHub',
    email: 'abhaypandey01992@gmail.com',
    responseTime: '24-48 hrs'
  },
  {
    id: 'technical',
    name: 'Technical Help',
    icon: <Shield className="w-5 h-5" />,
    details: 'Platform issues',
    email: 'abhaypandey01992@gmail.com',
    responseTime: '4-8 hrs'
  }
];

const companyDetails = {
  headquarters: {
    name: 'HireHub Headquarters',
    address: 'Matiyari Chauraha Lucknow',
    phone: '+91 8576412278',
    email: 'abhaypandey01992@gmail.com'
  },
  operatingHours: 'Mon-Fri 8am-7pm • Sat 10am-4pm • Sun Closed (PST)'
};

const ContactPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Full-width Navbar */}
      <div className="w-full">
        <Navbar />
      </div>
      
      {/* Centered cloud card */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-xl bg-white rounded-3xl border border-blue-100 py-10 px-8 shadow-none">
          {/* Header */}
          <div className="text-center mb-7">
            <Globe className="w-10 h-10 text-blue-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-700 mt-3 mb-2">Contact HireHub</h1>
            <p className="text-lg text-gray-500">Quick help and business contact details below.</p>
          </div>

          {/* Contact Categories simple toggle */}
          <div className="flex justify-center mb-6 gap-3">
            {contactTypes.map(type => (
              <button
                type="button"
                key={type.id}
                onClick={() => setActiveCategory(type.id)}
                className={`rounded-xl px-4 py-2 flex items-center gap-2 border 
                  ${activeCategory === type.id ? 'bg-blue-50 border-blue-300 text-blue-600 font-bold' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
              >
                {type.icon}
                {type.name}
              </button>
            ))}
          </div>
          {/* Selected Contact Info */}
          <div className="mb-6 text-center">
            <p className="text-gray-600 text-base mb-1">{contactTypes.find(t => t.id === activeCategory).details}</p>
            <a href={`mailto:${contactTypes.find(t => t.id === activeCategory).email}`} className="text-blue-600 font-semibold block">
              {contactTypes.find(t => t.id === activeCategory).email}
            </a>
            <div className="text-xs text-gray-400 mt-1">Response: {contactTypes.find(t => t.id === activeCategory).responseTime}</div>
          </div>

          {/* Headquarters */}
          <div className="text-center pb-5 border-b border-gray-200 mb-6">
            <div className="flex items-center justify-center gap-2 mb-1">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{companyDetails.headquarters.address}</span>
            </div>
            <div className="flex justify-center gap-4 mt-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" /> {companyDetails.headquarters.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" /> {companyDetails.headquarters.email}
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              <Clock className="inline w-4 h-4 mr-1" /> {companyDetails.operatingHours}
            </div>
          </div>

          {/* Help Resources small icons inline */}
          <div className="flex justify-center gap-7 mb-6">
            <div className="text-center">
              <HelpCircle className="w-6 h-6 text-blue-400 mx-auto" />
              <div className="text-xs text-gray-500 mt-1">Help Center</div>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 text-blue-400 mx-auto" />
              <div className="text-xs text-gray-500 mt-1">Community</div>
            </div>
          </div>

          {/* Response Time Box */}
          <div className="w-full rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-800 text-center flex items-center justify-center gap-2">
            <Star className="w-4 h-4" />
            General: 24-48 hrs • Tech: 4-8 hrs
          </div>
        </div>
      </div>
      
      {/* Full-width Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
