import React, { useState } from 'react';
import Popup from './Popup';

interface SummaryProps {
  selectedPlan: string | null;
  billingPeriod: 'monthly' | 'yearly';
  selectedAddOns: { name: string; price: number }[];
  onGoBack: () => void;
  onConfirm: () => void;
}

const planPrices = {
  Arcade: { priceMonthly: 9, priceYearly: 90 },
  Advanced: { priceMonthly: 12, priceYearly: 120 },
  Pro: { priceMonthly: 15, priceYearly: 150 },
};

const Summary: React.FC<SummaryProps> = ({ selectedPlan, billingPeriod, selectedAddOns, onGoBack, onConfirm }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleConfirm = () => {
    setShowPopup(true);
    onConfirm(); // Call the provided onConfirm function
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Calculate the total price
  const calculateTotalPrice = () => {
    if (!selectedPlan) return 0;

    const planPrice = billingPeriod === 'monthly'
      ? planPrices[selectedPlan].priceMonthly
      : planPrices[selectedPlan].priceYearly;

    const addOnTotal = selectedAddOns.reduce((total, addOn) => total + addOn.price, 0);

    return planPrice + addOnTotal;
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
          {selectedPlan} - ${billingPeriod === 'monthly' ? planPrices[selectedPlan || ''].priceMonthly : planPrices[selectedPlan || ''].priceYearly}/{billingPeriod}
        </p>
      </div>

      {/* Display selected add-ons */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Add-Ons</h3>
        {selectedAddOns.length > 0 ? (
          <ul className="list-disc list-inside">
            {selectedAddOns.map((addOn, index) => (
              <li key={index} className="text-lg">
                {addOn.name} - ${addOn.price}/mo
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg">No add-ons selected</p>
        )}
      </div>

      {/* Display total price */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Total Price</h3>
        <p className="text-lg font-bold">
          ${calculateTotalPrice()}/{billingPeriod}
        </p>
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
