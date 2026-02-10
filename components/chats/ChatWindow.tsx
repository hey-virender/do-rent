"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

function ChatHeader({
  avatarUrl,
  receiverName,
  propertyName,
}: {
  avatarUrl?: string;
  receiverName: string;
  propertyName: string;
}) {
  return (
    <div className="border-b  px-4 py-3 bg-accent flex items-center gap-3">
      <div>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${receiverName}'s avatar`}
            className="h-16 w-16 rounded-full object-cover"
            width={80}
            height={80}
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
            {receiverName.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <p className="font-medium text-xl">{receiverName}</p>
      <p className="text-md text-gray-500">{propertyName}</p>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { sendMessage } from "@/actions/chat.actions";
import { useMarkSeen } from "@/hooks/useMarkSeen";
import { ChatRoomDTO } from "@/types/chat.dto";
import Image from "next/image";

function MessageBubble({ message, isOwn }: { message: any; isOwn: boolean }) {
  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={clsx(
          "max-w-[75%] rounded-lg px-3 py-2 text-sm shadow-sm",
          isOwn ? "bg-primary rounded-br-none text-white" : "bg-secondary rounded-bl-none",
        )}
      >
        <p>{message.text}</p>
        <span className="mt-1 block text-right text-[10px] text-black/70">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

function ChatInput({
  onSend,
}: {
  onSend?: (text: string) => Promise<{
    success: boolean;
  }>;
}) {
  const [text, setText] = useState("");
  const handleSend = () => {
    if (onSend) {
      onSend(text);
      setText("");
    }
  };
  return (
    <div className="flex items-center gap-2 border-t bg-white px-3 py-2">
      <Input
        type="text"
        placeholder="Type a message"
        className="flex-1 rounded-full border px-4 py-2 text-sm focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        onClick={handleSend}
        className="rounded-md bg-primary px-4 py-2 text-sm text-white"
      >
        Send
      </Button>
    </div>
  );
}

export function ChatWindow({ chatRoom }: { chatRoom: ChatRoomDTO }) {
  const [chat, setChat] = useState(chatRoom);
  useMarkSeen(chat.id);
  const router = useRouter();
  const { data: session, status } = useSession();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);
  useEffect(() => {
    if (!chat.id) return;

    const es = new EventSource(`/api/chat/stream/${chat.id}`, {
      withCredentials: true,
    });

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Ignore heartbeat
      if (data.type === "ping") return;

      // 🔥 THIS is the trigger you want
      if (data.type === "message") {
       
        setChat((prev) => ({
          ...prev,
          messages: [...prev.messages, data.message],
        }));
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
  }, [chat.id]);
  if (status === "loading") {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading chat...</p>
      </div>
    );
  }
  if (!session?.user?.id) {
    return null;
  }
  const currentUserId = session?.user?.id;

  const isLandlord = currentUserId === chat?.landlord?.id;
  const receiver = isLandlord ? chat.tenant : chat.landlord;

  if (!receiver) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading chat...</p>
      </div>
    );
  }

  const handleMessageSend = async (text: string) => {
    const message = text.trim();
    if (message.length === 0) {
      toast.error("Message cannot be empty");
      return { success: false };
    }
    setChat((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: `temp-${Date.now()}`,
          text: message,
          senderId: currentUserId,
          createdAt: new Date(),
          chatRoomId: chat.id,
          seen: false,
        },
      ],
    }));

    const result = await sendMessage({
      chatRoomId: chat.id,
      text: message,
    });
    if (!result.success) {
      toast.error(result.error || "Failed to send message");
      return { success: false };
    }

    return { success: true };
  };

  return (
    <div className="flex h-full flex-col bg-[#efeae2]">
      {/* Header */}
      <ChatHeader
        avatarUrl={receiver.avatarUrl!}
        receiverName={receiver?.name!}
        propertyName={chat?.property?.name!}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {chat.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === currentUserId}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input (plug your logic here) */}
      <ChatInput onSend={handleMessageSend} />
    </div>
  );
}
