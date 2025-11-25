export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using the Salt Life Excursions website and booking services, you accept and agree 
                to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Booking and Payment</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All bookings are subject to availability and confirmation. Prices are displayed in USD and include 
                  all applicable taxes unless otherwise stated.
                </p>
                <p>
                  Payment is required at the time of booking. We accept major credit cards, debit cards, and PayPal. 
                  All transactions are secure and encrypted.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cancellation and Refunds</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Please refer to our <a href="/booking-policy" className="text-ocean-600 hover:text-ocean-700 underline">Booking Policy</a> for detailed 
                  information about cancellations and refunds. Generally, free cancellation is available up to 48 hours 
                  before the activity start time.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Participant Responsibilities</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Participants are responsible for arriving on time, bringing necessary items (as specified in booking confirmations), 
                  and following all safety instructions provided by activity providers.
                </p>
                <p>
                  Participants must disclose any medical conditions, physical limitations, or other relevant information that may 
                  affect their ability to safely participate in activities.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Liability and Waiver</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Participation in activities involves inherent risks. By booking an activity, you acknowledge and accept 
                  these risks and agree that Salt Life Excursions and its providers are not liable for any injuries, 
                  damages, or losses that may occur during participation.
                </p>
                <p>
                  All participants are required to sign liability waivers before participating in activities. Minors must 
                  have waivers signed by a parent or legal guardian.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Provider Relationships</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Salt Life Excursions acts as a booking platform connecting customers with local activity providers. 
                  We verify providers but are not responsible for their day-to-day operations. Any issues with specific 
                  activities should be reported to us immediately.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All content on this website, including text, images, logos, and design, is the property of Salt Life Excursions 
                  and is protected by copyright and trademark laws. You may not reproduce, distribute, or use any content without 
                  written permission.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Your privacy is important to us. Please review our <a href="/privacy" className="text-ocean-600 hover:text-ocean-700 underline">Privacy Policy</a> to understand 
                  how we collect, use, and protect your personal information.
                </p>
              </div>
            </div>

            <div className="bg-ocean-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Our Terms?</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about these Terms and Conditions, please contact us.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




