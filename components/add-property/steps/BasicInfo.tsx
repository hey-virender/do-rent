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

const BasicInfo = ({ mode, onNext, onBack, isLast,isFirst }: StepProps) => {
  const {
    setDraft,
    editDraft,
    setEditDraft,
    draft,
    errors,
    setErrors,
    clearErrors,
  } = usePropertyDraftStore();

  


  const validateAndProceed = () => {
    let parsed;
    if (mode === "create") {
      parsed = basicInfoSchema.safeParse({
      name: draft.name,
      overview: draft.overview,
    });
    }else{
      parsed = basicInfoSchema.safeParse({
        name: editDraft.name,
        overview: editDraft.overview,
      });
    }
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
  const clearData = () => {
    setDraft({ name: "", overview: "" });
  };
  return (
    <section>
      <FieldSet>
        <FieldGroup>
          <Field className="w-1/3">
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              type="text"
              autoComplete="on"
              autoCapitalize="words"
              value={mode === "create" ? draft.name || "" : editDraft.name || ""}
              onChange={(e) => {
                if (mode === "create") {
                  setDraft({ name: e.target.value });
                } else {
                  setEditDraft({ name: e.target.value });
                }
              }}
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
              rows={12}
              value={mode === "create" ? draft.overview || "" : editDraft.overview || ""}
              onChange={(e) => {
                if (mode === "create") {
                  setDraft({ overview: e.target.value });
                } else {
                  setEditDraft({ overview: e.target.value });
                }
              }}
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
        <Button className="px-5" onClick={validateAndProceed}>
          {isLast ? "Finish" : "Next"}
        </Button>
        {mode === "create" && (
          <Button variant="outline" onClick={clearData}>
            Clear
          </Button>
        )}
      </div>
    </section>
  );
};

export default BasicInfo;
