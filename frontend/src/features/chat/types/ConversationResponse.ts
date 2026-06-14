import type { MemberReponse } from "./MemberReponse";

export type ConversationType =
  | "PRIVATE"
  | "GROUP";

export interface ConversationReponse {
  id: number;
  type: ConversationType;
  name: string;
  lastMessageId: number | null;
  createdAt: string;
  members: MemberReponse[];
}