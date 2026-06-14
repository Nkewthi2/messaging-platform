import type { ReactNode } from "react";
import type {  Conversation } from "../features/chat/types/Conversation";
import ChatList from "../features/chat/components/ChatList";
import ChatPanel from "../features/chat/components/ChatPanel";
import websocketService from "../features/chat/services/websocket.service";
import { useState,useEffect } from "react";
import { api } from "../services/api/client";


type Props = {
  children?: ReactNode;
};

export default function ChatLayout({ children }: Props) {
  useEffect(() => {
    websocketService.connect();
  }, []);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    api.get('/users/me')
      .then(resp => {
        if (!mounted) return;
        setCurrentUserId(resp.data?.id ?? null);
      })
      .catch(() => {
        if (!mounted) return;
        setCurrentUserId(null);
      });
    return () => { mounted = false };
  }, []);
  return (
    <div className="min-h-screen first-letter:bg-background">
      <div className="h-screen bg-transparent rounded-lg overflow-hidden flex gap-4 p-5">
        <aside className="w-1/3 flex-none">
          <div className="h-full border border-border rounded-[12px] bg-surface overflow-auto">
            <ChatList
              selectedConversation={selectedConversation}
              onSelect={setSelectedConversation}
            />
          </div>
        </aside>

        <main className="flex-1">
          <div className="h-full border border-border rounded-[12px] bg-surface flex flex-col">
            {selectedConversation ? (
              <ChatPanel
                owner_id={currentUserId ?? undefined}
                title={selectedConversation.name}
                conversationId={String(selectedConversation.id)}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-text">
                Select a conversation (tôi bị ngu)
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}