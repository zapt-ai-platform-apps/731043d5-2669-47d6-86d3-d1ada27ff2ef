import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as Sentry from '@sentry/browser';

const RequirementsDoc = ({ 
  scenarioData, 
  equipmentData, 
  deploymentData, 
  onStartOver 
}) => {
  const [generating, setGenerating] = useState(false);
  const documentRef = React.useRef(null);

  // If any of the required data is missing, show appropriate error message
  if (!scenarioData) {
    return (
      <div className="container mx-auto max-w-4xl text-center py-12 animate-fade-in">
        <div className="card shadow-soft-lg border-red-100">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl text-red-600 mb-4">Missing Scenario Data</h2>
          <p className="mb-6 text-secondary-600">Please complete the scenario builder first to generate a requirements document.</p>
          <button 
            onClick={onStartOver} 
            className="btn btn-primary shadow-soft cursor-pointer"
          >
            Go Back to Start
          </button>
        </div>
      </div>
    );
  }

  if (!equipmentData) {
    return (
      <div className="container mx-auto max-w-4xl text-center py-12 animate-fade-in">
        <div className="card shadow-soft-lg border-red-100">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl text-red-600 mb-4">Missing Equipment Data</h2>
          <p className="mb-6 text-secondary-600">Please complete the equipment selection step first to continue.</p>
          <button 
            onClick={onStartOver} 
            className="btn btn-primary shadow-soft cursor-pointer"
          >
            Go Back to Start
          </button>
        </div>
      </div>
    );
  }

  if (!deploymentData) {
    return (
      <div className="container mx-auto max-w-4xl text-center py-12 animate-fade-in">
        <div className="card shadow-soft-lg border-red-100">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl text-red-600 mb-4">Missing Deployment Data</h2>
          <p className="mb-6 text-secondary-600">Please complete the deployment visualization step first to continue.</p>
          <button 
            onClick={onStartOver} 
            className="btn btn-primary shadow-soft cursor-pointer"
          >
            Go Back to Start
          </button>
        </div>
      </div>
    );
  }

  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  // Calculate the total cost of all selected equipment
  const calculateTotalCost = () => {
    return equipmentData.reduce((total, item) => {
      return total + (item.quantity * item.unitPrice);
    }, 0);
  };

  // Generate a PDF of the requirements document
  const handleDownloadPDF = async () => {
    if (!documentRef.current) return;
    
    setGenerating(true);
    
    try {
      const canvas = await html2canvas(documentRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      // Use a safe default name if projectName is missing
      const projectName = scenarioData.projectName || 'Deployment';
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save(`RFeye_Deployment_Plan_${projectName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      Sentry.captureException(error);
    } finally {
      setGenerating(false);
    }
  };

  // Safe accessor function to get data with fallbacks
  const getScenarioValue = (field, defaultValue = 'N/A') => {
    return scenarioData && scenarioData[field] 
      ? field.includes('Type') || field.includes('Objective') || field.includes('Size') 
        ? scenarioData[field].replace(/_/g, ' ')
        : scenarioData[field]
      : defaultValue;
  };

  return (
    <div className="container mx-auto max-w-4xl animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-primary-700 to-primary-800 inline-block">
          Deployment Requirements
        </h1>
        <p className="text-secondary-600 text-lg mt-3">
          Your complete RFeye deployment plan summary
        </p>
      </div>
      
      <div className="text-center mb-6">
        <button 
          onClick={handleDownloadPDF}
          disabled={generating}
          className="btn btn-primary btn-lg shadow-soft-lg cursor-pointer"
        >
          {generating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm4.75 6.75a.75.75 0 011.5 0v2.546l.943-1.048a.75.75 0 111.114 1.004l-2.25 2.5a.75.75 0 01-1.114 0l-2.25-2.5a.75.75 0 111.114-1.004l.943 1.048V8.75z" clipRule="evenodd" />
              </svg>
              Download PDF Document
            </>
          )}
        </button>
      </div>
      
      <div id="requirements-document" ref={documentRef} className="card shadow-soft-lg mb-8 p-8">
        <div className="text-center mb-8 pb-6 border-b border-gray-200">
          <div className="flex justify-center items-center mb-4">
            <img 
              src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=64&height=64" 
              alt="RFeye Logo" 
              className="h-16 w-16"
            />
          </div>
          <h1 className="text-3xl font-bold text-primary-800 mb-2">RFeye Deployment Plan</h1>
          <h2 className="text-xl text-secondary-700">{getScenarioValue('projectName', 'Unnamed Project')}</h2>
          <p className="text-secondary-500 mt-2">Generated on {formatDate()}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4 text-primary-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-primary-500">
              <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h16.5a.75.75 0 010 1.5H18v8.75A2.75 2.75 0 0115.25 15h-1.072l.798 3.06a.75.75 0 01-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 01-1.452-.38L5.823 15H4.75A2.75 2.75 0 012 12.25V3.5h-.25A.75.75 0 011 2.75zM7.373 15l-.391 1.5h6.037l-.392-1.5H7.373zm7.49-8.931a.75.75 0 01-.175 1.046 19.326 19.326 0 00-3.398 3.098.75.75 0 01-1.097.04L8.5 8.561l-1.22 1.22a.75.75 0 11-1.06-1.06l1.75-1.75a.75.75 0 011.06 0l1.59 1.59a20.75 20.75 0 003.107-3.137.75.75 0 011.046-.176z" clipRule="evenodd" />
            </svg>
            1. Deployment Scenario
          </h2>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2">
                  <span className="font-medium text-secondary-700 mr-2">Mission Type:</span>
                  <span className="text-secondary-900">{getScenarioValue('missionType')}</span>
                </p>
                <p className="mb-2">
                  <span className="font-medium text-secondary-700 mr-2">Environment:</span>
                  <span className="text-secondary-900">{getScenarioValue('environment')}</span>
                </p>
                <p className="mb-2">
                  <span className="font-medium text-secondary-700 mr-2">Coverage Objective:</span>
                  <span className="text-secondary-900">{getScenarioValue('coverageObjective')}</span>
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-medium text-secondary-700 mr-2">Area Size:</span>
                  <span className="text-secondary-900">{getScenarioValue('areaSize')}</span>
                </p>
                <p className="mb-2">
                  <span className="font-medium text-secondary-700 mr-2">Terrain Complexity:</span>
                  <span className="text-secondary-900 capitalize">{getScenarioValue('terrainComplexity')}</span>
                </p>
              </div>
            </div>
            {scenarioData.specialRequirements && (
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="font-medium text-secondary-700 mb-1">Special Requirements:</p>
                <p className="bg-gray-50 p-3 rounded-lg text-secondary-600 border border-gray-200">{scenarioData.specialRequirements}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4 text-primary-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-primary-500">
              <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z" clipRule="evenodd" />
            </svg>
            2. Equipment Configuration
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left border-b border-gray-200 text-secondary-700 font-semibold">Equipment</th>
                  <th className="p-3 text-center border-b border-gray-200 text-secondary-700 font-semibold">Quantity</th>
                  <th className="p-3 text-right border-b border-gray-200 text-secondary-700 font-semibold">Unit Price</th>
                  <th className="p-3 text-right border-b border-gray-200 text-secondary-700 font-semibold">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {equipmentData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-3 border-r border-gray-200">
                      <div className="font-semibold text-secondary-900">{item.name}</div>
                      <div className="text-sm text-secondary-600">{item.description}</div>
                    </td>
                    <td className="p-3 text-center border-r border-gray-200 text-secondary-800">{item.quantity}</td>
                    <td className="p-3 text-right border-r border-gray-200 text-secondary-800">${item.unitPrice.toLocaleString()}</td>
                    <td className="p-3 text-right text-secondary-800">${(item.quantity * item.unitPrice).toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="bg-primary-50">
                  <td colSpan="3" className="p-3 text-right font-bold border-r border-gray-200 text-secondary-900">Total Estimated Budget</td>
                  <td className="p-3 text-right font-bold text-primary-700">${calculateTotalCost().toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4 text-primary-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-primary-500">
              <path fillRule="evenodd" d="M8.157 2.175a1.5 1.5 0 00-1.147 0l-4.084 1.69A1.5 1.5 0 002 5.251v10.877a1.5 1.5 0 002.074 1.386l3.51-1.453 4.26 1.763a1.5 1.5 0 001.146 0l4.083-1.69A1.5 1.5 0 0018 14.748V3.873a1.5 1.5 0 00-2.073-1.386l-3.51 1.452-4.26-1.763zM7.58 5a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 017.58 5zm5.59 2.75a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5z" clipRule="evenodd" />
            </svg>
            3. Deployment Strategy
          </h2>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100">
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3 shadow-soft border border-gray-100">
                <div className="text-primary-600 mb-1 font-medium">Number of Sensors</div>
                <div className="text-2xl font-bold text-secondary-900">{deploymentData.sensorLocations.length}</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-soft border border-gray-100">
                <div className="text-primary-600 mb-1 font-medium">Coverage Radius</div>
                <div className="text-2xl font-bold text-secondary-900">{deploymentData.coverageRadius} <span className="text-base font-normal text-secondary-600">meters</span></div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-soft border border-gray-100">
                <div className="text-primary-600 mb-1 font-medium">Total Coverage Area</div>
                <div className="text-2xl font-bold text-secondary-900">{Math.round(deploymentData.sensorLocations.length * Math.PI * Math.pow(deploymentData.coverageRadius/1000, 2))} <span className="text-base font-normal text-secondary-600">km²</span></div>
              </div>
            </div>
            
            {deploymentData.deploymentNotes && (
              <div className="mt-4">
                <p className="font-medium text-secondary-700 mb-1">Deployment Notes:</p>
                <p className="bg-white p-3 rounded-lg text-secondary-600 border border-gray-200">{deploymentData.deploymentNotes}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4 text-primary-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-primary-500">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            4. Installation & Maintenance Considerations
          </h2>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-success-100 p-1 mr-3">
                  <svg className="h-4 w-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-secondary-700">Ensure unobstructed line of sight between sensors for optimal performance.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-success-100 p-1 mr-3">
                  <svg className="h-4 w-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-secondary-700">Regular maintenance should be scheduled every 6 months or after extreme weather events.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-success-100 p-1 mr-3">
                  <svg className="h-4 w-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-secondary-700">Coordinate with local authorities for necessary permits and access rights.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-success-100 p-1 mr-3">
                  <svg className="h-4 w-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-secondary-700">Consider additional weatherproofing measures for {getScenarioValue('environment')} environments.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-success-100 p-1 mr-3">
                  <svg className="h-4 w-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-secondary-700">Ensure stable power supply and network connectivity at each sensor location.</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4 text-primary-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-primary-500">
              <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
            </svg>
            5. Next Steps
          </h2>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100">
            <ol className="space-y-3">
              <li className="flex">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-700 font-bold mr-3 text-sm">1</span>
                <span className="text-secondary-700">Review and refine deployment plan with all stakeholders.</span>
              </li>
              <li className="flex">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-700 font-bold mr-3 text-sm">2</span>
                <span className="text-secondary-700">Conduct site surveys at proposed sensor locations.</span>
              </li>
              <li className="flex">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-700 font-bold mr-3 text-sm">3</span>
                <span className="text-secondary-700">Finalize equipment quantities and placement based on survey results.</span>
              </li>
              <li className="flex">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-700 font-bold mr-3 text-sm">4</span>
                <span className="text-secondary-700">Create detailed installation schedule and resource allocation.</span>
              </li>
              <li className="flex">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-700 font-bold mr-3 text-sm">5</span>
                <span className="text-secondary-700">Contact CRFS sales team for final quotation and deployment support.</span>
              </li>
            </ol>
          </div>
        </div>
        
        <div className="text-center text-secondary-500 text-sm mt-12 pt-6 border-t border-gray-200">
          <p>This document was generated by the RFeye Deployment Planner.</p>
          <p className="mt-1">For more information, please contact CRFS.</p>
        </div>
      </div>
      
      <div className="text-center mb-12">
        <button 
          onClick={onStartOver}
          className="btn btn-secondary group cursor-pointer shadow-soft"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
            <path fillRule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clipRule="evenodd" />
          </svg>
          Start a New Deployment Plan
        </button>
      </div>
    </div>
  );
};

export default RequirementsDoc;