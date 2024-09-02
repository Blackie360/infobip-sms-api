import React from 'react';
import { Card, CardContent } from './ui/card';

interface Plan {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  icon: string;
}

interface PlanSelectionProps {
  billingPeriod: 'monthly' | 'yearly';
  setBillingPeriod: React.Dispatch<React.SetStateAction<'monthly' | 'yearly'>>;
  selectedPlan: string | null;
  setSelectedPlan: React.Dispatch<React.SetStateAction<string | null>>;
  onNextStep: () => void;
  onGoBack: () => void;
}

const plans: Plan[] = [
  { name: 'Arcade', priceMonthly: 9, priceYearly: 90, icon: '🕹️' },
  { name: 'Advanced', priceMonthly: 12, priceYearly: 120, icon: '🛠️' },
  { name: 'Pro', priceMonthly: 15, priceYearly: 150, icon: '🚀' },
];

const PlanSelection: React.FC<PlanSelectionProps> = ({
  billingPeriod,
  setBillingPeriod,
  selectedPlan,
  setSelectedPlan,
  onNextStep,
  onGoBack,
}) => (
  <>
    <h2 className="text-3xl font-bold text-blue-900 mb-4">Select Plan</h2>
    <div className="mb-6 flex items-center">
      <button
        onClick={() => setBillingPeriod('monthly')}
        className={`px-4 py-2 rounded-lg ${billingPeriod === 'monthly' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        Monthly
      </button>
      <button
        onClick={() => setBillingPeriod('yearly')}
        className={`px-4 py-2 rounded-lg ml-4 ${billingPeriod === 'yearly' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        Yearly
      </button>
    </div>
    <div className="flex space-x-4">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={`flex-1 p-4 ${selectedPlan === plan.name ? 'bg-blue-100' : 'bg-gray-100'} rounded-lg cursor-pointer`}
          onClick={() => setSelectedPlan(plan.name)}
        >
          <CardContent className="flex flex-col items-center text-center">
            <div className="text-4xl mb-2">{plan.icon}</div>
            <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
            <p className="text-xl font-semibold">
              ${billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceYearly}
              /{billingPeriod}
            </p>
          </CardContent>
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
        disabled={!selectedPlan}
      >
        Next Step
      </button>
    </div>
  </>
);

export default PlanSelection;
