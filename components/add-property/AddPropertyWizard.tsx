"use client";

import { useState } from "react";
import { ADD_PROPERTY_STEPS } from "./steps/steps.config";
import { houseSchama } from "@/validations/house.validation";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import { createProperty } from "@/actions/property.actions";
import { toast } from "sonner";
import { HouseListing } from "@/types/house";
import { useRouter } from "next/navigation";
const AddPropertyWizard = () => {
  const router = useRouter();
  const { draft, resetDraft } = usePropertyDraftStore();
  const [stepIndex, setStepIndex] = useState(0);
  const step = ADD_PROPERTY_STEPS[stepIndex];
  const StepComponent = step.component;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === ADD_PROPERTY_STEPS.length - 1;

  const validateAndSubmit = async () => {
    const parsed = houseSchama.safeParse(draft);
    if (!parsed.success) {
      console.log("Validation errors:", parsed.error.flatten().fieldErrors);
      return;
    }
    // submit the property data
    const response = await createProperty(draft as HouseListing);
    console.log("Property creation response:", response);
    if (response.success) {
      resetDraft();
      setStepIndex(0)
      toast.success("Property created successfully!");
      router.push(`/dashboard`);
    }
  };

  return (
    <div className="max-w-6xl p-6 h-full border-2 border-primary mx-auto space-y-6">
      <h2>{step.title}</h2>
      <StepComponent
        onNext={() => {
          if (!isLastStep) {
            setStepIndex((prev) => prev + 1);
          } else {
            validateAndSubmit();
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
