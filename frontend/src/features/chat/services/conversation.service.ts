import {conversations} from "../api";
import { mapConversation } from "../mappers/mapConversation";

export const getConversations = async () => {
  const response =
    await conversations();
  return response.map(mapConversation);
};