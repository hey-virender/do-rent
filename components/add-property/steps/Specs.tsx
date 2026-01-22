"use client";
import { Button } from "@/components/ui/button";
import { StepProps } from "./step.type";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import { specsSchema } from "@/validations/house.validation";
import { log } from "console";
import { Input } from "@/components/ui/input";
const Specs = ({ onNext, onBack, isLast }: StepProps) => {
  const {draft,setDraft,errors,setErrors,clearErrors} = usePropertyDraftStore();  
  const validateAndProceed = () => {
    console.log("Validating specs", draft.specs);
    clearErrors();
    const parsed = specsSchema.safeParse({
      halls: draft.specs?.halls,
      bedrooms: draft.specs?.bedrooms,
      bathrooms: draft.specs?.bathrooms,
      areaSqft: draft.specs?.areaSqft,
    });
    if (!parsed.success) {
      const fieldError: Record<string,string> = {};
      parsed.error.issues.forEach((err)=>{
        const field = err.path[0];
        if(typeof field == 'string' || typeof field == 'number'){
          fieldError[field.toString()] = err.message;
        }
      })
      setErrors(fieldError);
      return;
    };
    clearErrors();
    console.log("Specs validated successfully");
    onNext();
  }
  return (
    <section>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="hall">Number of Halls</FieldLabel>
            <Select value={draft?.specs?.halls?.toString() || ""} onValueChange={(e)=>setDraft({specs:{...draft.specs, halls:Number(e)}})}>
              <SelectTrigger >
                <SelectValue id="hall" placeholder="Select halls" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <SelectItem className="bg-white" key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.halls? <p className="text-red-500">{errors.halls}</p> :
            <FieldDescription>Select the number of halls in the property</FieldDescription>}
          </Field>
          <Field>
            <FieldLabel htmlFor="bedrooms">Number of Bedrooms</FieldLabel>
            <Select value={draft?.specs?.bedrooms?.toString() || ""} onValueChange={(e)=>setDraft({specs:{...draft.specs, bedrooms:Number(e)}})}>
              <SelectTrigger>   
                <SelectValue id="bedrooms" placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <SelectItem className="bg-white" key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.bedrooms? <p className="text-red-500">{errors.bedrooms}</p> :
            <FieldDescription>Select the number of bedrooms in the property</FieldDescription>}
          </Field>
          <Field>
            <FieldLabel htmlFor="bathrooms">Number of Bathrooms</FieldLabel>  
            <Select value={draft?.specs?.bathrooms?.toString() || ""} onValueChange={(e)=>setDraft({specs:{...draft.specs, bathrooms:Number(e)}})}>
              <SelectTrigger>
                <SelectValue id="bathrooms" placeholder="Select bathrooms" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <SelectItem className="bg-white" key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.bathrooms? <p className="text-red-500">{errors.bathrooms}</p> :  
            <FieldDescription>Select the number of bathrooms in the property</FieldDescription>}
          </Field>
          <Field>
            <FieldLabel htmlFor="areaSqft">Area (in sqft)</FieldLabel>
            <Input
              id="areaSqft"
              type="number"
              value={draft.specs?.areaSqft || ""}
              onChange={(e) => setDraft({ specs: { ...draft.specs, areaSqft: Number(e.target.value) } })}
            />
            {errors?.areaSqft ? (
              <p className="text-red-500">{errors.areaSqft}</p>
            ) : (
              <FieldDescription>Enter the area of the property in sqft</FieldDescription>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button onClick={onBack}>Back</Button>
      <Button onClick={validateAndProceed}>{isLast ? "Finish" : "Next"}</Button>
    </section>
  );
};

export default Specs;
