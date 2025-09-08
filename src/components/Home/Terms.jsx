import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Shield, Users, AlertCircle } from 'lucide-react';
import Footer from './Footer';
import Navbar from '../shared/Navbar';

const TermsOfService = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <FileText className="w-5 h-5" />,
      content: `By accessing and using HireHub, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. Your continued use of the platform constitutes acceptance of these terms.`
    },
    {
      id: 'definitions',
      title: 'Definitions',
      icon: <Users className="w-5 h-5" />,
      content: `"Service" refers to the HireHub platform and all related services. "User" refers to any individual or entity using the platform. "Employer" refers to users seeking to hire talent. "Job Seeker" refers to users seeking employment opportunities. "Content" refers to all information, data, text, software, music, sound, photographs, graphics, video, messages, or other materials.`
    },
    {
      id: 'eligibility',
      title: 'User Eligibility',
      icon: <Shield className="w-5 h-5" />,
      content: `You must be at least 18 years old to use HireHub. By using the platform, you represent and warrant that you have the legal capacity to enter into this agreement. Users must provide accurate, current, and complete information during registration and maintain the accuracy of such information.`
    },
    {
      id: 'accounts',
      title: 'User Accounts',
      icon: <Users className="w-5 h-5" />,
      content: `You are responsible for safeguarding your account credentials and for all activities under your account. You must notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activities.`
    },
    {
      id: 'services',
      title: 'Platform Services',
      icon: <FileText className="w-5 h-5" />,
      content: `HireHub provides a platform connecting employers with job seekers. We facilitate job postings, applications, and communications but are not responsible for the hiring decisions or employment relationships formed. We do not guarantee job placement or hiring success.`
    },
    {
      id: 'conduct',
      title: 'User Conduct',
      icon: <AlertCircle className="w-5 h-5" />,
      content: `Users must not post false, misleading, or discriminatory content. Harassment, spam, or inappropriate behavior is prohibited. Users must comply with all applicable laws and regulations. Any violation may result in account suspension or termination.`
    },
    {
      id: 'content',
      title: 'Content and Intellectual Property',
      icon: <Shield className="w-5 h-5" />,
      content: `You retain ownership of content you post but grant HireHub a license to use, display, and distribute such content on the platform. You must not infringe on others' intellectual property rights. We may remove content that violates these terms or applicable laws.`
    },
    {
      id: 'privacy',
      title: 'Privacy and Data Protection',
      icon: <Shield className="w-5 h-5" />,
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information. By using HireHub, you consent to the collection and use of information as described in our Privacy Policy.`
    },
    {
      id: 'payments',
      title: 'Payments and Fees',
      icon: <FileText className="w-5 h-5" />,
      content: `Certain features may require payment. All fees are non-refundable unless otherwise stated. We reserve the right to change pricing with 30 days notice. Failure to pay fees may result in service suspension or termination.`
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: <AlertCircle className="w-5 h-5" />,
      content: `Either party may terminate this agreement at any time. Upon termination, your right to use the service ceases immediately. We may retain certain information as required by law or for legitimate business purposes.`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: <Shield className="w-5 h-5" />,
      content: `HireHub is provided "as is" without warranties. We are not liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount paid by you in the 12 months preceding the claim.`
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: <FileText className="w-5 h-5" />,
      content: `We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated effective date. Your continued use after changes constitutes acceptance of the new terms.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
         <Navbar />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Terms of Service
            </h1>
            <div className="flex items-center justify-center space-x-2 text-slate-600 mb-6">
              <FileText className="w-5 h-5" />
              <span className="text-lg font-medium">HireHub Platform</span>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using our platform. 
              These terms govern your use of HireHub and all related services All are for Just fun.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Last Updated:</strong>September 09, 2025 | <strong>Effective Date:</strong> Till the Judgment Day
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="mb-12 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Welcome to HireHub</h2>
          <p className="text-slate-600 leading-relaxed">
            HireHub is a comprehensive hiring platform that connects talented professionals with 
            forward-thinking companies. By using our services, you agree to comply with and be 
            bound by the following terms and conditions of use.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div 
              key={section.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors duration-150"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {index + 1}. {section.title}
                    </h3>
                  </div>
                </div>
                {expandedSection === section.id ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {expandedSection === section.id && (
                <div className="px-6 pb-6">
                  <div className="pl-13">
                    <p className="text-slate-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white">
          <h2 className="text-2xl font-semibold mb-4">Questions About These Terms?</h2>
          <p className="text-blue-100 mb-4 leading-relaxed">
            If you have any questions about these Terms of Service, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="abhaypaney01992@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-150"
            >
              Email Legal Team
            </a>
            <a 
             // href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 transition-colors duration-150"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            These terms are governed by the laws of [Abhay]. 
            Any disputes will be resolved in the courts of [Justic].
          </p>
        </div>
      </div>
       <Footer />
    </div>
  );
};

export default TermsOfService;