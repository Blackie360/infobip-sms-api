"use client"

import { useState } from 'react';
import StepNav from './StepNav';
import PlanSelection from './PlanSelection';
import PersonalInfo from './PersonalInfo';

const steps = [
  { id: 'step1', label: 'Your Info', number: 1 },
  { id: 'step2', label: 'Select Plan', number: 2 },
  { id: 'step3', label: 'Add-Ons', number: 3 },
  { id: 'step4', label: 'Summary', number: 4 },
];

const Sidebar: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('step1');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleStepChange = (stepId: string) => {
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
      <aside className="w-1/3 bg-blue-600 rounded-xl p-8 m-6">
        <StepNav steps={steps} activeStep={activeStep} onStepChange={handleStepChange} />
      </aside>

      <main className="w-2/3 bg-white rounded-xl p-8 m-6 shadow-md">
        {activeStep === 'step1' ? (
          <PersonalInfo onNextStep={handleNextStep} />
        ) : activeStep === 'step2' ? (
          <PlanSelection
            billingPeriod={billingPeriod}
            setBillingPeriod={setBillingPeriod}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            onNextStep={handleNextStep}
            onGoBack={handleGoBack}
          />
        ) : (
          <p>Other steps here...</p>
        )}
      </main>
    </div>
  );
};

export default Sidebar;