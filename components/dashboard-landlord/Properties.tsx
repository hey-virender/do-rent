import { getPropertiesByLandlord } from "@/actions/property.actions";
import PropertyBanner from "../house/PropertyBanner";
import { useEffect, useState } from "react";
import { HouseListing } from "@/types/house";
import { toast } from "sonner";

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
        toast.error("Failed to fetch properties");
      }
    };
    fetchProperties();
  }, []);

  return (
    <section className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
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
