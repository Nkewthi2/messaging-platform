import { useState } from "react"
import { t } from "../../../i18n"

export default function ChatPanel() {
  const [messages] = useState([
    { id: 'm1', from: 'Alice', text: 'Hello!' },
    { id: 'm2', from: 'me', text: 'Hi Alice, how are you?' },
    { id: 'm3', from: 'Alice', text: 'I am good, thanks.' },
  ])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: 12, borderBottom: '1px solid var(--color-border)', color: 'var(--color-primary-text)', fontWeight: 600 }}>
        {t('chat.title')}
      </div>

      <div style={{ flex: 1, padding: 12, overflow: 'auto' }}>
        {messages.map(m => (
          <div key={m.id} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 13, color: 'var(--color-primary-text)', fontWeight: 600 }}>{m.from}</div>
            <div style={{ color: 'var(--color-primary-text)' }}>{m.text}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: 12, borderTop: '1px solid var(--color-border)' }}>
        <input placeholder={t('chat.placeholder')} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-primary-text)' }} />
      </div>
    </div>
  )
}
