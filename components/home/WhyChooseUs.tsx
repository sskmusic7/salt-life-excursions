'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Clock, Headphones, DollarSign, ThumbsUp } from 'lucide-react'

export function WhyChooseUs() {
  const features = [
    {
      icon: <Shield size={32} />,
      title: 'Trusted Providers',
      description: 'All providers are verified, licensed, and insured for your safety and peace of mind.',
    },
    {
      icon: <Award size={32} />,
      title: 'Best Price Guarantee',
      description: 'Find the best deals with our competitive pricing and exclusive package offers.',
    },
    {
      icon: <Clock size={32} />,
      title: 'Instant Booking',
      description: 'Quick and easy booking process with instant confirmation for most activities.',
    },
    {
      icon: <Headphones size={32} />,
      title: '24/7 Support',
      description: 'Our dedicated team is here to help you anytime, anywhere during your stay.',
    },
    {
      icon: <DollarSign size={32} />,
      title: 'Flexible Payments',
      description: 'Multiple payment options including cards, PayPal, Apple Pay, and more.',
    },
    {
      icon: <ThumbsUp size={32} />,
      title: 'Satisfaction Guarantee',
      description: 'Read real reviews from thousands of happy customers who loved their experiences.',
    },
  ]

  return (
    <section className="section-padding bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Why Choose Salt Life?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            We're committed to making your island adventure seamless and unforgettable
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-ocean-gradient rounded-lg flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}







