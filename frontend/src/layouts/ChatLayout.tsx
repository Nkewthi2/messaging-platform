import type { ReactNode } from "react"
import ChatList from "../features/chat/components/ChatList"
import ChatPanel from "../features/chat/components/ChatPanel"

type Props = {
  children?: ReactNode
}

export default function ChatLayout({ children }: Props) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto w-full px-4 py-6">
        <div className="bg-transparent rounded-lg overflow-hidden" style={{ display: 'flex', gap: '16px' }}>
          <aside style={{ width: 320, flex: '0 0 320px' }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-surface)', height: 'calc(100vh - 120px)', overflow: 'auto' }}>
              <ChatList />
            </div>
          </aside>

          <main style={{ flex: 1 }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-surface)', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
              <ChatPanel />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
