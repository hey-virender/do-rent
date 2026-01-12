import { Nearby } from "@/types/house";
import {
  Train,
  Hospital,
  School,
  ShoppingBag,
  MapPin,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  metro: Train,
  hospital: Hospital,
  school: School,
  mall: ShoppingBag,
};

interface Props {
  nearby: Nearby[];
}

export default function NearbyGrid({ nearby }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {nearby.map((item, index) => {
        const Icon = ICON_MAP[item.type] ?? MapPin;

        return (
          <div
            key={`${item.type}-${index}`}
            className="flex items-center gap-6 rounded-lg border p-4"
          >
            <Icon className="h-10 w-10 text-primary" />

            <div className="flex flex-col">
              <span className="font-medium text-xl">
                {item.name}
              </span>
              <span className="text-lg text-muted-foreground">
                {item.distanceKm} km away
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
