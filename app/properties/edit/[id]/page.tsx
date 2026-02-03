import { getMyPropertiesById } from "@/actions/property.actions";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import { HouseListing } from "@/types/house";

const page = async ({params}:{params:{id:string}}) => {
  const id = await params.id;
  const {editDraft,setEditDraft} = usePropertyDraftStore();
  const property = await getMyPropertiesById(id);
  if(property.success && property.property){
    setEditDraft(property.property as HouseListing);
  }
  return (
    <main>page</main>
  )
}

export default page