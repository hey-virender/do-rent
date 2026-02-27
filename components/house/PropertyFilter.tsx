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
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { ListFilterPlus } from "lucide-react";

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

  const FilterUI = () => (
    <div className="bg-primary/50 w-full px-4 py-6">
      <div className="w-full mx-auto flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        {/* LEFT SECTION */}
        <div className="w-full lg:flex-1 flex flex-col lg:flex-row gap-6">
          <Field className="lg:w-1/2">
            <FieldLabel htmlFor="term">Search</FieldLabel>
            <Input
              className="bg-black/30 border-2 border-black/80 focus:border-purple-500 focus:ring-blue-500/20 text-white md:text-lg placeholder:text-white/60 placeholder:font-medium w-full"
              type="text"
              id="term"
              name="term"
              placeholder="Enter city, locality or property name"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </Field>

          <div className="w-full lg:w-1/2">
            <FieldLabel className="mb-3 block">Amenities</FieldLabel>

            <Popover>
              <PopoverTrigger className="w-full bg-primary px-4 py-2 text-white rounded-md text-sm hover:bg-primary/80">
                Amenities
              </PopoverTrigger>

              <PopoverContent
                className="bg-accent w-64 max-h-64 overflow-y-auto"
                align="start"
              >
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

        {/* CENTER SECTION */}
        <div className="w-full lg:flex-2 flex flex-col lg:flex-row lg:justify-around gap-1">
          <Field className=" lg:w-1/3">
            <div className="flex justify-between items-center">
              <FieldLabel>Rent</FieldLabel>
              <span>
                {rentRange[0]} - {rentRange[1]}
              </span>
            </div>

            <div className="mt-3">
              <Slider
                step={100}
                value={rentRange}
                onValueChange={setRentRange}
                max={20000}
                min={500}
              />
            </div>
          </Field>

          <div className="lg:w-1/3 grid grid-cols-3 gap-5">
            <Field>
              <FieldLabel htmlFor="bedrooms">Bedrooms</FieldLabel>
              <Input
                className="bg-black/30 border-2 border-black/80 focus:border-purple-500 focus:ring-blue-500/20 text-white text-lg w-full"
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

            <Field>
              <FieldLabel htmlFor="bathrooms">Bathrooms</FieldLabel>
              <Input
                className="bg-black/30 border-2 border-black/80 focus:border-purple-500 focus:ring-blue-500/20 text-white text-lg w-full"
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

            <Field>
              <FieldLabel htmlFor="halls">Halls</FieldLabel>
              <Input
                className="bg-black/30 border-2 border-black/80 focus:border-purple-500 focus:ring-blue-500/20 text-white text-lg w-full"
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
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:w-48 flex flex-col gap-1">
          <Button
            aria-label="apply filters"
            className="w-full lg:w-1/2"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>

          <Button
            aria-label="clear filters"
            className="w-full lg:w-1/2 bg-accent text-black hover:bg-accent/80"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block">
        <FilterUI />
      </div>
      <div className="block p-2 lg:hidden">
        <Drawer>
          <DrawerTrigger className="p-4 border-b-2 text-lg flex items-center gap-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            <ListFilterPlus className="size-6" />
            Filters
          </DrawerTrigger>
          <DrawerContent>
            <FilterUI />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default PropertyFilter;
