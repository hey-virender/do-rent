"use client";
import { Label } from "@/components/ui/label";
import { StepProps } from "./step.type";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import { Textarea } from "@/components/ui/textarea";
import { availabilitySchema } from "@/validations/house.validation";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { houseMetaStatusOptions } from "@/constants";

const AvailabilityOwner = ({ mode, onNext, onBack, isLast }: StepProps) => {
  const today = new Date();
  const {
    draft,
    editDraft,
    setEditDraft,
    setDraft,
    errors,
    setErrors,
    clearErrors,
  } = usePropertyDraftStore();
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
      if (mode === "create") {
        setDraft({
          availability: {
            ...draft.availability,
            availableFrom: new Date(date),
          },
        });
      } else {
        setEditDraft({
          availability: {
            ...editDraft.availability,
            availableFrom: new Date(date),
          },
        });
      }
    }
  };

  const validateAndProceed = () => {
    const parsed = availabilitySchema.safeParse({
      availableFrom: source.availability?.availableFrom,
      leaseTerms: source.availability?.leaseTerms,
      conditions: source.availability?.conditions,
    });
    console.log("Validating availability", parsed);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const field = err.path[0];
        if (typeof field == "string" || typeof field == "number") {
          fieldErrors[field.toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      console.log("Validation errors:", fieldErrors);
      return;
    }
    clearErrors();
    onNext();
  };

  const clearData = () => {
    setDraft({
      availability: {
        availableFrom: "",
        leaseTerms: "",
        conditions: "",
      },
    });
  };
  const handleStatusChange = (
    value: (typeof houseMetaStatusOptions)[number],
  ) => {
    console.log("Status changed to:", value);
    if (mode === "create") {
      setDraft({
        meta: {
          status: value,
        },
      });
    } else {
      setEditDraft({
        meta: {
          status: value,
        },
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (mode === "create") {
      setDraft({
        availability: {
          ...draft.availability,
          [name]: value,
        },
      });
    } else {
      setEditDraft({
        availability: {
          ...editDraft.availability,
          [name]: value,
        },
      });
    }
  };

  return (
    <section className="grid grid-cols-2 gap-4">
      <div className="mb-4">
        <Label>Status</Label>

        <RadioGroup
          className="flex mt-2"
          value={source?.meta?.status || "inactive"}
          onValueChange={handleStatusChange}
        >
          {houseMetaStatusOptions.map((option) => (
            <div className="flex" key={option}>
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="ml-2 capitalize">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div>
        <Label>Availability</Label>
        <DatePicker
          date={
            source?.availability?.availableFrom
              ? new Date(source.availability.availableFrom)
              : today
          }
          setDate={handleDateChange}
        />
        {errors.availableFrom && (
          <p className="text-red-600">{errors.availableFrom}</p>
        )}
      </div>
      <div>
        <Label>Lease terms</Label>
        <Textarea
          name="leaseTerms"
          value={source?.availability?.leaseTerms || ""}
          onChange={(e) => handleInputChange(e)}
          placeholder="e.g., 12 months, 6 months"
        />
        {errors.leaseTerms && (
          <p className="text-red-600">{errors.leaseTerms}</p>
        )}
      </div>
      <div>
        <Label>Conditions</Label>
        <Textarea
          name="conditions"
          value={source?.availability?.conditions || ""}
          onChange={(e) => handleInputChange(e)}
          placeholder="Mention any specific conditions here"
        />

        {errors.conditions && (
          <p className="text-red-600">{errors.conditions}</p>
        )}
      </div>
      <div className="flex justify-start gap-2 mt-4">
        <Button className="bg-accent text-black px-7" onClick={onBack}>
          Back
        </Button>
        <Button className="px-7" onClick={validateAndProceed}>
          {isLast ? "Finish" : "Next"}
        </Button>
        {mode === "create" && (
          <Button className="px-7" onClick={clearData}>
            Clear
          </Button>
        )}
      </div>
    </section>
  );
};

export default AvailabilityOwner;
