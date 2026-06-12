import { useEffect, useState } from "react"
import { t } from "../../../i18n"
import { conversation } from "../api"
import { Search } from "lucide-react";

type ConversationItem = {
  id: string
  title?: string
  lastMessage?: string
}

type Props = {
  selectedId?: string | null
  onSelect?: (c: { id: string; title?: string }) => void
}

export default function ChatList({ selectedId, onSelect }: Props) {
  const [items, setItems] = useState<ConversationItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    conversation()
      .then((res) => {
        if (!mounted) return
        // try to map response to expected shape
        const data = Array.isArray(res) ? res : (res?.data ?? [])
        console.log(data)
        const mapped = (data || []).map((it: any) => ({
          id: it.id ?? it._id ?? JSON.stringify(it),
          title: it.title ?? it.name ?? it.subject ?? 'Conversation',
          lastMessage: it.lastMessage ?? it.last ?? it.preview ?? '',
        }))
        setItems(mapped)
        console.log(mapped)
      })
      .catch((err) => {
        console.error('fetch conversation failed', err)
      })
      .finally(() => setLoading(false))

    return () => { mounted = false }
  }, [])

  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold p-3 text-text">{t('nav.contacts')}</h2>

      <div className="mb-3">
        <div className="relative">
          <Search
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-text"
          />
          <input
            type="search"
            placeholder={t('chat.search')}
            aria-label="Search conversations"
            className="w-full pl-10 pr-3 py-2 rounded-md bg-surface border border-border text-text placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex flex-col">
        {loading ? (
          <div className="text-muted-text">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-muted-text">No conversations</div>
        ) : (
              items.map(c => {
                const isSelected = selectedId === c.id
                return (
                <div
              key={c.id}
              onClick={() => onSelect?.({ id: c.id, title: c.title })}
              className={`p-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer ${isSelected ? 'bg-background-click' : 'hover:bg-background'}`}
                >
              <div className="flex items-center gap-3">
                <img
                  src={`https://i.pravatar.cc/40?u=${c.id}`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-text">{c.title}</div>
                  <div className="text-sm text-muted-text">{c.lastMessage || "Hãy bắt đầu cuộc trò chuyện"}</div>
                </div>
              </div>
            </div>
          )})
        )}
      </div>
    </div>
  )
}
