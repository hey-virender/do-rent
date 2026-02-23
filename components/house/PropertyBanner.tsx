import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PropertyBannerProps {
  id: string | number | undefined;
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
  link?: string;
  priority?: boolean;
}

const PropertyBanner = ({
  id,
  name,
  location,
  price,
  currency,
  cover,
  link,
  priority = false
}: PropertyBannerProps) => {
  return (
    <div key={id} className="px-4">
      <Link aria-label={`View property details for ${name}`} href={link ? link : `/properties/${id}`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold">{name}</h1>
            <p className="text-primary lg:text-lg font-medium tracking-tight lg:tracking-wide">
              {location.city}, {location.state}, {location.country}
            </p>
          </div>
          <div className="flex flex-col lg:text-lg font-semibold">
            <span className="text-xl lg:text-2xl">
              {currency}
              {price}
            </span>
            <span className="text-primary">Per month</span>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden aspect-[3/2] mt-4">
          <Image
            className="w-full h-full"
            src={cover}
            alt={name}
            priority={priority}
            sizes="(max-width: 768px) 100vw,
       (max-width: 1024px) 50vw,
       33vw"
          />
        </div>
      </Link>
    </div>
  );
};

export default PropertyBanner;
