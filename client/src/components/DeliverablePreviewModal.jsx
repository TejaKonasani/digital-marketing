import { Download, FileText, Image, Video, FileSpreadsheet, ExternalLink, X, CheckCircle2 } from 'lucide-react'
import { Modal } from './ui'
import { useClient } from '../state/ClientContext'

export default function DeliverablePreviewModal({ doc, onClose }) {
  const { setToast } = useClient()

  if (!doc) return null

  const handleDownload = () => {
    setToast({
      title: 'Download started (simulated)',
      body: `Downloading "${doc.name}" (${doc.size || '3.2 MB'}). File will be saved to your device.`,
      tone: 'success'
    })
  }

  const renderIcon = () => {
    if (doc.type === 'PDF' || doc.fileExt === 'pdf') {
      return <FileText className="h-8 w-8 text-rose-500" />
    }
    if (doc.type === 'Spreadsheet' || doc.fileExt === 'xlsx') {
      return <FileSpreadsheet className="h-8 w-8 text-emerald-600" />
    }
    if (doc.type === 'Image' || doc.fileExt === 'png' || doc.fileExt === 'jpg') {
      return <Image className="h-8 w-8 text-sky-500" />
    }
    if (doc.type === 'Video' || doc.fileExt === 'mp4') {
      return <Video className="h-8 w-8 text-purple-600" />
    }
    return <FileText className="h-8 w-8 text-slate-500" />
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={doc.name}
      subtitle={`${doc.category || doc.type} · Uploaded ${doc.uploadedDate || 'Recently'} · ${doc.size || '2.4 MB'}`}
      wide
      footer={
        <div className="flex w-full items-center justify-between">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn-primary" onClick={handleDownload}>
            <Download className="h-4 w-4" /> Download File ({doc.size || 'File'})
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Preview header card */}
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs ring-1 ring-slate-200">
            {renderIcon()}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
            <p className="mt-0.5 text-xs text-slate-500">{doc.category} · {doc.type} File</p>
            {doc.taskRef && (
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
                <CheckCircle2 className="h-3 w-3" /> Produced by: {doc.taskRef}
              </span>
            )}
          </div>
        </div>

        {/* Mock preview frame */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
          {doc.type === 'Image' ? (
            <div className="overflow-hidden rounded-xl bg-gradient-to-br from-teal-50 to-slate-100 p-8">
              <div className="mx-auto max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-teal-700">
                  <span className="text-2xl">❤️</span>
                  <span className="text-sm font-bold">City Care Cardiology</span>
                </div>
                <h5 className="mt-3 text-base font-extrabold text-slate-900">5 Simple Habits for a Healthy Heart</h5>
                <p className="mt-2 text-xs text-slate-600">
                  Early cardiovascular screening saves lives. Regular 30-min exercise, low sodium nutrition, and annual blood pressure monitoring.
                </p>
                <div className="mt-4 rounded bg-teal-600 py-1.5 text-xs font-bold text-white">
                  Book Screening: 1800-CITY-CARE
                </div>
              </div>
            </div>
          ) : doc.type === 'Video' ? (
            <div className="flex h-48 flex-col items-center justify-center rounded-xl bg-slate-900 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-xs">
                <Video className="h-6 w-6 text-white" />
              </div>
              <p className="mt-3 text-xs font-semibold">Video Preview (60 Seconds · 1080p MP4)</p>
              <p className="text-[11px] text-slate-400">Dr. Ramachandran interview on non-invasive cardiac checkups</p>
            </div>
          ) : (
            <div className="space-y-3 text-left">
              <div className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
                <p className="font-bold text-slate-900 mb-1">Executive Excerpt:</p>
                <p>{doc.previewText || 'This document contains clinical guidelines, approved marketing copy, audience targeting definitions and delivery timelines prepared by the Samrudhi agentic workforce.'}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>Verified by Clinical Compliance Gate</span>
                <span>SHA-256 Verified · Client Confidential</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
