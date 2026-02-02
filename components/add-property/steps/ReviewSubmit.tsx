"use client";
import { Button } from "@/components/ui/button";
import { StepProps } from "./step.type";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AmenitiesGrid from "@/components/house/details-panel/AmenitiesGrid";
import AvailabilityGrid from "@/components/house/details-panel/AvailabilityGrid";
import RulesGrid from "@/components/house/details-panel/RulesGrid";
import SpecsGrid from "@/components/house/details-panel/SpecsGrid";
import NearbyGrid from "@/components/house/details-panel/NearbyGrid";
const ReviewSubmit = ({ onNext, onBack, isLast }: StepProps) => {
  const { draft } = usePropertyDraftStore();
  return (
    <section className="grid grid-cols-3">
      <div>
        <h2 className="font-semibold text-lg">Name</h2>
        <p className="capitalize">{draft.name}</p>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Overview</h2>
        <p className="capitalize">{draft.overview}</p>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Location</h2>
        <p>{draft.location?.line1}</p>
        <p>{draft.location?.line2}</p>
        <p>
          {draft.location?.city}, {draft.location?.state},{" "}
          {draft.location?.country}
        </p>
        <div>
          <h3 className="font-semibold">Coordinates</h3>
          <p>Latitude: {draft.location?.coordinates?.lat}</p>
          <p>Longitude: {draft.location?.coordinates?.lng}</p>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Pricing</h2>
        <div>
         
          <p>Price per Month : {draft.pricing?.currency} {draft.pricing?.monthly}</p>
          <p>Security : {draft.pricing?.currency} {draft.pricing?.deposit}</p>


        </div>
        
      </div>
      <div className="col-span-3">
        <h2 className="font-semibold text-lg">Specifications</h2>
        <SpecsGrid specs={draft.specs!} />
      </div>
      <div className="col-span-3">
        <h2 className="font-semibold text-lg">Amenities</h2>
        {draft.amenities && draft?.amenities?.length > 0 ? (
          <AmenitiesGrid amenities={draft.amenities} />
        ) : (
          <p>No amenities listed.</p>
        )}
      </div>
      <div className="col-span-3 flex justify-between gap-8">
  
        <div>
          <h3 className="font-semibold text-lg">Cover:</h3>
          <Image
            src={draft.media?.cover?.url || ""}
            alt="Cover Photo"
            width={300}
            height={200}
          />
        </div>
        <div className="w-2/3">
          <h3 className="font-semibold text-lg">Gallery:</h3>
          {draft.media?.gallery && draft.media.gallery.length > 0 && (
            <Carousel >
              <CarouselContent>
                {draft.media.gallery.map((asset, index) => (
                  <CarouselItem key={index}>
                    <Image src={asset.url || ""} alt={asset.url} height={200} width={300} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
      </div>
      <div className="col-span-2">
        <h3 className="font-semibold text-lg">Rules</h3>
        <RulesGrid rules={draft.rules!} />
      </div>
      <div>
        <AvailabilityGrid availability={draft.availability!} />
      </div>
      <div>
        <h3 className="font-semibold text-lg">Nearby Places</h3>
        <NearbyGrid nearby={draft.nearby || []} />  
      </div>
      <div className="col-span-3 flex gap-4">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onNext}>{isLast ? "Finish" : "Next"}</Button>
      </div>
    </section>
  );
};

export default ReviewSubmit;
