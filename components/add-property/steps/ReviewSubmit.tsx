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
const ReviewSubmit = ({ onNext, onBack, isLast }: StepProps) => {
  const { draft } = usePropertyDraftStore();
  return (
    <section>
      <div>
        <h2>Name</h2>
        <p>{draft.name}</p>
      </div>
      <div>
        <h2>Overview</h2>
        <p>{draft.overview}</p>
      </div>
      <div>
        <h2>Location</h2>
        <p>{draft.location?.line1}</p>
        <p>{draft.location?.line2}</p>
        <p>
          {draft.location?.city}, {draft.location?.state},{" "}
          {draft.location?.country}
        </p>
        <div>
          <h3>Coordinates</h3>
          <p>Latitude: {draft.location?.coordinates?.lat}</p>
          <p>Longitude: {draft.location?.coordinates?.lng}</p>
        </div>
      </div>
      <div>
        <h2>Pricing</h2>
        <p>Monthly: {draft.pricing?.monthly}</p>
        <p>Currency: {draft.pricing?.currency}</p>
        <p>Deposit: {draft.pricing?.deposit}</p>
      </div>
      <div>
        <h2>Specifications</h2>
        <p>Halls: {draft.specs?.halls}</p>
        <p>Bedrooms: {draft.specs?.bedrooms}</p>
        <p>Bathrooms: {draft.specs?.bathrooms}</p>
        <p>Area (sqft): {draft.specs?.areaSqft}</p>
      </div>
      <div>
        <h2>Amenities</h2>
        {draft.amenities && draft?.amenities?.length > 0 ? (
          <ul>
            {draft?.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        ) : (
          <p>No amenities listed.</p>
        )}
      </div>
      <div>
        <h2>Photos</h2>
        <div>
          <h3>Cover:</h3>
          <Image
            src={draft.media?.cover || ""}
            alt="Cover Photo"
            width={300}
            height={200}
          />
        </div>
        <div>
          <h3>Gallery:</h3>
          {draft.media?.gallery && draft.media.gallery.length > 0 && (
            <Carousel>
              <CarouselContent>
                {draft.media.gallery.map((img, index) => (
                  <CarouselItem key={index}>
                    <Image src={img || ""} alt={img} height={200} width={300} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
      </div>
      <div>
        <h3>Rules</h3>
        {}
      </div>
      <div>
        <h3>Availability</h3>
        <p>Available From: {draft.availability?.availableFrom}</p>
        <p>Lease Terms: {draft.availability?.leaseTerms}</p>
        <p>Conditions: {draft.availability?.conditions}</p>
      </div>
      <Button onClick={onBack}>Back</Button>
      <Button onClick={onNext}>{isLast ? "Finish" : "Next"}</Button>
    </section>
  );
};

export default ReviewSubmit;
