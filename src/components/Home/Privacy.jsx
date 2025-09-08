import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Eye, Lock, Users, Database, Globe, Settings, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import Navbar from '../shared/Navbar';
import Footer from './Footer';

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'overview',
      title: 'Privacy Overview',
      icon: <Shield className="w-5 h-5" />,
      content: `At HireHub, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, process, and safeguard your data when you use our platform. We believe in transparency and will never sell your personal information to third parties.`
    },
    {
      id: 'information-collected',
      title: 'Information We Collect',
      icon: <Database className="w-5 h-5" />,
      content: `We collect information you provide directly (account details, profile information, resumes, job postings), information automatically collected (device information, usage data, cookies), and information from third parties (social media login data, reference checks with your consent). All collection is done lawfully and with appropriate notice.`
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: <Settings className="w-5 h-5" />,
      content: `We use your information to provide and improve our services, match job seekers with employers, send relevant notifications, prevent fraud and abuse, comply with legal obligations, and communicate with you about your account. We only use your data for legitimate business purposes and as described in this policy.`
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: <Users className="w-5 h-5" />,
      content: `We share information only when necessary: with employers when you apply for jobs, with service providers who help us operate the platform, when required by law, or with your explicit consent. We never sell your personal information and require all partners to maintain strict confidentiality and data protection standards.`
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <Lock className="w-5 h-5" />,
      content: `We implement industry-standard security measures including encryption, secure servers, regular security audits, access controls, and staff training. While we strive to protect your information, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: <FileText className="w-5 h-5" />,
      content: `We retain your information only as long as necessary for the purposes outlined in this policy or as required by law. Account information is kept while your account is active and for a reasonable period thereafter. You can request deletion of your account and associated data at any time.`
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: <CheckCircle className="w-5 h-5" />,
      content: `You have the right to access, update, or delete your personal information, opt-out of certain communications, request data portability, restrict processing, and lodge complaints with supervisory authorities. We provide easy-to-use tools in your account settings to manage your privacy preferences.`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: <Eye className="w-5 h-5" />,
      content: `We use cookies and similar technologies to enhance your experience, remember your preferences, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser, but disabling certain cookies may affect platform functionality.`
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      icon: <Globe className="w-5 h-5" />,
      content: `If you're located outside our primary operating jurisdiction, your information may be transferred to and processed in countries with different privacy laws. We ensure appropriate safeguards are in place for such transfers, including standard contractual clauses and adequacy decisions.`
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `HireHub is not intended for children under 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will delete it immediately. Parents should monitor their children's online activities.`
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      icon: <Globe className="w-5 h-5" />,
      content: `Our platform may contain links to third-party websites or integrate with external services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information.`
    },
    {
      id: 'policy-changes',
      title: 'Policy Changes',
      icon: <Settings className="w-5 h-5" />,
      content: `We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or platform notification. Your continued use after changes constitutes acceptance of the updated policy.`
    }
  ];

  const dataTypes = [
    { type: 'Personal Information', items: ['Name, email, phone number', 'Profile photos', 'Professional experience', 'Education history'] },
    { type: 'Account Data', items: ['Login credentials', 'Account preferences', 'Communication history', 'Platform activity'] },
    { type: 'Technical Data', items: ['IP address', 'Device information', 'Browser type', 'Usage analytics'] },
    { type: 'Professional Data', items: ['Resume/CV content', 'Job applications', 'Skills and endorsements', 'Work samples'] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
         <Navbar />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Privacy Policy
            </h1>
            <div className="flex items-center justify-center space-x-2 text-slate-600 mb-6">
              <Shield className="w-5 h-5" />
              <span className="text-lg font-medium">HireHub Platform</span>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Your privacy is fundamental to us. This policy explains how we collect, 
              use, and protect your personal information with complete transparency.
            </p>
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <p className="text-sm text-indigo-800">
                <strong>Last Updated:</strong> January 15, 2025 | <strong>Effective Date:</strong> January 15, 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Privacy Commitment */}
        <div className="mb-12 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Our Privacy Commitment</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                HireHub is built on trust. We understand that your personal and professional 
                information is sensitive, and we're committed to protecting it with the highest 
                standards of security and privacy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-slate-700">Never sell your data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-slate-700">Transparent practices</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-slate-700">User control</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data We Collect Overview */}
        <div className="mb-12 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Types of Data We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataTypes.map((category, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center">
                  <Database className="w-4 h-4 mr-2 text-indigo-600" />
                  {category.type}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-slate-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Sections */}
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600">
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

        {/* Privacy Controls */}
        {/* <div className="mt-12 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl text-white p-6">
          <h2 className="text-2xl font-semibold mb-4">Manage Your Privacy</h2>
          <p className="text-indigo-100 mb-6 leading-relaxed">
            Take control of your privacy settings and data preferences. We provide you with 
            easy-to-use tools to manage how your information is used.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a 
              href="/settings/privacy"
              className="flex items-center p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-150"
            >
              <Settings className="w-5 h-5 mr-3" />
              <div>
                <div className="font-medium">Privacy Settings</div>
                <div className="text-sm text-indigo-200">Manage preferences</div>
              </div>
            </a>
            <a 
              href="/settings/data"
              className="flex items-center p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-150"
            >
              <Database className="w-5 h-5 mr-3" />
              <div>
                <div className="font-medium">Download Data</div>
                <div className="text-sm text-indigo-200">Export your information</div>
              </div>
            </a>
            <a 
              href="/settings/account"
              className="flex items-center p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-150"
            >
              <AlertTriangle className="w-5 h-5 mr-3" />
              <div>
                <div className="font-medium">Delete Account</div>
                <div className="text-sm text-indigo-200">Permanently remove data</div>
              </div>
            </a>
          </div>
        </div> */}

        {/* Contact Section */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Privacy Questions or Concerns?</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Our Data Protection Officer is here to help with any privacy-related questions 
            or concerns you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="abhaypandey01992@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-150"
            >
              <Shield className="w-4 h-4 mr-2" />
              Contact Privacy Team
            </a>
            <a 
              href="/privacy/report"
              className="inline-flex items-center px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors duration-150"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Privacy Issue
            </a>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            This Privacy Policy is compliant with GDPR, CCPA, and other applicable privacy laws. 
            For region-specific privacy rights, please contact our privacy team.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;