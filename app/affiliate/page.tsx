export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Affiliate Program
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Earn commissions by promoting Salt Life Excursions and helping travelers discover amazing experiences in Turks & Caicos
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Join our affiliate program and earn competitive commissions when travelers book activities through your referral links. 
                  Perfect for travel bloggers, influencers, travel agencies, and content creators.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-ocean-600 mr-3 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Competitive Commissions</h3>
                      <p className="text-gray-600 text-sm">Earn up to 15% commission on every booking</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-ocean-600 mr-3 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">30-Day Cookie Window</h3>
                      <p className="text-gray-600 text-sm">Extended tracking ensures you get credit for referrals</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-ocean-600 mr-3 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Marketing Materials</h3>
                      <p className="text-gray-600 text-sm">Access banners, images, and content to promote activities</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-ocean-600 mr-3 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Real-Time Tracking</h3>
                      <p className="text-gray-600 text-sm">Monitor your performance with detailed analytics dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Commission Structure</h2>
              <div className="space-y-4 text-gray-700">
                <div className="border-l-4 border-ocean-600 pl-4">
                  <p className="font-semibold text-gray-900">Standard Commission: 10%</p>
                  <p className="text-sm text-gray-600">On all bookings referred through your affiliate links</p>
                </div>
                <div className="border-l-4 border-ocean-600 pl-4">
                  <p className="font-semibold text-gray-900">Premium Commission: 15%</p>
                  <p className="text-sm text-gray-600">Available for high-performing affiliates with consistent referrals</p>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Commissions are calculated on the booking total after taxes and fees. Payments are made monthly via PayPal or bank transfer.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Can Join?</h2>
              <div className="space-y-3 text-gray-700">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Travel bloggers and content creators</li>
                  <li>Social media influencers</li>
                  <li>Travel agencies and tour operators</li>
                  <li>Website owners and publishers</li>
                  <li>Email marketers</li>
                  <li>Anyone with an audience interested in travel and adventures</li>
                </ul>
              </div>
            </div>

            <div className="bg-ocean-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Apply Now</h2>
              <p className="text-gray-700 mb-6">
                Ready to start earning? Fill out the form below and we'll review your application within 48 hours.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name / Business Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-600 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-600 focus:border-transparent"
                />
                <input
                  type="url"
                  placeholder="Website / Social Media URL"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-600 focus:border-transparent"
                />
                <textarea
                  placeholder="Tell us about your audience and how you plan to promote Salt Life Excursions..."
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




