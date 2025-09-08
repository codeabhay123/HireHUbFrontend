import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
    { icon: Instagram, href: "https://instagram.com" },
  ];

  return (
    <footer className="bg-blue-50 text-black mt-20 border-t border-blue-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-sans">JobPortal</h2>
          <p className="text-sm leading-relaxed font-sans">
            Connecting talented professionals with top companies across India. Find your dream job today!
          </p>
          <div className="flex items-center gap-4 mt-4">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg transition-all duration-200"
                  aria-label="social media link"
                >
                  <Icon className="w-5 h-5 text-black hover:text-blue-600" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-sans">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link>
            </li>
            <li>
              <Link to="/browse" className="hover:text-blue-600 transition-colors">Categories</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Company / Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-sans">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">Careers</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">Blog</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-sans">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Lucknow , India</li>
            <li>📞 +91 9645726890</li>
            <li>✉️ abhaypandey01992@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-200 py-6 text-center text-sm font-sans text-black">
        &copy; {currentYear} HireHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
