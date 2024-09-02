import React, { useState } from 'react';
import Popup from './Popup';

interface SummaryProps {
  selectedPlan: 'Arcade' | 'Advanced' | 'Pro' | null;
  billingPeriod: 'monthly' | 'yearly';
  selectedAddOns: { name: string; prices: [number, number, number] }[]; // Array of prices for each plan
  onGoBack: () => void;
  onConfirm: () => void;
  onEditPlan: () => void;
  onEditAddOns: () => void;
}

const planPrices: Record<'Arcade' | 'Advanced' | 'Pro', { priceMonthly: number; priceYearly: number }> = {
  Arcade: { priceMonthly: 9, priceYearly: 90 },
  Advanced: { priceMonthly: 12, priceYearly: 120 },
  Pro: { priceMonthly: 15, priceYearly: 150 },
};

const planIndex: Record<'Arcade' | 'Advanced' | 'Pro', number> = {
  Arcade: 0,
  Advanced: 1,
  Pro: 2,
};

const Summary: React.FC<SummaryProps> = ({
  selectedPlan,
  billingPeriod,
  selectedAddOns,
  onGoBack,
  onConfirm,
  onEditPlan,
  onEditAddOns,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleConfirm = () => {
    setShowPopup(true);
    onConfirm(); // Call the provided onConfirm function
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Calculate the price of the selected plan
  const planPrice = selectedPlan
    ? billingPeriod === 'monthly'
      ? planPrices[selectedPlan]?.priceMonthly ?? 0 // Fallback to 0 if undefined
      : planPrices[selectedPlan]?.priceYearly ?? 0 // Fallback to 0 if undefined
    : 0;

  // Function to format the price (ensure it gets a valid number)
  const formatPrice = (price: number): string => {
    return price.toFixed(2); // Format the price to two decimal places
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-md relative">
      <h2 className="text-3xl font-bold text-blue-900 mb-4">Finishing Up</h2>
      <p className="text-gray-500 mb-6">
        Double-check to ensure everything looks OK before confirming.
      </p>

      {/* Display selected plan */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Selected Plan</h3>
        <p className="text-lg">
          {selectedPlan} - ${formatPrice(planPrice)}/{billingPeriod}
        </p>
        <button
          type="button"
          className="text-blue-500 underline mt-2"
          onClick={onEditPlan}
        >
          Change Plan
        </button>
      </div>

      {/* Display selected add-ons */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Add-Ons</h3>
        {selectedAddOns.length > 0 ? (
          <ul className="list-disc list-inside">
            {selectedAddOns.map((addOn, index) => (
              <li key={index} className="text-lg">
                {addOn.name} - ${
                  selectedPlan && planIndex[selectedPlan] !== undefined 
                    ? formatPrice(addOn.prices[planIndex[selectedPlan]]) 
                    : '0.00'
                }/mo
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg">No add-ons selected</p>
        )}
        <button
          type="button"
          className="text-blue-500 underline mt-2"
          onClick={onEditAddOns}
        >
          Change Add-Ons
        </button>
      </div>

      <div className="flex space-x-4">
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
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>

      {showPopup && (
        <Popup
          message="Thank you for your purchase!"
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Summary;
