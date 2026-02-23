import { BedDouble, Bath, Ruler } from "lucide-react";

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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:grid-cols-5">
      {ITEMS.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="
            flex items-center gap-3
            rounded-lg border p-4
            bg-card text-card-foreground
          "
        >
          <Icon className="lg:h-10 lg:w-10 text-primary" />
          <div className="flex flex-col">
            <span className="lg:text-lg text-muted-foreground">{label}</span>
            <span className="font-semibold text-lg lg:text-xl">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
