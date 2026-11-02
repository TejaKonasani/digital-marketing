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
import SalesOpportunityDetail from './pages/SalesOpportunityDetail'
import Marketing from './pages/Marketing'
import ContentItemDetail from './pages/ContentItemDetail'
import Tasks from './pages/Tasks'
import ApprovalDetail from './pages/ApprovalDetail'
import Analytics from './pages/Analytics'
import Finance from './pages/Finance'
import Technology from './pages/Technology'
import Assurance from './pages/Assurance'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'

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
        <Route path="agents/:id/runs/:runId" element={<Agents />} />
        <Route path="workflows" element={<Workflows />} />
        <Route path="workflows/:id" element={<Workflows />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clients/:id" element={<Clients />} />

        {/* Sales Pipeline & Opportunity Detail Routes */}
        <Route path="sales" element={<Sales />} />
        <Route path="sales/:id" element={<SalesOpportunityDetail />} />
        <Route path="sales-pipeline" element={<Sales />} />
        <Route path="sales-pipeline/opportunities/:opportunityId" element={<SalesOpportunityDetail />} />

        {/* Marketing & Content Item Detail Routes */}
        <Route path="marketing" element={<Marketing />} />
        <Route path="marketing/:id" element={<ContentItemDetail />} />
        <Route path="marketing-content" element={<Marketing />} />
        <Route path="marketing-content/items/:contentId" element={<ContentItemDetail />} />

        {/* Tasks, Approvals & Review Screen Routes */}
        <Route path="tasks" element={<Tasks />} />
        <Route path="tasks/:id" element={<ApprovalDetail />} />
        <Route path="tasks-approvals" element={<Tasks />} />
        <Route path="tasks-approvals/:approvalId" element={<ApprovalDetail />} />
        <Route path="tasks-approvals/history" element={<Tasks />} />

        {/* Intelligence & Control Modules */}
        <Route path="analytics" element={<Analytics />} />
        <Route path="analytics/projects/:projectId" element={<Analytics />} />
        <Route path="finance" element={<Finance />} />
        <Route path="technology" element={<Technology />} />
        <Route path="technology/executions/:execId" element={<Technology />} />
        <Route path="assurance" element={<Assurance />} />
        <Route path="assurance/positions/:positionId" element={<Assurance />} />

        {/* Platform Routes */}
        <Route path="notifications" element={<Notifications />} />
        <Route path="users" element={<Navigate to="/settings?tab=access" replace />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
