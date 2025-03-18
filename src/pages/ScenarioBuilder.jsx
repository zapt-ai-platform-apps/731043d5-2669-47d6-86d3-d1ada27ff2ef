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

  const missionTypes = [
    { value: 'border_security', label: 'Border Security' },
    { value: 'infrastructure_protection', label: 'Infrastructure Protection' },
    { value: 'spectrum_monitoring', label: 'Spectrum Monitoring' },
    { value: 'drone_detection', label: 'Drone Detection' },
    { value: 'signal_intelligence', label: 'Signal Intelligence' }
  ];

  const environments = [
    { value: 'urban', label: 'Urban' },
    { value: 'rural', label: 'Rural' },
    { value: 'coastal', label: 'Coastal' },
    { value: 'desert', label: 'Desert' },
    { value: 'forest', label: 'Forest' },
    { value: 'mountain', label: 'Mountainous' }
  ];

  const coverageObjectives = [
    { value: 'area_coverage', label: 'General Area Coverage' },
    { value: 'perimeter_protection', label: 'Perimeter Protection' },
    { value: 'site_protection', label: 'Specific Site Protection' },
    { value: 'traffic_monitoring', label: 'Traffic Monitoring' }
  ];

  const areaSizes = [
    { value: 'small', label: 'Small (< 5 km²)' },
    { value: 'medium', label: 'Medium (5-50 km²)' },
    { value: 'large', label: 'Large (50-200 km²)' },
    { value: 'very_large', label: 'Very Large (> 200 km²)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
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
    
    if (validateForm()) {
      onComplete(formData);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800">Deployment Scenario Builder</h1>
        <p className="text-gray-600">Define your deployment scenario to get customized recommendations</p>
      </div>

      <form onSubmit={handleSubmit} className="card">
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
          {errors.projectName && <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="missionType" className="form-label">Mission Type</label>
          <select
            id="missionType"
            name="missionType"
            value={formData.missionType}
            onChange={handleInputChange}
            className="select-field"
          >
            <option value="">Select Mission Type</option>
            {missionTypes.map(mission => (
              <option key={mission.value} value={mission.value}>
                {mission.label}
              </option>
            ))}
          </select>
          {errors.missionType && <p className="text-red-500 text-sm mt-1">{errors.missionType}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="environment" className="form-label">Environment</label>
          <select
            id="environment"
            name="environment"
            value={formData.environment}
            onChange={handleInputChange}
            className="select-field"
          >
            <option value="">Select Environment</option>
            {environments.map(env => (
              <option key={env.value} value={env.value}>
                {env.label}
              </option>
            ))}
          </select>
          {errors.environment && <p className="text-red-500 text-sm mt-1">{errors.environment}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="coverageObjective" className="form-label">Coverage Objective</label>
          <select
            id="coverageObjective"
            name="coverageObjective"
            value={formData.coverageObjective}
            onChange={handleInputChange}
            className="select-field"
          >
            <option value="">Select Coverage Objective</option>
            {coverageObjectives.map(objective => (
              <option key={objective.value} value={objective.value}>
                {objective.label}
              </option>
            ))}
          </select>
          {errors.coverageObjective && <p className="text-red-500 text-sm mt-1">{errors.coverageObjective}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="areaSize" className="form-label">Area Size</label>
          <select
            id="areaSize"
            name="areaSize"
            value={formData.areaSize}
            onChange={handleInputChange}
            className="select-field"
          >
            <option value="">Select Area Size</option>
            {areaSizes.map(size => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
          {errors.areaSize && <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="terrainComplexity" className="form-label">Terrain Complexity</label>
          <div className="flex items-center space-x-2">
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
            <span className="text-sm font-medium w-20">
              {formData.terrainComplexity === 'low' ? 'Low' : 
               formData.terrainComplexity === 'medium' ? 'Medium' : 'High'}
            </span>
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

        <div className="mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Continue to Equipment Selection
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScenarioBuilder;