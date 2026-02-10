"use client"

import { useEffect } from "react"
import { markMessagesAsSeen } from "@/actions/chat.actions"

export function useMarkSeen(chatRoomId: string) {
  useEffect(() => {
    if (!chatRoomId) return

    markMessagesAsSeen({chatRoomId})

    const handleFocus = () => {
      markMessagesAsSeen({chatRoomId})
    }

    window.addEventListener("focus", handleFocus)

    return () => {
      window.removeEventListener("focus", handleFocus)
    }
  }, [chatRoomId])
}
