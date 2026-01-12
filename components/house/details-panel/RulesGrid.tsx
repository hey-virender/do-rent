import { HouseListing } from "@/types/house";
import { CalendarCheck2, Dog, Cigarette, CigaretteOff } from "lucide-react";

const RulesGrid = ({ rules }: { rules: HouseListing["rules"] }) => {
  const RULES = [
    {
      label: "Minimum Stay (Days)",
      value: rules.minimumStayDays,
      icon: CalendarCheck2,
    },
    {
      label: "Pets Allowed",
      value: rules.petsAllowed ? "Yes" : "No",
      icon: rules.petsAllowed ? Dog : Dog,
    },
    {
      label: "Smoking Allowed",
      value: rules.smokingAllowed ? "Yes" : "No",
      icon: rules.smokingAllowed ? Cigarette : CigaretteOff,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {RULES.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="
            flex items-center gap-3
            rounded-lg border p-4
            bg-card text-card-foreground
          "
        >
          <Icon className="h-10 w-10 text-primary" />
          <div className="flex flex-col">
            <span className="text-lg text-muted-foreground">{label}</span>
            <span className="font-semibold text-xl">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RulesGrid;
