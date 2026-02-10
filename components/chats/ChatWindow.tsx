"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

function ChatHeader({
  receiverName,
  propertyName,
}: {
  receiverName: string;
  propertyName: string;
}) {
  return (
    <div className="border-b bg-white px-4 py-3">
      <p className="font-medium">{receiverName}</p>
      <p className="text-xs text-gray-500">{propertyName}</p>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { ChatRoom } from "@/types/chat";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { sendMessage } from "@/actions/chat.actions";

function MessageBubble({ message, isOwn }: { message: any; isOwn: boolean }) {
  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={clsx(
          "max-w-[75%] rounded-lg px-3 py-2 text-sm shadow-sm",
          isOwn ? "bg-[#dcf8c6] rounded-br-none" : "bg-white rounded-bl-none",
        )}
      >
        <p>{message.text}</p>
        <span className="mt-1 block text-right text-[10px] text-gray-500">
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
        className="rounded-full bg-green-500 px-4 py-2 text-sm text-white"
      >
        Send
      </Button>
    </div>
  );
}

export function ChatWindow({ chatRoom }: { chatRoom: ChatRoom }) {
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
  }, [chatRoom.messages]);
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
  

  const isLandlord = currentUserId === chatRoom.landlord.id;
  const receiver = isLandlord ? chatRoom.tenant : chatRoom.landlord;

  

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
    const result = await sendMessage({
      chatRoomId: chatRoom.id,
      text: message,
    });
    if (!result.success) {
      toast.error(result.error || "Failed to send message");
      return { success: false };
    }

    return { success: true};
  };

  return (
    <div className="flex h-full flex-col bg-[#efeae2]">
      {/* Header */}
      <ChatHeader
        receiverName={receiver?.name!}
        propertyName={chatRoom?.property?.name!}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {chatRoom.messages.map((msg) => (
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
