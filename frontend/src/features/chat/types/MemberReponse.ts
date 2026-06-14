export type ConversationRole =
  | "OWNER"
  | "MEMBER"
  | "ADMIN";

export interface MemberReponse {
  userId: number;
  username: string;
  avatar: string | null;
  role: ConversationRole;
  joinedAt: string;
}