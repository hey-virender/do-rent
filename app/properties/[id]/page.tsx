import PropertyGallery from "@/components/house/gallery/PropertyGallery";
import HouseDetailsPanel from "@/components/house/details-panel/HouseDetailsPanel";
import Map from "@/components/Map";
import { houseListings } from "@/constants";
import { HouseListing } from "@/types/house";
import Image from "next/image";
import PriceCard from "@/components/house/PriceCard";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const property: HouseListing | undefined = houseListings.find(
    (house) => house.id === id,
  );
  console.log(property);

  const combinedImages = [
    property?.media.cover,
    ...(property?.media.gallery || []),
  ];
  return (
    <main className="grid grid-cols-3 gap-4 px-32">
      <div className="col-span-2  w-3/ rounded-xl overflow-hidden">
        <PropertyGallery images={combinedImages as string[]} />
      </div>

      <div className="col-span-1 ">
        <div className="flex justify-between px-2 pt-3">
          <div>
            <h1 className="text-2xl font-bold mb-4">{property?.name}</h1>
            <p className="text-lg mb-2 text-secondary">
              {property?.location.city}, {property?.location.state},{" "}
              {property?.location.country}
            </p>
          </div>
          <p className="text-xl text-primary font-semibold mb-4 flex flex-col items-end">
            {property?.pricing.currency} {property?.pricing.monthly}
            <span> Per month</span>
          </p>
        </div>
        <div className="h-[500px] rounded-lg overflow-hidden">
          <Map
            lat={property?.location.coordinates.lat}
            lng={property?.location.coordinates.lng}
            zoom={true}
          />
        </div>
      </div>
      <div className="col-span-2 mt-6 min-h-[300px]">
        <HouseDetailsPanel listing={property!} />
      </div>
      <div className="col-span-1 mt-6">
        <PriceCard listing={property!} />
      </div>
    </main>
  );
};

export default page;
