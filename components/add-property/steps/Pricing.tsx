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
import { Input } from "@/components/ui/input";
import { currencyOptions } from "@/constants";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import { pricingSchema } from "@/validations/house.validation";

const Pricing = ({ onNext, onBack, isLast }: StepProps) => {
  const { draft, setDraft, errors, setErrors, clearErrors } =
    usePropertyDraftStore();
  const validateAndProceed = () => {
    clearErrors();
    const parsed = pricingSchema.safeParse({
      currency: draft.pricing?.currency,
      monthly: draft.pricing?.monthly,
      deposit: draft.pricing?.deposit,
    });
    if (!parsed.success) {
      const fieldError: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const field = err.path[0];
        if (typeof field == "string" || typeof field == "number") {
          fieldError[field.toString()] = err.message;
        }
      });
      setErrors(fieldError);
      console.log("Pricing validation errors", fieldError);
      return;
    }
    clearErrors();
    onNext();
  };
  return (
    <section>
      <FieldSet>
        <FieldGroup>
          <Field className="w-24">
            <FieldLabel htmlFor="currency">Currency</FieldLabel>
            <Select
              onValueChange={(e) =>
                setDraft({ pricing: { ...draft.pricing, currency: e } })
              }
              defaultValue={draft.pricing?.currency || ""}
            >
              <SelectTrigger id="currency" className="w-12">
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                {currencyOptions.map((currency) => (
                  <SelectItem
                    className="bg-white"
                    key={currency}
                    value={currency}
                  >
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.currency ? (
              <p className="text-red-500">{errors.currency}</p>
            ) : (
              <FieldDescription>Select the currency</FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="price">Monthly Price</FieldLabel>
            <Input
              id="price"
              type="number"
              autoComplete="on"
              autoCapitalize="words"
              value={draft.pricing?.monthly}
              onChange={(e) => {
                console.log("monthly price changed", e.target.value);
                setDraft({
                  pricing: {
                    ...draft.pricing,
                    monthly: Number(e.target.value),
                  },
                });
              }}
            />
            {errors?.monthly ? (
              <p className="text-red-500">{errors.monthly}</p>
            ) : (
              <FieldDescription>Set the Monthly Price</FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="securityDeposit">Security Deposit</FieldLabel>
            <Input
              id="securityDeposit"
              type="number"
              value={draft.pricing?.deposit}
              onChange={(e) =>
                setDraft({
                  pricing: {
                    ...draft.pricing,
                    deposit: Number(e.target.value),
                  },
                })
              }
            />
            {errors?.deposit ? (
              <p className="text-red-500">{errors.deposit}</p>
            ) : (
              <FieldDescription>
                Set the Security Deposit Amount
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button onClick={onBack}>Back</Button>
      <Button onClick={validateAndProceed}>{isLast ? "Finish" : "Next"}</Button>
    </section>
  );
};

export default Pricing;
