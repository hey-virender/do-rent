"use client";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { amenitiesList } from "@/constants";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const PropertyFilter = () => {
  const [rentRange, setRentRange] = useState([500, 20000]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const setParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`?${params.toString()}`);
  };

  const toggleAmenity = (amenity: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const selected = params.getAll("amenities");

    params.delete("amenities");

    if (selected.includes(amenity)) {
      selected
        .filter((a) => a !== amenity)
        .forEach((a) => params.append("amenities", a));
    } else {
      [...selected, amenity].forEach((a) => params.append("amenities", a));
    }

    router.replace(`?${params.toString()}`);
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minRent", rentRange[0].toString());
    params.set("maxRent", rentRange[1].toString());
    router.replace(`?${params.toString()}`);
  };
  const clearFilters = () => {
  router.replace("?");
  setRentRange([500, 20000]);
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
            value={searchParams.get("term") || ""}
            onChange={(e) => setParam("term", e.target.value)}
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
                    checked={searchParams.getAll("amenities").includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                    id={amenity}
                    name="amenities"
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
            <FieldLabel htmlFor="Rent">Rent</FieldLabel>
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
            name="bedrooms"
            inputMode="numeric"
            value={searchParams.get("bedrooms") || ""}
            min={1}
            max={10}
            onChange={(e)=>setParam("bedrooms",e.target.value)}
          />
        </Field>
        <Field className="w-1/3">
          <FieldLabel htmlFor="bathrooms">Bathrooms</FieldLabel>
          <Input
            className="bg-black/30 border-2 border-black/80 focus:border-purple-500 focus:ring-blue-500/20 text-white text-lg placeholder:text-white/60 placeholder:font-medium"
            type="number"
            id="bathrooms"
            name="bathrooms"
            inputMode="numeric"
            min={1}
            max={10}
            value={searchParams.get("bathrooms") || ""}
            onChange={(e)=>setParam("bathrooms",e.target.value)}
          />
        </Field>
        <Field className="w-1/3">
          <FieldLabel htmlFor="halls">Halls</FieldLabel>
          <Input
            className="bg-black/30 border-2 border-black/80 focus:border-purple-500 focus:ring-blue-500/20 text-white text-lg placeholder:text-white/60 placeholder:font-medium"
            type="number"
            id="halls"
            name="halls"
            inputMode="numeric"
            min={0}
            max={10}
            value={searchParams.get("halls") || ""}
            onChange={(e)=>setParam("halls",e.target.value)}
          />
        </Field>
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={applyFilters}>Apply Filters</Button>
        <Button className="bg-accent text-black hover:bg-accent/80" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilter;
