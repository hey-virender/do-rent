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

const NearbyInfo = ({ mode, onNext, onBack, isLast }: StepProps) => {
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
  };

  const handleAddNearby = () => {
    const parsed = nearbySchema.safeParse(nearby);
    
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const field = err.path[0];
        if (typeof field === "string" || typeof field === "number") {
          fieldErrors[field.toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      
      return;
    }
    clearErrors();
    if (mode === "create") {
      setDraft({
        nearby: [...(draft.nearby || []), nearby],
      });
    } else {
      setEditDraft({
        nearby: [...(editDraft.nearby || []), nearby],
      });
    }
    // Reset local nearby state
    setNearby({
      type: "",
      name: "",
      distanceKm: 0,
    });
  };

  const removeNearbyByName = (name: string) => {
    if (mode === "create") {
      const updatedNearby = draft.nearby?.filter(
        (place) => place.name !== name,
      );
      setDraft({ nearby: updatedNearby });
    } else {
      const updatedNearby = editDraft.nearby?.filter(
        (place) => place.name !== name,
      );
      setEditDraft({ nearby: updatedNearby });
    }
  };

  return (
    <section>
      <FieldSet>
        <FieldLegend>Nearby Information</FieldLegend>
        <FieldGroup className="grid grid-cols-3">
          <Field className="col-span-1">
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
          <Field className="col-span-1">
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
          <Field className="col-span-1">
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
        <Button className="w-fit px-5 mx-auto" onClick={handleAddNearby}>Add Nearby Place</Button>
      </FieldSet>
      <div>
        <h3 className="mt-4 mb-2 text-lg font-medium">Added Nearby Places:</h3>
        <div className="flex gap-4 flex-wrap ">
          {source.nearby &&
            source.nearby.length > 0 &&
            source.nearby.map((place, index) => (
              <div
                key={index}
                className="relative mb-2 p-4 border rounded w-fit"
              >
                <Button
                  aria-label={`remove nearby place ${place.name}`}
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
      <div className="flex justify-start gap-2 mt-4">
        <Button aria-label="previous step" className="bg-accent text-black px-7" onClick={onBack}>Back</Button>
      <Button aria-label={isLast ? "finish adding property" : "next step"} className="px-7" onClick={onNext}>{isLast ? "Finish" : "Next"}</Button>
      </div>
    </section>
  );
};

export default NearbyInfo;
