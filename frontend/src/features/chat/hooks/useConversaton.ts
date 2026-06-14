import { useEffect, useState } from "react";
import { getConversations } from "../services/conversation.service";
import type { Conversation } from "../types/conversation"

  export const useConversation = () => {
    const [conversation, setConversation] = useState<Conversation[]>([]);

    useEffect(() => {
        getConversations()
        .then(setConversation);
    }, []);

    return conversation;
  };