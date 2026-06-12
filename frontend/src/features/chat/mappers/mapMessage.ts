import type {
  MessageResponse
} from "../types/MessageResponse";

import type{
  Message
} from "../types/Message";

export const mapMessage = (
  message: MessageResponse
): Message => ({
  id: message.id,
  senderId: message.senderId,
  text:
    message.blocks.find(
      b => b.type === "TEXT"
    )?.text ?? "",
  createdAt: message.createdAt
});