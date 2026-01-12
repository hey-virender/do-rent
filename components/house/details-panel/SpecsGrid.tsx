import {
  BedDouble,
  Bath,
  Ruler,
} from "lucide-react";

interface Specs {
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
}

interface Props {
  specs: Specs;
}

export default function SpecsGrid({ specs }: Props) {
  const ITEMS = [
    {
      label: "Bedrooms",
      value: specs.bedrooms,
      icon: BedDouble,
    },
    {
      label: "Bathrooms",
      value: specs.bathrooms,
      icon: Bath,
    },
    {
      label: "Area",
      value: `${specs.areaSqft} sqft`,
      icon: Ruler,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {ITEMS.map(({ label, value, icon: Icon }) => (
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
            <span className="text-lg text-muted-foreground">
              {label}
            </span>
            <span className="font-semibold text-xl">
              {value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
