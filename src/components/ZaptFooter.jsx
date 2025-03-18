import React from 'react';

const ZaptFooter = () => {
  return (
    <footer className="bg-gray-100 py-4 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          Made on ZAPT
        </a>
        <p className="text-gray-500 text-sm mt-1">
          &copy; {new Date().getFullYear()} RFeye Deployment Planner
        </p>
      </div>
    </footer>
  );
};

export default ZaptFooter;