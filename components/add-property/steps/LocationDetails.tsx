"use client";
import { Button } from "@/components/ui/button";
import { StepProps } from "./step.type";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getCoordinates } from "@/constants";
import { locationSchema } from "@/validations/house.validation";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const LocationDetails = ({ mode, onNext, onBack, isLast }: StepProps) => {
  const [address, setAddress] = useState("");
  const {
    draft,
    editDraft,
    setEditDraft,
    errors,
    setDraft,
    setErrors,
    clearErrors,
  } = usePropertyDraftStore();
  console.log("LocationDetails render", { editDraft });
  const fetchCoordinates = async () => {
    if (!address) {
      toast.error("Please fill address field to get coordinates");
      return;
    }

    try {
      const coordinates = await getCoordinates(address);
      console.log("fetched coordinates", coordinates);
      if (coordinates && coordinates.lat && coordinates.lng) {
        console.log(coordinates);
        if (mode === "create") {
          setDraft({
            location: {
              ...draft.location,
              coordinates: {
                lat: coordinates.lat,
                lng: coordinates.lng,
              },
            },
          });
        } else {
          setEditDraft({
            location: {
              ...editDraft.location,
              coordinates: {
                lat: coordinates.lat,
                lng: coordinates.lng,
              },
            },
          });
        }
        toast.success("Coordinates fetched successfully");
      } else {
        toast.error("Failed to fetch coordinates");
      }
    } catch (error) {
      toast.error("Failed to fetch coordinates");
    }
  };

  const validateAndProceed = () => {
    let parsed;
    if (mode === "create") {
      parsed = locationSchema.safeParse({
        line1: draft.location?.line1,
        line2: draft.location?.line2,
        city: draft.location?.city,
        state: draft.location?.state,
        country: draft.location?.country,
        pinCode: draft.location?.pinCode,
        coordinates: {
          lat: draft.location?.coordinates?.lat,
          lng: draft.location?.coordinates?.lng,
        },
      });
    } else {
      parsed = locationSchema.partial().safeParse({
        line1: editDraft.location?.line1,
        line2: editDraft?.location?.line2,
        city: editDraft.location?.city,
        state: editDraft.location?.state,
        country: editDraft.location?.country,
        pinCode: editDraft.location?.pinCode,
        coordinates: {
          lat: editDraft.location?.coordinates?.lat,
          lng: editDraft.location?.coordinates?.lng,
        },
      });
    }
    console.log("parsed location", parsed);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const field = err.path[0];
        if (typeof field === "string" || typeof field === "number") {
          fieldErrors[field.toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      console.log("location errors", fieldErrors);
      return;
    }
    clearErrors();
    onNext();
  };
  const clearData = () => {
    setDraft({
      location: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        coordinates: {
          lat: 0,
          lng: 0,
        },
      },
    });
  };
  return (
    <section>
      <FieldSet>
        <FieldGroup className="grid lg:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="line1">Line 1</FieldLabel>
            <Input
              id="line1"
              type="text"
              autoComplete="on"
              autoCapitalize="words"
              value={
                mode === "create"
                  ? draft.location?.line1 || ""
                  : editDraft.location?.line1 || ""
              }
              onChange={(e) => {
                if (mode === "create") {
                  setDraft({
                    location: {
                      ...draft.location,
                      line1: e.target.value,
                    },
                  });
                } else {
                  setEditDraft({
                    location: {
                      ...editDraft.location,
                      line1: e.target.value,
                    },
                  });
                }
              }}
            />
            {errors?.line1 ? (
              <p className="text-red-500">{errors.line1}</p>
            ) : (
              <FieldDescription>
                Enter the address line 1 of the property
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="line2">Line 2</FieldLabel>
            <Input
              id="line2"
              type="text"
              autoComplete="on"
              autoCapitalize="words"
              value={
                mode === "create"
                  ? draft.location?.line2 || ""
                  : editDraft.location?.line2 || ""
              }
              onChange={(e) => {
                if (mode === "create") {
                  setDraft({
                    location: {
                      ...draft.location,
                      line2: e.target.value,
                    },
                  });
                } else {
                  setEditDraft({
                    location: {
                      ...editDraft.location,
                      line2: e.target.value,
                    },
                  });
                }
              }}
            />
            {errors?.line2 ? (
              <p className="text-red-500">{errors.line2}</p>
            ) : (
              <FieldDescription>
                Enter the address line 2 of the property
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input
              id="city"
              type="text"
              autoComplete="on"
              autoCapitalize="words"
              value={
                mode === "create"
                  ? draft.location?.city || ""
                  : editDraft.location?.city || ""
              }
              onChange={(e) => {
                if (mode === "create") {
                  setDraft({
                    location: {
                      ...draft.location,
                      city: e.target.value,
                    },
                  });
                } else {
                  setEditDraft({
                    location: {
                      ...editDraft.location,
                      city: e.target.value,
                    },
                  });
                }
              }}
            />
            {errors?.city ? (
              <p className="text-red-500">{errors.city}</p>
            ) : (
              <FieldDescription>
                Enter the city of the property
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="state">State</FieldLabel>
            <Input
              id="state"
              type="text"
              autoComplete="on"
              autoCapitalize="words"
              value={
                mode === "create"
                  ? draft.location?.state || ""
                  : editDraft.location?.state || ""
              }
              onChange={(e) => {
                if (mode === "create") {
                  setDraft({
                    location: {
                      ...draft.location,
                      state: e.target.value,
                    },
                  });
                } else {
                  setEditDraft({
                    location: {
                      ...editDraft.location,
                      state: e.target.value,
                    },
                  });
                }
              }}
            />
            {errors?.state ? (
              <p className="text-red-500">{errors.state}</p>
            ) : (
              <FieldDescription>
                Enter the state of the property
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="country">Country</FieldLabel>
            <Input
              id="country"
              type="text"
              autoComplete="on"
              autoCapitalize="words"
              value={
                mode === "create"
                  ? draft.location?.country || ""
                  : editDraft.location?.country || ""
              }
              onChange={(e) => {
                if (mode === "create") {
                  setDraft({
                    location: {
                      ...draft.location,
                      country: e.target.value,
                    },
                  });
                } else {
                  setEditDraft({
                    location: {
                      ...editDraft.location,
                      country: e.target.value,
                    },
                  });
                }
              }}
            />
            {errors?.country ? (
              <p className="text-red-500">{errors.country}</p>
            ) : (
              <FieldDescription>
                Enter the country of the property
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="pinCode">Pin Code</FieldLabel>
            <Input
              id="pinCode"
              type="text"
              inputMode="numeric"
              pattern="[1-9][0-9]{5}"
              maxLength={6}
              autoComplete="postal-code"
              value={
                mode === "create"
                  ? draft.location?.pinCode || ""
                  : editDraft.location?.pinCode || ""
              }
              onChange={(e) => {
                if (mode === "create") {
                  setDraft({
                    location: {
                      ...draft.location,
                      pinCode: e.target.value,
                    },
                  });
                } else {
                  setEditDraft({
                    location: {
                      ...editDraft.location,
                      pinCode: e.target.value,
                    },
                  });
                }
              }}
            />
            {errors?.pinCode ? (
              <p className="text-red-500">{errors.pinCode}</p>
            ) : (
              <FieldDescription>
                Enter the pin code of the property
              </FieldDescription>
            )}
          </Field>
          <FieldGroup className="col-span-2 grid grid-cols-2 gap-4 border border-primary p-4 rounded">
            <Field>
              <FieldLabel htmlFor="lat">Latitude</FieldLabel>
              <Input
                id="lat"
                type="number"
                autoComplete="on"
                autoCapitalize="words"
                value={
                  mode === "create"
                    ? draft?.location?.coordinates?.lat
                    : editDraft?.location?.coordinates?.lat
                }
                onChange={(e) => {
                  if (mode === "create") {
                    setDraft({
                      location: {
                        ...draft.location,
                        coordinates: {
                          ...draft.location?.coordinates,
                          lat: Number(e.target.value),
                        },
                      },
                    });
                  } else {
                    setEditDraft({
                      location: {
                        ...editDraft.location,
                        coordinates: {
                          ...editDraft.location?.coordinates,
                          lat: Number(e.target.value),
                        },
                      },
                    });
                  }
                }}
              />
              {errors?.coordinates ? (
                <p className="text-red-500">{errors.coordinates}</p>
              ) : (
                <FieldDescription>
                  Enter the latitude of the property
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="lng">Longitude</FieldLabel>
              <Input
                id="lng"
                type="text"
                autoComplete="on"
                autoCapitalize="words"
                value={
                  mode === "create"
                    ? draft?.location?.coordinates?.lng
                    : editDraft?.location?.coordinates?.lng
                }
                onChange={(e) => {
                  if (mode === "create") {
                    setDraft({
                      location: {
                        ...draft.location,
                        coordinates: {
                          ...draft.location?.coordinates,
                          lng: Number(e.target.value),
                        },
                      },
                    });
                  } else {
                    setEditDraft({
                      location: {
                        ...editDraft.location,
                        coordinates: {
                          ...editDraft.location?.coordinates,
                          lng: Number(e.target.value),
                        },
                      },
                    });
                  }
                }}
              />
              {errors?.coordinates ? (
                <p className="text-red-500">{errors.coordinates}</p>
              ) : (
                <FieldDescription>
                  Enter the longitude of the property
                </FieldDescription>
              )}
            </Field>
            <FieldGroup>
              <FieldLabel>Address to get coordinates</FieldLabel>
              <Input
                type="text"
                placeholder="Enter Address to get coordinates"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button onClick={fetchCoordinates}> Get Coordinates</Button>
              <Label>Address must be valid to get coordinates</Label>
            </FieldGroup>
          </FieldGroup>
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

export default LocationDetails;
