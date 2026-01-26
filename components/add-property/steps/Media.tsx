"use client";
import { Button } from "@/components/ui/button";
import { StepProps } from "./step.type";
import IKUploader from "@/components/imagekit/IKUploader";
import { usePropertyDraftStore } from "@/store/propertyDraft.store";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { toast } from "sonner";
const Media = ({ onNext, onBack, isLast }: StepProps) => {
  const { draft, setDraft, errors, setErrors, clearErrors } =
    usePropertyDraftStore();
  const handleCoverUpload = (result: any) => {
    console.log("Cover uploaded:", result);
    setDraft({ media: { ...draft.media, cover: result.url } });
  };
  const handleGalleryUpload = (result: any) => {
    console.log("Gallery uploaded:", result);
    const galleryUrls = Array.isArray(result)
      ? result.map((res) => res.url)
      : [result.url];
    setDraft({ media: { ...draft.media, gallery: galleryUrls } });
  };
  const validateAndProceed = () => {
    const hasCover = !!draft?.media?.cover;
    const hasGallery = draft?.media?.gallery && draft.media.gallery.length > 0;
    if (!hasCover) {
      setErrors({ ...errors, "media.cover": "Please upload a cover image." });
      toast.error("Please upload a cover image.");
      return;
    }
    if (!hasGallery) {
      setErrors({
        ...errors,
        "media.gallery": "Please upload at least one gallery image.",
      });
      toast.error("Please upload at least one gallery image.");
      return;
    }
    clearErrors();
    onNext();
  };

  const clearData = () => {
    setDraft({ media: { cover: "", gallery: [] } });
  };
  return (
    <section>
      <div>
        <h2>Upload Cover</h2>
        {draft?.media?.cover && (
          <Image
            src={draft.media.cover}
            alt="Cover Image"
            width={300}
            height={200}
          />
        )}
        <IKUploader
          folder="cover"
          purpose="cover"
          single={true}
          onSuccess={handleCoverUpload}
        />
        {errors?.["media.cover"] && (
          <p className="text-red-500">{errors["media.cover"]}</p>
        )}
      </div>
      <div>
        <h2>Upload Gallery Images</h2>
        {draft?.media?.gallery && (
          <Carousel className="w-1/2">
            <CarouselContent className="gap-4">
              {draft.media.gallery.map((url, index) => (
                <CarouselItem
                  className="basis-1/3 border-2 border-primary rounded-lg p-1 aspect-video"
                  key={index}
                >
                  <Image
                    className="aspect-video"
                    key={index}
                    src={url}
                    alt={`Gallery Image ${index + 1}`}
                    width={1000}
                    height={1000}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <IKUploader
          folder="gallery"
          purpose="gallery"
          single={false}
          onSuccess={handleGalleryUpload}
        />
        {errors?.["media.cover"] && (
          <p className="text-red-500">{errors["media.cover"]}</p>
        )}
        {errors?.["media.gallery"] && (
          <p className="text-red-500">{errors["media.gallery"]}</p>
        )}
      </div>
      <Button onClick={onBack}>Back</Button>
      <Button onClick={validateAndProceed}>{isLast ? "Finish" : "Next"}</Button>
      <Button variant="outline" onClick={clearData}>Clear</Button>
    </section>
  );
};

export default Media;
