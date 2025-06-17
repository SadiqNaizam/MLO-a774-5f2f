import React from 'react';

const Footer: React.FC = () => {
  console.log('Footer component loaded');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-8 text-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 mb-4">
          <a href="#terms" className="text-sm hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            Terms of Service
          </a>
          <a href="#privacy" className="text-sm hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            Privacy Policy
          </a>
          <a href="#copyright-info" className="text-sm hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            Copyright Information
          </a>
        </div>
        <p className="text-sm">
          &copy; {currentYear} Your Application Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;