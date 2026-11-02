import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { approvals as seedApprovals, tasks as seedTasks } from '../data/tasks'
import { initialNotifications, defaultNotificationPreferences } from '../data/notificationsData'
import { demoWorkflow } from '../data/workflows'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('samrudhi_user')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      // fallback
    }
    return { name: 'Super Admin', email: 'admin@samrudhi.ai', role: 'Company Admin' }
  })

  // Notifications state with persistence
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('samrudhi_notifications')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      // fallback
    }
    return initialNotifications
  })

  // Notification preferences with persistence
  const [notificationPreferences, setNotificationPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('samrudhi_notification_preferences')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      // fallback
    }
    return defaultNotificationPreferences
  })

  const [approvals, setApprovals] = useState(seedApprovals)
  const [tasks, setTasks] = useState(seedTasks)
  const [demoRun, setDemoRun] = useState(null)
  const [toast, setToast] = useState(null)

  // Persist notifications on change
  useEffect(() => {
    try {
      localStorage.setItem('samrudhi_notifications', JSON.stringify(notifications))
    } catch (e) {
      // ignore
    }
  }, [notifications])

  // Persist preferences on change
  const updateNotificationPreferences = useCallback((newPrefs) => {
    setNotificationPreferences(newPrefs)
    try {
      localStorage.setItem('samrudhi_notification_preferences', JSON.stringify(newPrefs))
    } catch (e) {
      // ignore
    }
  }, [])

  const login = useCallback((u) => {
    setUser(u)
    try {
      localStorage.setItem('samrudhi_user', JSON.stringify(u))
    } catch (e) {
      // ignore
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem('samrudhi_user')
    } catch (e) {
      // ignore
    }
  }, [])

  const markRead = useCallback((id) => {
    setNotifications((ns) =>
      ns.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((ns) => ns.map((n) => ({ ...n, read: true })))
  }, [])

  const decideApproval = useCallback((id, decision, comment) => {
    setApprovals((as) =>
      as.map((a) =>
        a.id === id
          ? {
              ...a,
              status: decision === 'approve' ? 'approved' : 'revision',
              decision,
              comment,
              decidedAt: 'Just now',
              decidedBy: user?.name || 'Super Admin'
            }
          : a
      )
    )
    setToast({
      title: decision === 'approve' ? 'Approval recorded' : 'Revision requested',
      body:
        decision === 'approve'
          ? 'The approval decision has been updated in the system state.'
          : 'A revision task has been created. The producing role will be notified.',
      tone: decision === 'approve' ? 'success' : 'info'
    })
  }, [user])

  const moveTask = useCallback((id, nextStatus) => {
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status: nextStatus } : t)))
    setToast({
      title: 'Task updated',
      body: `Task ${id} moved to "${nextStatus.replace(/_/g, ' ')}".`,
      tone: 'success'
    })
  }, [])

  const startDemoRun = useCallback(() => {
    setDemoRun({ stepIndex: 0, running: true, done: false })
  }, [])
  const advanceDemoRun = useCallback((stepIndex) => {
    setDemoRun((r) => (r ? { ...r, stepIndex } : r))
  }, [])
  const finishDemoRun = useCallback(() => {
    setDemoRun((r) => (r ? { ...r, running: false, done: true } : r))
  }, [])
  const resetDemoRun = useCallback(() => setDemoRun(null), [])

  const dismissToast = useCallback(() => setToast(null), [])

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        notifications,
        setNotifications,
        notificationPreferences,
        updateNotificationPreferences,
        markRead,
        markAllRead,
        approvals,
        decideApproval,
        tasks,
        moveTask,
        demoRun,
        startDemoRun,
        advanceDemoRun,
        finishDemoRun,
        resetDemoRun,
        toast,
        setToast,
        dismissToast,
        demoWorkflow
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
