/**
 * Content Generation Page
 * Admin interface to generate excursions using Gemini AI
 */

'use client'

import { useState } from 'react'
import { Sparkles, Download, Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function GenerateContentPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const generateExcursions = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/generate/excursions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'bulk',
          saveToFile: true,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate excursions')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const downloadJSON = () => {
    if (!result) return

    const blob = new Blob([JSON.stringify(result.excursions, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'generated-excursions.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white py-12">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            AI Content Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate realistic excursion descriptions, itineraries, and images using Gemini 2.5 AI
          </p>
        </div>

        {/* Configuration */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Generate Turks & Caicos Excursions
          </h2>

          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What will be generated:</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm">
                <li>20+ realistic excursion activities</li>
                <li>Detailed descriptions and itineraries</li>
                <li>Pricing, duration, and difficulty levels</li>
                <li>High-quality images from Unsplash</li>
                <li>Categories, tags, and metadata</li>
                <li>Cancellation policies and important info</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Requirements:</h3>
              <ul className="list-disc list-inside text-yellow-800 space-y-1 text-sm">
                <li>Gemini API key configured in .env.local</li>
                <li>Unsplash API key (optional, will use placeholders if missing)</li>
                <li>This process takes 5-10 minutes</li>
                <li>Generated data will be saved to /data/generated-excursions.json</li>
              </ul>
            </div>
          </div>

          <button
            onClick={generateExcursions}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                Generating... This may take several minutes
              </>
            ) : (
              <>
                <Sparkles size={24} />
                Generate Excursions with AI
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <XCircle size={24} className="text-red-600" />
              <h3 className="text-lg font-bold text-red-900">Error</h3>
            </div>
            <p className="text-red-800">{error}</p>
            <div className="mt-4 text-sm text-red-700">
              <p className="font-semibold mb-2">Common issues:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Make sure GEMINI_API_KEY is set in .env.local</li>
                <li>Check that your API key is valid</li>
                <li>Ensure you have internet connectivity</li>
              </ul>
            </div>
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={24} className="text-green-600" />
                <h3 className="text-lg font-bold text-green-900">Success!</h3>
              </div>
              <button
                onClick={downloadJSON}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <Download size={18} />
                Download JSON
              </button>
            </div>

            <p className="text-green-800 mb-4">
              Generated <strong>{result.count}</strong> excursions with images!
            </p>

            <div className="bg-white rounded-lg p-4 max-h-96 overflow-y-auto">
              <h4 className="font-semibold text-gray-900 mb-2">Generated Excursions:</h4>
              <ul className="space-y-2">
                {result.excursions.map((exc: any, index: number) => (
                  <li key={index} className="border-b border-gray-200 pb-2">
                    <p className="font-semibold text-gray-900">{exc.title}</p>
                    <p className="text-sm text-gray-600">{exc.category} • ${exc.pricing.adult} • {exc.duration.hours}h</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Next steps:</strong> The generated data has been saved to 
                <code className="bg-blue-100 px-2 py-1 rounded mx-1 font-mono text-xs">
                  /data/generated-excursions.json
                </code>
                You can now use this data in your components!
              </p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            📚 Setup Instructions
          </h3>
          
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold mb-2">1. Get your Gemini API Key:</p>
              <p className="ml-4">Visit: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-ocean-600 hover:underline">https://makersuite.google.com/app/apikey</a></p>
            </div>

            <div>
              <p className="font-semibold mb-2">2. Get Unsplash API Key (optional):</p>
              <p className="ml-4">Visit: <a href="https://unsplash.com/developers" target="_blank" rel="noopener noreferrer" className="text-ocean-600 hover:underline">https://unsplash.com/developers</a></p>
            </div>

            <div>
              <p className="font-semibold mb-2">3. Add to .env.local:</p>
              <pre className="ml-4 bg-gray-800 text-green-400 p-3 rounded-lg overflow-x-auto">
{`GEMINI_API_KEY=your_gemini_key_here
NEXT_PUBLIC_GEMINI_MODEL=gemini-2.0-flash-exp
UNSPLASH_ACCESS_KEY=your_unsplash_key_here`}
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-2">4. Restart your server:</p>
              <pre className="ml-4 bg-gray-800 text-green-400 p-3 rounded-lg">
npm run dev
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

