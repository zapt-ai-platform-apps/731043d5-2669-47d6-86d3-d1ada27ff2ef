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
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Function to handle scenario completion
  const handleScenarioComplete = (data) => {
    setScenarioData(data);
    navigateTo('equipment');
  };

  // Function to handle equipment selection completion
  const handleEquipmentComplete = (data) => {
    setEquipmentData(data);
    navigateTo('visualization');
  };

  // Function to handle visualization completion
  const handleVisualizationComplete = (data) => {
    setDeploymentData(data);
    navigateTo('requirements');
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
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      <main className="flex-grow px-4 py-6 md:px-8">
        {renderPage()}
      </main>
      <ZaptFooter />
    </div>
  );
}