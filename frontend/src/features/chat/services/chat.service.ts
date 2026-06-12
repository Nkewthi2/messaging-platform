import {conversation_chat} from "../api";
import { mapMessage } from "../mappers/mapMessage";

export const getMessages = async (
  conversationId: string
) => {
  const response =
    await conversation_chat(conversationId);
  return response.map(mapMessage);
};