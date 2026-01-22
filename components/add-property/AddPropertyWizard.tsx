"use client";

import { useState } from "react";
import { ADD_PROPERTY_STEPS } from "./steps/steps.config";
const AddPropertyWizard = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const step = ADD_PROPERTY_STEPS[stepIndex];
  const StepComponent = step.component;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === ADD_PROPERTY_STEPS.length - 1;

  return (
    <div className="max-w-6xl p-6 h-full border-2 border-primary mx-auto space-y-6">
      <h2>{step.title}</h2>
      <StepComponent
        onNext={() => {
          if (!isLastStep) {
            setStepIndex((prev) => prev + 1);
          }
        }}
        onBack={() => {
          if (!isFirstStep) {
            setStepIndex((prev) => prev - 1);
          }
        }}
        isLast={isLastStep}
      />
    </div>
  );
};

export default AddPropertyWizard;
