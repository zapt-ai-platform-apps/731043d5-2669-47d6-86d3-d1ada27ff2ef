import React, { useState, useEffect } from 'react';
import EquipmentCard from '../components/EquipmentCard';

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
        <div className="card">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <h2 className="text-xl mt-4">Analyzing your scenario and generating equipment recommendations...</h2>
        </div>
      </div>
    );
  }

  // If scenarioData is missing, show an error message
  if (!scenarioData) {
    return (
      <div className="container mx-auto max-w-4xl text-center py-12">
        <div className="card">
          <h2 className="text-xl text-red-600 mb-4">Missing Scenario Data</h2>
          <p className="mb-4">Please complete the scenario builder first to get equipment recommendations.</p>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800">Recommended Equipment</h1>
        <p className="text-gray-600">
          Based on your {scenarioData?.environment || 'selected'} {scenarioData?.missionType?.replace('_', ' ') || 'mission'} scenario
        </p>
      </div>

      {errors && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors}
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

      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Deployment Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Total Selected Items:</span>
          <span>{selectedEquipment.length} equipment types</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Estimated Total Cost:</span>
          <span className="font-semibold">${calculateTotalCost().toLocaleString()}</span>
        </div>
        <button 
          onClick={handleSubmit} 
          className="btn btn-primary w-full cursor-pointer"
          disabled={selectedEquipment.length === 0}
        >
          Continue to Deployment Visualization
        </button>
      </div>
    </div>
  );
};

export default EquipmentRecommendations;