"use client";
import { Label } from "@/components/ui/label";
import { StepProps } from "./step.type";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import { Textarea } from "@/components/ui/textarea";
import { availabilitySchema } from "@/validations/house.validation";
import { Switch } from "@/components/ui/switch";

const AvailabilityOwner = ({ mode,onNext, onBack, isLast }: StepProps) => {
  const today = new Date();
  const { draft,editDraft,setEditDraft, setDraft, errors, setErrors, clearErrors } =
    usePropertyDraftStore();
  const source = mode === "create" ? draft : editDraft;
  
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
     if(mode === "create"){
      setDraft({
        availability: {
          ...draft.availability,
          availableFrom: date.toISOString(),
        },
      });
     }
      else{
        setEditDraft({
          availability: {
            ...editDraft.availability,
            availableFrom: date.toISOString(),
          },
        });
      }
    }
  };

  const validateAndProceed =()=>{
    const parsed = availabilitySchema.safeParse({
      availableFrom: source.availability?.availableFrom,
      leaseTerms: source.availability?.leaseTerms,
      conditions: source.availability?.conditions,
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
  const handleStatusChange = (checked: boolean) => {
    console.log("Status changed to:", checked ? "active" : "inactive");
    setDraft({
      meta: {
        status: checked ? "active" : "inactive",
      }})
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if(mode === "create"){
      setDraft({
        availability: {
          ...draft.availability,
          [name]: value,
        },
      });
    }
    else{
      setEditDraft({
        availability: {
          ...editDraft.availability,
          [name]: value,
        },
      });
    }
  };


  const status = source?.meta?.status === "active";
  return (
    <section>
      <div className="flex gap-4">
        <Label>Status</Label>
        <Switch checked={status} onCheckedChange={handleStatusChange} className="border border-1 border-black "/>
      </div>
      <div>
        <Label>Availability</Label>
        <DatePicker date={ source?.availability?.availableFrom ? new Date(source.availability.availableFrom) : today} setDate={handleDateChange} />
        {errors.availableFrom && (<p className="text-red-600">{errors.availableFrom}</p>)}
      </div>
      <div>
        <Label>Lease terms</Label>
        <Textarea
          name="leaseTerms"
          value={source?.availability?.leaseTerms || ""}
          onChange={(e) => handleInputChange(e)}
          placeholder="e.g., 12 months, 6 months"
        />  
      {errors.leaseTerms && (<p className="text-red-600">{errors.leaseTerms}</p>)}
      </div>
      <div>
        <Label>Conditions</Label>
        <Textarea
          name="conditions"
          value={source?.availability?.conditions || ""}
          onChange={(e) => handleInputChange(e)}
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
