
import PropertyBanner from "@/components/house/details-panel/PropertyBanner";
import Map from "@/components/Map";
import { getProperties } from "@/actions/property.actions";
import { HouseListing } from "@/types/house";

const page = async () => {
  const properties = await getProperties();


  return (
    <div className="flex">
      <section className="grid grid-cols-2 py-6">
        {properties && properties.map((house) => (
          <PropertyBanner
          key={house.id}
            id={house.id}
            name={house.name}
            location={house.location}
            price={house.pricing.monthly}
            currency={house.pricing.currency}
            cover={house.media.cover.url}
          />
        ))}
      </section>
      <section className="w-1/3 h-[800px]">
        <Map properties={properties as HouseListing[]} />
      </section>
    </div>
  );
};

export default page;
