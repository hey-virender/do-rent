import "dotenv/config";
import prisma from "@/lib/prisma";

async function backfillSearchText() {
  const properties = await prisma.property.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      specs: true,
      pricing: true,
    },
  });

  for (const property of properties) {
    const searchText = [
      property.name,
      property.location.line1,
      property.location.line2,
      property.location.city,
      property.location.state,
      property.location.country,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

   await prisma.property.update({
  where: { id: property.id },
  data: {
    searchText,
    bedrooms: property.specs.bedrooms,
    bathrooms: property.specs.bathrooms,
    halls: property.specs.halls,
    areaSqft: property.specs.areaSqft,
    monthlyRent: property.pricing.monthly,
  },
});
  }

  console.log("✅ searchText backfilled successfully");
}

backfillSearchText()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
