import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User, Building2, Bell, Shield, Save, CheckCircle2, Lock,
  Phone, Mail, Globe, MapPin, Eye, EyeOff, LogOut, Check
} from 'lucide-react'
import { useClient } from '../state/ClientContext'

export default function Settings() {
  const navigate = useNavigate()
  const { user, profile, updateProfile, logout, setToast } = useClient()

  const [activeTab, setActiveTab] = useState('profile') // 'profile' | 'organisation' | 'notifications' | 'security'

  // Personal profile form
  const [personalForm, setPersonalForm] = useState({
    contactName: profile.contactName || user?.name || 'R. Iyer',
    email: profile.email || 'riyer@citycarehospital.com',
    phone: profile.phone || '+91 98765 43210',
    designation: profile.designation || 'Medical Director / Administrator'
  })

  // Organisation details form
  const [orgForm, setOrgForm] = useState({
    name: profile.name || 'City Care Multispeciality Hospital',
    industry: profile.industry || 'Healthcare & Tertiary Hospital Services',
    website: profile.website || 'https://citycarehospital.com',
    address: profile.address || 'Road No. 12, Banjara Hills, Hyderabad, Telangana 500034',
    primaryContact: profile.primaryContact || 'Dr. R. Iyer, Medical Director',
    description: profile.description || ''
  })

  // Notification Preferences toggles
  const [notifPrefs, setNotifPrefs] = useState({
    projectUpdates: true,
    approvals: true,
    meetings: true,
    deliverables: true,
    announcements: false
  })

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPass: '',
    confirm: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = (e) => {
    if (e) e.preventDefault()
    updateProfile({ ...personalForm, ...orgForm })
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2500)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (!passwordForm.newPass || passwordForm.newPass !== passwordForm.confirm) {
      setToast({
        title: 'Password validation failed',
        body: 'New password and confirmation must match.',
        tone: 'danger'
      })
      return
    }
    setPasswordForm({ current: '', newPass: '', confirm: '' })
    setToast({
      title: 'Password updated',
      body: 'Your account credentials have been updated successfully.',
      tone: 'success'
    })
  }

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Settings</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Manage your personal profile, hospital organisation details and communication preferences.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="btn-primary self-start sm:self-auto shadow-xs flex items-center gap-1.5"
        >
          {isSaved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{isSaved ? 'Saved Changes' : 'Save changes'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'organisation', label: 'Organisation', icon: Building2 },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'security', label: 'Account & Security', icon: Shield }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#0d3835] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: Personal Profile */}
      {activeTab === 'profile' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Personal Profile</h3>
            <p className="text-xs text-slate-400">Your contact information across client workspace communications.</p>
          </div>

          {/* Avatar row */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d3835] text-xl font-bold text-white shadow-xs">
              RI
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{personalForm.contactName}</p>
              <p className="text-xs text-slate-500">{personalForm.designation}</p>
              <button
                type="button"
                onClick={() => setToast({ title: 'Photo Upload', body: 'Profile photo upload simulated.', tone: 'info' })}
                className="btn-secondary mt-2 text-xs py-1 px-3"
              >
                Change photo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2 border-t border-slate-100">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                value={personalForm.contactName}
                onChange={(e) => setPersonalForm({ ...personalForm, contactName: e.target.value })}
                className="input text-xs"
              />
            </div>

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                value={personalForm.email}
                onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                className="input text-xs"
              />
            </div>

            <div>
              <label className="label">Phone Number</label>
              <input
                type="tel"
                value={personalForm.phone}
                onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                className="input text-xs"
              />
            </div>

            <div>
              <label className="label">Designation / Role</label>
              <input
                type="text"
                value={personalForm.designation}
                onChange={(e) => setPersonalForm({ ...personalForm, designation: e.target.value })}
                className="input text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Organisation Details */}
      {activeTab === 'organisation' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Hospital Organisation Details</h3>
            <p className="text-xs text-slate-400">Institutional information used for clinical compliance and branding.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Organisation / Hospital Name</label>
              <input
                type="text"
                value={orgForm.name}
                onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                className="input text-xs"
              />
            </div>

            <div>
              <label className="label">Industry / Speciality</label>
              <input
                type="text"
                value={orgForm.industry}
                onChange={(e) => setOrgForm({ ...orgForm, industry: e.target.value })}
                className="input text-xs"
              />
            </div>

            <div>
              <label className="label">Website URL</label>
              <input
                type="url"
                value={orgForm.website}
                onChange={(e) => setOrgForm({ ...orgForm, website: e.target.value })}
                className="input text-xs"
              />
            </div>

            <div>
              <label className="label">Primary Clinical Contact</label>
              <input
                type="text"
                value={orgForm.primaryContact}
                onChange={(e) => setOrgForm({ ...orgForm, primaryContact: e.target.value })}
                className="input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="label">Hospital Address</label>
            <input
              type="text"
              value={orgForm.address}
              onChange={(e) => setOrgForm({ ...orgForm, address: e.target.value })}
              className="input text-xs"
            />
          </div>

          <div>
            <label className="label">Organisation Summary</label>
            <textarea
              rows={3}
              value={orgForm.description}
              onChange={(e) => setOrgForm({ ...orgForm, description: e.target.value })}
              className="input text-xs"
            />
          </div>
        </div>
      )}

      {/* TAB 3: Notification Preferences */}
      {activeTab === 'notifications' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Notification Preferences</h3>
            <p className="text-xs text-slate-400">Choose which updates and alerts you wish to receive.</p>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              {
                id: 'projectUpdates',
                title: 'Project updates',
                desc: 'Milestones, progress and status changes on active campaigns.'
              },
              {
                id: 'approvals',
                title: 'Approval notifications',
                desc: 'Alerts when deliverables, creative drafts or budgets need your review.'
              },
              {
                id: 'meetings',
                title: 'Meeting notifications',
                desc: 'Upcoming meetings, schedule changes and direct joining links.'
              },
              {
                id: 'deliverables',
                title: 'New deliverables',
                desc: 'Notifications when reports, strategies and visual assets are uploaded.'
              },
              {
                id: 'announcements',
                title: 'Important announcements',
                desc: 'Platform feature updates and monthly executive summaries.'
              }
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3.5">
                <div>
                  <p className="text-xs font-bold text-slate-800">{item.title}</p>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifPrefs({ ...notifPrefs, [item.id]: !notifPrefs[item.id] })}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus:outline-none ${
                    notifPrefs[item.id] ? 'bg-teal-600' : 'bg-slate-200'
                  }`}
                  role="switch"
                  aria-checked={notifPrefs[item.id]}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                      notifPrefs[item.id] ? 'translate-x-5.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Account & Security */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Password Change */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Change Password</h3>
              <p className="text-xs text-slate-400">Update your login password for the Samrudhi Client Portal.</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3 max-w-md">
              <div>
                <label className="label">Current Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  className="input text-xs"
                />
              </div>

              <div>
                <label className="label">New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={passwordForm.newPass}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                  className="input text-xs"
                />
              </div>

              <div>
                <label className="label">Confirm New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  className="input text-xs"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-secondary text-xs">
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Active Sessions */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Active Sessions</h3>
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-xs">
              <div>
                <p className="font-bold text-slate-800">Windows PC · Chrome Browser</p>
                <p className="text-[11px] text-slate-500">Hyderabad, IN · IP 192.168.1.11 · Active Now</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                Current Session
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
                className="btn text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center gap-1.5"
              >
                <LogOut className="h-4 w-4" /> Sign Out of All Sessions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
