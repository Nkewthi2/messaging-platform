export interface Conversation {
  id: number;
  type: String;
  name: string;
  lastMessageId: number | null;
  createdAt: string;
  ownerId: number;
}