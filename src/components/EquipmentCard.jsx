import React from 'react';

const EquipmentCard = ({ equipment, selected, onSelect, onQuantityChange }) => {
  const handleCheckboxChange = (e) => {
    onSelect(e.target.checked);
  };

  const handleQuantityChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue > 0) {
      onQuantityChange(newValue);
    }
  };

  return (
    <div className={`card border-2 transition-all ${selected ? 'border-blue-500' : 'border-gray-200'}`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/4">
          <img
            src={equipment.image}
            alt={equipment.imageAlt}
            data-image-request={equipment.imageRequest}
            className="w-full h-40 object-cover rounded-md bg-gray-100"
          />
        </div>
        <div className="md:w-3/4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-blue-700">{equipment.name}</h3>
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`select-${equipment.id}`}
                checked={selected}
                onChange={handleCheckboxChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
              />
              <label htmlFor={`select-${equipment.id}`} className="ml-2 text-sm text-gray-600">
                Select
              </label>
            </div>
          </div>
          
          <p className="text-gray-600 mb-3">{equipment.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Specifications</h4>
              <ul className="text-sm space-y-1">
                {equipment.specs.map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-1">•</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-semibold text-sm text-gray-700">Unit Price</h4>
                <span className="font-semibold">${equipment.unitPrice.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <label htmlFor={`quantity-${equipment.id}`} className="font-semibold text-sm text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  id={`quantity-${equipment.id}`}
                  min="1"
                  value={equipment.quantity}
                  onChange={handleQuantityChange}
                  className="input-field w-20 text-center box-border"
                />
              </div>
              
              <div className="flex justify-between mt-2">
                <span className="font-semibold text-sm text-gray-700">Subtotal:</span>
                <span className="font-semibold">${(equipment.quantity * equipment.unitPrice).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;