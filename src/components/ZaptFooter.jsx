import React from 'react';

const ZaptFooter = () => {
  return (
    <footer className="bg-white py-5 border-t border-gray-100 shadow-soft-sm -mb-px">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-3 md:mb-0">
          <a 
            href="https://www.zapt.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
              <path fillRule="evenodd" d="M5.25 9a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-12a.75.75 0 0 1-.75-.75V9Zm1.5.75v9h10.5v-9h-10.5Z" clipRule="evenodd" />
            </svg>
            <span>Made on ZAPT</span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-secondary-500 text-sm">
            &copy; {new Date().getFullYear()} RFeye Deployment Planner
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ZaptFooter;