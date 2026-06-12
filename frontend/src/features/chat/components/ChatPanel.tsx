import { t } from "../../../i18n"
import { useChatMessages } from "../hooks/useChatMessages"
type Props = {
  title?: string
  conversationId?: string
}

export default function ChatPanel({ title, conversationId }: Props) {
  const messages = useChatMessages(conversationId);
  console.log(messages)
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border text-text font-semibold">{title ?? t('chat.title')}</div>

    <div className="flex-1 p-3 overflow-auto">
      {messages && messages.map(m => (
        <div key={m.id} className="mb-2">
          <div className="text-sm font-semibold texttext">{m.senderId}</div>
          <div className="text-text">{m.text}</div>
        </div>
      ))}
    </div>

      <div className="p-3 border-t border-border">
        <input placeholder={t('chat.placeholder')} className="w-full p-2 rounded-md border border-border bg-surface text-primary-text" />
      </div>
    </div>
  )
}
