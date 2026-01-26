"use client";
import { Label } from "@/components/ui/label";
import { StepProps } from "./step.type";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import { Textarea } from "@/components/ui/textarea";
import { set } from "zod";
import { availabilitySchema } from "@/validations/house.validation";

const AvailabilityOwner = ({ onNext, onBack, isLast }: StepProps) => {
  const today = new Date();
  const { draft, setDraft, errors, setErrors, clearErrors } =
    usePropertyDraftStore();
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      if (date < today) {
        setErrors({
          ...errors,
          availability: "Available from date cannot be in the past.",
        });
        return;
      } else {
        clearErrors();
      }
      
      console.log("Selected available from date:", date);
      setDraft({
        availability: { ...draft.availability, availableFrom: date.toISOString().split("T")[0] },
      });
    }
  };

  const validateAndProceed =()=>{
    const parsed = availabilitySchema.safeParse({
      availableFrom: draft.availability?.availableFrom,
      leaseTerms: draft.availability?.leaseTerms,
      conditions: draft.availability?.conditions,
    });
    console.log("Validating availability", parsed);
    if(!parsed.success){
      const fieldErrors: Record<string,string> = {};
      parsed.error.issues.forEach((err)=>{
        const field = err.path[0];
        if(typeof field == 'string' || typeof field == 'number'){
          fieldErrors[field.toString()] = err.message;
        }
      })
      setErrors(fieldErrors);
      console.log("Validation errors:", fieldErrors);
      return;
    }
    clearErrors();
    onNext();

  }

  const clearData = () => {
    setDraft({availability:{
      availableFrom: "",  
      leaseTerms: "",
      conditions: "",
    }});
  }
  return (
    <section>
      <div>
        <Label>Availability</Label>
        <DatePicker date={ draft?.availability?.availableFrom ? new Date(draft.availability.availableFrom) : today} setDate={handleDateChange} />
        {errors.availableFrom && (<p className="text-red-600">{errors.availableFrom}</p>)}
      </div>
      <div>
        <Label>Lease terms</Label>
        <Textarea
          value={draft?.availability?.leaseTerms || ""}
          onChange={(e) =>
            setDraft({
              availability: {
                ...draft.availability,
                leaseTerms: e.target.value,
              },
            })
          }
          placeholder="e.g., 12 months, 6 months"
        />
      {errors.leaseTerms && (<p className="text-red-600">{errors.leaseTerms}</p>)}
      </div>
      <div>
        <Label>Conditions</Label>
        <Textarea
          value={draft?.availability?.conditions || ""}
          onChange={(e) =>
            setDraft({
              availability: {
                ...draft.availability,
                conditions: e.target.value,
              },
            })
          }
          placeholder="Mention any specific conditions here"
        />
      {errors.conditions && (<p className="text-red-600">{errors.conditions}</p>)}
      </div>
      <Button onClick={onBack}>Back</Button>
      <Button onClick={validateAndProceed}>{isLast ? "Finish" : "Next"}</Button>
      <Button variant="outline" onClick={clearData}>Clear</Button>
    </section>
  );
};

export default AvailabilityOwner;
