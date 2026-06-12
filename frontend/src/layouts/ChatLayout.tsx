import type { ReactNode } from "react"
import ChatList from "../features/chat/components/ChatList"
import ChatPanel from "../features/chat/components/ChatPanel"
import Header from "../components/Header"
import { useState } from "react"

type Props = {
  children?: ReactNode
}

export default function ChatLayout({ children }: Props) {
  const [selected, setSelected] = useState<{ id: string; title?: string } | null>(null)
  return (
    <div className="min-h-screen first-letter:bg-background">
      {/* <Header /> */}
        <div className="h-screen bg-transparent rounded-lg overflow-hidden flex gap-4 p-5">
          <aside className="w-1/3 flex-none">
            <div className="h-full border border-border rounded-[12px] bg-surface overflow-auto">
              <ChatList selectedId={selected?.id} onSelect={(c) => setSelected(c)} />
            </div>
          </aside>

          <main className="flex-1">
            <div className="h-full border border-border rounded-[12px] bg-surface flex flex-col">
              {selected ? (
                <ChatPanel title={selected.title} conversationId={selected.id} />
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-text">Select a conversation</div>
              )}
            </div>
          </main>
        </div>
    </div>
  )
}
