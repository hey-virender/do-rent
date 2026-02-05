"use client";

import { useState } from "react";
import { ADD_PROPERTY_STEPS } from "./steps/steps.config";
import { houseSchama } from "@/validations/house.validation";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import { createProperty, updateProperty } from "@/actions/property.actions";
import { toast } from "sonner";
import { HouseListing } from "@/types/house";
import { useRouter } from "next/navigation";
const AddPropertyWizard = ({ mode }: { mode: "create" | "edit" }) => {
  const router = useRouter();
  const { draft, editDraft, resetEditDraft, resetDraft } =
    usePropertyDraftStore();
  const [stepIndex, setStepIndex] = useState(0);
  const step = ADD_PROPERTY_STEPS[stepIndex];
  const StepComponent = step.component;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === ADD_PROPERTY_STEPS.length - 1;


  const validateAndSubmit = async () => {
    console.log("Validating property data", mode === "create" ? draft : editDraft);
    const parsed = mode === "create" ? houseSchama.safeParse(draft) : houseSchama.partial().safeParse(editDraft);
    if (!parsed.success) {
      console.log("Validation errors:", parsed.error.flatten().fieldErrors);
      return;
    }
    // submit the property data
    let response;
    if (mode === "create") {
      response = await createProperty(draft as HouseListing);
    } else {
      response = await updateProperty(editDraft.id!, editDraft as HouseListing);
    }
    console.log("Property creation response:", response);
    if (response.success) {
      mode === "create" ? resetDraft() : resetEditDraft();
      setStepIndex(0);
      if (mode === "create") {
        toast.success("Property created successfully!");
      } else {
        toast.success("Property updated successfully!");
      }
      router.push(`/dashboard`);
    }
  };

  return (
    <div className="max-w-6xl p-6 h-full border-2 border-primary mx-auto space-y-6">
      <h2>{step.title}</h2>
      <StepComponent
        mode={mode}
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
          }else{
            router.push('/dashboard');
          }
        }}
        isLast={isLastStep}
        isFirst={isFirstStep}

      />
    </div>
  );
};

export default AddPropertyWizard;
