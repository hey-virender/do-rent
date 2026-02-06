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
import { Amenity, HouseListing } from "@/types/house";
const ReviewSubmit = ({ mode, onNext, onBack, isLast }: StepProps) => {
  const { draft, editDraft } = usePropertyDraftStore();
  const currentData = mode === "create" ? draft : editDraft;
  return (
    <section className="grid grid-cols-3">
      <div>
        <h2 className="font-semibold text-lg">Name</h2>
        <p className="capitalize">{currentData.name}</p>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Overview</h2>
        <p className="capitalize">{currentData.overview}</p>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Location</h2>
        <p>{currentData.location?.line1}</p>
        <p>{currentData.location?.line2}</p>
        <p>
          {currentData.location?.city}, {currentData.location?.state},{" "}
          {currentData.location?.country}
        </p>
        <div>
          <h3 className="font-semibold">Coordinates</h3>
          <p>Latitude: {currentData.location?.coordinates?.lat}</p>
          <p>Longitude: {currentData.location?.coordinates?.lng}</p>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Pricing</h2>
        <div>
          <p>
            Price per Month : {currentData.pricing?.currency}{" "}
            {currentData.pricing?.monthly}
          </p>
          <p>
            Security : {currentData.pricing?.currency}{" "}
            {currentData.pricing?.deposit}
          </p>
        </div>
      </div>
      <div className="col-span-3">
        <h2 className="font-semibold text-lg">Specifications</h2>
        <SpecsGrid specs={currentData.specs as HouseListing["specs"]} />
      </div>
      <div className="col-span-3">
        <h2 className="font-semibold text-lg">Amenities</h2>
        {currentData.amenities && currentData?.amenities?.length > 0 ? (
          <AmenitiesGrid amenities={currentData.amenities as Amenity[]} />
        ) : (
          <p>No amenities listed.</p>
        )}
      </div>
      <div className="col-span-3 flex justify-between gap-8">
        <div>
          <h3 className="font-semibold text-lg">Cover:</h3>
          <Image
            src={currentData.media?.cover?.url || ""}
            alt="Cover Photo"
            width={300}
            height={200}
          />
        </div>
        <div className="w-2/3">
          <h3 className="font-semibold text-lg">Gallery:</h3>
          {currentData.media?.gallery &&
            currentData.media.gallery.length > 0 && (
              <Carousel className="w-full">
                <CarouselContent>
                  {currentData.media.gallery.map((asset, index) => (
                    <CarouselItem key={index} className="border-2 border-primary rounded-lg w-1/3">
                      <Image
                        src={asset.url || ""}
                        alt={asset.url}
                        height={200}
                        width={300}
                        className="object-cover size-fit"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            )}
        </div>
      </div>
      <div className="col-span-2">
        <h3 className="font-semibold text-lg">Rules</h3>
        <RulesGrid rules={currentData.rules as HouseListing["rules"]} />
      </div>
      <div>
        <AvailabilityGrid
          availability={
            currentData.availability as HouseListing["availability"]
          }
        />
      </div>
      <div>
        <h3 className="font-semibold text-lg">Nearby Places</h3>
        <NearbyGrid
          nearby={(currentData.nearby as HouseListing["nearby"]) || []}
        />
      </div>
      <div className="col-span-3 flex justify-start gap-2 mt-4">
        <Button className="bg-accent text-black px-7" onClick={onBack}>
          Back
        </Button>
        <Button className="px-7" onClick={onNext}>
          {isLast ? "Finish" : "Next"}
        </Button>
      </div>
    </section>
  );
};

export default ReviewSubmit;
