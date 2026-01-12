'use client'

import { useState } from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import GalleryMain from "./GalleryMain"
import GalleryThumbs from "./GalleryThumbs"

interface Props {
  images: string[];
}

const PropertyGallery = ({ images }: Props) => {
  const [mainApi, setMainApi] = useState<CarouselApi>()
  return (
    <div className="w-full">
      <GalleryMain images={images} api ={mainApi} setApi={setMainApi} />
      <GalleryThumbs images={images} mainApi={mainApi} />
    </div>
  )
}

export default PropertyGallery