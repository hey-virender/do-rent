import PropertyBanner from "@/components/house/details-panel/PropertyBanner";
import Map from "@/components/Map";
import { getProperties } from "@/actions/property.actions";
import { HouseListing } from "@/types/house";
import PropertyFilter from "@/components/house/PropertyFilter";
import { PublicPropertyFilters } from "@/types/type";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SearchX } from "lucide-react";
interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const filters: PublicPropertyFilters = await {
    term: params.term as string | undefined,
    minRent: params.minRent ? Number(params.minRent) : undefined,
    maxRent: params.maxRent ? Number(params.maxRent) : undefined,
    bedrooms: params.bedrooms ? Number(params.bedrooms) : undefined,
    amenities: Array.isArray(params.amenities)
      ? params.amenities
      : params.amenities
        ? [params.amenities]
        : undefined,
  };
  const properties = await getProperties(filters);

  return (
    <main>
      <PropertyFilter />
      {properties.length === 0 && (
          <Empty>
            <EmptyHeader className="mt-24">
              <EmptyMedia className="size-44" variant="icon">
                <SearchX className="size-36" />
              </EmptyMedia>
              <EmptyTitle className="text-6xl font-dm-serif">No Properties</EmptyTitle>
              <EmptyDescription className="text-2xl">Try adjusting your search criteria</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      <div className="flex">
        <section className="grid grid-cols-2 py-6">
          {properties &&
            properties.map((house) => (
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
          {properties.length > 0 && (
            <Map properties={properties as HouseListing[]} />
          )}
        </section>
        
      </div>
    </main>
  );
};

export default page;
