import React from "react";
import { houseListings } from "@/constants";
import PropertyBanner from "@/components/house/details-panel/PropertyBanner";
import Map from "@/components/Map";
const page = () => {
  return (
    <div className="flex">
      <section className="grid grid-cols-2">
        {houseListings.map((house) => (
          <PropertyBanner
            id={house.id}
            name={house.name}
            location={house.location}
            price={house.pricing.monthly}
            currency={house.pricing.currency}
            cover={house.media.cover}
          />
        ))}
      </section>
      <section className="w-1/3 h-[800px]">
        <Map />
      </section>
    </div>
  );
};

export default page;
