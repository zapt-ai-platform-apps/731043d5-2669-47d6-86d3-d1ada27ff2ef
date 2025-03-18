import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as Sentry from '@sentry/browser';

// Fix for Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const DeploymentVisualizer = ({ scenarioData, equipmentData, onComplete }) => {
  const [mapCenter, setMapCenter] = useState([34.0522, -118.2437]); // Default Los Angeles
  const [sensorLocations, setSensorLocations] = useState([]);
  const [coverageRadius, setCoverageRadius] = useState(2000); // meters
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [deploymentNotes, setDeploymentNotes] = useState('');
  const mapRef = useRef(null);

  // Display error message if scenario data is missing
  if (!scenarioData) {
    return (
      <div className="container mx-auto max-w-4xl text-center py-12">
        <div className="card">
          <h2 className="text-xl text-red-600 mb-4">Missing Scenario Data</h2>
          <p className="mb-4">Please complete the scenario builder first to visualize your deployment.</p>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-primary cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // Set up some initial sensor placements based on scenario
    // This would ideally come from a more sophisticated algorithm
    const generateInitialPlacements = () => {
      console.log("Generating initial placements with scenario data:", scenarioData);
      
      // Safety check for equipment data
      if (!equipmentData) {
        console.log("Equipment data is missing");
        return [];
      }
      
      const numberOfSensors = equipmentData.reduce((total, item) => {
        // Only count the primary sensors, not accessories
        return item.id.startsWith('node-') ? total + item.quantity : total;
      }, 0);
      
      // Generate reasonable initial placements based on area size
      let radius;
      // Make sure scenarioData and areaSize exist before using them
      if (scenarioData && scenarioData.areaSize) {
        switch(scenarioData.areaSize) {
          case 'small': radius = 0.01; break;
          case 'medium': radius = 0.02; break;
          case 'large': radius = 0.04; break;
          case 'very_large': radius = 0.08; break;
          default: radius = 0.02;
        }
      } else {
        // Default value if areaSize is missing
        console.log("Area size not found, using default radius");
        radius = 0.02;
      }
      
      // Generate roughly circular pattern of sensors
      const initialLocations = [];
      for (let i = 0; i < numberOfSensors; i++) {
        const angle = (i * (2 * Math.PI / numberOfSensors));
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        
        initialLocations.push({
          id: `sensor-${i+1}`,
          position: [mapCenter[0] + offsetY, mapCenter[1] + offsetX],
          name: `RFeye Sensor ${i+1}`,
          notes: ''
        });
      }
      
      return initialLocations;
    };
    
    try {
      setSensorLocations(generateInitialPlacements());
    } catch (error) {
      console.error("Error generating sensor placements:", error);
      Sentry.captureException(error);
      // Set empty sensor locations as fallback
      setSensorLocations([]);
    }
  }, [equipmentData, mapCenter, scenarioData]); // Use scenarioData as a whole instead of just scenarioData.areaSize

  const handleMapClick = (e) => {
    if (isAddingMarker) {
      const newSensor = {
        id: `sensor-${sensorLocations.length + 1}`,
        position: [e.latlng.lat, e.latlng.lng],
        name: `RFeye Sensor ${sensorLocations.length + 1}`,
        notes: currentNote
      };
      
      setSensorLocations([...sensorLocations, newSensor]);
      setIsAddingMarker(false);
      setCurrentNote('');
    }
  };

  const handleMarkerDragEnd = (id, e) => {
    const { lat, lng } = e.target.getLatLng();
    setSensorLocations(sensorLocations.map(sensor => 
      sensor.id === id ? { ...sensor, position: [lat, lng] } : sensor
    ));
  };

  const handleRadiusChange = (e) => {
    setCoverageRadius(parseInt(e.target.value));
  };

  const handleNoteChange = (e) => {
    setCurrentNote(e.target.value);
  };

  const handleDeploymentNotesChange = (e) => {
    setDeploymentNotes(e.target.value);
  };

  const handleRemoveSensor = (id) => {
    setSensorLocations(sensorLocations.filter(sensor => sensor.id !== id));
  };

  const handleAddMarkerToggle = () => {
    setIsAddingMarker(!isAddingMarker);
  };

  const handleSubmit = () => {
    const deploymentData = {
      sensorLocations,
      coverageRadius,
      deploymentNotes
    };
    onComplete(deploymentData);
  };

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800">Deployment Visualization</h1>
        <p className="text-gray-600">
          Place and adjust your RFeye sensors on the map to optimize coverage
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card mb-6 relative" style={{ height: '500px' }}>
            <MapContainer 
              center={mapCenter} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              whenCreated={setMapRef}
              onClick={handleMapClick}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {sensorLocations.map(sensor => (
                <React.Fragment key={sensor.id}>
                  <Marker 
                    position={sensor.position}
                    draggable={true}
                    eventHandlers={{
                      dragend: (e) => handleMarkerDragEnd(sensor.id, e)
                    }}
                  >
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold">{sensor.name}</h3>
                        {sensor.notes && <p className="text-sm mt-1">{sensor.notes}</p>}
                        <button 
                          onClick={() => handleRemoveSensor(sensor.id)}
                          className="text-red-500 text-sm mt-2 cursor-pointer"
                        >
                          Remove Sensor
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                  <Circle 
                    center={sensor.position} 
                    radius={coverageRadius} 
                    pathOptions={{ fillColor: 'blue', fillOpacity: 0.1, color: 'blue' }}
                  />
                </React.Fragment>
              ))}
            </MapContainer>
          </div>
        </div>

        <div>
          <div className="card mb-6">
            <h2 className="text-xl font-bold mb-4">Deployment Controls</h2>
            
            <div className="form-group">
              <label className="form-label">Coverage Radius (m)</label>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={coverageRadius}
                onChange={handleRadiusChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>500m</span>
                <span>{coverageRadius}m</span>
                <span>5000m</span>
              </div>
            </div>
            
            <div className="form-group">
              <button
                onClick={handleAddMarkerToggle}
                className={`btn w-full cursor-pointer ${isAddingMarker ? 'bg-green-600 text-white' : 'btn-secondary'}`}
              >
                {isAddingMarker ? 'Click on Map to Place Sensor' : 'Add New Sensor'}
              </button>
            </div>
            
            {isAddingMarker && (
              <div className="form-group">
                <label className="form-label">New Sensor Note (Optional)</label>
                <input
                  type="text"
                  value={currentNote}
                  onChange={handleNoteChange}
                  placeholder="Enter notes for this sensor"
                  className="input-field box-border"
                />
              </div>
            )}
          </div>
          
          <div className="card mb-6">
            <h2 className="text-xl font-bold mb-4">Deployment Summary</h2>
            <p className="mb-2"><strong>Total Sensors:</strong> {sensorLocations.length}</p>
            <p className="mb-2">
              <strong>Coverage Area:</strong> {' '}
              {Math.round(sensorLocations.length * Math.PI * Math.pow(coverageRadius/1000, 2))} km²
            </p>
            <p className="mb-4">
              <strong>Deployment Type:</strong> {scenarioData.missionType?.replace('_', ' ') || 'N/A'}
            </p>
            
            <div className="form-group">
              <label className="form-label">Deployment Notes</label>
              <textarea
                value={deploymentNotes}
                onChange={handleDeploymentNotesChange}
                placeholder="Add any notes about this deployment plan..."
                className="input-field h-24 resize-none box-border"
              ></textarea>
            </div>
          </div>
          
          <button 
            onClick={handleSubmit}
            className="btn btn-primary w-full cursor-pointer"
          >
            Generate Deployment Requirements
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeploymentVisualizer;