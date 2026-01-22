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
import { getCoordinates, zodIssuesToFlatErrors } from "@/constants";
import { locationSchema } from "@/validations/house.validation";

const LocationDetails = ({ onNext, onBack, isLast }: StepProps) => {
  const { draft, errors, setDraft, setErrors, clearErrors } =
    usePropertyDraftStore();
  const fetchCoordinates = async () => {
    if (
      !draft.location?.line1 &&
      !draft.location?.city &&
      !draft.location?.state &&
      !draft.location?.country
    ) {
      toast.error("Please fill address fields to get coordinates");
      return;
    }
    const address = `${draft.location?.line1}, ${draft.location?.city}, ${draft.location?.state}, ${draft.location?.country}`;
    try {
      const coordinates = await getCoordinates(address);
      console.log("fetched coordinates", coordinates);
      if (coordinates) {
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
            {errors?.line1? (
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
                Enter the address line 1 of the property
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
              {errors?.coordinates? (
                <p className="text-red-500">
                  {errors.coordinates}
                </p>
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
              {errors?.coordinates? (
                <p className="text-red-500">
                  {errors.coordinates}
                </p>
              ) : (
                <FieldDescription>
                  Enter the longitude of the property
                </FieldDescription>
              )}
            </Field>
            <Button onClick={fetchCoordinates}> Get Coordinates</Button>
          </FieldGroup>
        </FieldGroup>
      </FieldSet>

      <Button onClick={onBack}>Back</Button>
      <Button onClick={validateAndProceed}>{isLast ? "Finish" : "Next"}</Button>
    </section>
  );
};

export default LocationDetails;
