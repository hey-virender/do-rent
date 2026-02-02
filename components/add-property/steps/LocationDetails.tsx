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

const LocationDetails = ({ onNext, onBack, isLast }: StepProps) => {
  const [address, setAddress] = useState("");
  const { draft, errors, setDraft, setErrors, clearErrors } =
    usePropertyDraftStore();
  const fetchCoordinates = async () => {
    if (
     !address
    ) {
      toast.error("Please fill address field to get coordinates");
      return;
    }
    
    try {
      const coordinates = await getCoordinates(address);
      console.log("fetched coordinates", coordinates);
      if (coordinates && coordinates.lat && coordinates.lng) {
        console.log(coordinates);
        setDraft({
          location: {
            ...draft.location,
            coordinates: {
              lat: coordinates.lat,
              lng: coordinates.lng,
            },
          },
        });
        toast.success("Coordinates fetched successfully");
      }else{
        toast.error("Failed to fetch coordinates");
      }
    } catch (error) {
      toast.error("Failed to fetch coordinates");
    }
  };

  const validateAndProceed = () => {
    clearErrors();
    console.log("draft location", draft.location);
    const parsed = locationSchema.safeParse({
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
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="line1">Line 1</FieldLabel>
            <Input
              id="line1"
              type="text"
              autoComplete="on"
              autoCapitalize="words"
              value={draft.location?.line1}
              onChange={(e) =>
                setDraft({
                  location: {
                    ...draft.location,
                    line1: e.target.value,
                  },
                })
              }
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
              value={draft.location?.line2}
              onChange={(e) =>
                setDraft({
                  location: {
                    ...draft.location,
                    line2: e.target.value,
                  },
                })
              }
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
              value={draft.location?.city}
              onChange={(e) =>
                setDraft({
                  location: {
                    ...draft.location,
                    city: e.target.value,
                  },
                })
              }
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
              value={draft.location?.state}
              onChange={(e) =>
                setDraft({
                  location: {
                    ...draft.location,
                    state: e.target.value,
                  },
                })
              }
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
              value={draft.location?.country}
              onChange={(e) =>
                setDraft({
                  location: {
                    ...draft.location,
                    country: e.target.value,
                  },
                })
              }
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
              value={draft.location?.pinCode}
              onChange={(e) =>
                setDraft({
                  location: {
                    ...draft.location,
                    pinCode: e.target.value,
                  },
                })
              }
            />
            {errors?.pinCode ? (
              <p className="text-red-500">{errors.pinCode}</p>
            ) : (
              <FieldDescription>
                Enter the pin code of the property
              </FieldDescription>
            )}
          </Field>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="lat">Latitude</FieldLabel>
              <Input
                id="lat"
                type="number"
                autoComplete="on"
                autoCapitalize="words"
                value={draft?.location?.coordinates?.lat}
                onChange={(e) =>
                  setDraft({
                    location: {
                      ...draft.location,
                      coordinates: {
                        ...draft.location?.coordinates,
                        lat: Number(e.target.value),
                      },
                    },
                  })
                }
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
                value={draft.location?.coordinates?.lng}
                onChange={(e) =>
                  setDraft({
                    location: {
                      ...draft.location,
                      coordinates: {
                        ...draft.location?.coordinates,
                        lng: Number(e.target.value),
                      },
                    },
                  })
                }
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
            <Input type="text" placeholder="Enter Address to get coordinates" value={address} onChange={(e) => setAddress(e.target.value)} />
             <Button onClick={fetchCoordinates}> Get Coordinates</Button>
            <Label>Address must be valid to get coordinates</Label>
            </FieldGroup>
          </FieldGroup>
        </FieldGroup>
      </FieldSet>

      <Button onClick={onBack}>Back</Button>
      <Button onClick={validateAndProceed}>{isLast ? "Finish" : "Next"}</Button>
      <Button variant="outline" onClick={clearData}>
        Clear
      </Button>
    </section>
  );
};

export default LocationDetails;
