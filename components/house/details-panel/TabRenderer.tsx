import type { ListingTabKey } from "@/config/listing-tabs.config";
import type { HouseListing } from "@/types/house";
import AmenitiesGrid from "./AmenitiesGrid";
import SpecsGrid from "./SpecsGrid";
import OwnerCard from "./OwnerCard";
import RulesGrid from "./RulesGrid";
import NearbyGrid from "./NearbyGrid";
import AvailabilityGrid from "./AvailabilityGrid";

interface Props {
  type: ListingTabKey;
  listing: HouseListing;
}

export default function TabRenderer({ type, listing }: Props) {
  switch (type) {
    case "overview":
      return (
        <p className="text-muted-foreground leading-relaxed text-lg">
          {listing.overview}
        </p>
      );

    case "amenities":
      return <AmenitiesGrid amenities={listing.amenities} />;

    case "specs":
      return <SpecsGrid specs={listing.specs} />;

    case "owner":
      return <OwnerCard owner={listing.ownerSnapshot} />;

    case "rules":
      return <RulesGrid rules={listing.rules} />;
    
    case "nearby":
      return <NearbyGrid nearby={listing.nearby} />;
    
    case "availability":
      return <AvailabilityGrid availabilty={listing.availability} />;

    default:
      return null;
  }
}
