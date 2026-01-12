import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PropertyBannerProps {
  id: string | number;
  name: string;
  location: {
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: number;
  currency: string;
  cover: string;
}

const PropertyBanner = ({
  id,
  name,
  location,
  price,
  currency,
  cover,
}: PropertyBannerProps) => {
  return (
    <div key={id} className="px-4">
      <Link href={`/properties/${id}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-primary text-lg font-medium tracking-wide">
            {location.city}, {location.state}, {location.country}
          </p>
        </div>
        <div className="flex flex-col text-lg font-semibold">
          <span className="text-2xl">{currency}{price}</span>
          <span className="text-primary">Per month</span>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden h-[365px] mt-4">
        <Image
          className="w-full h-full"
          src={cover}
          alt={name}
          width={500}
          height={300}
        />
      </div>
      </Link>
    </div>
  );
};

export default PropertyBanner;
