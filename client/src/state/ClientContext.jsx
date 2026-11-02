import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import {
  clientProfile as seedProfile,
  initialProjects,
  initialMeetings,
  initialNotifications
} from '../data/clientData'

const ClientContext = createContext(null)

export function ClientProvider({ children }) {
  const [user, setUser] = useState({
    name: 'R. Iyer',
    email: 'riyer@citycarehospital.com',
    role: 'Administrator',
    hospital: 'City Care Hospital'
  })
  const [profile, setProfile] = useState(seedProfile)
  const [projects, setProjects] = useState(initialProjects)
  const [meetings, setMeetings] = useState(initialMeetings)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [toast, setToast] = useState(null)
  const [requestModalOpen, setRequestModalOpen] = useState(false)
  const [previewDoc, setPreviewDoc] = useState(null)
  const [projectsFilter, setProjectsFilter] = useState('all') // 'all' | 'ongoing' | 'approval' | 'completed'

  const login = useCallback((u) => setUser(u), [])
  const logout = useCallback(() => setUser(null), [])

  const markNotificationRead = useCallback((id) => {
    setNotifications((ns) =>
      ns.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((ns) => ns.map((n) => ({ ...n, read: true })))
    setToast({
      title: 'All notifications marked as read',
      body: 'Your notification tray is up to date.',
      tone: 'success'
    })
  }, [])

  const addProject = useCallback((formData) => {
    const nextNum = projects.length + 1
    const newId = `PRJ-00${nextNum}`
    const newProj = {
      id: newId,
      code: newId,
      name: formData.name || 'New Requested Project',
      category: formData.category || 'Digital Healthcare',
      type: `${formData.category || 'Marketing'} Initiative`,
      shortDesc: formData.description || 'Client-requested strategic marketing campaign.',
      description: formData.description || 'Client-requested strategic marketing campaign.',
      status: 'In Progress',
      statusKey: 'in_progress',
      progress: 10,
      startDate: 'Today, 30 Oct 2026',
      dueDate: formData.timeline || '30 Nov 2026',
      completedDate: null,
      nextMilestone: 'Initial requirement review by Samrudhi team',
      nextMilestoneDate: '02 Nov 2026',
      waitingApproval: false,
      approvalNote: null,
      projectManager: 'Mitra (Client Experience Lead)',
      lastUpdated: 'Just now',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80',
      objectives: formData.objectives ? formData.objectives.split('\n').filter(Boolean) : ['Review initial requirements and assign dedicated team.'],
      deliverablesList: formData.deliverables ? formData.deliverables.split('\n').filter(Boolean) : ['Scope and deliverables document'],
      workProgress: [
        {
          id: `WP-${nextNum}01`,
          position: 'Requirement Intake & Scope',
          agentName: 'Mitra',
          department: 'Client Experience & Account Management',
          initials: 'MK',
          avatarBg: 'bg-teal-600',
          responsibility: 'Review client requirements and coordinate with delivery teams.',
          assignedWork: 'Review request and structure project scope.',
          status: 'In Progress',
          statusKey: 'in_progress',
          completedDate: 'Pending',
          workCompleted: 'Request submitted to Samrudhi delivery queue.',
          outputTitle: 'Project Scope Brief',
          outputDesc: 'Intake document prepared for kickoff.'
        }
      ],
      documents: []
    }

    setProjects((prev) => [newProj, ...prev])

    // Add a corresponding notification
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title: 'New project request received',
      body: `"${newProj.name}" has been submitted to your Samrudhi team for review.`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      category: 'update',
      categoryLabel: 'Update',
      read: false,
      projectId: newId,
      projectName: newProj.name,
      actionText: 'View Project',
      actionLink: `/projects/${newId}`
    }
    setNotifications((prev) => [newNotif, ...prev])

    setToast({
      title: 'Project request submitted',
      body: `Your request "${newProj.name}" has been recorded. Our team will review it within 1 business day.`,
      tone: 'success'
    })

    return newId
  }, [projects.length])

  const updateProfile = useCallback((newProfileData) => {
    setProfile((prev) => ({ ...prev, ...newProfileData }))
    if (newProfileData.contactName) {
      setUser((prev) => ({ ...prev, name: newProfileData.contactName }))
    }
    setToast({
      title: 'Profile updated',
      body: 'Your personal information has been saved successfully.',
      tone: 'success'
    })
  }, [])

  const dismissToast = useCallback(() => setToast(null), [])

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length
  }, [notifications])

  const metrics = useMemo(() => {
    const total = projects.length
    const ongoing = projects.filter((p) => p.statusKey === 'in_progress' || p.statusKey === 'approval').length
    const completed = projects.filter((p) => p.statusKey === 'completed').length
    const waitingApproval = projects.filter((p) => p.waitingApproval).length
    return { total, ongoing, completed, waitingApproval }
  }, [projects])

  return (
    <ClientContext.Provider
      value={{
        user,
        login,
        logout,
        profile,
        updateProfile,
        projects,
        setProjects,
        addProject,
        meetings,
        setMeetings,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllNotificationsRead,
        toast,
        setToast,
        dismissToast,
        requestModalOpen,
        setRequestModalOpen,
        previewDoc,
        setPreviewDoc,
        projectsFilter,
        setProjectsFilter,
        metrics
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export function useClient() {
  const ctx = useContext(ClientContext)
  if (!ctx) throw new Error('useClient must be used within a ClientProvider')
  return ctx
}
