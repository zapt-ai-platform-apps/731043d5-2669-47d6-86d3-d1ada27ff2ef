import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const RequirementsDoc = ({ 
  scenarioData, 
  equipmentData, 
  deploymentData, 
  onStartOver 
}) => {
  const [generating, setGenerating] = useState(false);
  const documentRef = React.useRef(null);

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
      
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save(`RFeye_Deployment_Plan_${scenarioData.projectName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800">Deployment Requirements Document</h1>
        <p className="text-gray-600">Your complete RFeye deployment plan summary</p>
      </div>
      
      <div className="text-center mb-6">
        <button 
          onClick={handleDownloadPDF}
          disabled={generating}
          className="btn btn-primary px-6"
        >
          {generating ? 'Generating PDF...' : 'Download PDF Document'}
        </button>
      </div>
      
      <div id="requirements-document" ref={documentRef} className="card mb-8 p-8">
        <div className="text-center mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">RFeye Deployment Plan</h1>
          <h2 className="text-xl text-gray-600">{scenarioData.projectName}</h2>
          <p className="text-gray-500 mt-2">Generated on {formatDate()}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">1. Deployment Scenario</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Mission Type:</strong> {scenarioData.missionType.replace('_', ' ')}</p>
              <p><strong>Environment:</strong> {scenarioData.environment}</p>
              <p><strong>Coverage Objective:</strong> {scenarioData.coverageObjective.replace('_', ' ')}</p>
            </div>
            <div>
              <p><strong>Area Size:</strong> {scenarioData.areaSize.replace('_', ' ')}</p>
              <p><strong>Terrain Complexity:</strong> {scenarioData.terrainComplexity}</p>
            </div>
          </div>
          {scenarioData.specialRequirements && (
            <div className="mt-4">
              <p><strong>Special Requirements:</strong></p>
              <p className="bg-gray-50 p-2 rounded">{scenarioData.specialRequirements}</p>
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">2. Equipment Configuration</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border border-gray-300">Equipment</th>
                <th className="p-2 text-center border border-gray-300">Quantity</th>
                <th className="p-2 text-right border border-gray-300">Unit Price</th>
                <th className="p-2 text-right border border-gray-300">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {equipmentData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-2 border border-gray-300">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </td>
                  <td className="p-2 text-center border border-gray-300">{item.quantity}</td>
                  <td className="p-2 text-right border border-gray-300">${item.unitPrice.toLocaleString()}</td>
                  <td className="p-2 text-right border border-gray-300">${(item.quantity * item.unitPrice).toLocaleString()}</td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan="3" className="p-2 text-right font-bold border border-gray-300">Total Estimated Budget</td>
                <td className="p-2 text-right font-bold border border-gray-300">${calculateTotalCost().toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">3. Deployment Strategy</h2>
          <div className="mb-4">
            <p><strong>Number of Sensor Locations:</strong> {deploymentData.sensorLocations.length}</p>
            <p><strong>Estimated Coverage Radius per Sensor:</strong> {deploymentData.coverageRadius} meters</p>
            <p><strong>Estimated Total Coverage Area:</strong> {Math.round(deploymentData.sensorLocations.length * Math.PI * Math.pow(deploymentData.coverageRadius/1000, 2))} km²</p>
          </div>
          
          {deploymentData.deploymentNotes && (
            <div className="mt-4">
              <p><strong>Deployment Notes:</strong></p>
              <p className="bg-gray-50 p-2 rounded">{deploymentData.deploymentNotes}</p>
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">4. Installation & Maintenance Considerations</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Ensure unobstructed line of sight between sensors for optimal performance.</li>
            <li>Regular maintenance should be scheduled every 6 months or after extreme weather events.</li>
            <li>Coordinate with local authorities for necessary permits and access rights.</li>
            <li>Consider additional weatherproofing measures for {scenarioData.environment} environments.</li>
            <li>Ensure stable power supply and network connectivity at each sensor location.</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">5. Next Steps</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Review and refine deployment plan with all stakeholders.</li>
            <li>Conduct site surveys at proposed sensor locations.</li>
            <li>Finalize equipment quantities and placement based on survey results.</li>
            <li>Create detailed installation schedule and resource allocation.</li>
            <li>Contact CRFS sales team for final quotation and deployment support.</li>
          </ol>
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-12 pt-6 border-t border-gray-200">
          <p>This document was generated by the RFeye Deployment Planner.</p>
          <p>For more information, please contact CRFS.</p>
        </div>
      </div>
      
      <div className="text-center mb-12">
        <button 
          onClick={onStartOver}
          className="btn btn-secondary px-6"
        >
          Start a New Deployment Plan
        </button>
      </div>
    </div>
  );
};

export default RequirementsDoc;