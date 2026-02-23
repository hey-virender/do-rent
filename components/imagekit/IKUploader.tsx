"use client";
import { Upload } from "lucide-react";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitProvider,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  Image,
} from "@imagekit/next";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { set } from "zod";
import { se } from "date-fns/locale";

type ImageKitUploadResult = {
  url: string;
  fileId: string;
  width?: number;
  height?: number;
  size?: number;
};

type Props = {
  folder: string;
  customUI?: React.ReactNode;
  purpose: "profile" | "gallery" | "cover" | "other";
  status?: "temp" | "confirmed";
  accept?: string;
  single: boolean;
  onSuccess?: (result: ImageKitUploadResult | ImageKitUploadResult[]) => void;
  onError?: (error: Error) => void;
};

const IKUploader = ({
  customUI,
  folder,
  purpose,
  status = "temp",
  accept,
  single = true,
  onSuccess,
  onError,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");
      if (!response.ok) {
        toast.error("Failed to get upload authentication parameters");
        throw new Error("Failed to get upload authentication parameters");
      }
      const data = await response.json();
      const { signature, token, expire, publicKey } = data;
      return { signature, token, expire, publicKey };
    } catch (error) {
      throw new Error("Failed to get upload authentication parameters");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.length) {
      toast.error("Please select at least one file");
      return;
    }

    const files = Array.from(fileInput.files);

    try {
      setProgress(0);

      // ================= MULTIPLE FILES =================
      if (!single) {
        let uploadedBytes = 0;
        const totalBytes = files.reduce((acc, f) => acc + f.size, 0);

        const results = await Promise.all(
          files.map(async (file) => {
            const { token, expire, signature, publicKey } =
              await authenticator();

            return upload({
              expire,
              token,
              signature,
              publicKey,
              folder: `/uploads/${folder}`,
              file,
              fileName: file.name,
              customMetadata: { status, purpose },
              onProgress: (e) => {
                uploadedBytes += e.loaded;
                setProgress(Math.min((uploadedBytes / totalBytes) * 100, 100));
              },
            });
          }),
        );

        const formatted: ImageKitUploadResult[] = results.map((res) => ({
          url: res.url!,
          fileId: res.fileId!,
          width: res.width,
          height: res.height,
          size: res.size,
        }));

        onSuccess?.(formatted);
        setOpen(false);
        setUploadedUrl(null);
        setProgress(0);
        return;
      }

      // ================= SINGLE FILE =================
      const { token, expire, signature, publicKey } = await authenticator();

      const file = files[0];

      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        folder: `/uploads/${folder}`,
        file,
        fileName: file.name,
        customMetadata: { status, purpose },
        onProgress: (e) => {
          setProgress((e.loaded / e.total) * 100);
        },
      });

      setUploadedUrl(uploadResponse.url!);

      onSuccess?.({
        url: uploadResponse.url!,
        fileId: uploadResponse.fileId!,
        width: uploadResponse.width,
        height: uploadResponse.height,
        size: uploadResponse.size,
      });
      setOpen(false);
    } catch (error) {
      
      toast.error("Failed to upload file(s)");
      onError?.(error as Error);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    setProgress(0);
    setUploadedUrl(null);
  };

  return (
    <ImageKitProvider
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
    >
      <Dialog open={open} onOpenChange={handleOpenChange} defaultOpen={false}>
        {customUI ? (
          <DialogTrigger>{customUI}</DialogTrigger>
        ) : (
          <DialogTrigger className="">
            <Button>
              <Upload /> Upload
            </Button>
          </DialogTrigger>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
          </DialogHeader>
          {uploadedUrl && (
            <Image
              className="size-20 rounded-full border-primary border-2"
              src={uploadedUrl}
              alt="Preview"
              width={1000}
              height={1000}
              unoptimized
            />
          )}
          <Input
            type="file"
            ref={fileInputRef}
            accept={accept}
            multiple={!single}
          />
          {/* Button to trigger the upload process */}
          <Button type="button" onClick={handleUpload}>
            <Upload />
            Upload file
          </Button>
          <br />
          {/* Display the current upload progress */}
          {progress > 0 && (
            <Progress value={progress} className="w-full mt-2" />
          )}
        </DialogContent>
      </Dialog>
    </ImageKitProvider>
  );
};

export default IKUploader;
