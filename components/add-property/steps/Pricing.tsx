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

const Pricing = ({ mode, onNext, onBack, isLast }: StepProps) => {
  const {
    draft,
    editDraft,
    setEditDraft,
    setDraft,
    errors,
    setErrors,
    clearErrors,
  } = usePropertyDraftStore();
  console.log("Pricing step render", { draft, editDraft });
  const validateAndProceed = () => {
    const parsed =
      mode == "create"
        ? pricingSchema.safeParse({
            currency: draft.pricing?.currency,
            monthly: draft.pricing?.monthly,
            deposit: draft.pricing?.deposit,
          })
        : pricingSchema.safeParse({
            currency: editDraft.pricing?.currency,
            monthly: editDraft.pricing?.monthly,
            deposit: editDraft.pricing?.deposit,
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
  const clearData = () => {
    setDraft({
      pricing: {
        currency: "",
        monthly: 0,
        deposit: 0,
      },
    });
  };
  return (
    <section>
      <FieldSet>
        <FieldGroup className="w-2/3 grid lg:grid-cols-3">
          <Field className="w-fit">
            <FieldLabel htmlFor="currency">Currency</FieldLabel>
            <Select
              onValueChange={(e) =>
                mode === "create"
                  ? setDraft({ pricing: { ...draft.pricing, currency: e } })
                  : setEditDraft({
                      pricing: { ...editDraft.pricing, currency: e },
                    })
              }
              defaultValue={
                mode === "create"
                  ? draft.pricing?.currency
                  : editDraft.pricing?.currency
              }
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
          <Field className="w-fit">
            <FieldLabel htmlFor="price">Monthly Price</FieldLabel>
            <Input
              id="price"
              type="number"
              autoComplete="on"
              autoCapitalize="words"
              value={
                mode === "create"
                  ? draft.pricing?.monthly
                  : editDraft.pricing?.monthly
              }
              onChange={(e) => {
                console.log("monthly price changed", e.target.value);
                mode === "create"
                  ? setDraft({
                      pricing: {
                        ...draft.pricing,
                        monthly: Number(e.target.value),
                      },
                    })
                  : setEditDraft({
                      pricing: {
                        ...editDraft.pricing,
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
          <Field className="w-fit">
            <FieldLabel htmlFor="securityDeposit">Security Deposit</FieldLabel>
            <Input
              id="securityDeposit"
              type="number"
              value={
                mode === "create"
                  ? draft.pricing?.deposit
                  : editDraft.pricing?.deposit
              }
              onChange={(e) =>
                mode === "create"
                  ? setDraft({
                      pricing: {
                        ...draft.pricing,
                        deposit: Number(e.target.value),
                      },
                    })
                  : setEditDraft({
                      pricing: {
                        ...editDraft.pricing,
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

export default Pricing;
