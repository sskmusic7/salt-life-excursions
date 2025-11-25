export default function ProviderSignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Become a Provider
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Join Salt Life Excursions and share your amazing experiences with travelers visiting Turks & Caicos
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Partner With Us?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-ocean-600 mr-3 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Increased Visibility</h3>
                      <p className="text-gray-600 text-sm">Reach thousands of travelers looking for authentic experiences</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-ocean-600 mr-3 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Easy Booking Management</h3>
                      <p className="text-gray-600 text-sm">Streamlined platform to manage bookings and communications</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-ocean-600 mr-3 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Marketing Support</h3>
                      <p className="text-gray-600 text-sm">Professional photography and marketing materials</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-ocean-600 mr-3 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Competitive Commission</h3>
                      <p className="text-gray-600 text-sm">Fair and transparent commission structure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <div className="space-y-3 text-gray-700">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Valid business license in Turks & Caicos</li>
                  <li>Comprehensive liability insurance</li>
                  <li>Certified and experienced guides/instructors</li>
                  <li>Well-maintained equipment meeting safety standards</li>
                  <li>Positive reputation and customer reviews</li>
                  <li>Commitment to exceptional customer service</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Process</h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <span className="bg-ocean-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 flex-shrink-0">1</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Submit Application</h3>
                    <p>Fill out our provider application form with your business details</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-ocean-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 flex-shrink-0">2</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Review & Verification</h3>
                    <p>Our team reviews your application and verifies credentials</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-ocean-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 flex-shrink-0">3</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Onboarding</h3>
                    <p>Complete onboarding process and list your activities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-ocean-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 flex-shrink-0">4</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Go Live</h3>
                    <p>Start receiving bookings and sharing your experiences!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-ocean-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
              <p className="text-gray-700 mb-6">
                Fill out the form below and our team will contact you within 48 hours to discuss partnership opportunities.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Business Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-600 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-600 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-600 focus:border-transparent"
                />
                <textarea
                  placeholder="Tell us about your business and activities..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-600 focus:border-transparent"
                />
                <button className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




