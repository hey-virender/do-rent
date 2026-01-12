"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { LISTING_TABS } from "@/config/listing-tabs.config";
import TabRenderer from "./TabRenderer";
import type { HouseListing } from "@/types/house";

interface Props {
  listing: HouseListing;
}

export default function HouseDetailsPanel({ listing }: Props) {
  return (
    <Tabs defaultValue="overview" className="w-full h-full">
      <TabsList
        className="
          grid w-full grid-cols-7 bg-muted
          [&_[data-state=active]]:bg-accent
          [&_[data-state=active]]:text-accent-foreground
      
        "
      >
        {LISTING_TABS.map(({ key, label, icon: Icon }) => (
          <TabsTrigger
            key={key}
            value={key}
            className="flex items-center gap-2 text-lg font-medium justify-center"
          >
            <Icon className="h-7 w-7" />
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {LISTING_TABS.map(({ key }) => (
        <TabsContent key={key} value={key} className="pt-6">
          <TabRenderer type={key} listing={listing} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
