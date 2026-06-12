import type { MessageBlockResponse } from "./MessageBlockReponse";

export interface MessageResponse {
  id: string;
  senderId: number;
  conversationId: number;
  createdAt: string;
  blocks: MessageBlockResponse[];
}