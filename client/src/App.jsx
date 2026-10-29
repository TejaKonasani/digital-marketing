import { Routes, Route, Navigate } from 'react-router-dom'
import { useClient } from './state/ClientContext'
import ClientLayout from './components/ClientLayout'
import ClientLogin from './pages/ClientLogin'
import Home from './pages/Home'
import Projects from './pages/Projects'
import NewBrief from './pages/NewBrief'
import Approvals from './pages/Approvals'
import Campaigns from './pages/Campaigns'
import Reports from './pages/Reports'
import Messages from './pages/Messages'
import Support from './pages/Support'
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
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="new-brief" element={<NewBrief />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="reports" element={<Reports />} />
        <Route path="messages" element={<Messages />} />
        <Route path="support" element={<Support />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}