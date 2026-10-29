import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './state/AppContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Departments from './pages/Departments'
import Positions from './pages/Positions'
import Agents from './pages/Agents'
import Workflows from './pages/Workflows'
import Clients from './pages/Clients'
import Sales from './pages/Sales'
import Marketing from './pages/Marketing'
import Tasks from './pages/Tasks'
import Analytics from './pages/Analytics'
import Finance from './pages/Finance'
import Technology from './pages/Technology'
import Assurance from './pages/Assurance'
import Notifications from './pages/Notifications'
import Users from './pages/Users'
import Settings from './pages/Settings'
import Demo from './pages/Demo'

function Protected({ children }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="departments" element={<Departments />} />
        <Route path="departments/:id" element={<Departments />} />
        <Route path="positions" element={<Positions />} />
        <Route path="positions/:id" element={<Positions />} />
        <Route path="agents" element={<Agents />} />
        <Route path="agents/:id" element={<Agents />} />
        <Route path="workflows" element={<Workflows />} />
        <Route path="workflows/:id" element={<Workflows />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clients/:id" element={<Clients />} />
        <Route path="sales" element={<Sales />} />
        <Route path="marketing" element={<Marketing />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="finance" element={<Finance />} />
        <Route path="technology" element={<Technology />} />
        <Route path="assurance" element={<Assurance />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="demo" element={<Demo />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}