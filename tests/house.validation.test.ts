import { describe, it, expect } from "vitest";
import {
  locationSchema,
  pricingSchema,
  specsSchema,
  availabilitySchema,
  nearbySchema,
} from "@/validations/house.validation";

const validLocation = {
  line1: "12 Rose Avenue",
  line2: "",
  city: "Pune",
  state: "Maharashtra",
  country: "India",
  pinCode: "411001",
  coordinates: { lat: 18.5204, lng: 73.8567 },
};

describe("locationSchema", () => {
  it("accepts a valid Indian address", () => {
    expect(locationSchema.safeParse(validLocation).success).toBe(true);
  });

  it("rejects a PIN code starting with 0", () => {
    // Indian PIN codes never begin with 0.
    expect(
      locationSchema.safeParse({ ...validLocation, pinCode: "011001" }).success,
    ).toBe(false);
  });

  it("rejects a PIN code that is not 6 digits", () => {
    expect(
      locationSchema.safeParse({ ...validLocation, pinCode: "41100" }).success,
    ).toBe(false);
  });

  it("rejects out-of-range latitude", () => {
    expect(
      locationSchema.safeParse({
        ...validLocation,
        coordinates: { lat: 120, lng: 73.8 },
      }).success,
    ).toBe(false);
  });

  it("rejects out-of-range longitude", () => {
    expect(
      locationSchema.safeParse({
        ...validLocation,
        coordinates: { lat: 18.5, lng: 200 },
      }).success,
    ).toBe(false);
  });
});

describe("pricingSchema", () => {
  it("accepts valid pricing", () => {
    expect(
      pricingSchema.safeParse({ monthly: 15000, currency: "INR", deposit: 30000 })
        .success,
    ).toBe(true);
  });

  it("rejects a currency code that is not 3 letters", () => {
    expect(
      pricingSchema.safeParse({ monthly: 15000, currency: "RUPEE", deposit: 30000 })
        .success,
    ).toBe(false);
  });

  it("rejects rent below the minimum", () => {
    expect(
      pricingSchema.safeParse({ monthly: 50, currency: "INR", deposit: 30000 })
        .success,
    ).toBe(false);
  });

  it("rejects a deposit below the minimum", () => {
    expect(
      pricingSchema.safeParse({ monthly: 15000, currency: "INR", deposit: 100 })
        .success,
    ).toBe(false);
  });
});

describe("specsSchema", () => {
  const validSpecs = { halls: 1, bedrooms: 2, bathrooms: 1, areaSqft: 850 };

  it("accepts valid specs", () => {
    expect(specsSchema.safeParse(validSpecs).success).toBe(true);
  });

  it("allows zero halls but requires at least one bedroom", () => {
    expect(specsSchema.safeParse({ ...validSpecs, halls: 0 }).success).toBe(true);
    expect(specsSchema.safeParse({ ...validSpecs, bedrooms: 0 }).success).toBe(
      false,
    );
  });

  it("rejects an area under 180 sqft", () => {
    expect(specsSchema.safeParse({ ...validSpecs, areaSqft: 100 }).success).toBe(
      false,
    );
  });
});

describe("availabilitySchema", () => {
  const base = {
    leaseTerms: "Eleven month renewable lease",
    conditions: "No structural changes permitted",
  };

  it("accepts a future availability date", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(
      availabilitySchema.safeParse({ ...base, availableFrom: tomorrow }).success,
    ).toBe(true);
  });

  it("accepts today", () => {
    expect(
      availabilitySchema.safeParse({ ...base, availableFrom: new Date() }).success,
    ).toBe(true);
  });

  it("rejects a past availability date", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(
      availabilitySchema.safeParse({ ...base, availableFrom: yesterday }).success,
    ).toBe(false);
  });
});

describe("nearbySchema", () => {
  it("accepts a valid nearby place", () => {
    expect(
      nearbySchema.safeParse({ name: "City Hospital", type: "hospital", distanceKm: 1.2 })
        .success,
    ).toBe(true);
  });

  it("rejects a negative distance", () => {
    expect(
      nearbySchema.safeParse({ name: "City Hospital", type: "hospital", distanceKm: -1 })
        .success,
    ).toBe(false);
  });
});
