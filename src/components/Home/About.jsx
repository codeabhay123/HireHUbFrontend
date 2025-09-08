import { Briefcase, Users, Search, FileText, Shield, Zap, CheckCircle, Globe } from 'lucide-react';
import Navbar from '../shared/Navbar';
import Footer from './Footer';

export default function AboutSection() {
  const features = [
    {
      icon: Users,
      title: 'Dual User Roles',
      description: 'Separate dashboards for Students seeking jobs and Recruiters posting opportunities.'
    },
    {
      icon: Search,
      title: 'Smart Job Search',
      description: 'Advanced filtering and search capabilities to find the perfect job matches.'
    },
    {
      icon: FileText,
      title: 'Application Tracking',
      description: 'Real-time application status updates and comprehensive tracking system.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'JWT authentication with role-based access control for data security.'
    }
  ];

  const techStack = [
    { name: 'React.js', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Express.js', category: 'API' }
  ];

  const keyPoints = [
    'Complete recruitment ecosystem for students and recruiters',
    'Real-time application status updates and notifications',
    'Secure file upload for resumes and company logos',
    'Responsive design that works on all devices',
    'RESTful API with comprehensive endpoint coverage',
    'Modern, intuitive user interface'
  ];

  return (

    <section className="bg-gradient-to-br from-white to-blue-50  px-16 sm:px-6 lg:px-8">
      <div className='py-0'>
        <Navbar/>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-2xl">
              <Briefcase className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About HireHub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A modern, full-stack recruitment platform built with the MERN stack, 
            connecting job seekers with employers through an intuitive and powerful interface.
          </p>
        </div>

        {/* Main Description */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            What is HireHub?
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            HireHub is a comprehensive web application that streamlines the entire job search and recruitment process. 
            Built as a Single-Page Application (SPA), it provides separate, tailored experiences for job seekers and recruiters, 
            making the hiring process more efficient and user-friendly.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            The platform handles everything from job posting and application submission to status tracking and candidate management, 
            all within a secure, responsive, and modern interface.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Key Features
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="w-7 h-7 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Globe className="w-6 h-6 text-green-600 mr-3" />
              Built With MERN Stack
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {techStack.map((tech, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900">{tech.name}</div>
                  <div className="text-sm text-gray-600">{tech.category}</div>
                </div>
              ))}
            </div>
            <p className="text-gray-600">
              Modern, scalable architecture ensuring fast performance and smooth user experience.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Zap className="w-6 h-6 text-yellow-500 mr-3" />
              What Makes It Special
            </h3>
            <div className="space-y-3">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r rounded-2xl p-10 text-black text-center">
          <h3 className="text-3xl font-bold mb-6">
            How HireHub Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl mb-4">👨‍🎓</div>
              <h4 className="text-xl font-semibold mb-2">For Students</h4>
              <p className="text-black-100">
                Create profile, upload resume, search jobs, and track applications in real-time.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🏢</div>
              <h4 className="text-xl font-semibold mb-2">For Recruiters</h4>
              <p className="text-black-100">
                Post jobs, manage company profile, review applications, and hire talent.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="text-xl font-semibold mb-2">Perfect Match</h4>
              <p className="text-black-100">
                Smart matching system connects the right candidates with the right opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
       <Footer />
    </section>
  );
}