import type { ListingTabKey } from "@/config/listing-tabs.config";
import type { Amenity, HouseListing } from "@/types/house";
import AmenitiesGrid from "./AmenitiesGrid";
import SpecsGrid from "./SpecsGrid";
import OwnerCard from "./OwnerCard";
import RulesGrid from "./RulesGrid";
import NearbyGrid from "./NearbyGrid";
import AvailabilityGrid from "./AvailabilityGrid";
import { User } from "@/types/user";

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
      return <AmenitiesGrid amenities={listing.amenities as Amenity[]} />;

    case "specs":
      return <SpecsGrid specs={listing.specs} />;

    case "owner":
      return <OwnerCard owner={listing.landlord as Partial<User>} />;

    case "rules":
      return <RulesGrid rules={listing.rules} />;
    
    case "nearby":
      return <NearbyGrid nearby={listing.nearby} />;
    
    case "availability":
      return <AvailabilityGrid availability={listing.availability} />;

    default:
      return null;
  }
}
