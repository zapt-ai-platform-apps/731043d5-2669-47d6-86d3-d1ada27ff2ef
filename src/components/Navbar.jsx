import React, { useState } from 'react';

const Navbar = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items with their states based on the current workflow
  const navItems = [
    { id: 'home', label: 'Home', isActive: currentPage === 'home' },
    { id: 'scenario', label: 'Scenario Builder', isActive: currentPage === 'scenario' },
    { id: 'equipment', label: 'Equipment Selection', isActive: currentPage === 'equipment' },
    { id: 'visualization', label: 'Deployment Visualization', isActive: currentPage === 'visualization' },
    { id: 'requirements', label: 'Requirements Doc', isActive: currentPage === 'requirements' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-primary-700 to-primary-800 text-white shadow-soft-lg">
      <div className="container mx-auto py-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 bg-white rounded-lg shadow-soft">
                <img 
                  src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=48&height=48" 
                  alt="RFeye Logo" 
                  className="w-8 h-8"
                />
              </div>
              <span className="text-xl font-bold font-display tracking-tight">RFeye Deployment Planner</span>
            </div>
            <button 
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="hidden md:flex md:space-x-1 mt-4 md:mt-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  item.isActive 
                    ? 'nav-active' 
                    : 'nav-inactive'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile menu - animation for show/hide */}
        <div 
          className={`md:hidden mt-3 space-y-1 transform transition-all duration-300 ease-in-out origin-top ${
            mobileMenuOpen 
              ? 'scale-y-100 opacity-100 max-h-96' 
              : 'scale-y-90 opacity-0 max-h-0 overflow-hidden'
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium w-full text-left transition-colors duration-200 ${
                item.isActive 
                  ? 'mobile-nav-active' 
                  : 'mobile-nav-inactive'
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