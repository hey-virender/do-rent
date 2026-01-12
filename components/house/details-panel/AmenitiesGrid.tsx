import { Wifi, Snowflake, Dumbbell, Waves,Car,Bus, CircleSlash2} from "lucide-react";

type Amenity = "wifi" | "ac" | "gym" | "pool"|"parking"|"bus facility"|"none";

const AMENITIES_MAP: Record<
  Amenity,
  { label: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }
> = {
  wifi: { label: "Wi-Fi", icon: Wifi },
  ac: { label: "AC", icon: Snowflake },
  gym: { label: "Gym", icon: Dumbbell },
  pool: { label: "Swimming Pool", icon: Waves },
  parking: { label: "Parking", icon: Car },
  "bus facility": { label: "Bus Facility", icon: Bus },
  none: { label: "No Amenities", icon: CircleSlash2 },
  
};

interface Props {
  amenities: Amenity[];
}
const AmenitiesGrid = ({ amenities }: Props) => {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {amenities.map((amenity) => {
        const Icon = AMENITIES_MAP[amenity].icon;
        return (
          <li
            key={amenity}
            className="flex flex-col items-center gap-3 rounded-lg border p-3 text-xl"
          >
            <Icon className="text-accent w-10 h-10" />
            <span className="font-medium">{AMENITIES_MAP[amenity].label}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default AmenitiesGrid;
