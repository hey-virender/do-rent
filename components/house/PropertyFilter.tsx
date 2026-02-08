"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { useEffect, useState } from "react";
import { amenitiesList } from "@/constants";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const PropertyFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [term, setTerm] = useState(searchParams.get("term") || "");
  const [rentRange, setRentRange] = useState([
    Number(searchParams.get("minRent")) || 500,
    Number(searchParams.get("maxRent")) || 20000,
  ]);

  const [filters, setFilters] = useState({
    bedrooms: searchParams.get("bedrooms") || "",
    bathrooms: searchParams.get("bathrooms") || "",
    halls: searchParams.get("halls") || "",
    amenities: searchParams.getAll("amenities"),
  });

  // 🔹 Debounced term update
  const debouncedUpdateTerm = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete("term");
    } else {
      params.set("term", value);
    }

    router.replace(`?${params.toString()}`);
  }, 500);

  useEffect(() => {
    debouncedUpdateTerm(term);
  }, [term, debouncedUpdateTerm]);

  const toggleAmenity = (amenity: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("minRent", rentRange[0].toString());
    params.set("maxRent", rentRange[1].toString());

    params.delete("bedrooms");
    params.delete("bathrooms");
    params.delete("halls");
    params.delete("amenities");

    if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
    if (filters.bathrooms) params.set("bathrooms", filters.bathrooms);
    if (filters.halls) params.set("halls", filters.halls);

    filters.amenities.forEach((a) => params.append("amenities", a));

    router.replace(`?${params.toString()}`);
  };

  const clearFilters = () => {
    router.replace("?");
    setTerm("");
    setRentRange([500, 20000]);
    setFilters({
      bedrooms: "",
      bathrooms: "",
      halls: "",
      amenities: [],
    });
  };

  return (
    <div className="bg-primary/50 w-full p-4 flex items-center gap-1">
      <div className="flex gap-4 w-1/3">
        <Field className="w-">
          <FieldLabel htmlFor="term">Search</FieldLabel>
          <Input
            className="bg-black/30 border-2 border-black/80 focus:border-purple-500 focus:ring-blue-500/20 text-white text-lg placeholder:text-white/60 placeholder:font-medium"
            type="text"
            id="term"
            name="term"
            placeholder="Enter city, locality or property name"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </Field>

        <div className="w-2/3">
          <FieldLabel className="mb-3">Amenities</FieldLabel>
          <Popover>
            <PopoverTrigger className="flex bg-primary px-5 py-2 text-white rounded-md text-sm cursor-pointer hover:bg-primary/80 ">
              Select Amenities
            </PopoverTrigger>
            <PopoverContent className="bg-accent" align="start">
              {amenitiesList.map((amenity) => (
                <div
                  className="flex justify-between items-center py-1"
                  key={amenity}
                >
                  <FieldLabel className="capitalize" htmlFor={amenity}>
                    {amenity}
                  </FieldLabel>
                  <Checkbox
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                    id={amenity}
                  />
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="w-2/3 flex justify-between items-center gap-12">
        <Field className="w-1/3">
          <div>
            <FieldLabel>Rent</FieldLabel>
            <span>
              {rentRange[0]} - {rentRange[1]}
            </span>
          </div>
          <Slider
            step={100}
            value={rentRange}
            onValueChange={setRentRange}
            max={20000}
            min={500}
          />
        </Field>

        <Field className="w-1/3">
          <FieldLabel htmlFor="bedrooms">Bedrooms</FieldLabel>
          <Input
            className="bg-black/30 border-2 border-black/80 focus:border-purple-500 focus:ring-blue-500/20 text-white text-lg placeholder:text-white/60 placeholder:font-medium"
            type="number"
            id="bedrooms"
            min={1}
            max={10}
            value={filters.bedrooms}
            onChange={(e) =>
              setFilters((p) => ({ ...p, bedrooms: e.target.value }))
            }
          />
        </Field>

        <Field className="w-1/3">
          <FieldLabel htmlFor="bathrooms">Bathrooms</FieldLabel>
          <Input
            className="bg-black/30 border-2 border-black/80 focus:border-purple-500 focus:ring-blue-500/20 text-white text-lg placeholder:text-white/60 placeholder:font-medium"
            type="number"
            id="bathrooms"
            min={1}
            max={10}
            value={filters.bathrooms}
            onChange={(e) =>
              setFilters((p) => ({ ...p, bathrooms: e.target.value }))
            }
          />
        </Field>

        <Field className="w-1/3">
          <FieldLabel htmlFor="halls">Halls</FieldLabel>
          <Input
            className="bg-black/30 border-2 border-black/80 focus:border-purple-500 focus:ring-blue-500/20 text-white text-lg placeholder:text-white/60 placeholder:font-medium"
            type="number"
            id="halls"
            min={0}
            max={10}
            value={filters.halls}
            onChange={(e) =>
              setFilters((p) => ({ ...p, halls: e.target.value }))
            }
          />
        </Field>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={applyFilters}>Apply Filters</Button>
        <Button
          className="bg-accent text-black hover:bg-accent/80"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilter;
