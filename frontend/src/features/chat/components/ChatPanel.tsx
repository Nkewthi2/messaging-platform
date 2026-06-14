import { useState } from "react";
import { t } from "../../../i18n";
import { useChatMessages } from "../hooks/useChatMessages";
import { sendMessage } from "../services/chat.service";
import { Send } from "lucide-react";

type Props = {
  owner_id?: number;
  title?: string;
  conversationId?: string;
};

export default function ChatPanel({
  owner_id,
  title,
  conversationId,
}: Props) {
  const messages = useChatMessages(conversationId);
  const [message, setMessage] = useState("");
  const handleSend = () => {
    if (!message.trim() || !conversationId || !owner_id) {
      return;
    }
  sendMessage({
    conversationId: Number(conversationId),
    senderId: owner_id,
    text: message,
  });

    setMessage("");
  };
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border text-text font-semibold">
        {title ?? t("chat.title")}
      </div>

      <div className="flex-1 p-3 overflow-auto">
        {messages?.map((m) => {
          const isOwner = m.senderId === owner_id;
          return (
            <div
              key={m.id}
              className={`flex mb-3 ${
                isOwner ? "justify-end" : "justify-start"
              }`}
            >
              {!isOwner && (
                <img
                  src={`https://i.pravatar.cc/40?u=${m.senderId}`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                />
              )}

              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl break-words ${
                  isOwner
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex p-3 border-t border-border gap-2">
        <input
          value={message}
          placeholder={t("chat.placeholder")}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="w-full p-1 rounded-md border border-border outline-none"
        />
        {message.trim() &&  (
          <button
            disabled={!message.trim()}
            onClick={() => {handleSend()}}
            className="
              p-2 rounded-full
              transition-colors
            "
          >
            <Send size={20} className="text-primary" />
          </button>
        )}
      </div>
    </div>
  );
}