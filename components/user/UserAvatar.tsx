import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import IKUploader from "@/components/imagekit/IKUploader";
import { toast } from "sonner";

interface Props {
  src: string | null | undefined;
  isOwnProfile: boolean;
  className?: string;
  handleAvatarUploadSuccess: (result: any) => void;
}

const UserAvatar = ({
  src,
  isOwnProfile,
  className,
  handleAvatarUploadSuccess,
}: Props) => {
  
  return (
    <div className="relative">
      <div className="absolute top-0 right-0 z-50">
        {isOwnProfile && (
          <IKUploader
            customUI={
              <div
                className="bg-primary size-9 rounded-full
               flex items-center justify-center
               cursor-pointer hover:bg-primary/90"
              >
                <Pencil className="size-4 text-white" />
              </div>
            }
            folder="profile"
            purpose="profile"
            status="temp"
            accept="image/jpeg,image/png,image/webp"
            onSuccess={handleAvatarUploadSuccess}
            onError={() => toast.error("Avatar upload failed")}
          />
        )}
      </div>
      <Avatar className={cn("size-full", className)}>
        <AvatarImage className="z-0" src={src || "/assets/icons/avatar.png"} />
      </Avatar>
    </div>
  );
};

export default UserAvatar;
