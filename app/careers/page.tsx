export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Careers at Salt Life
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Join our team and help create unforgettable experiences in Turks & Caicos
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-ocean-600 mr-3">✓</span>
                <span>Work in paradise - Turks & Caicos is our office</span>
              </li>
              <li className="flex items-start">
                <span className="text-ocean-600 mr-3">✓</span>
                <span>Competitive salaries and benefits packages</span>
              </li>
              <li className="flex items-start">
                <span className="text-ocean-600 mr-3">✓</span>
                <span>Professional growth and development opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="text-ocean-600 mr-3">✓</span>
                <span>Collaborative and supportive team environment</span>
              </li>
              <li className="flex items-start">
                <span className="text-ocean-600 mr-3">✓</span>
                <span>Employee discounts on all activities and experiences</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Experience Specialist</h3>
                <p className="text-gray-600 mb-3">Full-time • Remote/On-site Hybrid</p>
                <p className="text-gray-700 mb-4">
                  Help create amazing experiences for our customers by providing exceptional support and guidance 
                  in booking and enjoying their Turks & Caicos adventures.
                </p>
                <a href="/contact" className="text-ocean-600 hover:text-ocean-700 font-semibold">
                  Apply Now →
                </a>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketing Coordinator</h3>
                <p className="text-gray-600 mb-3">Full-time • Remote</p>
                <p className="text-gray-700 mb-4">
                  Drive our brand awareness and customer engagement through creative marketing campaigns, 
                  social media, and partnerships.
                </p>
                <a href="/contact" className="text-ocean-600 hover:text-ocean-700 font-semibold">
                  Apply Now →
                </a>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Operations Manager</h3>
                <p className="text-gray-600 mb-3">Full-time • Turks & Caicos</p>
                <p className="text-gray-700 mb-4">
                  Oversee day-to-day operations, manage provider relationships, and ensure smooth execution 
                  of all activities and experiences.
                </p>
                <a href="/contact" className="text-ocean-600 hover:text-ocean-700 font-semibold">
                  Apply Now →
                </a>
              </div>
            </div>
          </div>

          <div className="bg-ocean-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't See a Fit?</h2>
            <p className="text-gray-700 mb-4">
              We're always looking for talented individuals to join our team. If you're passionate about 
              travel, customer service, or the tourism industry, we'd love to hear from you!
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Contact Us About Opportunities
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

