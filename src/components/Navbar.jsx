import React from 'react';

const Navbar = ({ currentPage, onNavigate }) => {
  // Navigation items with their states based on the current workflow
  const navItems = [
    { id: 'home', label: 'Home', isActive: currentPage === 'home' },
    { id: 'scenario', label: 'Scenario Builder', isActive: currentPage === 'scenario' },
    { id: 'equipment', label: 'Equipment Selection', isActive: currentPage === 'equipment' },
    { id: 'visualization', label: 'Deployment Visualization', isActive: currentPage === 'visualization' },
    { id: 'requirements', label: 'Requirements Doc', isActive: currentPage === 'requirements' }
  ];

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=48&height=48" 
                alt="RFeye Logo" 
                className="w-8 h-8 mr-2"
              />
              <span className="text-xl font-bold">RFeye Deployment Planner</span>
            </div>
            <button className="md:hidden text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <div className="hidden md:flex md:space-x-4 mt-4 md:mt-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  item.isActive 
                    ? 'bg-blue-900 text-white' 
                    : 'text-gray-200 hover:bg-blue-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile menu - show/hide based on menu state */}
        <div className="md:hidden mt-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`block px-3 py-2 rounded-md text-sm font-medium w-full text-left ${
                item.isActive 
                  ? 'bg-blue-900 text-white' 
                  : 'text-gray-200 hover:bg-blue-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;