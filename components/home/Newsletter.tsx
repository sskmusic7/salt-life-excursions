'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you for subscribing!')
      setEmail('')
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="section-padding bg-ocean-gradient text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Mail size={40} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Get Exclusive Deals & Island Tips
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Subscribe to our newsletter and receive special offers, new activity alerts, and insider guides to Turks & Caicos.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
                <Send size={20} />
              </button>
            </div>
            <p className="text-sm text-white/70 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.form>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">20% OFF</div>
              <div className="text-white/80">First Booking Discount</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Weekly</div>
              <div className="text-white/80">Exclusive Deals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">VIP</div>
              <div className="text-white/80">Early Access to New Activities</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}







