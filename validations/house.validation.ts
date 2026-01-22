import { ru } from 'date-fns/locale';
import {z} from 'zod';

export const houseSchama = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  meta: z.object({
    status: z.enum(["active", "inactive"]),
  }),
  location: z.object({
    line1: z.string().nonempty("Address Line 1 is required").min(5, "Address Line 1 must be at least 5 characters long"),
    line2: z.string().optional(),
    city: z.string().nonempty("City is required").min(2, "City must be at least 2 characters long"),
    state: z.string().nonempty("State is required").min(2, "State must be at least 2 characters long"),
    country: z.string().nonempty("Country is required").min(2, "Country must be at least 2 characters long"),
    coordinates: z.object({
      lat: z.number({ error:"Not a valid latitude" }).min(-90).max(90),
      lng: z.number({ error: "Not a valid longitude" }).min(-180).max(180),
    }),
  }),

  pricing: z.object({
    monthly: z.number().nonnegative("Monthly rent must be a positive number"),
    currency: z.string().nonempty("Currency is required").length(3, "Currency must be a 3-letter code"),
    deposit: z.number().nonnegative("Deposit must be a positive number"),
  }),
  specs: z.object({
    hall: z.number().min(0, "Hall must be a non-negative number"),
    bedrooms: z.number().min(0, "Bedrooms must be a non-negative number"),
    bathrooms: z.number().min(0, "Bathrooms must be a non-negative number"),
    areaSqft: z.number().min(0, "Area must be a positive number"),
  }),

  amenities: z.array(z.enum(["wifi", "ac", "gym", "pool", "parking", "bus facility"])).optional(),

  overview: z.string().nonempty("Overview is required").min(10, "Overview must be at least 10 characters long"),

  nearby: z.array(z.object({
    name: z.string().min(2, "Nearby place name must be at least 2 characters long"),
    type: z.string().min(2, "Type must be at least 2 characters long"),
    distanceKm: z.number().min(0, "Distance must be a non-negative number"),
  })).optional(),

  media: z.object({
    cover: z.string().url("Cover must be a valid URL"),
    gallery: z.array(z.string().url("Gallery items must be valid URLs")).optional(),
  }),

  rules: z.object({
    minimumStayMonths: z.number().min(0, "Minimum stay must be a non-negative number"),
    petsAllowed: z.boolean(),
    smokingAllowed: z.boolean(),
    partiesAllowed: z.boolean(),
  }),
  availability: z.object({
    availableFrom: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format", 
    }),
    leaseTerms: z.string().min(5, "Lease terms must be at least 5 characters long"),
    conditions: z.string().min(5, "Conditions must be at least 5 characters long"),
  }),
});

export type HouseSchema = z.infer<typeof houseSchama>;

export const basicInfoSchema = houseSchama.pick({
  name: true,
  overview: true,
});

export const locationSchema = houseSchama.shape.location
export const pricingSchema = houseSchama.shape.pricing;

export const specsSchema = houseSchama.pick({
  specs: true,
});

export const amenitiesRulesSchema = houseSchama.pick({
  amenities: true,
  rules: true,
});
export const mediaSchema = houseSchama.pick({
  media: true,
});
export const availabilitySchema = houseSchama.pick({
  availability: true,
}); 
