export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Find answers to common questions about booking and enjoying your Turks & Caicos adventures
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I book an activity?</h3>
                  <p className="text-gray-700">
                    Simply browse our activities, select your preferred date and time, choose the number of guests, 
                    and complete your booking. You'll receive a confirmation email with all the details.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel or modify my booking?</h3>
                  <p className="text-gray-700">
                    Yes! Most activities offer free cancellation up to 48 hours before your scheduled time. 
                    You can modify or cancel your booking directly from your confirmation email or by contacting us.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-700">
                    We accept all major credit cards, debit cards, and PayPal. All transactions are secure and encrypted.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Activity Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What should I bring to my activity?</h3>
                  <p className="text-gray-700">
                    Most activities include all necessary equipment. We recommend bringing swimwear, sunscreen, 
                    a camera, and a towel. Specific recommendations are included in your booking confirmation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens if the weather is bad?</h3>
                  <p className="text-gray-700">
                    In case of severe weather, we'll contact you to reschedule or provide a full refund. 
                    Light rain typically doesn't affect most activities, and many can proceed as planned.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Are activities suitable for children?</h3>
                  <p className="text-gray-700">
                    Many of our activities are family-friendly! Age requirements and recommendations are listed 
                    on each activity page. We also offer special family packages designed for all ages.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Support</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">I'm having trouble with the website</h3>
                  <p className="text-gray-700">
                    Try clearing your browser cache and cookies, or use a different browser. 
                    If problems persist, please contact our support team.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">I didn't receive my confirmation email</h3>
                  <p className="text-gray-700">
                    Check your spam folder first. If you still don't see it, contact us with your booking reference 
                    number and we'll resend it immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-ocean-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
              <p className="text-gray-700 mb-6">
                Our friendly support team is here to help! Reach out to us via email or phone, and we'll 
                get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/contact" 
                  className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center"
                >
                  Contact Support
                </a>
                <a 
                  href="mailto:hello@saltlifetci.com" 
                  className="inline-block bg-white hover:bg-gray-50 text-ocean-600 font-semibold px-6 py-3 rounded-lg transition-colors border-2 border-ocean-600 text-center"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

