import { useEffect, useState } from "react";
import { getMessages } from "../services/chat.service";
import websocketService from "../services/websocket.service";
import { mapMessage } from "../mappers/mapMessage";
import type { Message } from "../types/Message"

export const useChatMessages = (conversationId?: string) => {
  const [messages, setMessages] =
    useState<Message[]>([]);

  useEffect(() => {

    if (!conversationId) return;

    getMessages(conversationId)
      .then(setMessages);

  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) return;
    const unsubscribe =
      websocketService.subscribe(
        `/topic/conversations/${conversationId}`,
        (message) => {

          const mapped =
            mapMessage(message);

          setMessages(prev => [
            ...prev,
            mapped
          ]);
        }
      );
    return () => {
      unsubscribe?.();
    };
  }, [conversationId]);
  return messages;
};