import { Phone, Mail, User } from "lucide-react";

interface Owner {
  name: string;
  phone: string;
  email?: string;
}

interface Props {
  owner: Owner;
}

export default function OwnerCard({ owner }: Props) {
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
            flex h-10 w-10 items-center justify-center
            rounded-full bg-muted
          "
        >
          <User className="h-10 w-10 text-primary" />
        </div>

        <div>
          <p className="font-semibold text-xl">{owner.name}</p>
          <p className="text-lg text-muted-foreground">Property Owner</p>
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-2 text-lg">
        <div className="flex items-center gap-6">
          <Phone className="h-7 w-7 text-muted-foreground" />
          <span>{owner.phone}</span>
        </div>

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
