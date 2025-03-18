import React from 'react';

const Home = ({ onGetStarted }) => {
  return (
    <div className="container mx-auto max-w-6xl animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6 leading-tight">
          RFeye Deployment Planner
        </h1>
        <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
          Plan and optimize your RF sensor deployments with our intuitive planning tool designed for security professionals.
        </p>
        <button 
          onClick={onGetStarted}
          className="btn btn-primary btn-lg group cursor-pointer"
        >
          <span>Get Started</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
               className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Main Feature Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="card-interactive bg-gradient-to-br from-primary-50 to-white">
          <div className="rounded-full bg-primary-100 h-12 w-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-600">
              <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary-800 mb-3">
            Strategic RF Deployment
          </h2>
          <p className="text-secondary-600 mb-6">
            Whether you're setting up border security, infrastructure protection, or spectrum monitoring, 
            our tool helps you create the optimal deployment configuration for your specific needs.
          </p>
          <button 
            onClick={onGetStarted}
            className="btn btn-outline group cursor-pointer"
          >
            <span>Plan Your Deployment</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                 className="w-5 h-5 ml-1.5 transform group-hover:translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="card-interactive bg-gradient-to-br from-secondary-50 to-white">
          <div className="rounded-full bg-secondary-100 h-12 w-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-secondary-700">
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-3">
            Key Features
          </h2>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center rounded-full bg-success-100 p-1 mr-3">
                <svg className="h-4 w-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-secondary-700">Scenario-specific deployment planning with geospatial analysis</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center rounded-full bg-success-100 p-1 mr-3">
                <svg className="h-4 w-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-secondary-700">AI-powered equipment recommendations based on your needs</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center rounded-full bg-success-100 p-1 mr-3">
                <svg className="h-4 w-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-secondary-700">Interactive map-based deployment visualization</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center rounded-full bg-success-100 p-1 mr-3">
                <svg className="h-4 w-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-secondary-700">Professional requirement documentation & budget estimation</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Process Steps */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-interactive text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Build Your Scenario</h3>
            <p className="text-secondary-600">
              Define your mission type, environment, and coverage objectives to create a tailored deployment plan.
            </p>
          </div>
          
          <div className="card-interactive text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success-100 text-success-600 mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Equipment Recommendations</h3>
            <p className="text-secondary-600">
              Receive AI-powered suggestions for the best RFeye Node models and configurations.
            </p>
          </div>
          
          <div className="card-interactive text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-warning-100 text-warning-600 mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Visualize & Document</h3>
            <p className="text-secondary-600">
              Map out your sensor locations, see coverage estimates, and generate professional documentation.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-16">
        <div className="card bg-gradient-to-br from-primary-50 via-white to-secondary-50 border-0 shadow-soft-lg py-10 px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">Ready to optimize your RFeye deployment?</h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto mb-6">
            Our planning tool will guide you through every step of the process, from scenario definition to final documentation.
          </p>
          <button 
            onClick={onGetStarted}
            className="btn btn-primary btn-lg cursor-pointer shadow-soft group"
          >
            <span>Start Planning Your Deployment</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                 className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;