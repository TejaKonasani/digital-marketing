import { useState } from 'react'
import { Plus, X, Upload, CheckCircle2, Sparkles, Calendar, Layers, FileText, ArrowRight } from 'lucide-react'
import { Modal } from './ui'
import { useClient } from '../state/ClientContext'

const categoryOptions = [
  'Social Media',
  'Website (SEO)',
  'Paid Advertising',
  'Video Production',
  'Analytics & Reporting',
  'Brand & PR',
  'Patient Education Content'
]

export default function NewProjectModal({ open, onClose }) {
  const { addProject } = useClient()
  const [submittedId, setSubmittedId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Social Media',
    description: '',
    objectives: '',
    deliverables: '',
    timeline: '',
    instructions: '',
    files: []
  })
  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files || [])
    if (uploadedFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...uploadedFiles.map((f) => ({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB` }))]
      }))
    }
  }

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Please provide a project name or title.'
    if (!formData.description.trim()) newErrors.description = 'Please describe your requirements.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const createdId = addProject(formData)
    setSubmittedId(createdId)
  }

  const handleClose = () => {
    setSubmittedId(null)
    setFormData({
      name: '',
      category: 'Social Media',
      description: '',
      objectives: '',
      deliverables: '',
      timeline: '',
      instructions: '',
      files: []
    })
    setErrors({})
    onClose()
  }

  if (submittedId) {
    return (
      <Modal open={open} onClose={handleClose} title="Request Submitted" wide={false}>
        <div className="py-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900">Project Request Received</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">
            Your project requirement <span className="font-semibold text-slate-900">"{formData.name}"</span> has been assigned ID <span className="font-mono font-bold text-teal-700">{submittedId}</span>.
          </p>
          <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
            Our client experience team will review the objectives and allocate specialist agents within 1 business day.
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <button className="btn-primary" onClick={handleClose}>
              Done & Return to Projects
            </button>
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Request a New Project"
      subtitle="Tell us what you need and our AI & human specialist team will prepare the plan."
      wide
      footer={
        <div className="flex w-full items-center justify-between">
          <button type="button" className="btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button type="button" className="btn-primary" onClick={handleSubmit}>
            <Sparkles className="h-4 w-4" /> Submit Request
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Name and Category */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Project Title *</label>
            <input
              type="text"
              placeholder="e.g. Oncology Patient Outreach Q1"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`input ${errors.name ? 'border-rose-300 ring-rose-200' : ''}`}
            />
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
          </div>

          <div>
            <label className="label">Project Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="input"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description of Requirement */}
        <div>
          <label className="label">Description of Requirement *</label>
          <textarea
            rows={3}
            placeholder="Describe the clinical focus, target patient audience, service lines, and what you aim to achieve..."
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`input ${errors.description ? 'border-rose-300 ring-rose-200' : ''}`}
          />
          {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description}</p>}
        </div>

        {/* Objectives & Expected Deliverables */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Main Objectives (one per line)</label>
            <textarea
              rows={3}
              placeholder="e.g.&#10;• Increase screening checkups&#10;• Expand regional doctor referrals"
              value={formData.objectives}
              onChange={(e) => handleChange('objectives', e.target.value)}
              className="input text-xs"
            />
          </div>

          <div>
            <label className="label">Expected Deliverables</label>
            <textarea
              rows={3}
              placeholder="e.g.&#10;• 8 Carousel posts&#10;• 2 Doctor FAQ reels&#10;• Monthly analytics report"
              value={formData.deliverables}
              onChange={(e) => handleChange('deliverables', e.target.value)}
              className="input text-xs"
            />
          </div>
        </div>

        {/* Timeline & Instructions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Preferred Timeline or Deadline</label>
            <input
              type="text"
              placeholder="e.g. 15 December 2026 or 4 Weeks"
              value={formData.timeline}
              onChange={(e) => handleChange('timeline', e.target.value)}
              className="input text-xs"
            />
          </div>

          <div>
            <label className="label">Clinical Restrictions or Notes</label>
            <input
              type="text"
              placeholder="e.g. Must follow NABH guidelines, avoid competitor comparisons"
              value={formData.instructions}
              onChange={(e) => handleChange('instructions', e.target.value)}
              className="input text-xs"
            />
          </div>
        </div>

        {/* Reference Documents / Attachments */}
        <div>
          <label className="label">Reference Documents or Attachments (Optional)</label>
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-4 text-center">
            <Upload className="mx-auto h-6 w-6 text-slate-400" />
            <p className="mt-1.5 text-xs font-semibold text-slate-700">
              Drag & drop reference files, or <label className="cursor-pointer text-teal-600 hover:underline">browse<input type="file" multiple className="hidden" onChange={handleFileUpload} /></label>
            </p>
            <p className="text-[11px] text-slate-400">PDF, Word, Excel, PNG, JPG up to 25MB</p>

            {formData.files.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 text-left">
                {formData.files.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs text-slate-700 ring-1 ring-slate-200">
                    <FileText className="h-3.5 w-3.5 text-teal-600" />
                    <span>{file.name}</span>
                    <button type="button" onClick={() => removeFile(idx)} className="text-slate-400 hover:text-rose-600">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>
    </Modal>
  )
}
