export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong className="text-gray-900">Personal Information:</strong> When you book an activity, we collect 
                  information such as your name, email address, phone number, and payment information.
                </p>
                <p>
                  <strong className="text-gray-900">Usage Data:</strong> We collect information about how you use our website, 
                  including pages visited, time spent, and device information.
                </p>
                <p>
                  <strong className="text-gray-900">Cookies:</strong> We use cookies to enhance your experience. 
                  See our <a href="/cookies" className="text-ocean-600 hover:text-ocean-700 underline">Cookie Policy</a> for more details.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process and manage your bookings</li>
                  <li>Communicate with you about your reservations</li>
                  <li>Send you important updates about your activities</li>
                  <li>Improve our services and website experience</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We share your information only as necessary:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-gray-900">With Activity Providers:</strong> We share booking details with providers 
                  to fulfill your reservations</li>
                  <li><strong className="text-gray-900">Payment Processors:</strong> Your payment information is processed securely 
                  through encrypted payment gateways</li>
                  <li><strong className="text-gray-900">Legal Requirements:</strong> When required by law or to protect our rights</li>
                </ul>
                <p>
                  We do not sell your personal information to third parties.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We implement industry-standard security measures to protect your personal information, including encryption, 
                  secure servers, and restricted access. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
              <div className="space-y-4 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to processing of your information</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at <a href="mailto:hello@saltlifetci.com" className="text-ocean-600 hover:text-ocean-700 underline">hello@saltlifetci.com</a>.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, 
                  comply with legal obligations, resolve disputes, and enforce our agreements.
                </p>
              </div>
            </div>

            <div className="bg-ocean-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
              <p className="text-gray-700 mb-6">
                If you have questions or concerns about how we handle your personal information, please contact us.
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




