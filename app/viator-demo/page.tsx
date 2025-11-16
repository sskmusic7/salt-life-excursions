/**
 * Viator Integration Demo Page
 * 
 * This page demonstrates how to use the Viator API integration.
 * Use this as a reference for implementing Viator data in other pages.
 * 
 * To view this page: http://localhost:3000/viator-demo
 */

import { ViatorSearchResults } from '@/components/viator/ViatorSearchResults'

export default function ViatorDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-ocean-600 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Viator API Integration Demo
          </h1>
          <p className="text-xl text-ocean-100 max-w-3xl mx-auto">
            This page demonstrates the Viator Partner API (2.0) integration.
            Search for activities powered by real Viator data.
          </p>
        </div>
      </div>

      {/* Search Results */}
      <div className="py-12">
        <ViatorSearchResults
          initialSearchTerm="Turks and Caicos"
          // destId={123} // Replace with actual Turks & Caicos destId
        />
      </div>

      {/* Instructions */}
      <div className="container-custom pb-16">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📚 How to Use This Integration
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-bold text-lg mb-2">1. Set up your API credentials</h3>
              <p>Create a <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> file with your Viator API key:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg mt-2 overflow-x-auto">
{`VIATOR_API_KEY=your_api_key_here
NEXT_PUBLIC_VIATOR_API_URL=https://api.sandbox.viator.com
NEXT_PUBLIC_VIATOR_API_VERSION=2.0
NEXT_PUBLIC_VIATOR_DEFAULT_LANGUAGE=en-US`}
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">2. Use the components</h3>
              <p>Import and use Viator components in your pages:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg mt-2 overflow-x-auto">
{`import { ViatorSearchResults } from '@/components/viator/ViatorSearchResults'
import { ViatorActivityCard } from '@/components/viator/ViatorActivityCard'
import { ProtectedReviews } from '@/components/shared/ProtectedReviews'`}
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">3. Use the hooks</h3>
              <p>Fetch Viator data in your components:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg mt-2 overflow-x-auto">
{`import { useViatorProducts } from '@/lib/viator/hooks/useViatorProducts'

const { products, loading, error } = useViatorProducts({
  searchTerm: 'snorkeling',
  filters: { currency: 'USD' }
})`}
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">4. Use the services (server-side)</h3>
              <p>Call Viator API directly in server components or API routes:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg mt-2 overflow-x-auto">
{`import { ViatorProductService } from '@/lib/viator'

const product = await ViatorProductService.getProduct('5010SYDNEY')
const results = await ViatorSearchService.searchProducts('diving')`}
              </pre>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-bold text-yellow-900 mb-2">⚠️ Important Notes:</p>
              <ul className="list-disc list-inside space-y-1 text-yellow-800">
                <li>Always use <code>ProtectedReviews</code> component for review content (required by Viator)</li>
                <li>Price information comes from availability schedules, not product content</li>
                <li>Test with sandbox API first: <code>https://api.sandbox.viator.com</code></li>
                <li>Switch to production when ready: <code>https://api.viator.com</code></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">📖 Documentation</h3>
              <p>See the following files for detailed information:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code>VIATOR_INTEGRATION_GUIDE.md</code> - Complete integration guide</li>
                <li><code>lib/viator/README.md</code> - API service documentation</li>
                <li><code>.env.example</code> - Environment variable template</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


