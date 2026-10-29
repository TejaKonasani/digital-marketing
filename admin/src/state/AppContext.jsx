import { createContext, useContext, useState, useCallback } from 'react'
import { notifications as seedNotifications, approvals as seedApprovals, tasks as seedTasks } from '../data/tasks'
import { demoWorkflow } from '../data/workflows'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState(seedNotifications)
  const [approvals, setApprovals] = useState(seedApprovals)
  const [tasks, setTasks] = useState(seedTasks)
  const [demoRun, setDemoRun] = useState(null) // { stepIndex, running, done }
  const [toast, setToast] = useState(null)

  const login = useCallback((u) => setUser(u), [])
  const logout = useCallback(() => setUser(null), [])

  const markRead = useCallback((id) => {
    setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])
  const markAllRead = useCallback(() => {
    setNotifications((ns) => ns.map((n) => ({ ...n, read: true })))
  }, [])

  const decideApproval = useCallback((id, decision, comment) => {
    setApprovals((as) =>
      as.map((a) =>
        a.id === id
          ? { ...a, status: decision === 'approve' ? 'approved' : 'revision', decision, comment, decidedAt: 'Just now', decidedBy: user?.name || 'Demo User' }
          : a
      )
    )
    setToast({
      title: decision === 'approve' ? 'Approval recorded (simulated)' : 'Revision requested (simulated)',
      body:
        decision === 'approve'
          ? 'The approval decision is stored in the demo state. No external action was executed.'
          : 'A revision task has been created in the demo state. The producing role will be notified (simulated).',
      tone: decision === 'approve' ? 'success' : 'info'
    })
  }, [user])

  const moveTask = useCallback((id, nextStatus) => {
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status: nextStatus } : t)))
    setToast({ title: 'Task updated (simulated)', body: `Task ${id} moved to "${nextStatus.replace(/_/g, ' ')}" in the demo state.`, tone: 'success' })
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
        dismissToast,
        demoWorkflow
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)