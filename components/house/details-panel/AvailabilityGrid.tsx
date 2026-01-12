import React from "react";

interface Availability {
  availableFrom: string;
  leaseTerms: string;
  conditions: string;
}
interface Props {
  availabilty: Availability;
}

const AvailabilityGrid = ({ availabilty }: Props) => {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-xl">Availability</h3>
      <div className="text-lg text-muted-foreground">
        <p>
          <strong>Available From:</strong> {availabilty.availableFrom}
        </p>
        <p>
          <strong>Lease Terms:</strong> {availabilty.leaseTerms}
        </p>
        <p>
          <strong>Conditions:</strong> {availabilty.conditions}
        </p>
      </div>
    </div>
  );
};

export default AvailabilityGrid;
