
import {z} from 'zod';

export const nearbySchema = z.object({
  name: z.string().min(2, "Nearby place name must be at least 2 characters long"),
  type: z.string().min(2, "Type must be at least 2 characters long"),
  distanceKm: z.number().min(0, "Distance must be a non-negative number"),
});

const imageAssetSchema = z.object({
  url: z.string().url("URL must be a valid URL"),
  fileId: z.string().nonempty("File ID is required"),
});
export const houseSchama = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  meta: z.object({
    status: z.enum(["active", "inactive","occupied"]).default("inactive"),
  }),
  location: z.object({
    line1: z.string().nonempty("Address Line 1 is required").min(5, "Address Line 1 must be at least 5 characters long"),
    line2: z.string().optional().nullable().default(""),
    city: z.string().nonempty("City is required").min(2, "City must be at least 2 characters long"),
    state: z.string().nonempty("State is required").min(2, "State must be at least 2 characters long"),
    country: z.string().nonempty("Country is required").min(2, "Country must be at least 2 characters long"),
    pinCode: z
  .string()
  .regex(/^[1-9][0-9]{5}$/, "Invalid Indian PIN code"),

    coordinates: z.object({
      lat: z.number({ error:"Not a valid latitude" }).min(-90).max(90),
      lng: z.number({ error: "Not a valid longitude" }).min(-180).max(180),
    }),
  }),

  pricing: z.object({
    monthly: z.number().min(100).nonnegative("Monthly rent must be a positive number"),
    currency: z.string().nonempty("Currency is required").length(3, "Currency must be a 3-letter code"),
    deposit: z.number().min(200).nonnegative("Deposit must be a positive number"),
  }),
  specs: z.object({
    halls: z.number().min(0, "Hall must be a non-negative number"),
    bedrooms: z.number().min(1, "Bedrooms must be a non-negative number"),
    bathrooms: z.number().min(1, "Bathrooms must be a non-negative number"),
    areaSqft: z.number().min(180, "Area must be at least 180 sqft"),
  }),

  amenities: z.array(z.enum(["wifi", "ac", "gym", "pool", "parking", "bus facility"])).optional(),

  overview: z.string().nonempty("Overview is required").min(10, "Overview must be at least 10 characters long"),

  nearby: z.array(nearbySchema).optional(),

  media: z.object({
    cover: imageAssetSchema,
    gallery: z.array(imageAssetSchema).optional(),
  }),

  rules: z.object({
    minimumStayMonths: z.number().min(2, "Minimum stay must be at least 2 months"),
    petsAllowed: z.boolean(),
    smokingAllowed: z.boolean(),
    partiesAllowed: z.boolean(),
  }),
  availability: z.object({
    availableFrom: z.date({ error: "Invalid date format" }).refine((value) => {
      const input = new Date(value);
      input.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return input >= today;
    }
    , "Available from date cannot be in the past"),
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

export const specsSchema = houseSchama.shape.specs;


export const amenitiesRulesSchema = houseSchama.pick({
  amenities: true,
  rules: true,
});
export const mediaSchema = houseSchama.shape.media;
export const availabilitySchema = houseSchama.shape.availability; 


