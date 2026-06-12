import { useEffect, useState } from "react";
import { getMessages } from "../services/chat.service";
import type { Message } from "../types/Message"

  export const useChatMessages = (conversationId?: string) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
      if (!conversationId) return;

      getMessages(conversationId)
        .then(setMessages);
    }, [conversationId]);

    return messages;
  };