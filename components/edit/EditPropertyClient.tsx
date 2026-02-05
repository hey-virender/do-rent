// app/properties/[id]/edit/EditPropertyClient.tsx
"use client";

import { useEffect } from "react";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import AddPropertyWizard from "@/components/add-property/AddPropertyWizard";
import { HouseListing } from "@/types/house";

export default function EditPropertyClient({
  property,
}: {
  property: HouseListing;
}) {
  const { setEditDraft } = usePropertyDraftStore();

  useEffect(() => {
    
    setEditDraft(property);
  }, [property]);

  return <AddPropertyWizard mode="edit" />;
}
