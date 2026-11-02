import { Routes, Route, Navigate } from 'react-router-dom'
import { useClient } from './state/ClientContext'
import ClientLayout from './components/ClientLayout'
import ClientLogin from './pages/ClientLogin'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'

function Protected({ children }) {
  const { user } = useClient()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<ClientLogin />} />
      <Route
        path="/"
        element={
          <Protected>
            <ClientLayout />
          </Protected>
        }
      >
        {/* Strictly 4 Primary Sections + Subroutes */}
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />

        {/* Backwards-compatible route redirects */}
        <Route path="approvals" element={<Navigate to="/projects?tab=approval" replace />} />
        <Route path="campaigns" element={<Navigate to="/projects" replace />} />
        <Route path="reports" element={<Navigate to="/projects" replace />} />
        <Route path="messages" element={<Navigate to="/" replace />} />
        <Route path="support" element={<Navigate to="/" replace />} />
        <Route path="new-brief" element={<Navigate to="/projects" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
