import React from 'react';
import { Card, CardContent } from './ui/card';

interface AddOnsProps {
  selectedAddOns: { name: string; prices: [number, number, number]; }[];
  setSelectedAddOns: React.Dispatch<React.SetStateAction<{ name: string; prices: [number, number, number]; }[]>>;
  onNextStep: () => void;
  onGoBack: () => void;
}

const addOns = [
  { name: 'Online Services', description: 'Access to multiplayer games', price: 1 },
  { name: 'Larger Storage', description: 'Additional 1TB of cloud storage', price: 2 },
  { name: 'Customizable Profile', description: 'Custom theme and avatar', price: 2 },
];

const AddOns: React.FC<AddOnsProps> = ({ selectedAddOns, setSelectedAddOns, onNextStep, onGoBack }) => {
  const handleSelectAddOn = (addOn: string) => {
    setSelectedAddOns(prev => {
      const updatedAddOns = prev.find(item => item.name === addOn)
        ? prev.filter(item => item.name !== addOn)
        : [...prev, { name: addOn, prices: addOns.find(item => item.name === addOn)?.price ? [addOns.find(item => item.name === addOn)?.price, 0, 0] : [0, 0, 0] }];
      console.log('Updated Add-Ons:', updatedAddOns); // Debugging
      return updatedAddOns;
    });
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-blue-900 mb-4">Pick Add-Ons</h2>
      <p className="text-gray-500 mb-8">Select any add-ons you would like to include with your plan.</p>
      <div className="flex flex-col space-y-4">
        {addOns.map(addOn => (
          <Card
            key={addOn.name}
            className={`p-4 flex items-center justify-between rounded-lg cursor-pointer ${selectedAddOns.find(item => item.name === addOn.name) ? 'bg-purple-100' : 'bg-gray-100'}`}
            onClick={() => handleSelectAddOn(addOn.name)}
          >
            <CardContent className="flex flex-col">
              <h3 className="text-lg font-bold mb-1">{addOn.name}</h3>
              <p className="text-gray-700">{addOn.description}</p>
            </CardContent>
            <div className="text-lg font-semibold">+${addOn.price}/mo</div>
          </Card>
        ))}
      </div>
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
    </>
  );
};

export default AddOns;
