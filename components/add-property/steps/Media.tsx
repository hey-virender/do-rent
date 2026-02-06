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
import {
  deleteImageByFileId,
  deletePropertyImages,
} from "@/actions/property.actions";
import { Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
const Media = ({ mode, onNext, onBack, isLast }: StepProps) => {
  const { draft, setDraft, errors, editDraft, setEditDraft, clearErrors } =
    usePropertyDraftStore();

  const source = mode === "create" ? draft : editDraft;
  const handleCoverUpload = (result: any) => {
    if (mode === "create") {
      setDraft({
        media: {
          ...draft.media,
          cover: { url: result.url, fileId: result.fileId },
        },
      });
    } else {
      setEditDraft({
        media: {
          ...editDraft.media,
          cover: { url: result.url, fileId: result.fileId },
        },
      });
    }
  };
  const handleGalleryUpload = (result: any) => {
    const assets = Array.isArray(result)
      ? result.map((item) => ({
          url: item.url,
          fileId: item.fileId,
        }))
      : [{ url: result.url, fileId: result.fileId }];
    if (mode === "create") {
      setDraft({
        media: {
          ...draft.media,
          gallery: [...(draft?.media?.gallery || []), ...assets],
        },
      });
    } else {
      setEditDraft({
        media: {
          ...editDraft.media,
          gallery: [...(editDraft?.media?.gallery || []), ...assets],
        },
      });
    }
  };
  const deleteImageFromGallery = async (fileId: string) => {
    if (mode === "create" && draft.media?.gallery) {
      const result = await deleteImageByFileId(fileId);
      if(result.success){
        const updatedGallery = draft?.media?.gallery.filter(
        (image) => image.fileId !== fileId,
      );
      setDraft({
        media: {
          ...draft.media,
          gallery: updatedGallery,
        },
      });
      }
      toast.success("Image deleted successfully");
    } else if (mode === "edit" && editDraft.media?.gallery) {
      const result = await deletePropertyImages(editDraft.id!, fileId, "gallery");
      if(result.success){
        const updatedGallery = editDraft?.media?.gallery.filter(
        (image) => image.fileId !== fileId,
      );
      setEditDraft({
        media: {
          ...editDraft.media,
          gallery: updatedGallery,
        },
      });
      }
    }
    toast.success("Image deleted successfully");
  };
  const validateAndProceed = () => {
    const result = mediaSchema.safeParse(
      mode === "create" ? draft.media : editDraft.media,
    );

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
    setDraft({ media: { cover: { url: "", fileId: "" }, gallery: [] } });
  };
  return (
    <section>
      <div>
        <Label className="pb-4">Upload Cover Image</Label>
        {source?.media?.cover?.url && (
          <Image
            src={source.media.cover.url}
            alt="Cover Image"
            width={300}
            height={200}
            className="mb-4 rounded-lg border-2 border-primary"
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
        <Label className="pt-4">Upload Gallery Images</Label>
        {source?.media?.gallery && (
          <Carousel className="w-1/2">
            <CarouselContent className="gap-4 p-4">
              {source.media.gallery.map((asset, index) => (
                <CarouselItem
                  className="relative basis-1/3 border-2 border-primary rounded-lg p-1 aspect-video"
                  key={index}
                >
                  {/* todo add delete button for pictures */}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute bg-red-500 top-2 right-2 z-10"
                    onClick={() => deleteImageFromGallery(asset.fileId)}
                  >
                    <Trash size={16} />
                  </Button>
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
      <div className="flex justify-start gap-2 mt-4">
        <Button className="bg-accent text-black px-7" onClick={onBack}>Back</Button>
      <Button className="px-7" onClick={validateAndProceed}>{isLast ? "Finish" : "Next"}</Button>
      {mode === "create" && (
        <Button className="px-7" onClick={clearData}>

        Clear
      </Button>
      )}
      </div>
    </section>
  );
};

export default Media;
