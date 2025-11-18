export default function BookingPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Booking Policy
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong className="text-gray-900">Free Cancellation:</strong> Most activities can be cancelled 
                  free of charge up to 48 hours before the scheduled start time. You'll receive a full refund 
                  to your original payment method within 5-7 business days.
                </p>
                <p>
                  <strong className="text-gray-900">Late Cancellation:</strong> Cancellations made within 48 hours 
                  of the activity start time may be subject to a cancellation fee. Some activities may be non-refundable 
                  at this point - please check the specific activity details.
                </p>
                <p>
                  <strong className="text-gray-900">No-Show:</strong> If you don't show up for your scheduled activity 
                  without prior notice, no refund will be provided.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modification Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  You can modify your booking (change date, time, or number of guests) free of charge up to 48 hours 
                  before your activity, subject to availability. Changes made within 48 hours may incur additional fees.
                </p>
                <p>
                  To modify your booking, use the link in your confirmation email or contact our support team.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Weather Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If an activity is cancelled due to severe weather conditions, you'll receive a full refund or the 
                  option to reschedule at no additional cost.
                </p>
                <p>
                  Light rain typically doesn't affect most activities. Our providers will assess conditions and 
                  communicate with you if there are any concerns.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Processing</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Refunds will be processed to your original payment method within 5-7 business days of cancellation. 
                  Please note that your bank or credit card company may take additional time to post the refund to your account.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Group Bookings</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  For group bookings (8+ people), special cancellation terms may apply. Please contact us directly 
                  for group booking policies and to discuss your specific requirements.
                </p>
              </div>
            </div>

            <div className="bg-ocean-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Our Policies?</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about our booking policies or need assistance with a specific situation, 
                please don't hesitate to contact us.
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

