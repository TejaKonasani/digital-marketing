import { createContext, useContext, useState, useCallback } from 'react'
import { reviews as seedReviews, clientNotifications as seedNotifications } from '../data/clientData'

const ClientContext = createContext(null)

export function ClientProvider({ children }) {
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState(seedReviews)
  const [notifications, setNotifications] = useState(seedNotifications)
  const [toast, setToast] = useState(null)
  const [briefDraft, setBriefDraft] = useState(null)

  const login = useCallback((u) => setUser(u), [])
  const logout = useCallback(() => setUser(null), [])

  const markRead = useCallback((id) => {
    setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])
  const markAllRead = useCallback(() => setNotifications((ns) => ns.map((n) => ({ ...n, read: true }))), [])

  const decideReview = useCallback((id, decision, comment) => {
    setReviews((rs) =>
      rs.map((r) =>
        r.id === id
          ? { ...r, status: decision === 'approve' ? 'approved' : 'revision', comment, decidedAt: 'Just now', decidedBy: user?.name || 'Client' }
          : r
      )
    )
    setToast({
      title: decision === 'approve' ? 'Approved — thank you!' : 'Revision requested',
      body:
        decision === 'approve'
          ? 'We will proceed with publishing this exact version (simulated). You will see the live status once it is published.'
          : 'Thank you — our team will make the changes and send the updated version back for your review.',
      tone: decision === 'approve' ? 'success' : 'info'
    })
  }, [user])

  const dismissToast = useCallback(() => setToast(null), [])

  return (
    <ClientContext.Provider
      value={{
        user,
        login,
        logout,
        reviews,
        decideReview,
        notifications,
        markRead,
        markAllRead,
        toast,
        dismissToast,
        briefDraft,
        setBriefDraft
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export const useClient = () => useContext(ClientContext)