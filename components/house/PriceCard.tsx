"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Heart,
  Share2,
  Calendar,
  PawPrint,
  Clock,
  IndianRupee,
  Facebook,
  Copy
  
} from "lucide-react";

import { HouseListing } from "@/types/house";

const PriceCard = ({ listing }: { listing: HouseListing }) => {
  const { pricing, meta, availability } = listing;
  const shareList  = [
    { name: "Facebook", icon: Facebook },
    {name: "Copy Link", icon: Copy}
  ];

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-6 text-card-foreground">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <span className="text-3xl font-bold text-primary">
            {pricing.currency} {pricing.monthly}
          </span>
          <span className="text-sm text-secondary"> / month</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-secondary" />
          <span className="text-sm text-secondary">
            Available From{" "}
            {new Date(availability.availableFrom).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-5 w-5 text-secondary" />
          <span className="text-sm text-secondary">
            Minimum Stay: {listing.rules.minimumStayMonths} months
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
        <Button variant="outline" className="w-full mb-2">
          <Heart className="h-6 w-6" />
          Save
        </Button>

        <Popover>
          <PopoverTrigger className="flex w-full items-center border-2 border-secondary/20 px-4 py-2 rounded-md text-sm hover:bg-secondary/10 justify-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </PopoverTrigger>
          <PopoverContent className="bg-primary/90 w-full" align="start">
            {shareList.map(({ name, icon: Icon }) => (
              <Button key={name} variant="outline" className="w-full mb-2">
                <Icon className="h-4 w-4" />
                {name}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default PriceCard;
