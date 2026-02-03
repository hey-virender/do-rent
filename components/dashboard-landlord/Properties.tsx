import { getPropertiesByLandlord } from "@/actions/property.actions";
import PropertyBanner from "../house/details-panel/PropertyBanner";
import { useEffect, useState } from "react";
import { HouseListing } from "@/types/house";

const Properties = () => {
  const [myProperties, setMyProperties] = useState<HouseListing[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchProperties = async () => {
      try {
        const res = await getPropertiesByLandlord();
        if (mounted) {
          setMyProperties(res.properties as HouseListing[]);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <section className="grid grid-cols-2">
      {myProperties &&
        myProperties.map((property) => (
          <PropertyBanner
            key={property.id}
            id={property.id}
            name={property.name}
            location={property.location}
            price={property.pricing.monthly}
            currency={property.pricing.currency}
            cover={property.media.cover.url}
            link={`/properties/edit/${property.id}`}
          />
        ))}
    </section>
  );
};

export default Properties;
