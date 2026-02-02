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
import { mediaSchema } from "@/validations/house.validation";
const Media = ({ onNext, onBack, isLast }: StepProps) => {
  const { draft, setDraft, errors, setErrors, clearErrors } =
    usePropertyDraftStore();
  const handleCoverUpload = (result: any) => {
    console.log("Cover uploaded:", result);
    setDraft({ media: { ...draft.media, cover: { url: result.url, fileId: result.fileId } } });
  };
  const handleGalleryUpload = (result: any) => {
    console.log("Gallery uploaded:", result);
    const assets = Array.isArray(result) ?
    result.map((item)=>({
      url: item.url,
      fileId: item.fileId
    })) : [
      { url: result.url, fileId: result.fileId }
    ];
    setDraft({ media: { ...draft.media, gallery: [...(draft?.media?.gallery || []), ...assets] } });
   
  };
  const validateAndProceed = () => {
  const result = mediaSchema.safeParse(draft.media);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    if (fieldErrors.cover) {
      toast.error("Please upload a cover image.");
    }
    if (fieldErrors.gallery) {
      toast.error("Please upload at least one gallery image.");
    }

    return;
  }

  clearErrors();
  onNext();
};


  const clearData = () => {
    setDraft({ media: { cover: { url: '', fileId: '' }, gallery: [] } });
  };
  return (
    <section>
      <div>
        <h2>Upload Cover</h2>
        {draft?.media?.cover?.url && (
          <Image
            src={draft.media.cover.url}
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
              {draft.media.gallery.map((asset, index) => (
                <CarouselItem
                  className="basis-1/3 border-2 border-primary rounded-lg p-1 aspect-video"
                  key={index}
                >
                  <Image
                    className="aspect-video"
                    key={index}
                    src={asset.url}
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
