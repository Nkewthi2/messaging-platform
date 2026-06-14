import { useEffect, useState } from "react";
import { getConversations } from "../services/conversation.service";
import type { Conversation } from "../types/Conversation"

  export const useConversation = () => {
    const [conversation, setConversation] = useState<Conversation[]>([]);

    useEffect(() => {
        getConversations()
        .then(setConversation);
    }, []);

    return conversation;
  };