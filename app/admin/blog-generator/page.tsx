'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle, FileText, Sparkles } from 'lucide-react'

interface GenerationResult {
  success: boolean
  count?: number
  posts?: any[]
  error?: string
  note?: string
}

export default function BlogGeneratorPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [generatingCount, setGeneratingCount] = useState(0)
  const [totalCount, setTotalCount] = useState(24)

  const generateAllBlogs = async () => {
    setLoading(true)
    setResult(null)
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
      setResult(data)
      
      if (data.success && data.count) {
        setGeneratingCount(data.count)
      }
    } catch (error) {
      console.error(error)
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate blog posts'
      })
    } finally {
      setLoading(false)
    }
  }

  const generateSingleBlog = async () => {
    const title = prompt('Enter blog post title:')
    if (!title) return

    const category = prompt('Enter category (e.g., Travel Guide, Activities):') || 'Travel Guide'
    const author = prompt('Enter author name:') || 'Sarah Johnson'
    const topic = prompt('Enter search topic/keywords:') || title

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/generate/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'single',
          title,
          category,
          author,
          topic,
          saveToFile: true
        })
      })

      const data: GenerationResult = await response.json()
      setResult(data)
    } catch (error) {
      console.error(error)
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate blog post'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white pt-20">
      <div className="container-custom max-w-4xl py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-ocean-600" size={32} />
            <h1 className="text-4xl font-display font-bold text-gray-900">
              Blog Post Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Generate comprehensive blog posts using Gemini AI + Google Search API
          </p>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This is a private admin page. Keep it secure and don't share the URL publicly.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={generateAllBlogs}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            {loading ? (
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

          <button
            onClick={generateSingleBlog}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles size={20} />
                <span>Generate Single Post</span>
              </>
            )}
          </button>
        </div>

        {/* Progress Indicator */}
        {loading && generatingCount > 0 && (
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

        {/* Results */}
        {result && (
          <div className={`p-6 rounded-lg border-2 ${
            result.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              ) : (
                <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
              )}
              <div className="flex-1">
                <h3 className={`font-bold text-lg mb-2 ${
                  result.success ? 'text-green-900' : 'text-red-900'
                }`}>
                  {result.success ? 'Success!' : 'Error'}
                </h3>
                {result.success ? (
                  <div>
                    <p className="text-green-800 mb-2">
                      Generated {result.count || 0} blog post{result.count !== 1 ? 's' : ''} successfully!
                    </p>
                    {result.note && (
                      <p className="text-sm text-green-700 italic">{result.note}</p>
                    )}
                    <div className="mt-4">
                      <a
                        href="/blog"
                        className="inline-block px-4 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition-colors"
                      >
                        View Blog Posts →
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-800">
                    {result.error || 'An unknown error occurred'}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
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

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Time Estimate:</strong> ~30 seconds per post. Generating all 24 posts will take approximately 12-15 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

