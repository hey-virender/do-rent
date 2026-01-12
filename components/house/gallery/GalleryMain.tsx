"use client";

import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselApi,
} from "@/components/ui/carousel";

import Image from "next/image";
import { useEffect } from "react";

interface Props {
  images: string[];
  api: CarouselApi | undefined;
  setApi: (api: CarouselApi) => void;
}

const GalleryMain = ({ images, api, setApi }: Props) => {
  return (
    <Carousel
      className="w-full"
      setApi={setApi}
      opts={{ align: "start", loop: true }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={image}
                alt={`Gallery Image ${index + 1}`}
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

export default GalleryMain;
