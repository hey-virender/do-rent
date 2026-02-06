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
import { Input } from "@/components/ui/input";
const Specs = ({ mode,onNext, onBack, isLast }: StepProps) => {
  const {draft,editDraft,setEditDraft,setDraft,errors,setErrors,clearErrors} = usePropertyDraftStore();  
  const validateAndProceed = () => {
    clearErrors();
    let parsed;
    if(mode === "create"){
       parsed = specsSchema.safeParse({
      halls: draft.specs?.halls,
      bedrooms: draft.specs?.bedrooms,
      bathrooms: draft.specs?.bathrooms,
      areaSqft: draft.specs?.areaSqft,
    });
    }else{
      parsed = specsSchema.safeParse({
        halls: editDraft.specs?.halls,
        bedrooms: editDraft.specs?.bedrooms,
        bathrooms: editDraft.specs?.bathrooms,
        areaSqft: editDraft.specs?.areaSqft,
      });
    }
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
  const clearData = () => {
    setDraft({specs:{
      halls: 0,
      bedrooms: 0,
      bathrooms: 0,
      areaSqft: 0,
    }});
  }
  return (
    <section>
      <FieldSet>
        <FieldGroup className="grid grid-cols-4">
          <Field className="w-fit">
            <FieldLabel htmlFor="hall">Number of Halls</FieldLabel>
            <Select value={mode === "create" ? draft?.specs?.halls?.toString() || "" : editDraft?.specs?.halls?.toString() || ""} onValueChange={(e)=> mode === "create" ? setDraft({specs:{...draft.specs, halls:Number(e)}}) : setEditDraft({specs:{...editDraft.specs, halls:Number(e)}})}>
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
          <Field className="w-fit">
            <FieldLabel htmlFor="bedrooms">Number of Bedrooms</FieldLabel>
            <Select value={mode === "create" ? draft?.specs?.bedrooms?.toString() || "" : editDraft?.specs?.bedrooms?.toString() || ""} onValueChange={(e)=> mode === "create" ? setDraft({specs:{...draft.specs, bedrooms:Number(e)}}) : setEditDraft({specs:{...editDraft.specs, bedrooms:Number(e)}})}>
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
          <Field className="w-fit">
            <FieldLabel htmlFor="bathrooms">Number of Bathrooms</FieldLabel>  
            <Select value={mode === "create" ? draft?.specs?.bathrooms?.toString() || "" : editDraft?.specs?.bathrooms?.toString() || ""} onValueChange={(e)=> mode === "create" ? setDraft({specs:{...draft.specs, bathrooms:Number(e)}}) : setEditDraft({specs:{...editDraft.specs, bathrooms:Number(e)}})}>
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
          <Field className="w-fit">
            <FieldLabel htmlFor="areaSqft">Area (in sqft)</FieldLabel>
            <Input
              id="areaSqft"
              type="number"
              value={mode === "create" ? draft.specs?.areaSqft || "" : editDraft.specs?.areaSqft || ""}
              onChange={(e) => mode === "create" ? setDraft({ specs: { ...draft.specs, areaSqft: Number(e.target.value) } }) : setEditDraft({ specs: { ...editDraft.specs, areaSqft: Number(e.target.value) } })}
            />
            {errors?.areaSqft ? (
              <p className="text-red-500">{errors.areaSqft}</p>
            ) : (
              <FieldDescription>Enter the area of the property in sqft</FieldDescription>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="flex justify-start gap-2 mt-4">
        <Button className="bg-accent text-black px-7" onClick={onBack}>Back</Button>
      <Button className="px-7" onClick={validateAndProceed}>{isLast ? "Finish" : "Next"}</Button>
      {mode === "create" && (
        <Button className="px-7" onClick={clearData}>

        Clear
      </Button>
      )}
      </div>
    </section>
  );
};

export default Specs;
