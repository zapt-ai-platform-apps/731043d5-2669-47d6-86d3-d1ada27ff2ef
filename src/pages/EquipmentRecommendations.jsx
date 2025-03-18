import React, { useState, useEffect } from 'react';
import EquipmentCard from '../components/EquipmentCard';
import * as Sentry from '@sentry/browser';

const EquipmentRecommendations = ({ scenarioData, onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [errors, setErrors] = useState(null);

  // Get equipment recommendations based on scenario data
  useEffect(() => {
    // Handle case where scenarioData is missing
    if (!scenarioData) {
      setErrors('Scenario data is missing. Please complete the scenario builder first.');
      setLoading(false);
      return;
    }

    // In a real app, this would be an API call
    setLoading(true);
    setTimeout(() => {
      try {
        const recommendedEquipment = getRecommendedEquipment(scenarioData);
        setRecommendations(recommendedEquipment);
        setLoading(false);
      } catch (error) {
        console.error('Error getting recommendations:', error);
        Sentry.captureException(error);
        setErrors('Failed to generate equipment recommendations');
        setLoading(false);
      }
    }, 1000);
  }, [scenarioData]);

  const getRecommendedEquipment = (scenario) => {
    // This is mock data - in a real app this would come from an API based on the scenario
    const missionType = scenario.missionType;
    const environment = scenario.environment;
    const areaSize = scenario.areaSize;
    
    // Primary sensor recommendation based on mission type and environment
    let primarySensor;
    
    if (missionType === 'spectrum_monitoring') {
      primarySensor = {
        id: 'node-100-8',
        name: 'RFeye Node 100-8',
        description: 'High-performance spectrum monitoring node with 8 MHz instantaneous bandwidth',
        image: 'PLACEHOLDER',
        imageAlt: 'RFeye Node 100-8 spectrum monitoring device',
        imageRequest: 'radio frequency monitoring device with antenna',
        specs: [
          'Frequency Range: 10 kHz - 8 GHz',
          'IBW: 8 MHz',
          'Sensitivity: -167 dBm/Hz',
          'Dynamic Range: > 90 dB'
        ],
        quantity: estimateQuantity(areaSize, environment, 'primary'),
        unitPrice: 12000
      };
    } else if (missionType === 'drone_detection') {
      primarySensor = {
        id: 'node-100-18',
        name: 'RFeye Node 100-18',
        description: 'Wide-band monitoring node optimized for drone detection and tracking',
        image: 'PLACEHOLDER',
        imageAlt: 'RFeye Node 100-18 drone detection device',
        imageRequest: 'drone detection radio frequency device',
        specs: [
          'Frequency Range: 10 kHz - 18 GHz',
          'IBW: 20 MHz',
          'Direction Finding: Yes',
          'Drone Classification: AI-powered'
        ],
        quantity: estimateQuantity(areaSize, environment, 'primary'),
        unitPrice: 18000
      };
    } else if (missionType === 'border_security' || missionType === 'infrastructure_protection') {
      primarySensor = {
        id: 'node-100-6-df',
        name: 'RFeye Node 100-6-DF',
        description: 'Direction-finding spectrum monitoring node for security applications',
        image: 'PLACEHOLDER',
        imageAlt: 'RFeye Node 100-6-DF security device',
        imageRequest: 'direction finding radio frequency monitoring device for security',
        specs: [
          'Frequency Range: 10 kHz - 6 GHz',
          'IBW: 10 MHz',
          'Direction Finding: Yes',
          'Geo-location: Multilateration capable'
        ],
        quantity: estimateQuantity(areaSize, environment, 'primary'),
        unitPrice: 15000
      };
    } else {
      primarySensor = {
        id: 'node-100-6',
        name: 'RFeye Node 100-6',
        description: 'General-purpose spectrum monitoring node',
        image: 'PLACEHOLDER',
        imageAlt: 'RFeye Node 100-6 general-purpose device',
        imageRequest: 'general purpose radio frequency monitoring device',
        specs: [
          'Frequency Range: 10 kHz - 6 GHz',
          'IBW: 5 MHz',
          'Sensitivity: -165 dBm/Hz',
          'Dynamic Range: > 85 dB'
        ],
        quantity: estimateQuantity(areaSize, environment, 'primary'),
        unitPrice: 10000
      };
    }
    
    // Add accessories based on environment
    const accessories = [];
    
    if (environment === 'rural' || environment === 'desert' || environment === 'mountain') {
      accessories.push({
        id: 'solar-kit',
        name: 'Solar Power Kit',
        description: 'Self-contained solar power solution for remote deployments',
        image: 'PLACEHOLDER',
        imageAlt: 'Solar power kit for RFeye Node',
        imageRequest: 'solar panel power kit for outdoor electronic equipment',
        specs: [
          '120W Solar Panel',
          '100Ah Battery',
          'Charge Controller',
          '3 Days Autonomy'
        ],
        quantity: primarySensor.quantity,
        unitPrice: 1200
      });
    }
    
    if (environment === 'urban' || environment === 'coastal') {
      accessories.push({
        id: 'wifi-backhaul',
        name: 'WiFi Backhaul Kit',
        description: 'Long-range WiFi connectivity for data backhaul',
        image: 'PLACEHOLDER',
        imageAlt: 'WiFi backhaul kit for RFeye Node',
        imageRequest: 'long range wifi antenna for data transmission',
        specs: [
          'Range: Up to 5km',
          'Bandwidth: 50 Mbps',
          'Encryption: WPA3',
          'PoE Powered'
        ],
        quantity: Math.ceil(primarySensor.quantity / 2),
        unitPrice: 800
      });
    }
    
    // Always include the stormcase for transportation and protection
    accessories.push({
      id: 'stormcase',
      name: 'RFeye Stormcase',
      description: 'Rugged transportation and deployment case for RFeye Nodes',
      image: 'PLACEHOLDER',
      imageAlt: 'RFeye Stormcase protective case',
      imageRequest: 'rugged protective case for electronic equipment',
      specs: [
        'IP67 Rated',
        'Drop Protection',
        'Integrated Connectors',
        'Quick Deployment'
      ],
      quantity: primarySensor.quantity,
      unitPrice: 1500
    });
    
    return [primarySensor, ...accessories];
  };

  const estimateQuantity = (areaSize, environment, type) => {
    // Basic estimation logic based on area size and environment
    let baseQuantity;
    
    if (areaSize === 'small') baseQuantity = 3;
    else if (areaSize === 'medium') baseQuantity = 5;
    else if (areaSize === 'large') baseQuantity = 8;
    else baseQuantity = 12;
    
    // Adjust based on environment
    let multiplier = 1.0;
    if (environment === 'urban') multiplier = 1.5; // Urban needs more sensors due to buildings
    else if (environment === 'mountain') multiplier = 1.3; // Mountains need more due to terrain
    
    return Math.max(1, Math.round(baseQuantity * multiplier));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setRecommendations(recommendations.map(item => 
      item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
    ));
  };

  const handleSelectEquipment = (id, selected) => {
    if (selected) {
      setSelectedEquipment([...selectedEquipment, id]);
    } else {
      setSelectedEquipment(selectedEquipment.filter(itemId => itemId !== id));
    }
  };

  const handleSubmit = () => {
    if (selectedEquipment.length === 0) {
      setErrors('Please select at least one piece of equipment');
      return;
    }
    
    const selectedItems = recommendations.filter(item => 
      selectedEquipment.includes(item.id)
    );
    
    onComplete(selectedItems);
  };

  const calculateTotalCost = () => {
    return recommendations
      .filter(item => selectedEquipment.includes(item.id))
      .reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl text-center py-12">
        <div className="card shadow-soft-lg animate-pulse-subtle">
          <div className="loading-indicator h-16 w-16"></div>
          <h2 className="text-xl mt-6 text-secondary-700">Analyzing your scenario and generating equipment recommendations...</h2>
          <p className="text-secondary-500 mt-2">This will just take a moment</p>
        </div>
      </div>
    );
  }

  // If scenarioData is missing, show an error message
  if (!scenarioData) {
    return (
      <div className="container mx-auto max-w-4xl text-center py-12 animate-fade-in">
        <div className="card shadow-soft-lg border-red-100">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl text-red-600 mb-4">Missing Scenario Data</h2>
          <p className="mb-6 text-secondary-600">Please complete the scenario builder first to get equipment recommendations.</p>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-primary shadow-soft cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-primary-700 to-primary-800 inline-block">
          Recommended Equipment
        </h1>
        <p className="text-secondary-600 text-lg mt-3">
          Based on your {scenarioData?.environment?.replace('_', ' ') || 'selected'} {scenarioData?.missionType?.replace('_', ' ') || 'mission'} scenario
        </p>
      </div>

      {errors && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 shadow-soft animate-fade-in">
          <div className="flex">
            <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errors}</span>
          </div>
        </div>
      )}

      <div className="grid gap-6 mb-8">
        {recommendations.map(equipment => (
          <EquipmentCard 
            key={equipment.id}
            equipment={equipment}
            selected={selectedEquipment.includes(equipment.id)}
            onSelect={(selected) => handleSelectEquipment(equipment.id, selected)}
            onQuantityChange={(newQuantity) => handleQuantityChange(equipment.id, newQuantity)}
          />
        ))}
      </div>

      <div className="card mb-8 shadow-soft-lg border border-gray-100">
        <h2 className="text-xl font-bold mb-5 text-secondary-900">Deployment Summary</h2>
        <div className="bg-gray-50 p-4 rounded-lg mb-5">
          <div className="flex justify-between mb-3">
            <span className="text-secondary-600">Total Selected Items:</span>
            <span className="font-medium text-secondary-800">{selectedEquipment.length} equipment types</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-secondary-600">Total Quantity:</span>
            <span className="font-medium text-secondary-800">
              {recommendations
                .filter(item => selectedEquipment.includes(item.id))
                .reduce((sum, item) => sum + item.quantity, 0)} units
            </span>
          </div>
          <div className="flex justify-between pt-3">
            <span className="font-semibold text-secondary-900">Estimated Total Cost:</span>
            <span className="font-bold text-primary-700">${calculateTotalCost().toLocaleString()}</span>
          </div>
        </div>
        <button 
          onClick={handleSubmit} 
          className="btn btn-primary w-full group cursor-pointer shadow-soft"
          disabled={selectedEquipment.length === 0}
        >
          <span>Continue to Deployment Visualization</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
               className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EquipmentRecommendations;