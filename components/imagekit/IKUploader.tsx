"use client";
import { Upload } from "lucide-react";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
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
import Image from "next/image";

type ImageKitUploadResult = {
  url: string;
  fileId: string;
  width?: number;
  height?: number;
  size?: number;
};

type Props = {
  folder: string;
  purpose: "profile" | "property" | "cover" | "other";
  status?: "temp" | "confirmed";
  accept?: string;
  lable?: string;
  onSuccess?: (result: ImageKitUploadResult) => void;
  onError?: (error: Error) => void;
};

const IKUploader = ({
  folder,
  purpose,
  status = "temp",
  accept,
  lable,
  onSuccess,
  onError,
}: Props) => {
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
      console.error("Error fetching upload auth params:", error);
      throw new Error("Failed to get upload authentication parameters");
    }
  };

  const handleUpload = async () => {
     const abortController = new AbortController();
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (error) {
      return;
    }

    const { signature, token, expire, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        folder: `/do-rent/uploads/${folder}`, // Optional: specify a folder in ImageKit
        file,
        fileName: file.name,
        customMetadata: {
          status,
          purpose,
        },
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });
      console.log("File uploaded successfully:", uploadResponse);
      setUploadedUrl(uploadResponse.url!);
      if (onSuccess) {
        onSuccess({
          url: uploadResponse.url!,
          fileId: uploadResponse.fileId!,
          width: uploadResponse.width,
          height: uploadResponse.height,
          size: uploadResponse.size,
        });
      }
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
      toast.error("Failed to upload the file");
    }
  };
  return (
    <Dialog onOpenChange={() => setUploadedUrl("")}>
      <DialogTrigger className="w-30 cursor-pointer border-2 border-primary rounded-full p-2 flex items-center justify-center gap-3 text-primary font-semibold ">
        <Upload /> Upload
      </DialogTrigger>
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
        <Input type="file" ref={fileInputRef} accept={accept} />
        {/* Button to trigger the upload process */}
        <Button type="button" onClick={handleUpload}>
          <Upload />
          Upload file
        </Button>
        <br />
        {/* Display the current upload progress */}
        {progress > 0 && <Progress value={progress} className="w-full mt-2" />}
      </DialogContent>
    </Dialog>
  );
};

export default IKUploader;
