import { t } from "../../../i18n";
import { Search } from "lucide-react";
import { useConversation } from "../hooks/useConversaton";
import type { Conversation } from "../types/conversation";

type Props = {
  selectedConversation?: Conversation | null;
  onSelect?: (conversation: Conversation) => void;
};

export default function ChatList({
  selectedConversation,
  onSelect,
}: Props) {
  const conversations = useConversation();

  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold p-3 text-text">
        {t("nav.contacts")}
      </h2>

      <div className="mb-3">
        <div className="relative">
          <Search
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-text"
          />
          <input
            type="search"
            placeholder={t("chat.search")}
            aria-label="Search conversations"
            className="w-full pl-10 pr-3 py-2 rounded-md bg-surface border border-border text-text"
          />
        </div>
      </div>

      <div className="flex flex-col">
        {conversations.length === 0 ? (
          <div className="text-muted-text">
            No conversations (Tôi bị ngu)
          </div>
        ) : (
          conversations.map((c) => {
            const isSelected =
              selectedConversation?.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => onSelect?.(c)}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-background-click"
                    : "hover:bg-background"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/40?u=${c.id}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <div className="font-semibold text-text">
                      {c.name}
                    </div>

                    <div className="text-sm text-muted-text">
                      {c.lastMessageId
                        ? `Message #${c.lastMessageId}`
                        : "Hãy bắt đầu cuộc trò chuyện"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}