'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    activities: [
      { name: 'Jet Ski', href: '/activities/jet-ski' },
      { name: 'Snorkeling & Diving', href: '/activities/snorkeling' },
      { name: 'Yacht Rides', href: '/activities/yacht' },
      { name: 'ATV Tours', href: '/activities/atv' },
      { name: 'See-Through Kayak', href: '/activities/kayak' },
      { name: 'VIP Experiences', href: '/activities/vip' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Become a Provider', href: '/provider/signup' },
      { name: 'Affiliate Program', href: '/affiliate' },
      { name: 'Contact Us', href: '/contact' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Booking Policy', href: '/booking-policy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Safety Guidelines', href: '/safety' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <img
                src="/logo.png"
                alt="Salt Life Logo"
                className="h-16 w-16"
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Your premier destination for unforgettable excursions and adventures in Turks & Caicos. 
              Book exclusive experiences with trusted local providers.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-ocean-400" />
                <span className="text-sm">Turks & Caicos Islands</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-ocean-400" />
                <span className="text-sm">+1 (649) XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-ocean-400" />
                <span className="text-sm">hello@saltlifetci.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 bg-gray-800 hover:bg-ocean-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-ocean-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-ocean-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-ocean-600 rounded-full flex items-center justify-center transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Activities */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Popular Activities</h3>
            <ul className="space-y-3">
              {footerLinks.activities.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-ocean-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-ocean-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-ocean-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Salt Life. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <img src="/payment-methods.png" alt="Payment Methods" className="h-8 opacity-70" />
              <span className="text-xs text-gray-500">Secure Payment Processing</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}




