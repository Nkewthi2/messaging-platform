import type { ConversationReponse } from "../types/ConversationResponse";
import type { Conversation } from "../types/conversation";

export const mapConversation = (
    conversation:ConversationReponse
):Conversation => ({
  id: conversation.id,
  type: conversation.type,
  name: conversation.name,
  lastMessageId: conversation.lastMessageId,
  createdAt: conversation.createdAt,
  ownerId: conversation.members.find(
    member => member.role === "OWNER"
    )!.userId,
})