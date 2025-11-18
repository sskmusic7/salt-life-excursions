export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Safety Guidelines
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Your safety is our top priority. Please review these guidelines before participating in any activities.
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Before Your Activity</h2>
              <div className="space-y-4 text-gray-700">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Read all activity descriptions and requirements carefully</li>
                  <li>Disclose any medical conditions, allergies, or physical limitations</li>
                  <li>Confirm you meet age, weight, and skill requirements</li>
                  <li>Arrive on time and bring all recommended items</li>
                  <li>Stay hydrated and use reef-safe sunscreen</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">During Your Activity</h2>
              <div className="space-y-4 text-gray-700">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Listen carefully to all safety briefings and instructions</li>
                  <li>Always wear provided safety equipment (life jackets, helmets, etc.)</li>
                  <li>Stay within designated areas and follow guide directions</li>
                  <li>Never participate under the influence of alcohol or drugs</li>
                  <li>Be aware of your surroundings and respect marine life</li>
                  <li>If you feel unwell or unsafe, inform your guide immediately</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Water Activities</h2>
              <div className="space-y-4 text-gray-700">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Swimming ability is required for most water activities</li>
                  <li>Always use provided life jackets, especially in open water</li>
                  <li>Stay hydrated and protect yourself from sun exposure</li>
                  <li>Be mindful of currents, tides, and weather conditions</li>
                  <li>Never touch or disturb coral reefs or marine life</li>
                  <li>Buddy up - never swim or snorkel alone</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Adventure Activities</h2>
              <div className="space-y-4 text-gray-700">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Follow all instructions from your certified guide</li>
                  <li>Wear appropriate safety gear at all times</li>
                  <li>Stay within your skill level - don't attempt advanced maneuvers without proper training</li>
                  <li>Be aware of terrain and environmental hazards</li>
                  <li>Keep a safe distance from other participants</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Provider Standards</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All providers listed on Salt Life Excursions are verified and must meet our safety standards:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Licensed and insured operations</li>
                  <li>Certified and experienced guides</li>
                  <li>Well-maintained equipment and safety gear</li>
                  <li>Emergency response plans and first aid training</li>
                  <li>Clear safety procedures and communication</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-red-900 mb-4">Emergency Situations</h2>
              <div className="space-y-4 text-red-800">
                <p>
                  In case of emergency:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Stay calm and follow your guide's instructions</li>
                  <li>Call emergency services: 911 (or 649-999-0911 in Turks & Caicos)</li>
                  <li>Notify your activity provider immediately</li>
                  <li>Contact Salt Life Excursions support: <a href="mailto:hello@saltlifetci.com" className="underline font-semibold">hello@saltlifetci.com</a></li>
                </ul>
              </div>
            </div>

            <div className="bg-ocean-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Concerns?</h2>
              <p className="text-gray-700 mb-6">
                If you have any safety concerns before, during, or after an activity, please contact us immediately.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Report a Safety Concern
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

