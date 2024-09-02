import React, { useState } from 'react';

interface AddOnsProps {
  selectedAddOns: string[];
  setSelectedAddOns: React.Dispatch<React.SetStateAction<string[]>>;
  onNextStep: () => void;
  onGoBack: () => void;
}

const AddOns: React.FC<AddOnsProps> = ({ selectedAddOns, setSelectedAddOns, onNextStep, onGoBack }) => {
  const [addOns, setAddOns] = useState([
    { name: 'Online Services', price: '+$1/mo' },
    { name: 'Larger Storage', price: '+$2/mo' },
    { name: 'Customizable Profile', price: '+$2/mo' }
  ]);

  const handleToggleAddOn = (addOn: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOn) ? prev.filter(item => item !== addOn) : [...prev, addOn]
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-900 mb-4">Pick Add-Ons</h2>
      <p className="text-gray-700 mb-6">
        Add-ons help enhance your experience with extra features.
      </p>
      {addOns.map((addOn) => (
        <div key={addOn.name} className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={selectedAddOns.includes(addOn.name)}
            onChange={() => handleToggleAddOn(addOn.name)}
            className="mr-2"
          />
          <label className="text-lg">
            {addOn.name} <span className="text-gray-500">{addOn.price}</span>
          </label>
        </div>
      ))}
      <div className="mt-6 flex space-x-4">
        <button
          type="button"
          className="bg-gray-500 text-white px-6 py-3 rounded-lg"
          onClick={onGoBack}
        >
          Go Back
        </button>
        <button
          type="button"
          className="bg-blue-900 text-white px-6 py-3 rounded-lg"
          onClick={onNextStep}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default AddOns;
