export interface HouseListing {
  id: string;
  name: string;

  meta: {
    status: "active" | "inactive";
    createdAt: string;
  };

  location: {
    city: string;
    state: string;
    country: string;
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
    cover: string;
    gallery?: string[];
  };

  specs: {
    bedrooms: number;
    bathrooms: number;
    areaSqft: number;
  };

  amenities: ("wifi" | "ac" | "gym" | "pool"|"parking"|"bus facility")[];

  overview: string;

  ownerSnapshot: {
    name: string;
    phone: string;
    email?: string;
  };
  nearby: Nearby[];

  rules:{
    minimumStayMonths: number;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    partiesAllowed: boolean;
    
    
  }
  availability:{
    availableFrom: string;
    leaseTerms: string;
    conditions: string;

  }
}

export interface Nearby{
  type: string;
  name: string;
  distanceKm: number;
}


