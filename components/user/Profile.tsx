"use client";

import { User } from "@/types/user";
import Image from "next/image";
import { useEffect, useState } from "react";

// shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { LogOut, Pencil, Save, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { changeAvatar, updateMyProfile } from "@/actions/user.action";
import { updateProfileSchema } from "@/validations/profile.validations";
import { toast } from "sonner";
import { useProfileStore } from "@/store/profile.store";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils";
import { set } from "zod";

/* ---------- Reusable field components ---------- */



const Editable = ({
  label,
  value,
  isEditing,
  error,
  className,
  onChange,
}: {
  label?: string;
  value: string;
  isEditing: boolean;
  className?: string;
  error?: string;
  onChange: (v: string) => void;
}) => (
  <div>
    {label && <Label>{label}</Label>}
    {isEditing ? (
      label === "Gender" ? (
        <>
          <Select value={value} onValueChange={(value) => onChange(value)}>
            <SelectTrigger id="gender">
              <SelectValue
                className="text-white "
                placeholder="Select your gender"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="bg-white" value="male">
                  Male
                </SelectItem>
                <SelectItem className="bg-white" value="female">
                  Female
                </SelectItem>
                <SelectItem className="bg-white" value="other">
                  Other
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </>
      ) : (
        <>
          <Input value={value} onChange={(e) => onChange(e.target.value)} />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </>
      )
    ) : (
      <p className={cn(className, "mt-1 capitalize")}>{value || "N/A"}</p>
    )}
  </div>
);

const EditableTextarea = ({
  label,
  value,
  isEditing,
  error,
  onChange,
}: {
  label?: string;
  value: string;
  isEditing: boolean;
  error?: string;
  onChange: (v: string) => void;
}) => (
  <div>
    {label && <Label>{label}</Label>}
    {isEditing ? (
      <>
        <Textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </>
    ) : (
      <p className="mt-1">{value || "N/A"}</p>
    )}
  </div>
);

/* ------------------------- Profile ------------------------- */

const Profile = ({
  user,
  isOwnProfile = false,
}: {
  user: Partial<User>;
  isOwnProfile?: boolean;
}) => {
  const router = useRouter();
  const { update } = useSession();
  const { name, email, avatarUrl, role, gender, phone, address, bio } = user;
  const { profileData, setProfileData, errors, setErrors, clearErrors } =
    useProfileStore();

  useEffect(() => {
    setProfileData({
      name: name || "",
      phone: phone || "",
      address: address?.[0]?.toString() || "",
      bio: bio || "",
      gender: gender as "male" | "female" | "other" | undefined,
    });
  }, [name, phone, address, bio, gender, setProfileData]);
  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    setProfileData({
      name: name || "",
      phone: phone || "",
      address: address?.[0]?.toString() || "",
      bio: bio || "",
      gender: gender as "male" | "female" | "other" | undefined,
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    const parsed = updateProfileSchema.safeParse(profileData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const field = err.path[0];

        if (typeof field === "string" || typeof field === "number") {
          fieldErrors[field.toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }
    clearErrors();

    const response = await updateMyProfile(profileData);
    if (response.success) {
      toast.success(response.message || "Profile updated successfully");
      setIsEditing(false);
      await update({
        name: profileData.name,
      });
    } else {
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const handleAvatarUploadSuccess = async (result: any) => {
    console.log("Avatar uploaded:", result);
    const { url, fileId } = result;
    const response = await changeAvatar(url, fileId);
    if (response.success) {
      toast.success("Avatar updated successfully");
    } else {
      toast.error("Failed to update avatar");
    }
  };

  return (
    <main>
      {/* 🔒 UPPER SECTION — UNCHANGED */}
      <section className="relative h-56">
        <div className="bg-gray-300 h-1/2" />
        <div
          className="absolute top-1/2 -translate-y-1/2 left-8
             size-36 border-primary border-2
             rounded-full p-2 bg-white"
        >
          <UserAvatar
            src={avatarUrl}
            isOwnProfile={isOwnProfile}
            handleAvatarUploadSuccess={handleAvatarUploadSuccess}
          />
        </div>

        <div className="h-1/2 bg-gray-100 pl-48 py-2">
          <div className="w-fit">
            <Editable
              value={profileData.name!}
              isEditing={isEditing}
              className="text-2xl font-semibold capitalize"
              error={errors?.name}
              onChange={(v) => setProfileData({ name: v })}
            />
            <p className="text-lg text-black/60 pl-2">{email}</p>
          </div>
        </div>
        {isOwnProfile && (
          <div className="absolute top-4 right-4 flex gap-2">
            {!isEditing ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  onClick={handleLogout}
                  size="sm"
                  className="bg-red-500 hover:bg-white/70 hover:text-red-500 hover:scale-105 transition-all text-white cursor-pointer"
                >
                  <LogOut className="size-5" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        )}
      </section>

      {/* LOWER SECTION */}
      <section className="px-20 py-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Role</Label>
                <p className="mt-1 capitalize">{role || "N/A"}</p>
              </div>

              <Editable
                label="Phone"
                value={profileData.phone}
                isEditing={isEditing}
                error={errors?.phone}
                onChange={(v) => setProfileData({ phone: v })}
              />

              <Editable
                label="Address"
                value={profileData.address}
                isEditing={isEditing}
                error={errors?.address}
                onChange={(v) => setProfileData({ address: v })}
              />
              <Editable
                label="Gender"
                value={profileData.gender || ""}
                isEditing={isEditing}
                error={errors?.gender}
                onChange={(v) =>
                  setProfileData({
                    gender: v as "male" | "female" | "other" | undefined,
                  })
                }
              />

              <div className="col-span-2">
                <EditableTextarea
                  label="Bio"
                  value={profileData.bio}
                  error={errors?.bio}
                  isEditing={isEditing}
                  onChange={(v) => setProfileData({ bio: v })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Profile;
