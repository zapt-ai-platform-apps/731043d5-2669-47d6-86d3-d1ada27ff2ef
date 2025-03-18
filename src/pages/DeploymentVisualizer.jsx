import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet';
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

// Custom marker icons
const sensorIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to update map center when mapCenter state changes
function MapCenterUpdater({ center }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
}

const DeploymentVisualizer = ({ scenarioData, equipmentData, onComplete }) => {
  const [mapCenter, setMapCenter] = useState([34.0522, -118.2437]); // Default Los Angeles
  const [sensorLocations, setSensorLocations] = useState([]);
  const [coverageRadius, setCoverageRadius] = useState(2000); // meters
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [deploymentNotes, setDeploymentNotes] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  // Display error message if scenario data is missing
  if (!scenarioData) {
    return (
      <div className="container mx-auto max-w-4xl text-center py-12 animate-fade-in">
        <div className="card shadow-soft-lg border-red-100">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl text-red-600 mb-4">Missing Scenario Data</h2>
          <p className="mb-6 text-secondary-600">Please complete the scenario builder first to visualize your deployment.</p>
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
    <div className="container mx-auto max-w-5xl animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-primary-700 to-primary-800 inline-block">
          Deployment Visualization
        </h1>
        <p className="text-secondary-600 text-lg mt-3">
          Place and adjust your RFeye sensors on the map to optimize coverage
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card mb-6 relative shadow-soft-lg overflow-hidden" style={{ height: '500px' }}>
            <MapContainer 
              center={mapCenter} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              whenCreated={(map) => {
                mapRef.current = map;
                setMapLoaded(true);
              }}
              onClick={handleMapClick}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapCenterUpdater center={mapCenter} />
              
              {sensorLocations.map(sensor => (
                <React.Fragment key={sensor.id}>
                  <Marker 
                    position={sensor.position}
                    draggable={true}
                    icon={sensorIcon}
                    eventHandlers={{
                      dragend: (e) => handleMarkerDragEnd(sensor.id, e)
                    }}
                  >
                    <Popup>
                      <div className="text-center p-1">
                        <h3 className="font-bold text-secondary-900">{sensor.name}</h3>
                        {sensor.notes && <p className="text-sm mt-1 text-secondary-600">{sensor.notes}</p>}
                        <button 
                          onClick={() => handleRemoveSensor(sensor.id)}
                          className="mt-2 text-red-500 text-sm hover:text-red-700 transition-colors cursor-pointer flex items-center justify-center mx-auto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                          Remove Sensor
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                  <Circle 
                    center={sensor.position} 
                    radius={coverageRadius} 
                    pathOptions={{ 
                      fillColor: 'rgba(59, 130, 246, 0.4)', 
                      fillOpacity: 0.2, 
                      color: 'rgba(59, 130, 246, 0.8)',
                      weight: 1,
                    }}
                  />
                </React.Fragment>
              ))}
            </MapContainer>
            
            {/* Map overlay instructions when adding marker */}
            {isAddingMarker && (
              <div className="absolute top-4 left-0 right-0 mx-auto w-max bg-white bg-opacity-90 rounded-lg shadow-soft z-10 px-4 py-2 text-center animate-fade-in">
                <p className="text-primary-700 font-medium">Click on the map to place a new sensor</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="card mb-6 shadow-soft">
            <h2 className="text-xl font-bold mb-4 text-secondary-900">Deployment Controls</h2>
            
            <div className="form-group">
              <label className="form-label">Coverage Radius (m)</label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={coverageRadius}
                  onChange={handleRadiusChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-secondary-600 mt-2">
                  <span>500m</span>
                  <span className="font-medium text-primary-700">{coverageRadius}m</span>
                  <span>5000m</span>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <button
                onClick={handleAddMarkerToggle}
                className={`btn w-full cursor-pointer shadow-soft ${isAddingMarker ? 'bg-success-600 text-white hover:bg-success-700' : 'btn-secondary'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                  <path fillRule="evenodd" d="M10 1a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 1zM5.05 7.05a.75.75 0 011.06 0l3.95 3.95 3.95-3.95a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
                {isAddingMarker ? 'Placing New Sensor...' : 'Add New Sensor'}
              </button>
            </div>
            
            {isAddingMarker && (
              <div className="form-group animate-fade-in">
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
          
          <div className="card mb-6 shadow-soft">
            <h2 className="text-xl font-bold mb-4 text-secondary-900">Deployment Summary</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="mb-2 flex justify-between">
                <span className="text-secondary-600">Total Sensors:</span>
                <span className="font-medium text-secondary-900">{sensorLocations.length}</span>
              </p>
              <p className="mb-2 flex justify-between">
                <span className="text-secondary-600">Coverage Area:</span>
                <span className="font-medium text-secondary-900">
                  {Math.round(sensorLocations.length * Math.PI * Math.pow(coverageRadius/1000, 2))} km²
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-secondary-600">Deployment Type:</span>
                <span className="font-medium text-secondary-900">
                  {scenarioData.missionType?.replace('_', ' ') || 'N/A'}
                </span>
              </p>
            </div>
            
            <div className="form-group mb-0">
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
            className="btn btn-primary w-full shadow-soft-lg group cursor-pointer"
          >
            <span>Generate Deployment Requirements</span>
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

export default DeploymentVisualizer;