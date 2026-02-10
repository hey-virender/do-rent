"use client";

import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat.store";
import { ChatRoomDTO } from "@/types/chat.dto";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ChatListItem({
  chatId,
  receiverName,
  propertyName,
  receiverAvatar,
  lastMessage,
  lastMessageAt,
  seen,
  onClick,
}: {
  chatId: string;
  receiverName: string;
  propertyName: string;
  receiverAvatar?: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  seen?: boolean;
  onClick: () => void;
}) {
  const { addMessageToChatRoom } = useChatStore();
  useEffect(() => {
    if (!chatId) return;

    const es = new EventSource(`/api/chat/stream/${chatId}`, {
      withCredentials: true,
    });

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Ignore heartbeat
      if (data.type === "ping") return;

      // 🔥 THIS is the trigger you want
      if (data.type === "message") {
        addMessageToChatRoom(chatId, data.message);
      }
    };

    es.onerror = () => {
      // Browser auto-reconnects
      console.warn("SSE connection lost, retrying…");
    };

    // Cleanup on route change / unmount
    return () => {
      es.close();
    };
  }, [chatId]);
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-3  text-left hover:bg-muted transition",
        seen ? "bg-primary/20" : "bg-primary/50",
      )}
    >
      {/* Avatar (placeholder) */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
        {receiverAvatar ? (
          <Image
            src={receiverAvatar}
            alt={receiverName}
            width={100}
            height={100}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          receiverName.charAt(0)
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="truncate font-medium">{receiverName}</p>
          {lastMessageAt && (
            <span className="text-xs text-muted-foreground">
              {new Date(lastMessageAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>

        <p className="text-xs text-muted-foreground truncate">{propertyName}</p>

        <p
          className={cn(
            "mt-0.5 truncate text-sm text-muted-foreground",
            seen ? "font-normal" : "font-bold",
          )}
        >
          {lastMessage ?? "No messages yet"}
        </p>
      </div>
    </button>
  );
}

export function ChatList({ chats }: { chats: ChatRoomDTO[] }) {
  const router = useRouter();
  const { chatRooms, setChatRooms } = useChatStore();
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  useEffect(() => {
    setChatRooms(chats);
  }, [chats, setChatRooms]);

  if (!chatRooms.length) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        No conversations yet
      </div>
    );
  }

  const handleChatClick = (chatRoomId: string) => {
    router.push(`/chats/${chatRoomId}`);
  };

  return (
    <div className="divide-y overflow-y-auto">
      {chatRooms.length > 0 &&
        chatRooms.map((chat) => {
          const isLandlord = currentUserId === chat?.landlord?.id;
          const receiver = isLandlord ? chat?.tenant : chat?.landlord;
          const lastMessage = chat?.messages?.[0];

          return (
            <ChatListItem
              key={chat.id}
              chatId={chat?.id!}
              receiverName={receiver?.name ?? "Unknown"}
              propertyName={chat?.property?.name ?? "Unknown"}
              receiverAvatar={receiver?.avatarUrl!}
              lastMessage={lastMessage?.text}
              seen={lastMessage?.seen}
              lastMessageAt={lastMessage?.createdAt}
              onClick={() => handleChatClick(chat.id)}
            />
          );
        })}
    </div>
  );
}
