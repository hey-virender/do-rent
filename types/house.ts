
import { ImageAsset, Ref } from "./type";
import { User } from "./user";

export interface HouseListing {
  id?: string;
  name: string;

  meta: {
    status: "active" | "inactive"|"occupied";
    
  };

  location: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
    pinCode?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };

  pricing: {
    monthly: number;
    currency: string;
    deposit: number;
  };

  media: {
    cover: ImageAsset;
    gallery?: ImageAsset[];
  };

  specs: {
    halls: number;
    bedrooms: number;
    bathrooms: number;
    areaSqft: number;
  };

  amenities: string[];

  overview: string;
  landlordId?: string;
  landlord?: Ref<Partial<User>>;
  nearby: Nearby[];

  rules:{
    minimumStayMonths: number;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    partiesAllowed: boolean;
    
    
  }
  availability:{
    availableFrom: Date | string;
    leaseTerms: string;
    conditions: string;

  }
}

export interface Nearby{
  type: string;
  name: string;
  distanceKm: number;
}


export type Amenity = "wifi" | "ac" | "gym" | "pool"|"parking"|"bus facility"|"none";