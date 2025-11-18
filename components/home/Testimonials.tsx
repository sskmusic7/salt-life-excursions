'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import siteImagesConfig from '@/data/site-images-config.json'

export function Testimonials() {
  const testimonialData = [
    {
      name: 'Sarah Mitchell',
      location: 'New York, USA',
      rating: 5,
      text: 'Salt Life made our honeymoon absolutely perfect! The yacht cruise was breathtaking, and the VIP dining experience was unforgettable. Everything was so easy to book!',
      activity: 'Luxury Yacht & VIP Dining',
    },
    {
      name: 'James Rodriguez',
      location: 'Miami, USA',
      rating: 5,
      text: 'Best family vacation ever! The package deal was incredible value. Kids loved the snorkeling and kayaking. Professional staff and seamless experience from start to finish.',
      activity: 'Family Fun Package',
    },
    {
      name: 'Emily Chen',
      location: 'Toronto, Canada',
      rating: 5,
      text: 'The jet ski adventure was thrilling! Great equipment, safety-focused guides, and stunning views. Will definitely book again on our next visit to TCI!',
      activity: 'Jet Ski Adventure',
    },
    {
      name: 'Michael Thompson',
      location: 'London, UK',
      rating: 5,
      text: 'Exceptional service and attention to detail. The provider approval process ensures quality. Used the platform for multiple activities - all were outstanding!',
      activity: 'Multiple Activities',
    },
    {
      name: 'Lisa Anderson',
      location: 'Los Angeles, USA',
      rating: 5,
      text: 'The ATV tour was amazing! Guides were knowledgeable and fun. Saw parts of the island we never would have found on our own. Highly recommend!',
      activity: 'ATV Beach Tour',
    },
    {
      name: 'David Kim',
      location: 'Seoul, South Korea',
      rating: 5,
      text: 'Perfect platform for booking island activities! Multi-language support made it easy to navigate. Customer service was responsive and helpful.',
      activity: 'Snorkeling Experience',
    },
  ]

  // Merge with images from config
  const testimonials = testimonialData.map((testimonial, index) => {
    const configImage = siteImagesConfig.testimonials[index]
    return {
      ...testimonial,
      image: configImage?.image || 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200'
    }
  })

  return (
    <section className="section-padding bg-white/10 backdrop-blur-sm">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4"
          >
            What Our Guests Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Join thousands of happy travelers who've experienced paradise with us
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-6 relative"
            >
              <Quote className="absolute top-6 right-6 text-ocean-200" size={48} />
              
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Activity */}
              <div className="mb-4">
                <span className="inline-block bg-ocean-100 text-ocean-700 px-3 py-1 rounded-full text-sm font-medium">
                  {testimonial.activity}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-ocean-600">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-ocean-600">10,000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-ocean-600">5,000+</div>
            <div className="text-gray-600">5-Star Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-ocean-600">100+</div>
            <div className="text-gray-600">Verified Providers</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

