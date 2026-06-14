import { api } from "../../services/api/client";

export const conversations = async () => {
  const response = await api.get("/conversation");
  return response.data;
};
export const conversation_chat = async (conversationId: string) => {
  const response = await api.get(`/conversations/${conversationId}/messages`);
  return response.data;
};