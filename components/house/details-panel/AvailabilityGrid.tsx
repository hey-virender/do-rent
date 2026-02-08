import { HouseListing } from "@/types/house";

const AvailabilityGrid = ({
  availability,
}: {
  availability: HouseListing["availability"];
}) => {
  const formattedDate = new Date(availability.availableFrom).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-5">
      <h3 className="text-xl font-semibold text-primary mb-4">Availability</h3>

      <div className="grid gap-3 text-base">
        <div className="flex items-center justify-between rounded-md bg-background/60 px-4 py-3">
          <span className="text-muted-foreground">Available From</span>
          <span className="font-medium text-foreground">{formattedDate}</span>
        </div>

        <div className="flex flex-col rounded-md bg-background/60 px-4 py-3">
          <span className="text-muted-foreground">Lease Terms</span>
          <span className="font-medium text-foreground">
            {availability.leaseTerms}
          </span>
        </div>

        <div className="rounded-md bg-accent/40 px-4 py-3">
          <span className="block text-muted-foreground mb-1">Conditions</span>
          <span className="text-foreground font-medium">
            {availability.conditions}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityGrid;
