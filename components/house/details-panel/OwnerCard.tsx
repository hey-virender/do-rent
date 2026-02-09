'use client";';
import { User as User2 } from "@/types/user";
import { Phone, Mail, User } from "lucide-react";
import { useSession } from "next-auth/react";

interface Props {
  owner: Partial<User2>;
}

export default function OwnerCard({ owner }: Props) {
  const { data: session } = useSession();
  if (!session || session.user?.role !== "tenant") {
    return (
      <div
        className="
          text-center"
      >
        <p className="text-lg text-muted-foreground">
          Login as tenant to view owner details
        </p>
      </div>
    );
  }
  return (
    <div
      className="
        flex flex-col gap-4
        rounded-xl border
        bg-card p-5
        text-card-foreground
      "
    >
      {/* Header */}
      <div className="flex items-center gap-6">
        <div
          className="
            flex h-18 w-18 items-center justify-center
            rounded-full bg-muted
          "
        >
          <User className="h-14 w-14 text-primary" />
        </div>

        <div>
          <p className="font-semibold text-xl">{owner.name}</p>
          <p className="text-lg text-muted-foreground">Property Owner</p>
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-2 text-lg ml-24">
        {owner.phone && (
          <div className="flex items-center gap-6">
            <Phone className="h-7 w-7 text-muted-foreground" />
            <span>{owner.phone}</span>
          </div>
        )}

        {owner.email && (
          <div className="flex items-center gap-6">
            <Mail className="h-7 w-7 text-muted-foreground" />
            <span>{owner.email}</span>
          </div>
        )}
      </div>
    </div>
  );
}
