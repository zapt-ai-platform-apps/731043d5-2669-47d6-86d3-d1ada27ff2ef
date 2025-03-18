import React, { useState } from 'react';

const ScenarioBuilder = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    missionType: '',
    environment: '',
    coverageObjective: '',
    areaSize: '',
    terrainComplexity: 'medium',
    specialRequirements: '',
    projectName: ''
  });

  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const missionTypes = [
    { value: 'border_security', label: 'Border Security', icon: '🛡️' },
    { value: 'infrastructure_protection', label: 'Infrastructure Protection', icon: '🏢' },
    { value: 'spectrum_monitoring', label: 'Spectrum Monitoring', icon: '📡' },
    { value: 'drone_detection', label: 'Drone Detection', icon: '🚁' },
    { value: 'signal_intelligence', label: 'Signal Intelligence', icon: '📶' }
  ];

  const environments = [
    { value: 'urban', label: 'Urban', icon: '🏙️' },
    { value: 'rural', label: 'Rural', icon: '🏞️' },
    { value: 'coastal', label: 'Coastal', icon: '🌊' },
    { value: 'desert', label: 'Desert', icon: '🏜️' },
    { value: 'forest', label: 'Forest', icon: '🌲' },
    { value: 'mountain', label: 'Mountainous', icon: '⛰️' }
  ];

  const coverageObjectives = [
    { value: 'area_coverage', label: 'General Area Coverage', icon: '📍' },
    { value: 'perimeter_protection', label: 'Perimeter Protection', icon: '⭕' },
    { value: 'site_protection', label: 'Specific Site Protection', icon: '🏢' },
    { value: 'traffic_monitoring', label: 'Traffic Monitoring', icon: '🚗' }
  ];

  const areaSizes = [
    { value: 'small', label: 'Small (< 5 km²)', icon: 'S' },
    { value: 'medium', label: 'Medium (5-50 km²)', icon: 'M' },
    { value: 'large', label: 'Large (50-200 km²)', icon: 'L' },
    { value: 'very_large', label: 'Very Large (> 200 km²)', icon: 'XL' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Mark form as touched
    if (!formTouched) {
      setFormTouched(true);
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.projectName) {
      newErrors.projectName = 'Project name is required';
    }
    
    if (!formData.missionType) {
      newErrors.missionType = 'Please select a mission type';
    }
    
    if (!formData.environment) {
      newErrors.environment = 'Please select an environment';
    }
    
    if (!formData.coverageObjective) {
      newErrors.coverageObjective = 'Please select a coverage objective';
    }
    
    if (!formData.areaSize) {
      newErrors.areaSize = 'Please select an area size';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (validateForm()) {
      setIsSubmitting(true);
      onComplete(formData);
    }
  };

  const getComplexityLabel = (complexity) => {
    // Ensure we always display the correct label
    switch(complexity) {
      case 'low': return 'Low';
      case 'medium': return 'Medium';
      case 'high': return 'High';
      default: return 'Medium';
    }
  };

  const getComplexityColor = (complexity) => {
    switch(complexity) {
      case 'low': return 'text-success-600';
      case 'medium': return 'text-warning-600';
      case 'high': return 'text-red-600';
      default: return 'text-warning-600';
    }
  };

  return (
    <div className="container mx-auto max-w-3xl animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-primary-700 to-primary-800 inline-block px-3 py-1 rounded">
          Deployment Scenario Builder
        </h1>
        <p className="text-secondary-600 text-lg mt-3">
          Define your deployment scenario to get customized recommendations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card shadow-soft-lg">
        <div className="form-group">
          <label htmlFor="projectName" className="form-label">Project Name</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            placeholder="Enter a name for your deployment project"
            className="input-field"
          />
          {errors.projectName && <p className="text-red-500 text-sm mt-1.5">{errors.projectName}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Mission Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {missionTypes.map(mission => (
              <div 
                key={mission.value}
                className={`
                  rounded-lg border p-3 cursor-pointer transition-all
                  ${formData.missionType === mission.value 
                    ? 'bg-primary-50 border-primary-300 shadow-soft' 
                    : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'}
                `}
                onClick={() => handleInputChange({target: {name: 'missionType', value: mission.value}})}
              >
                <div className="flex items-center">
                  <div className="mr-3 text-xl">{mission.icon}</div>
                  <span className="text-secondary-700 font-medium">{mission.label}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.missionType && <p className="text-red-500 text-sm mt-1.5">{errors.missionType}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Environment</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {environments.map(env => (
              <div 
                key={env.value}
                className={`
                  rounded-lg border p-3 cursor-pointer transition-all
                  ${formData.environment === env.value 
                    ? 'bg-primary-50 border-primary-300 shadow-soft' 
                    : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'}
                `}
                onClick={() => handleInputChange({target: {name: 'environment', value: env.value}})}
              >
                <div className="flex items-center">
                  <div className="mr-3 text-xl">{env.icon}</div>
                  <span className="text-secondary-700 font-medium">{env.label}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.environment && <p className="text-red-500 text-sm mt-1.5">{errors.environment}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Coverage Objective</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coverageObjectives.map(objective => (
              <div 
                key={objective.value}
                className={`
                  rounded-lg border p-3 cursor-pointer transition-all
                  ${formData.coverageObjective === objective.value 
                    ? 'bg-primary-50 border-primary-300 shadow-soft' 
                    : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'}
                `}
                onClick={() => handleInputChange({target: {name: 'coverageObjective', value: objective.value}})}
              >
                <div className="flex items-center">
                  <div className="mr-3 text-xl">{objective.icon}</div>
                  <span className="text-secondary-700 font-medium">{objective.label}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.coverageObjective && <p className="text-red-500 text-sm mt-1.5">{errors.coverageObjective}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Area Size</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {areaSizes.map(size => (
              <div 
                key={size.value}
                className={`
                  rounded-lg border p-3 cursor-pointer transition-all
                  ${formData.areaSize === size.value 
                    ? 'bg-primary-50 border-primary-300 shadow-soft' 
                    : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'}
                `}
                onClick={() => handleInputChange({target: {name: 'areaSize', value: size.value}})}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-7 w-7 rounded-full bg-gray-100 text-secondary-700 font-bold mr-3">
                    {size.icon}
                  </div>
                  <span className="text-secondary-700 font-medium">{size.label}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.areaSize && <p className="text-red-500 text-sm mt-1.5">{errors.areaSize}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="terrainComplexity" className="form-label">Terrain Complexity</label>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-success-600 font-medium">Low</span>
              <span className={`font-medium ${getComplexityColor(formData.terrainComplexity)}`}>
                {getComplexityLabel(formData.terrainComplexity)}
              </span>
              <span className="text-red-600 font-medium">High</span>
            </div>
            <input
              type="range"
              id="terrainComplexity"
              name="terrainComplexity"
              min="1"
              max="5"
              value={formData.terrainComplexity === 'low' ? 1 : formData.terrainComplexity === 'medium' ? 3 : 5}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                let complexity;
                if (value <= 2) complexity = 'low';
                else if (value <= 4) complexity = 'medium';
                else complexity = 'high';
                
                handleInputChange({
                  target: {
                    name: 'terrainComplexity',
                    value: complexity
                  }
                });
              }}
              className="w-full"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="specialRequirements" className="form-label">Special Requirements (Optional)</label>
          <textarea
            id="specialRequirements"
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleInputChange}
            placeholder="Enter any special requirements or notes for your deployment"
            className="input-field h-24 resize-none"
          ></textarea>
        </div>

        <div className="mt-8">
          <button 
            type="submit" 
            className="btn btn-primary w-full group cursor-pointer shadow-soft"
            disabled={isSubmitting}
          >
            <span>Continue to Equipment Selection</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                 className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScenarioBuilder;