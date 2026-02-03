import React from "react";

interface Availability {
  availableFrom: string;
  leaseTerms: string;
  conditions: string;
}
interface Props {
  availability: Availability;
}

const AvailabilityGrid = ({ availability }: Props) => {
  console.log(availability);
  const formattedDate = new Date(availability.availableFrom).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div>
      <h3 className="font-semibold mb-2 text-xl">Availability</h3>
      <div className="text-lg text-muted-foreground">
        <p>
          <strong>Available From:</strong> {formattedDate}
        </p>
        <p>
          <strong>Lease Terms:</strong> {availability.leaseTerms}
        </p>
        <p>
          <strong>Conditions:</strong> {availability.conditions}
        </p>
      </div>
    </div>
  );
};

export default AvailabilityGrid;
