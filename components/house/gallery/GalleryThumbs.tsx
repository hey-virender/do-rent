"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Props {
  images: string[];
  mainApi: CarouselApi | undefined;
}

const GalleryThumbs = ({ images, mainApi }: Props) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!mainApi) return;

    setSelected(mainApi.selectedScrollSnap());
    mainApi.on("select", () => setSelected(mainApi.selectedScrollSnap()));
  }, [mainApi]);
  return (
    <Carousel
      className="mt-3"
      opts={{ containScroll: "keepSnaps", dragFree: true }}
    >
      <CarouselContent className="gap-3">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="basis-20 cursor-pointer"
            onClick={() => mainApi?.scrollTo(index)}
          >
            <div
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-md border",
                selected === index && "ring-2 ring-primary",
              )}
            >
              <Image
                src={image}
                alt={`Thumbnail Image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default GalleryThumbs;
