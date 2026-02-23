import PropertyGallery from "@/components/house/gallery/PropertyGallery";
import HouseDetailsPanel from "@/components/house/details-panel/HouseDetailsPanel";
import Map from "@/components/Map";
import PriceCard from "@/components/house/PriceCard";
import { Separator } from "@/components/ui/separator";
import { getPropertyById } from "@/actions/property.actions";
import { HouseListing } from "@/types/house";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const property = await getPropertyById(id);
 

  const combinedImages = [
    property?.media?.cover.url,
    ...(property?.media.gallery.map(image => image.url) || []),
  ];
  return (
    <main className="lg:grid lg:grid-cols-3 gap-4 px-2 lg:px-6">
      <div className="lg:col-span-2 lg:py-8 lg:pr-4 rounded-xl flex justify-center items-center overflow-hidden">
        <PropertyGallery images={combinedImages as string[]} />
      </div>

      <div className="lg:col-span-1 ">
        <div className="flex justify-between px-2 pt-3">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold mb-4">{property?.name}</h1>
            <p className="lg:text-lg mb-2 text-secondary">
              {property?.location.city}, {property?.location.state},{" "}
              {property?.location.country}
            </p>
          </div>
          <p className="lg:text-xl text-primary font-semibold mb-4 flex flex-col items-end">
            {property?.pricing.currency} {property?.pricing.monthly}
            <span> Per month</span>
          </p>
        </div>
        <div className="h-[200px] lg:h-[400px] rounded-lg overflow-hidden">
          <Map
            lat={property?.location.coordinates.lat}
            lng={property?.location.coordinates.lng}
            properties={[property] as HouseListing[]}
            zoom={true}
          />
        </div>
      </div>
      <Separator className="w-full lg:col-span-3 bg-primary" />
      <div className="mt-3 lg:col-span-2 lg:mt-6 min-h-[300px]">
        <HouseDetailsPanel listing={property as HouseListing} />
      </div>
      <div className="mt-3 lg:col-span-1 lg:mt-6">
        <PriceCard listing={property as HouseListing} />
      </div>
    </main>
  );
};

export default page;
