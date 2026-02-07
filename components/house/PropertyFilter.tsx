"use client";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";

import { Slider } from "../ui/slider";
import { useState } from "react";
import { amenitiesList, rulesFilterList } from "@/constants";

import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const PropertyFilter = () => {
  const [rentRange, setRentRange] = useState([500, 20000]);
  return (
    <FieldSet className="bg-primary/50 p-4 grid grid-cols-2">
      <FieldGroup className="grid grid-cols-2">
        <Field className="w-fit">
          <FieldLabel htmlFor="city">City</FieldLabel>
          <Input type="text" id="city" name="city" placeholder="Enter City" />
        </Field>
        <Field className="w-fit">
          <FieldLabel htmlFor="state">State</FieldLabel>
          <Input
            type="text"
            id="state"
            name="state"
            placeholder="Enter State"
          />
        </Field>
        <FieldGroup >
       
        <Popover>
          <PopoverTrigger className="flex">
            <Button>Select Amenities</Button>
          </PopoverTrigger>
          <PopoverContent className="bg-accent" align="start">
           
            {amenitiesList.map((amenity) => (
              <div className="flex justify-between items-center py-1" key={amenity}>
                <FieldLabel className="capitalize" htmlFor={amenity}>
                  {amenity}
                </FieldLabel>
                <Checkbox id={amenity} name="amenities" value={amenity} />
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </FieldGroup>
      <FieldGroup>
        
        <Popover>
          <PopoverTrigger className="flex">
            <Button>Select Rules</Button>
          </PopoverTrigger>
          <PopoverContent className="bg-accent" align="start">
           
            {rulesFilterList.map((rule) => (
              <div className="flex justify-between items-center py-1" key={rule}>
                <FieldLabel className="capitalize" htmlFor={rule}>
                  {rule}
                </FieldLabel>
                <Switch className="border border-black"  id={rule} name="rules" value={rule} />
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </FieldGroup>
      </FieldGroup>
      <FieldGroup className="grid grid-cols-3">
        <Field className="col-span-3">
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
        <Field className="w-fit">
          <FieldLabel htmlFor="bedroomsMin">Minimum Bedrooms</FieldLabel>
          <Input
            type="number"
            id="bedroomsMin"
            name="bedroomsMin"
            inputMode="numeric"
            min={1}
            max={10}
          />
        </Field>
        <Field className="w-fit">
          <FieldLabel htmlFor="bathRoomsMin">Minimum Bathrooms</FieldLabel>
          <Input
            type="number"
            id="bathRoomsMin"
            name="bathRoomsMin"
            inputMode="numeric"
            min={1}
            max={10}
          />
        </Field>
        <Field className="w-fit">
          <FieldLabel htmlFor="hallsMin">Minimum Halls</FieldLabel>
          <Input
            type="number"
            id="hallsMin"
            name="hallsMin"
            inputMode="numeric"
            min={0}
            max={10}
          />
        </Field>
      </FieldGroup>
      
    </FieldSet>
  );
};

export default PropertyFilter;
