import { t } from "../../../i18n";
import { useChatMessages } from "../hooks/useChatMessages";

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

      <div className="p-3 border-t border-border">
        <input
          placeholder={t("chat.placeholder")}
          className="w-full p-2 rounded-md border border-border"
        />
      </div>
    </div>
  );
}