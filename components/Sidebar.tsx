"use client"
import { useState } from 'react';
import StepNav from './StepNav';
import PersonalInfo from './PersonalInfo';
import PlanSelection from './PlanSelection';
import AddOns from './AddOns';
import Summary from './Summary';

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
  const [selectedAddOns, setSelectedAddOns] = useState<{ name: string; prices: [number, number, number]; }[]>([]);

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId);
    if (stepId !== 'step2') setSelectedPlan(null); // Reset selected plan when navigating to a new step
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

  const handleConfirm = () => {
    // Logic to confirm the selections
    console.log('Confirmed:', {
      selectedPlan,
      billingPeriod,
      selectedAddOns,
    });
    // You can also redirect or perform other actions here
  };

  return (
    <div className="flex min-h-screen bg-light-blue" style={{
      backgroundImage: `url('/background.svg')`,
      backgroundRepeat: 'no-repeat',
      
      
    }}>
      <aside className="w-1/3 rounded-xl p-8 m-6">
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
        ) : activeStep === 'step3' ? (
          <AddOns
            selectedAddOns={selectedAddOns}
            setSelectedAddOns={setSelectedAddOns}
            onNextStep={handleNextStep}
            onGoBack={handleGoBack}
          />
        ) : (
          <Summary
            selectedPlan={selectedPlan as "Arcade" | "Advanced" | "Pro" | null}
            billingPeriod={billingPeriod}
            selectedAddOns={selectedAddOns}
            onGoBack={handleGoBack}
            onConfirm={handleConfirm}
            onEditPlan={() => setActiveStep('step2')}
            onEditAddOns={() => setActiveStep('step3')}
          />
        )}
      </main>
    </div>
  );
};

export default Sidebar;
