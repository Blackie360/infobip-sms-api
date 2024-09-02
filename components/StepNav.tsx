import React from 'react';

interface Step {
  id: string;
  label: string;
  number: number;
}

interface StepNavProps {
  steps: Step[];
  activeStep: string;
  onStepChange: (stepId: string) => void;
}

const StepNav: React.FC<StepNavProps> = ({ steps, activeStep, onStepChange }) => (
  <nav>
    <ul className="space-y-8">
      {steps.map(({ id, label, number }) => (
        <li key={id} className="flex items-center space-x-4">
          <span
            onClick={() => onStepChange(id)}
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
);

export default StepNav;