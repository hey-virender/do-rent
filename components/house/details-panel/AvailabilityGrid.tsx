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
  return (
    <div>
      <h3 className="font-semibold mb-2 text-xl">Availability</h3>
      <div className="text-lg text-muted-foreground">
        <p>
          <strong>Available From:</strong> {availability.availableFrom}
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
