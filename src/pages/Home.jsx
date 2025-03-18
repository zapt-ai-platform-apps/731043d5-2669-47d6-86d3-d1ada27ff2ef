import React from 'react';

const Home = ({ onGetStarted }) => {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">RFeye Deployment Planner</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Plan and optimize your RF sensor deployments for various scenarios with our intuitive planning tool.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div className="card">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Plan Your RF Deployment</h2>
          <p className="mb-6">
            Whether you're setting up border security, infrastructure protection, or spectrum monitoring, 
            our tool helps you create the optimal deployment configuration for your needs.
          </p>
          <button 
            onClick={onGetStarted}
            className="btn btn-primary"
          >
            Get Started
          </button>
        </div>
        <div className="card bg-blue-50 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Key Features</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Scenario-specific deployment planning</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Equipment recommendations based on your needs</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Visual deployment mapping and optimization</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Requirement documentation generation</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card text-center">
          <div className="rounded-full bg-blue-100 h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Build Your Scenario</h3>
          <p className="text-gray-600">
            Define your mission type, environment, and coverage objectives to create a tailored deployment plan.
          </p>
        </div>
        <div className="card text-center">
          <div className="rounded-full bg-green-100 h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Get Equipment Recommendations</h3>
          <p className="text-gray-600">
            Receive AI-powered suggestions for the best RFeye Node models and configurations.
          </p>
        </div>
        <div className="card text-center">
          <div className="rounded-full bg-purple-100 h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Visualize Your Deployment</h3>
          <p className="text-gray-600">
            Map out your sensor locations and see estimated coverage to optimize positioning.
          </p>
        </div>
      </div>

      <div className="text-center mb-12">
        <button 
          onClick={onGetStarted}
          className="btn btn-primary text-lg px-8 py-3"
        >
          Start Planning Your Deployment
        </button>
      </div>
    </div>
  );
};

export default Home;