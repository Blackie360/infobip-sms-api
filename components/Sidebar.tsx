"use client"
import { useState } from 'react';
import { Card, CardContent } from './ui/card';

const steps = [
  { id: 'step1', label: 'Your Info', number: 1 },
  { id: 'step2', label: 'Select Plan', number: 2 },
  { id: 'step3', label: 'Add-Ons', number: 3 },
  { id: 'step4', label: 'Summary', number: 4 },
];

const plans = [
  { name: 'Arcade', priceMonthly: 9, priceYearly: 90, icon: '🕹️' },
  { name: 'Advanced', priceMonthly: 12, priceYearly: 120, icon: '🛠️' },
  { name: 'Pro', priceMonthly: 15, priceYearly: 150, icon: '🚀' },
];

const Sidebar = () => {
  const [activeStep, setActiveStep] = useState('step1');
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleStepChange = (stepId) => {
    setActiveStep(stepId);
    setSelectedPlan(null); // Reset selected plan when navigating to a new step
  };

  const handleNextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === activeStep);
    const nextStep = steps[currentIndex + 1];
    if (nextStep) setActiveStep(nextStep.id);
  };

  const handleGoBack = () => {
    const currentIndex = steps.findIndex(step => step.id === activeStep);
    const prevStep = steps[currentIndex - 1];
    if (prevStep) setActiveStep(prevStep.id);
  };

  return (
    <div className="flex min-h-screen bg-light-blue">
      {/* Sidebar */}
      <aside className="w-1/3 bg-blue-600 rounded-xl p-8 m-6">
        <div className="flex flex-col h-full justify-center">
          <nav>
            <ul className="space-y-8">
              {steps.map(({ id, label, number }) => (
                <li key={id} className="flex items-center space-x-4">
                  <span
                    onClick={() => handleStepChange(id)}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-bold cursor-pointer ${
                      activeStep === id
                        ? 'bg-blue-300 border-blue-300 text-blue-900'
                        : 'border-white text-white'
                    }`}
                  >
                    {number}
                  </span>
                  <div className="flex flex-col">
                    <span className={`text-white text-lg font-bold uppercase`}>
                      {label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Form Section */}
      <main className="w-2/3 bg-white rounded-xl p-8 m-6 shadow-md">
        {activeStep === 'step1' ? (
          <>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Personal info</h2>
            <p className="text-gray-500 mb-8">Please provide your name, email address, and phone number.</p>
            <form>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="name"
                  placeholder="e.g. Stephen King"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  id="email"
                  placeholder="e.g. stephenking@lorem.com"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="tel"
                  id="phone"
                  placeholder="e.g. +1 234 567 890"
                />
              </div>
              <button
                type="button"
                className="bg-blue-900 text-white px-6 py-3 rounded-lg"
                onClick={handleNextStep}
              >
                Next Step
              </button>
            </form>
          </>
        ) : activeStep === 'step2' ? (
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
                      /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg"
                onClick={handleGoBack}
              >
                Go Back
              </button>
              <button
                type="button"
                className="bg-blue-900 text-white px-6 py-3 rounded-lg"
                onClick={handleNextStep}
              >
                Next Step
              </button>
            </div>
          </>
        ) : (
          <p>Other steps here...</p>
        )}
      </main>
    </div>
  );
};

export default Sidebar;
