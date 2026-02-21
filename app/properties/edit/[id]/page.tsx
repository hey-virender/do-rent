import { getMyPropertiesById } from "@/actions/property.actions";
import EditPropertyClient from "@/components/edit/EditPropertyClient";
import { HouseListing } from "@/types/house";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await getMyPropertiesById(id);
 

  if (!res.success || !res.property) {
    return <p className="text-center mt-10">Not found</p>;
  }

  return <EditPropertyClient property={res.property as HouseListing} />;
}
