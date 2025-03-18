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
    <div 
      className={`card group transition-all duration-300 ${
        selected ? 'equipment-card-selected' : 'equipment-card-unselected'
      }`}
    >
      <div className="flex flex-col md:flex-row gap-5">
        <div className="md:w-1/4">
          <div className="relative overflow-hidden rounded-lg bg-gray-50">
            <img
              src={equipment.image}
              alt={equipment.imageAlt}
              data-image-request={equipment.imageRequest}
              className="w-full h-48 md:h-full object-cover rounded-lg bg-gray-100 transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/20"></div>
          </div>
        </div>
        <div className="md:w-3/4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-primary-700">{equipment.name}</h3>
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`select-${equipment.id}`}
                checked={selected}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label htmlFor={`select-${equipment.id}`} className="ml-2 text-sm text-secondary-600 font-medium">
                {selected ? 'Selected' : 'Select'}
              </label>
            </div>
          </div>
          
          <p className="text-secondary-600 mb-4 text-sm md:text-base">{equipment.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-sm text-secondary-700 mb-2">Specifications</h4>
              <ul className="text-sm space-y-1.5">
                {equipment.specs.map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-500 mr-1.5">•</span>
                    <span className="text-secondary-600">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between mb-3">
                <h4 className="font-semibold text-sm text-secondary-700">Unit Price</h4>
                <span className="font-semibold text-secondary-900">${equipment.unitPrice.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <label htmlFor={`quantity-${equipment.id}`} className="font-semibold text-sm text-secondary-700">
                  Quantity:
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id={`quantity-${equipment.id}`}
                    min="1"
                    value={equipment.quantity}
                    onChange={handleQuantityChange}
                    className="input-field w-20 text-center box-border"
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-3">
                <span className="font-semibold text-sm text-secondary-700">Subtotal:</span>
                <span className="font-bold text-primary-600">${(equipment.quantity * equipment.unitPrice).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;