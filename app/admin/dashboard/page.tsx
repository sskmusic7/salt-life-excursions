'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle, FileText, Sparkles, Eye, RefreshCw, LayoutDashboard, Search } from 'lucide-react'
import Link from 'next/link'

interface GenerationResult {
  success: boolean
  count?: number
  posts?: any[]
  error?: string
  note?: string
}

interface AuditResult {
  id: string
  type: 'blog' | 'excursion' | 'activity'
  title: string
  currentImage: string
  suggestedImage?: string
  suggestedImageSource?: 'google' | 'unsplash' | 'ai-generated'
  alternatives?: {
    google?: string
    unsplash?: string
    aiGenerated?: string
  }
  matchScore?: number
  keywords: string[]
  issue?: string
  labels?: string[]
  postProcessingStatus?: {
    googleChecked: boolean
    unsplashChecked: boolean
    aiGenerated: boolean
    finalSource: 'google' | 'unsplash' | 'ai-generated' | 'none'
  }
}

interface AuditSummary {
  totalAudited: number
  needsCorrection: number
  corrected?: number
  correctionsApplied?: boolean
}

export default function AdminDashboardPage() {
  // Blog Generation State
  const [blogLoading, setBlogLoading] = useState(false)
  const [blogResult, setBlogResult] = useState<GenerationResult | null>(null)
  const [generatingCount, setGeneratingCount] = useState(0)
  const [totalCount, setTotalCount] = useState(24)

  // Visual Audit State
  const [auditLoading, setAuditLoading] = useState(false)
  const [auditResults, setAuditResults] = useState<AuditResult[]>([])
  const [auditSummary, setAuditSummary] = useState<AuditSummary | null>(null)
  const [auditType, setAuditType] = useState<'full' | 'blog' | 'excursions'>('full')
  const [showPreview, setShowPreview] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'blog' | 'audit'>('blog')

  // Blog Generation Functions
  const generateAllBlogs = async () => {
    setBlogLoading(true)
    setBlogResult(null)
    setGeneratingCount(0)
    setTotalCount(24)

    try {
      const response = await fetch('/api/generate/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'bulk', 
          saveToFile: true,
          count: 24 
        })
      })
      
      const data: GenerationResult = await response.json()
      setBlogResult(data)
      
      if (data.success && data.count) {
        setGeneratingCount(data.count)
      }
    } catch (error) {
      console.error(error)
      setBlogResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate blog posts'
      })
    } finally {
      setBlogLoading(false)
    }
  }

  // Visual Audit Functions
  const runAudit = async (applyCorrections: boolean = false) => {
    setAuditLoading(true)
    setAuditResults([])
    setAuditSummary(null)

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
        setAuditResults(data.results || [])
        setAuditSummary(data.summary || {})
      } else {
        alert(`Audit failed: ${data.error}`)
      }
    } catch (error) {
      console.error(error)
      alert('Failed to run visual audit')
    } finally {
      setAuditLoading(false)
    }
  }

  const needsCorrection = auditResults.filter(r => r.suggestedImage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white pt-20">
      <div className="container-custom max-w-6xl py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <LayoutDashboard className="text-ocean-600" size={32} />
            <h1 className="text-4xl font-display font-bold text-gray-900">
              Admin Dashboard (BTS)
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Behind-the-scenes dashboard for easy site updating and auditing
          </p>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Private Page:</strong> This is a private admin dashboard. Keep it secure and don't share the URL publicly.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'blog'
                ? 'border-ocean-600 text-ocean-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText size={20} className="inline mr-2" />
            Blog Generator
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'audit'
                ? 'border-ocean-600 text-ocean-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Eye size={20} className="inline mr-2" />
            Visual Audit
          </button>
        </div>

        {/* Blog Generator Tab */}
        {activeTab === 'blog' && (
          <div className="space-y-8">
            {/* Blog Generation Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Generate Blog Posts</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={generateAllBlogs}
                  disabled={blogLoading}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {blogLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Generating {generatingCount > 0 ? `${generatingCount}/${totalCount}` : '...'}</span>
                    </>
                  ) : (
                    <>
                      <FileText size={20} />
                      <span>Generate All 24 Blog Posts</span>
                    </>
                  )}
                </button>

                <Link
                  href="/blog"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                  <Eye size={20} />
                  <span>View Blog Page</span>
                </Link>
              </div>

              {/* Progress Indicator */}
              {blogLoading && generatingCount > 0 && (
                <div className="mb-6">
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-ocean-600 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${(generatingCount / totalCount) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Generating post {generatingCount} of {totalCount}...
                  </p>
                </div>
              )}

              {/* Blog Results */}
              {blogResult && (
                <div className={`p-6 rounded-lg border-2 ${
                  blogResult.success 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-3">
                    {blogResult.success ? (
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
                    ) : (
                      <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                    )}
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-2 ${
                        blogResult.success ? 'text-green-900' : 'text-red-900'
                      }`}>
                        {blogResult.success ? 'Success!' : 'Error'}
                      </h3>
                      {blogResult.success ? (
                        <div>
                          <p className="text-green-800 mb-2">
                            Generated {blogResult.count || 0} blog post{blogResult.count !== 1 ? 's' : ''} successfully!
                          </p>
                          {blogResult.note && (
                            <p className="text-sm text-green-700 italic">{blogResult.note}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-red-800">
                          {blogResult.error || 'An unknown error occurred'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Blog Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How Blog Generation Works</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-ocean-600 font-bold">1.</span>
                  <span>Uses Google Search API to research each topic</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean-600 font-bold">2.</span>
                  <span>Gemini 2.0 Flash AI writes comprehensive 800-1200 word articles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean-600 font-bold">3.</span>
                  <span>Fetches high-quality images from Unsplash</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean-600 font-bold">4.</span>
                  <span>Automatically saves to <code className="bg-gray-100 px-2 py-1 rounded">data/generated-blog-posts.json</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean-600 font-bold">5.</span>
                  <span>Posts appear on the <a href="/blog" className="text-ocean-600 underline">/blog</a> page</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Visual Audit Tab */}
        {activeTab === 'audit' && (
          <div className="space-y-8">
            {/* Audit Controls */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Visual Auditing System</h2>
              <p className="text-gray-600 mb-6">
                Audit all images on the site using Google Image Search + Vision API to ensure accuracy
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Audit Type
                  </label>
                  <select
                    value={auditType}
                    onChange={(e) => setAuditType(e.target.value as any)}
                    disabled={auditLoading}
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
                    disabled={auditLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    {auditLoading ? (
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
                      disabled={auditLoading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                      {auditLoading ? (
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

            {/* Audit Summary */}
            {auditSummary && (
              <div className={`p-6 rounded-lg border-2 ${
                auditSummary.needsCorrection > 0
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-start gap-3">
                  {auditSummary.needsCorrection > 0 ? (
                    <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
                  ) : (
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
                  )}
                  <div>
                    <h3 className={`font-bold text-lg mb-2 ${
                      auditSummary.needsCorrection > 0 ? 'text-yellow-900' : 'text-green-900'
                    }`}>
                      Audit Complete
                    </h3>
                    <div className="space-y-1">
                      <p className={auditSummary.needsCorrection > 0 ? 'text-yellow-800' : 'text-green-800'}>
                        Total Images Audited: <strong>{auditSummary.totalAudited}</strong>
                      </p>
                      <p className={auditSummary.needsCorrection > 0 ? 'text-yellow-800' : 'text-green-800'}>
                        Needs Correction: <strong>{auditSummary.needsCorrection}</strong>
                      </p>
                      {auditSummary.corrected !== undefined && (
                        <p className="text-green-800">
                          Corrections Applied: <strong>{auditSummary.corrected}</strong>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Audit Results - Simplified View */}
            {auditResults.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Audit Results ({auditResults.length} images)
                </h2>

                {needsCorrection.length > 0 && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 font-semibold mb-2">
                      ⚠️ {needsCorrection.length} images need correction
                    </p>
                    <p className="text-sm text-yellow-700">
                      These images don't match Google Image Search results. Click "Apply All Corrections" to automatically replace them.
                    </p>
                  </div>
                )}

                <div className="grid gap-4 max-h-96 overflow-y-auto">
                  {auditResults.slice(0, 10).map((result) => {
                    const needsFix = !!result.suggestedImage
                    return (
                      <div
                        key={`${result.type}-${result.id}`}
                        className={`p-4 rounded-lg border-2 ${
                          needsFix ? 'border-yellow-300 bg-yellow-50/50' : 'border-green-200 bg-green-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                result.type === 'blog' 
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-purple-100 text-purple-700'
                              }`}>
                                {result.type.toUpperCase()}
                              </span>
                              {result.matchScore !== undefined && (
                                <span className={`text-xs font-bold ${
                                  result.matchScore > 0.7 ? 'text-green-600' :
                                  result.matchScore > 0.4 ? 'text-yellow-600' :
                                  'text-red-600'
                                }`}>
                                  {(result.matchScore * 100).toFixed(0)}% match
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{result.title}</h3>
                            {result.issue && (
                              <p className="text-xs text-red-600">{result.issue}</p>
                            )}
                            {result.postProcessingStatus && (
                              <div className="mt-2 flex gap-2 text-xs text-gray-500">
                                <span>Google: {result.postProcessingStatus.googleChecked ? '✓' : '—'}</span>
                                <span>Unsplash: {result.postProcessingStatus.unsplashChecked ? '✓' : '—'}</span>
                                <span>AI: {result.postProcessingStatus.aiGenerated ? '✓' : '—'}</span>
                              </div>
                            )}
                          </div>
                          {needsFix && (
                            <div className="text-right">
                              <p className="text-xs text-green-600 font-semibold mb-1">Has Alternative</p>
                              <p className="text-xs text-gray-500">
                                {result.suggestedImageSource || 'google'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {auditResults.length > 10 && (
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    Showing first 10 of {auditResults.length} results. 
                    <Link href="/admin/visual-audit" className="text-ocean-600 underline ml-1">
                      View Full Results →
                    </Link>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

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
  )
}

