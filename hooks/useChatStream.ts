"use client";

import { useEffect } from "react";

export function useChatStream(
  chatRoomId: string,
  onMessage: (msg: any) => void
) {
  useEffect(() => {
    const es = new EventSource(
      `/api/chat/stream/${chatRoomId}`
    );

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type !== "ping") {
        onMessage(data);
      }
    };

    es.onerror = () => {
      es.close();
    };

    return () => es.close();
  }, [chatRoomId]);
}
