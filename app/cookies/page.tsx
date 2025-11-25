export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
              <p className="text-gray-700">
                Cookies are small text files that are stored on your device when you visit a website. They help websites 
                remember your preferences and improve your browsing experience.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                  <p className="text-gray-700">
                    These cookies are necessary for the website to function properly. They enable core functionality such as 
                    security, network management, and accessibility. You cannot opt-out of these cookies.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Cookies</h3>
                  <p className="text-gray-700">
                    These cookies help us understand how visitors interact with our website by collecting and reporting 
                    information anonymously. This helps us improve our website's performance.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Functionality Cookies</h3>
                  <p className="text-gray-700">
                    These cookies allow the website to remember choices you make (such as language preferences) and provide 
                    enhanced, personalized features.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing Cookies</h3>
                  <p className="text-gray-700">
                    These cookies are used to deliver relevant advertisements and track the effectiveness of our marketing campaigns. 
                    You can opt-out of these cookies.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Most web browsers allow you to control cookies through their settings. You can set your browser to refuse 
                  cookies or alert you when cookies are being sent. However, blocking certain cookies may impact your experience 
                  on our website.
                </p>
                <p>
                  <strong className="text-gray-900">Browser Settings:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Chrome: Settings → Privacy and Security → Cookies</li>
                  <li>Firefox: Options → Privacy & Security → Cookies</li>
                  <li>Safari: Preferences → Privacy → Cookies</li>
                  <li>Edge: Settings → Privacy → Cookies</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may use third-party services that set cookies on your device, such as:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Google Analytics for website analytics</li>
                  <li>Payment processors for secure transactions</li>
                  <li>Social media platforms for sharing features</li>
                </ul>
                <p>
                  These third parties have their own privacy policies and cookie practices.
                </p>
              </div>
            </div>

            <div className="bg-ocean-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Cookies?</h2>
              <p className="text-gray-700 mb-6">
                If you have questions about our use of cookies, please contact us.
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




