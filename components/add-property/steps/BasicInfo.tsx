"use client";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { StepProps } from "./step.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import { basicInfoSchema } from "@/validations/house.validation";

const BasicInfo = ({ onNext, onBack, isLast }: StepProps) => {
  const { setDraft, draft, errors, setErrors, clearErrors } =
    usePropertyDraftStore();

  const validateAndProceed = () => {
    const parsed = basicInfoSchema.safeParse({
      name: draft.name,
      overview: draft.overview,
    });
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
    onNext();
  };
  return (
    <section>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              type="text"
              autoComplete="on"
              autoCapitalize="words"
              value={draft.name || ""}
              onChange={(e) => setDraft({ name: e.target.value })}
            />
            {errors?.name ? (
              <p className="text-red-500">{errors.name}</p>
            ) : (
              <FieldDescription>
                Enter the name of the property
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="overview">Overview</FieldLabel>
            <Textarea
              id="overview"
              rows={5}
              value={draft.overview || ""}
              onChange={(e) => setDraft({ overview: e.target.value })}
            />
            {errors?.overview ? (
              <p className="text-red-500">{errors.overview}</p>
            ) : (
              <FieldDescription>
                Enter the overview of the property
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>
      <div>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={validateAndProceed}>
          {isLast ? "Finish" : "Next"}
        </Button>
      </div>
    </section>
  );
};

export default BasicInfo;
