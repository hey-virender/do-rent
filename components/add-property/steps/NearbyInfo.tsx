"use client";
import { Button } from "@/components/ui/button";
import { StepProps } from "./step.type";
import { useState } from "react";
import { Nearby } from "@/types/house";
import { SquareX } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import { nearbySchema } from "@/validations/house.validation";

const TYPE_OPTIONS = [
  "School",
  "Hospital",
  "Supermarket",
  "Park",
  "Restaurant",
  "Custom",
];

const NearbyInfo = ({ onNext, onBack, isLast }: StepProps) => {
  const { draft, setDraft, errors, setErrors, clearErrors } =
    usePropertyDraftStore();

  const [nearby, setNearby] = useState<Nearby>({
    type: "",
    name: "",
    distanceKm: 0,
  });

  const handleTypeChange = (value: string) => {
    setNearby((prev) => ({
      ...prev,
      type: value,
    }));
    console.log("Selected type:", value);
    console.log("Updated nearby state:", nearby);
  };

  const handleAddNearby = () => {
    const parsed = nearbySchema.safeParse(nearby);
    console.log("Parsed nearby:", parsed);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const field = err.path[0];
        if (typeof field === "string" || typeof field === "number") {
          fieldErrors[field.toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      console.log("Validation errors:", fieldErrors);
      return;
    }
    clearErrors();
    setDraft({
      nearby: [...(draft.nearby || []), nearby],
    });
    // Reset local nearby state
    setNearby({
      type: "",
      name: "",
      distanceKm: 0,
    });
  };

  const removeNearbyByName = (name: string) => {
    const updatedNearby = draft.nearby?.filter((place) => place.name !== name);
    setDraft({ nearby: updatedNearby });
  };

  return (
    <section>
      <FieldSet>
        <FieldLegend>Nearby Information</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel>Type of Place </FieldLabel>
            <Select
              value={nearby.type}
              name="type"
              onValueChange={handleTypeChange}
            >
              <SelectTrigger className="">
                <SelectValue
                  placeholder="Select type of place"
                  className="text-black"
                />
              </SelectTrigger>
              <SelectContent className="">
                {TYPE_OPTIONS.map((option) => (
                  <SelectItem
                    className="bg-white text-black"
                    key={option}
                    value={option}
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.type ? (
              <p className="text-red-500">{errors.type}</p>
            ) : (
              <FieldDescription>Type of the nearby place</FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel>Name of Place </FieldLabel>
            <Input
              type="text"
              name="name"
              placeholder="Enter name of place"
              value={nearby.name}
              onChange={(e) =>
                setNearby((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            {errors?.name ? (
              <p className="text-red-500">{errors.name}</p>
            ) : (
              <FieldDescription>Name of the nearby place</FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel>Distance (in Km) </FieldLabel>
            <Input
              type="number"
              name="distanceKm"
              placeholder="Enter distance in Km"
              value={nearby.distanceKm}
              onChange={(e) =>
                setNearby((prev) => ({
                  ...prev,
                  distanceKm: Number(e.target.value),
                }))
              }
            />
            {errors?.distanceKm ? (
              <p className="text-red-500">{errors.distanceKm}</p>
            ) : (
              <FieldDescription>
                Distance from the property in kilometers
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>
        <Button onClick={handleAddNearby}>Add Nearby Place</Button>
      </FieldSet>
      <div>
        <h3 className="mt-4 mb-2 text-lg font-medium">Added Nearby Places:</h3>
        <div className="flex gap-4 flex-wrap ">
          {draft.nearby &&
            draft.nearby.length > 0 &&
            draft.nearby.map((place, index) => (
              <div
                key={index}
                className="relative mb-2 p-4 border rounded w-fit"
              >
                <Button
                  className="absolute size-8 top-1 right-1 bg-red-500 text-white"
                  onClick={() => removeNearbyByName(place.name!)}
                >
                  <SquareX />
                </Button>
                <p className="pt-4">
                  <strong>Type:</strong> {place.type}
                </p>
                <p>
                  <strong>Name:</strong> {place.name}
                </p>
                <p>
                  <strong>Distance (Km):</strong> {place.distanceKm}
                </p>
              </div>
            ))}
        </div>
      </div>
      <Button onClick={onBack}>Back</Button>
      <Button onClick={onNext}>{isLast ? "Finish" : "Next"}</Button>
    </section>
  );
};

export default NearbyInfo;
