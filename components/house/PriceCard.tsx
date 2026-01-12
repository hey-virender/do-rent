"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Heart, Share2, Calendar, PawPrint, Clock,IndianRupee } from "lucide-react";

import { HouseListing } from "@/types/house";

const PriceCard = ({ listing }: { listing: HouseListing }) => {
  const { pricing, meta, availability } = listing;
  const active = meta.status === "active";
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-6 text-card-foreground">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <span className="text-3xl font-bold text-primary">
            {pricing.currency} {pricing.monthly}
          </span>
          <span className="text-sm text-secondary"> / month</span>
        </div>
        <Badge variant={active ? "default" : "secondary"}>
          {meta.status.toUpperCase()}
        </Badge>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-secondary" />
          <span className="text-sm text-secondary">
            Available From {availability.availableFrom}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-5 w-5 text-secondary" />
          <span className="text-sm text-secondary">
            Minimum Stay: {listing.rules.minimumStayDays} days
          </span>
        </div>
        <div className="flex items-center gap-2">
          <PawPrint className="h-5 w-5 text-secondary" />
          <span className="text-sm text-secondary">
            Pets Allowed: {listing.rules.petsAllowed ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <IndianRupee className="h-5 w-5 text-secondary" />
          <span className="text-sm text-secondary">
            Security Deposit: {pricing.currency} {pricing.deposit}
          </span>
        </div>
      </div>
      <div>
        <Button className="w-full mb-2">Contact Owner</Button>
        <Button variant="outline" className="w-full mb-4">
          <Heart className="h-6 w-6" />
          Save
        </Button>
        <Button variant="outline" className="w-full">
          <Share2 className="h-6 w-6" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default PriceCard;
