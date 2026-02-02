'use server'
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { HouseListing } from "@/types/house";
import { ImageAsset } from "@/types/type";
import { houseSchama } from "@/validations/house.validation";

export const createProperty = async (propertyData: HouseListing) => {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }
  if(session.user.role !== "landlord" && session.user.role !== "admin"){
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const parsed = houseSchama.safeParse(propertyData);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

 
 
 console.log("parsed data", parsed.data);

 const {name,media,location,overview,pricing,specs,amenities,nearby,rules,availability,meta} = propertyData;

  const newProperty = await prisma.property.create({
    data: {
      name,
      overview,
      meta:{
        status: meta.status,
      },
      location:{
        line1: location.line1,
        line2: location.line2,
        city: location.city,
        state: location.state,
        country: location.country,
        pinCode: location.pinCode,
        coordinates: {
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
        }
      },
      pricing:{
        monthly: pricing.monthly,
        currency: pricing.currency,
        deposit: pricing.deposit,
      },
      specs:{
        halls: specs.halls,
        bedrooms: specs.bedrooms,
        bathrooms: specs.bathrooms,
        areaSqft: specs.areaSqft,},
      amenities,
      media :{
        cover: media.cover as ImageAsset,
        gallery: media.gallery as ImageAsset[],
      },
      nearby,
      rules:{
        minimumStayMonths: rules.minimumStayMonths,
        petsAllowed: rules.petsAllowed,
        smokingAllowed: rules.smokingAllowed,
        partiesAllowed: rules.partiesAllowed,
      },
      availability:{
        availableFrom: new Date(availability.availableFrom),
        leaseTerms: availability.leaseTerms,
        conditions: availability.conditions,
      },
      landlordId: session.user.id,
    },
  });

  if (!newProperty) {
    return {
      success: false,
      error: "Failed to create property",
    };
  }

  

  return {
    success: true,
    property: newProperty,
  };
  //Todo remove the status "temp" images from imagekit if property creation is successful

}

export const getProperties = async () => {
  return await prisma.property.findMany({
  where: {
    meta: { status: "active" },
    availability: {
      is: {
        availableFrom: {
          gte: new Date(),
        },
      },
    },
  },
});

};

export const getPropertyById = async (propertyId: string) => {
  const property = await prisma.property.findUnique({
  where: { id: propertyId },
  include:{
    landlord: {
      select: {
        id: true,
        name: true,
        email: true,
        
  }
}}});



  return property;
}
