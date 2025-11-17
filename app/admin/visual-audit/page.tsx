'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle, Image, Search, Eye, RefreshCw } from 'lucide-react'

interface AuditResult {
  id: string
  type: 'blog' | 'excursion' | 'activity'
  title: string
  currentImage: string
  suggestedImage?: string
  matchScore?: number
  keywords: string[]
  issue?: string
  labels?: string[]
}

interface AuditSummary {
  totalAudited: number
  needsCorrection: number
  corrected?: number
  correctionsApplied?: boolean
}

export default function VisualAuditPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<AuditResult[]>([])
  const [summary, setSummary] = useState<AuditSummary | null>(null)
  const [auditType, setAuditType] = useState<'full' | 'blog' | 'excursions'>('full')
  const [showPreview, setShowPreview] = useState<string | null>(null)

  const runAudit = async (applyCorrections: boolean = false) => {
    setLoading(true)
    setResults([])
    setSummary(null)

    try {
      const response = await fetch('/api/visual-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: auditType,
          applyCorrections
        })
      })

      const data = await response.json()

      if (data.success) {
        setResults(data.results || [])
        setSummary(data.summary || {})
      } else {
        alert(`Audit failed: ${data.error}`)
      }
    } catch (error) {
      console.error(error)
      alert('Failed to run visual audit')
    } finally {
      setLoading(false)
    }
  }

  const needsCorrection = results.filter(r => r.suggestedImage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white pt-20">
      <div className="container-custom max-w-6xl py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="text-ocean-600" size={32} />
            <h1 className="text-4xl font-display font-bold text-gray-900">
              Visual Auditing System
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Audit all images on the site using Google Image Search + Vision API to ensure accuracy
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>How it works:</strong> Scans all images, uses Google Image Search to find matching images, 
              optionally uses Vision API for OCR/label detection, and suggests corrections for mismatched images.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Audit Type
              </label>
              <select
                value={auditType}
                onChange={(e) => setAuditType(e.target.value as any)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              >
                <option value="full">Full Audit (All Images)</option>
                <option value="blog">Blog Posts Only</option>
                <option value="excursions">Excursions Only</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={() => runAudit(false)}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Auditing...</span>
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    <span>Run Audit</span>
                  </>
                )}
              </button>
            </div>

            {needsCorrection.length > 0 && (
              <div className="flex items-end">
                <button
                  onClick={() => runAudit(true)}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Applying...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw size={20} />
                      <span>Apply All Corrections</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className={`p-6 rounded-lg border-2 mb-8 ${
            summary.needsCorrection > 0
              ? 'bg-yellow-50 border-yellow-200'
              : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-start gap-3">
              {summary.needsCorrection > 0 ? (
                <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              ) : (
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              )}
              <div>
                <h3 className={`font-bold text-lg mb-2 ${
                  summary.needsCorrection > 0 ? 'text-yellow-900' : 'text-green-900'
                }`}>
                  Audit Complete
                </h3>
                <div className="space-y-1">
                  <p className={summary.needsCorrection > 0 ? 'text-yellow-800' : 'text-green-800'}>
                    Total Images Audited: <strong>{summary.totalAudited}</strong>
                  </p>
                  <p className={summary.needsCorrection > 0 ? 'text-yellow-800' : 'text-green-800'}>
                    Needs Correction: <strong>{summary.needsCorrection}</strong>
                  </p>
                  {summary.corrected !== undefined && (
                    <p className="text-green-800">
                      Corrections Applied: <strong>{summary.corrected}</strong>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Audit Results ({results.length} images)
            </h2>

            {needsCorrection.length > 0 && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-semibold mb-2">
                  ⚠️ {needsCorrection.length} images need correction
                </p>
                <p className="text-sm text-yellow-700">
                  These images don't match Google Image Search results for their topics. Click "Apply All Corrections" to automatically replace them.
                </p>
              </div>
            )}

            <div className="grid gap-4">
              {results.map((result) => {
                const needsFix = !!result.suggestedImage

                return (
                  <div
                    key={`${result.type}-${result.id}`}
                    className={`bg-white rounded-lg shadow-md p-6 border-2 ${
                      needsFix ? 'border-yellow-300' : 'border-green-200'
                    }`}
                  >
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Info */}
                      <div className="md:col-span-1">
                        <div className="mb-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            result.type === 'blog' 
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {result.type.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{result.title}</h3>
                        {result.matchScore !== undefined && (
                          <div className="mb-2">
                            <span className="text-sm text-gray-600">Match Score: </span>
                            <span className={`font-bold ${
                              result.matchScore > 0.7 ? 'text-green-600' :
                              result.matchScore > 0.4 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {(result.matchScore * 100).toFixed(0)}%
                            </span>
                          </div>
                        )}
                        {result.labels && result.labels.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Detected Labels:</p>
                            <div className="flex flex-wrap gap-1">
                              {result.labels.slice(0, 5).map((label, i) => (
                                <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {label}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {result.keywords.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Search Keywords:</p>
                            <div className="flex flex-wrap gap-1">
                              {result.keywords.slice(0, 5).map((kw, i) => (
                                <span key={i} className="text-xs bg-ocean-100 text-ocean-700 px-2 py-1 rounded">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Current Image */}
                      <div className="md:col-span-1">
                        <div className="relative h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                          <img
                            src={result.currentImage}
                            alt={result.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Error'
                            }}
                          />
                          <button
                            onClick={() => setShowPreview(result.currentImage)}
                            className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
                          >
                            <Image size={16} className="text-gray-700" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">Current Image</p>
                        {result.issue && (
                          <p className="text-xs text-red-600 mt-1 text-center">{result.issue}</p>
                        )}
                      </div>

                      {/* Suggested Image */}
                      {needsFix && result.suggestedImage && (
                        <div className="md:col-span-1">
                          <div className="relative h-48 rounded-lg overflow-hidden border-2 border-yellow-400">
                            <img
                              src={result.suggestedImage}
                              alt={`Suggested for ${result.title}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Error'
                              }}
                            />
                            <button
                              onClick={() => setShowPreview(result.suggestedImage!)}
                              className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
                            >
                              <Image size={16} className="text-gray-700" />
                            </button>
                          </div>
                          <p className="text-xs text-green-600 mt-2 text-center font-semibold">
                            Suggested Replacement
                          </p>
                          <p className="text-xs text-gray-500 mt-1 text-center">
                            From Google Image Search
                          </p>
                        </div>
                      )}

                      {!needsFix && (
                        <div className="md:col-span-1 flex items-center justify-center">
                          <div className="text-center">
                            <CheckCircle2 className="text-green-500 mx-auto mb-2" size={32} />
                            <p className="text-sm text-green-600 font-semibold">Image Matches</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        {showPreview && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={showPreview}
                alt="Preview"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setShowPreview(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

