import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Chatbot } from '@/components/shared/Chatbot'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Salt Life - Turks & Caicos Excursions | Making Life Easier',
  description: 'Book unforgettable excursions in Turks & Caicos. Jet ski, snorkeling, yacht rides, VIP experiences, and more. Premium activities and adventure tours.',
  keywords: 'Turks and Caicos, excursions, activities, boat tours, snorkeling, jet ski, yacht, luxury travel, Caribbean tours',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Salt Life - Turks & Caicos Excursions',
    description: 'Book unforgettable excursions in Turks & Caicos',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {/* Animated Background Video */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-15 bg-background-blur"
          >
            <source src="/background-video.mp4" type="video/mp4" />
          </video>
        </div>
        
        <Navbar />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
        <Chatbot />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

