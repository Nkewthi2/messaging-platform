import {conversation_chat} from "../api";
import websocketService from "./websocket.service";
import { mapMessage } from "../mappers/mapMessage";
import type { SendMessage } from "../types/SendMessage";

export const getMessages = async (
  conversationId: string
) => {
  const response =
    await conversation_chat(conversationId);
  return response.map(mapMessage);
};

export const sendMessage = (request: SendMessage) => {
  websocketService.publish(
    "/app/messages.send",
    {
      conversationId: request.conversationId,
      id: null,
      senderId: request.senderId,
      blocks: [
        {
          type: "TEXT",
          text: request.text,
        },
      ],
      replyTo: null,
    }
  );
};