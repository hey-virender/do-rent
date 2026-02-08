
import PropertyBanner from "@/components/house/details-panel/PropertyBanner";
import Map from "@/components/Map";
import { getProperties } from "@/actions/property.actions";
import { HouseListing } from "@/types/house";
import PropertyFilter from "@/components/house/PropertyFilter";
import { PublicPropertyFilters } from "@/types/type";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const page = async ({ searchParams }: PageProps) => {
  const filters: PublicPropertyFilters = {
  term: searchParams.term as string | undefined,
  minRent: searchParams.minRent
    ? Number(searchParams.minRent)
    : undefined,
  maxRent: searchParams.maxRent
    ? Number(searchParams.maxRent)
    : undefined,
  bedrooms: searchParams.bedrooms
    ? Number(searchParams.bedrooms)
    : undefined,
  amenities: Array.isArray(searchParams.amenities)
    ? searchParams.amenities
    : searchParams.amenities
    ? [searchParams.amenities]
    : undefined,
};
  const properties = await getProperties(filters);

  return (
    <main>
      <PropertyFilter />
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
    </main>
  );
};

export default page;
