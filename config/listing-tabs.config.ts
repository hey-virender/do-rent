import {
  FileText,
  Grid,
  ListChecks,
  User,
  Gavel,
  ShieldCheck,
  MapPinHouse
} from "lucide-react";

export type ListingTabKey = 
| "overview"
| "amenities"
| "specs"
| "owner"
| "rules"
| "availability"
| "nearby";

export interface ListingTab {
  key: ListingTabKey;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const LISTING_TABS = [
  {key: "overview", label: "Overview", icon: FileText},
  {key: "amenities", label: "Amenities", icon: ListChecks},
  {key: "specs", label: "Specs", icon: Grid},
  {key: "owner", label: "Owner", icon: User},
  {key: "rules", label: "Rules", icon: Gavel},
  {key: "availability", label: "Availability", icon: ShieldCheck},
  {key: "nearby", label: "Nearby", icon: MapPinHouse},

] as const;