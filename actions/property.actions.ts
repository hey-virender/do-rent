'use server'
import { auth } from "@/auth";
import { deleteImage, imagekit, updateImageMetaData } from "@/lib/imagekit";
import prisma from "@/lib/prisma";
import { HouseListing } from "@/types/house";
import { ImageAsset, PublicPropertyFilters } from "@/types/type";
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

 
 
 

 const {name,media,location,overview,pricing,specs,amenities,nearby,rules,availability,meta} = propertyData;
  const searchText = `${name} ${location.line1} ${location.line2 || ""} ${location.city} ${location.state} ${location.country}`.toLowerCase();
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
      searchText,
        
        bedrooms: specs.bedrooms,
        bathrooms: specs.bathrooms,
        halls: specs.halls,
        areaSqft: specs.areaSqft,
        monthlyRent: pricing.monthly,
    },
  });

  if (!newProperty) {
    return {
      success: false,
      error: "Failed to create property",
    };
  }

  await updateImageMetaData(newProperty.media.cover, { status: "permanent"});
  if(newProperty.media.gallery){
    newProperty.media.gallery.forEach( async (image) => {
      await updateImageMetaData(image, { status: "permanent"});
    });
  }
 

  return {
    success: true,
    property: newProperty,
  };
 

}

export const getProperties = async (
  filters: PublicPropertyFilters = {}
) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return prisma.property.findMany({
    where: {
      meta: {
        status: "active",
      },
      
      availability: {
      is: {
        availableFrom: {
          lte: today,
        },
      },
    },

     ...filters.term && {
      searchText: {
        contains: filters.term.toLowerCase(),
      },
    },

      

      // 💰 RENT
      ...(filters.minRent || filters.maxRent
        ? {
            monthlyRent: {
                ...(filters.minRent && { gte: filters.minRent }),
                ...(filters.maxRent && { lte: filters.maxRent }),
              },
            
          }
        : {}),

      // 🏠 ROOMS
      ...(filters.bedrooms && {
         bedrooms: { gte: filters.bedrooms } ,
      }),

      ...(filters.bathrooms && {
        bathrooms: { gte: filters.bathrooms } ,
      }),

      ...(filters.halls && {
        halls: { gte: filters.halls } ,
      }),

      ...(filters.areaSqft && {
        areaSqft: { gte: filters.areaSqft } ,
      }),

      
      // 🧩 AMENITIES
      ...(filters.amenities?.length && {
        amenities: {
          hasEvery: filters.amenities,
        },
      }),
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


export const getPropertiesByLandlord = async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }
  const properties = await prisma.property.findMany({
    where: { landlordId: session.user.id },
    include:{
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    }
  });
  return {
    success: true,
    properties,
  };
} 

export const getMyPropertiesById = async(propertyId: string) => {
  if(!propertyId){
    return {
      success: false,
      error: "Property ID is required",
    }
  }
  const session = await auth();
  if (!session?.user || session.user.role !== "landlord" ) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      landlordId: session.user.id,
    },
  });
  if(!property){
    return {
      success: false,
      error: "Property not found",
    }
  }
  return {
    success: true,
    property,
  };

}

export const updateProperty = async (propertyId: string, propertyData: HouseListing) => {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });
  if (!property) {
    return {
      success: false,
      error: "Property not found",
    };
  }
  if (property.landlordId !== session.user.id) {
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
  const {name,media,location,overview,pricing,specs,amenities,nearby,rules,availability,meta} = propertyData;
  if(media.cover.fileId !== property.media.cover.fileId){
    await updateImageMetaData(media.cover, { status: "permanent"});
    await deleteImage(property.media.cover.fileId);
  }
  const updatedProperty = await prisma.property.update({
    where: { id: propertyId },
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
      
    },
  });
  return {
    success: true,
    property: updatedProperty,
  };
}

export const deletePropertyImages = async (propertyId: string,fileId:string,imageType:"cover" | "gallery") => {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }
  const property = await prisma.property.findUnique({
    where: { id: propertyId },

  });
  if (!property) {
    return {
      success: false,
      error: "Property not found",
    };

  }
  if (property.landlordId !== session.user.id) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }
  if(imageType === "cover"){
    if(property.media.cover.fileId === fileId){
      const result = await deleteImage(fileId);
      if(result.success){
        await prisma.property.update({
        where: { id: propertyId },
        data: { 
          media: {
            ...property.media,
            cover: { url: '', fileId: '' },
          },
         },
      });
      }
      return {
        success: result.success,
        message: result.success ? "Cover image deleted successfully" : "Failed to delete cover image",
      };
    }
  }else{
    const updatedGallery = property.media.gallery.filter(image => image.fileId !== fileId);
    const result = await deleteImage(fileId);
    if(result.success){
      await prisma.property.update({
        where: { id: propertyId },
        data: { 
          media: {
            ...property.media,
            gallery: updatedGallery,
          },
         },
      });
    }
    return {
      success: result.success,
      message: result.success ? "Image deleted successfully" : "Failed to delete image",
    }
  }
  return {
    success: false,
    error: "Image not found in property",
  }
  
}

export const deleteImageByFileId = async (fileId: string) => {
 const result =  await deleteImage(fileId);
  return result;
}

