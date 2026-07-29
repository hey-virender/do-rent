import { describe, it, expect } from "vitest";
import { prismaUpdateFilter } from "@/lib/utils";

/**
 * prismaUpdateFilter guards partial updates. Prisma treats an explicit
 * `null` as "set this column to NULL", so passing a form field the user
 * simply left untouched would wipe existing data. These tests pin that
 * behaviour down.
 */
describe("prismaUpdateFilter", () => {
  it("keeps populated values", () => {
    expect(prismaUpdateFilter({ name: "Sunrise Villa", monthly: 15000 })).toEqual({
      name: "Sunrise Villa",
      monthly: 15000,
    });
  });

  it("drops undefined values", () => {
    expect(prismaUpdateFilter({ name: "Villa", city: undefined })).toEqual({
      name: "Villa",
    });
  });

  it("drops null values so Prisma does not null out existing columns", () => {
    expect(prismaUpdateFilter({ name: "Villa", line2: null })).toEqual({
      name: "Villa",
    });
  });

  it("drops empty strings", () => {
    expect(prismaUpdateFilter({ name: "Villa", overview: "" })).toEqual({
      name: "Villa",
    });
  });

  it("drops whitespace-only strings", () => {
    expect(prismaUpdateFilter({ name: "Villa", overview: "   " })).toEqual({
      name: "Villa",
    });
  });

  it("preserves falsy values that are meaningful", () => {
    // 0 and false are legitimate: zero halls, pets not allowed.
    expect(prismaUpdateFilter({ halls: 0, petsAllowed: false })).toEqual({
      halls: 0,
      petsAllowed: false,
    });
  });

  it("returns an empty object when nothing survives", () => {
    expect(prismaUpdateFilter({ a: undefined, b: null, c: "  " })).toEqual({});
  });
});
