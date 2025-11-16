/**
 * About Page
 * Learn more about Salt Life Excursions
 */

import Image from 'next/image'
import Link from 'next/link'
import { Award, Users, Globe, Heart } from 'lucide-react'

export const metadata = {
  title: 'About Us - Salt Life Excursions',
  description: 'Learn about Salt Life Excursions, your premier provider of unforgettable experiences in Turks & Caicos.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-600/90 to-ocean-400/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070"
          alt="Turks & Caicos"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container-custom text-center text-white">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            About Salt Life Excursions
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Making life easier, one adventure at a time
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              At Salt Life Excursions, we're passionate about creating unforgettable experiences 
              in the breathtaking Turks & Caicos Islands. Our mission is to connect travelers with 
              the best activities, tours, and adventures while providing exceptional service and 
              seamless booking experiences.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-ocean-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We partner with only the best activity providers to ensure every experience 
                exceeds your expectations.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-ocean-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We support local businesses and give back to the Turks & Caicos community 
                that makes these experiences possible.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-ocean-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to eco-friendly practices and preserving the natural beauty 
                of the islands for future generations.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-ocean-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Passion</h3>
              <p className="text-gray-600">
                We love what we do and it shows in every detail, from booking to your 
                final farewell at the end of your adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-ocean-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-8 text-center">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              Salt Life Excursions was born from a simple idea: make it easier for travelers 
              to discover and book amazing experiences in Turks & Caicos. Our founders, longtime 
              island residents, saw how challenging it could be for visitors to navigate the many 
              options available.
            </p>
            <p>
              We've built relationships with the best activity providers across the islands, 
              from family-run boat tours to professional dive operators. Every provider on our 
              platform is carefully vetted to ensure they meet our high standards for safety, 
              service, and sustainability.
            </p>
            <p>
              Today, we're proud to be the go-to platform for thousands of travelers seeking 
              authentic Caribbean adventures. Whether you're looking for a romantic sunset cruise, 
              a family-friendly snorkeling trip, or an adrenaline-pumping jet ski adventure, 
              we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
            Ready to Explore?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our collection of hand-picked excursions and start planning your 
            perfect Turks & Caicos adventure today.
          </p>
          <Link
            href="/excursions"
            className="btn-primary text-lg px-8 py-4 inline-block"
          >
            View All Excursions
          </Link>
        </div>
      </section>
    </div>
  )
}

