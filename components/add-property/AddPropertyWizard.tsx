"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useState } from "react";
import { ADD_PROPERTY_STEPS } from "./steps/steps.config";
import { houseSchama } from "@/validations/house.validation";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import { createProperty, updateProperty } from "@/actions/property.actions";
import { toast } from "sonner";
import { HouseListing } from "@/types/house";
import { useRouter } from "next/navigation";
import { set } from "zod";
import { ConfirmDialog } from "../ConfirmDialog";
import { Button } from "../ui/button";
const AddPropertyWizard = ({ mode }: { mode: "create" | "edit" }) => {
  const router = useRouter();
  const {
    draft,
    editDraft,
    stepIndex,
    setStepIndex,
    nextStep,
    prevStep,
    resetEditDraft,
    resetDraft,
  } = usePropertyDraftStore();

  const step = ADD_PROPERTY_STEPS[stepIndex];
  const StepComponent = step.component;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === ADD_PROPERTY_STEPS.length - 1;

  const validateAndSubmit = async () => {
    const parsed =
      mode === "create"
        ? houseSchama.safeParse(draft)
        : houseSchama.partial().safeParse(editDraft);
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
      setStepIndex(0);
      router.push(`/dashboard`);
    }
  };

  const breadcrumbItems = ADD_PROPERTY_STEPS.map((s, index) => ({
    label: s.title,
    onClick: () => setStepIndex(index),
    isActive: index === stepIndex,
    index,
  }));

  const handleCancel = () => {
    resetDraft();
    resetEditDraft();
    setStepIndex(0);
    router.push("/dashboard");
  };

  const CancelDialog = () => {
    return (
      <ConfirmDialog
        title="Discard draft?"
        description="All unsaved changes will be lost. This action cannot be undone."
        confirmText="Discard"
        cancelText="Continue editing"
        className="bg-red-500 hover:bg-red-700 focus:ring-red-500"
        onConfirm={handleCancel}
        trigger={<Button className="bg-red-500 text-white">Cancel</Button>}
      />
    );
  };

  return (
    <div className="max-w-7xl p-6 h-full border-2 border-primary mx-auto space-y-2">
      <Breadcrumb className="pb-10">
        <BreadcrumbList>
          {breadcrumbItems.map((item) => (
            <>
              <BreadcrumbItem
                key={item.index}
                onClick={item.onClick}
                className={`cursor-pointer text-lg ${
                  item.index > stepIndex
                    ? "text-muted-foreground"
                    : item.isActive
                      ? "font-bold text-primary text-xl"
                      : "text-accent font-medium"
                }`}
              >
                {item.label}
              </BreadcrumbItem>
              {item.index < breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator />
              )}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <StepComponent
        mode={mode}
        onNext={() => {
          if (!isLastStep) {
            nextStep();
          } else {
            validateAndSubmit();
          }
        }}
        onBack={() => {
          prevStep();
        }}
        isLast={isLastStep}
        isFirst={isFirstStep}
      />
      <div className="flex justify-start gap-4">
        <CancelDialog />
      </div>
    </div>
  );
};

export default AddPropertyWizard;
