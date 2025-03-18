import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ScenarioBuilder from './pages/ScenarioBuilder';
import EquipmentRecommendations from './pages/EquipmentRecommendations';
import DeploymentVisualizer from './pages/DeploymentVisualizer';
import RequirementsDoc from './pages/RequirementsDoc';
import ZaptFooter from './components/ZaptFooter';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scenarioData, setScenarioData] = useState(null);
  const [equipmentData, setEquipmentData] = useState(null);
  const [deploymentData, setDeploymentData] = useState(null);

  // Function to set the current page and manage workflow
  const navigateTo = (page, skipValidation = false) => {
    // Add simple validation to prevent skipping steps
    if (!skipValidation) {
      if (page === 'equipment' && !scenarioData) {
        console.log("Cannot navigate to equipment selection without scenario data");
        return;
      }
      if (page === 'visualization' && (!scenarioData || !equipmentData)) {
        console.log("Cannot navigate to visualization without scenario and equipment data");
        return;
      }
      if (page === 'requirements' && (!scenarioData || !equipmentData || !deploymentData)) {
        console.log("Cannot navigate to requirements doc without complete data");
        return;
      }
    }
    
    // Use animation classes for page transitions
    document.querySelector('main').classList.add('opacity-0');
    setTimeout(() => {
      setCurrentPage(page);
      document.querySelector('main').classList.remove('opacity-0');
    }, 150);
  };

  // Function to handle scenario completion
  const handleScenarioComplete = (data) => {
    setScenarioData(data);
    // Use skipValidation flag to bypass the scenarioData check since we just set it
    navigateTo('equipment', true);
  };

  // Function to handle equipment selection completion
  const handleEquipmentComplete = (data) => {
    setEquipmentData(data);
    // Use skipValidation flag to bypass the equipment check since we just set it
    navigateTo('visualization', true);
  };

  // Function to handle visualization completion
  const handleVisualizationComplete = (data) => {
    setDeploymentData(data);
    // Use skipValidation flag to bypass the deployment check since we just set it
    navigateTo('requirements', true);
  };

  // Render the appropriate page based on current state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onGetStarted={() => navigateTo('scenario')} />;
      case 'scenario':
        return <ScenarioBuilder onComplete={handleScenarioComplete} />;
      case 'equipment':
        return <EquipmentRecommendations 
          scenarioData={scenarioData} 
          onComplete={handleEquipmentComplete} 
        />;
      case 'visualization':
        return <DeploymentVisualizer 
          scenarioData={scenarioData} 
          equipmentData={equipmentData} 
          onComplete={handleVisualizationComplete} 
        />;
      case 'requirements':
        return <RequirementsDoc 
          scenarioData={scenarioData} 
          equipmentData={equipmentData} 
          deploymentData={deploymentData} 
          onStartOver={() => {
            setScenarioData(null);
            setEquipmentData(null);
            setDeploymentData(null);
            navigateTo('home');
          }} 
        />;
      default:
        return <Home onGetStarted={() => navigateTo('scenario')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      <main className="flex-grow px-4 py-8 md:px-6 md:py-10 transition-opacity duration-150 ease-in-out">
        {renderPage()}
      </main>
      <ZaptFooter />
    </div>
  );
}