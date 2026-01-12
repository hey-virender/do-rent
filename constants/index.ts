import { HouseListing } from "@/types/house";

export const houseListings : HouseListing[] = [
  {
  id: "listing_001",
  name: "Cozy Apartment in Downtown",

  meta: {
    status: "active",
    createdAt: "2026-01-10",
  },

  location: {
    city: "New York",
    state: "NY",
    country: "US",
    coordinates: {
      lat: 31.105,
      lng: 77.164,
    },
  },

  pricing: {
    monthly: 2500,
    currency: "INR",
    deposit: 5000,
  },

  media: {
    cover: "/assets/images/house1.jpg",
    gallery: [
      "/assets/images/house1-1.jpg",
      "/assets/images/house1-2.jpg",
      "/assets/images/house1-3.jpg",
      "/assets/images/house1-4.jpg",
    ],
  },

  specs: {
    bedrooms: 2,
    bathrooms: 1,
    areaSqft: 850,
  },

  amenities: [
    "wifi",
    "ac",
    "gym",
    "pool",
  ],

  overview:
    "A beautiful and cozy apartment located in the heart of downtown with easy access to all amenities.",

  ownerSnapshot: {
    name: "John Doe",
    phone: "123-456-7890",
    email: "example@example.com",
  },

   nearby:[
    {
      type: "school",
      name: "Greenwood High School",
      distanceKm: 1.2,
    },
    {
      type: "hospital",
      name: "City Hospital",
      distanceKm: 2.5,
    },
    {
      type: "supermarket",
      name: "Fresh Mart",
      distanceKm: 0.8,
    },
  ],

  rules:{
    minimumStayDays: 30,
    petsAllowed: true,
    smokingAllowed: false,
    
  },

  availability:{
    availableFrom: "2026-02-01",
    leaseTerms: "12 months",
    conditions: "No subletting allowed",
  }
  },
 {
  id: "listing_002",
  name: "Modern Loft with City View",

  meta: {
    status: "active",
    createdAt: "2026-01-10",
  },

  location: {
    city: "New York",
    state: "NY",
    country: "US",
    coordinates: {
      lat: 31.105,
      lng: 77.164,
    },
  },

  pricing: {
    monthly: 2500,
    currency: "INR",
    deposit: 5000,
  },

  media: {
    cover: "/assets/images/house2.jpg",
    gallery: [],
  },

  specs: {
    bedrooms: 2,
    bathrooms: 1,
    areaSqft: 850,
  },

  amenities: [
    "wifi",
    "ac",
    "gym",
    "pool",
  ],

  overview:
    "A beautiful and cozy apartment located in the heart of downtown with easy access to all amenities.",

  ownerSnapshot: {
    name: "John Doe",
    phone: "123-456-7890",
    email: "example@example.com",
  },
    nearby:[
    {
      type: "school",
      name: "Greenwood High School",
      distanceKm: 1.2,
    },
    {
      type: "hospital",
      name: "City Hospital",
      distanceKm: 2.5,
    },
    {
      type: "supermarket",
      name: "Fresh Mart",
      distanceKm: 0.8,
    },
  ],
  rules:{
    minimumStayDays: 30,
    petsAllowed: true,
    smokingAllowed: false,
  
  },

  availability:{
    availableFrom: "2026-02-01",
    leaseTerms: "12 months",
    conditions: "No subletting allowed",
  }
}

]

export async function getCoordinates(address: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  );
  const data = await res.json();

  if (!data.length) return null;

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}


