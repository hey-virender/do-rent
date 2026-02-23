import { HouseListing} from "@/types/house";
import { ZodError } from "zod";

export async function getCoordinates(address: string) {
  try {
    const res = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}


export function zodIssuesToFlatErrors(
  issues: ZodError["issues"]
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const issue of issues) {
    const key = issue.path.map(String).join(".");

    // keep first error per field
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}


export const currencyOptions = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD"];

export const houseMetaStatusOptions = ["active", "inactive","occupied"] as const;
export const amenitiesList = ["wifi", "ac", "gym", "pool","parking","bus facility"]





