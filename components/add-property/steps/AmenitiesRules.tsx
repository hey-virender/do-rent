"use client";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import { StepProps } from "./step.type";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { amenitiesList } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { amenitiesRulesSchema } from "@/validations/house.validation";

const rulesConfig = [
  {
    key: "minimumStayMonths" as const,
    label: "Minimum Stay (Months)",
    type: "number",
    description: "Minimum number of months for rental",
  },
  {
    key: "petsAllowed" as const,
    label: "Pets Allowed",
    type: "checkbox",
    description: "Are pets allowed in the property?",
  },
  {
    key: "smokingAllowed" as const,
    label: "Smoking Allowed",
    type: "checkbox",
    description: "Is smoking allowed in the property?",
  },
  {
    key: "partiesAllowed" as const,
    label: "Parties Allowed",
    type: "checkbox",
    description: "Are parties allowed in the property?",
  },
];

const AmenitiesRules = ({ mode, onNext, onBack, isLast }: StepProps) => {
  const { draft,editDraft,setEditDraft, setDraft, errors, setErrors, clearErrors } =
    usePropertyDraftStore();

  const handleAmenityChange = (amenity: string, isChecked: boolean) => {
    
    let updatedAmenities = mode === "create" ? draft.amenities || [] : editDraft.amenities || [];
    if (isChecked) {
      updatedAmenities = [...updatedAmenities, amenity];
    } else {
      updatedAmenities = updatedAmenities.filter((a) => a !== amenity);
    }
    if (mode === "create") {
      setDraft({ amenities: updatedAmenities });
    } else {
      setEditDraft({ amenities: updatedAmenities });
    }
  };

  const handleRuleChange = (key: string, value: boolean | number) => {
   
    if (mode === "create") {
      setDraft({
        rules: {
          ...draft.rules,
          [key]: value,
        },
      });
    } else {
      setEditDraft({
        rules: {
          ...editDraft.rules,
          [key]: value,
        },
      });
    }
  };
      

  const validateAndProceed = () => {
    const parsed = mode === "create" ? amenitiesRulesSchema.safeParse({
      amenities: draft.amenities,
      rules: draft.rules,
    }) : amenitiesRulesSchema.safeParse({
      amenities: editDraft.amenities,
      rules: editDraft.rules,
    });

    console.log("Validating amenities and rules", parsed);
   
    if(!parsed.success){
        const fieldErrors: Record<string, string> = {};
        parsed.error.issues.forEach((err) => {
          const field = err.path[0];
          if (typeof field === "string" || typeof field === "number") {
            fieldErrors[field.toString()] = err.message;
          }
        })
        setErrors(fieldErrors);
        
        return;
    }
    clearErrors();
    onNext();
  }
  const clearData = () => {
    setDraft({ amenities: [], rules: {
      minimumStayMonths: 0,
      petsAllowed: false,
      smokingAllowed: false,
      partiesAllowed: false,
    } });
  }

  return (
    <section className="">
      <FieldSet>
        <FieldGroup>
          <FieldLabel htmlFor="amenities">Amenities</FieldLabel>
          <FieldGroup>
            {amenitiesList.map((amenity) => (
              <Field
                key={amenity}
                className="w-20 grid grid-cols-3 items-center"
              >
                <Checkbox
                  className="col-span-1 h-4 w-4"
                  checked={mode === "create" ? draft?.amenities?.includes(amenity) : editDraft?.amenities?.includes(amenity)}
                  onCheckedChange={(checked) =>
                    handleAmenityChange(amenity, !!checked)
                  }
                />
                <FieldLabel className="col-span-2 block capitalize">
                  {amenity}
                </FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel htmlFor="rules">Rules</FieldLabel>
          <FieldGroup>
            {rulesConfig.map((rule) => (
              <Field key={rule.key}>
                {rule.type === "checkbox" ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={rule.key}
                      checked={mode === "create" ? (draft?.rules?.[rule.key] as boolean) || false : (editDraft?.rules?.[rule.key] as boolean) || false}
                      onCheckedChange={(checked) =>
                        handleRuleChange(rule.key, checked as boolean)
                      }
                    />
                    <FieldLabel htmlFor={rule.key} className="!mb-0">
                      {rule.label}
                    </FieldLabel>
                  </div>
                ) : (
                  <>
                    <FieldLabel htmlFor={rule.key}>{rule.label}</FieldLabel>
                    <Input
                      id={rule.key}
                      type={rule.type}
                      value={mode === "create" ? (draft?.rules?.[rule.key] as number) || 0 : (editDraft?.rules?.[rule.key] as number) || 0}
                      onChange={(e) =>
                        handleRuleChange(rule.key, Number(e.target.value))
                      }
                      min={0}
                    />
                  </>
                )}
                {errors?.rules ? (
                  <p className="text-red-500">{errors.rules}</p>
                ) : (
                  <FieldDescription>{rule.description}</FieldDescription>
                )}
              </Field>
            ))}
          </FieldGroup>
        </FieldGroup>
      </FieldSet>
      <Button onClick={onBack}>Back</Button>
      <Button onClick={validateAndProceed}>{isLast ? "Finish" : "Next"}</Button>
      {mode === "create" && (
        <Button variant="destructive" onClick={clearData}>
          Clear
        </Button>
      )}
    </section>
  );
};

export default AmenitiesRules;
