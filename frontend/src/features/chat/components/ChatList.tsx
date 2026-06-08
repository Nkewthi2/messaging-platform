import { t } from "../../../i18n"

const contacts = [
  { id: '1', name: 'Alice', last: 'Hey there' },
  { id: '2', name: 'Bob', last: 'See you' },
  { id: '3', name: 'Charlie', last: 'Let\'s catch up' },
]

export default function ChatList() {
  return (
    <div className="p-4">
      <h2 style={{ color: 'var(--color-primary-text)', marginBottom: 12 }}>{t('nav.contacts')}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {contacts.map(c => (
          <div key={c.id} style={{ padding: 10, borderRadius: 8, background: 'transparent', border: '1px solid var(--color-border)' }}>
            <div style={{ fontWeight: 600, color: 'var(--color-primary-text)' }}>{c.name}</div>
            <div style={{ fontSize: 12, color: 'var(--color-muted-text)' }}>{c.last}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
