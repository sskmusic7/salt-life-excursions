'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: 'Hi! 👋 I\'m your Salt Life assistant. How can I help you plan your Turks & Caicos adventure?', isBot: true },
  ])
  const [input, setInput] = useState('')

  const faqs = [
    {
      question: 'What activities do you offer?',
      answer: 'We offer jet skiing, yacht cruises, snorkeling, diving, ATV tours, kayaking, VIP dining, and much more! All activities are provided by verified local providers.'
    },
    {
      question: 'How do I book an activity?',
      answer: 'Simply browse our activities, select the one you like, choose your date and number of guests, then click "Book Now". You\'ll receive instant confirmation!'
    },
    {
      question: 'What\'s your cancellation policy?',
      answer: 'Most activities offer free cancellation up to 48 hours before the scheduled time. Specific policies vary by provider and are shown during booking.'
    },
    {
      question: 'Do you offer group discounts?',
      answer: 'Yes! We have special package deals for groups of 6 or more. Check out our "Package Deals" page for amazing savings!'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.'
    },
  ]

  const quickReplies = [
    'What activities do you offer?',
    'How do I book?',
    'Cancellation policy',
    'Group discounts',
  ]

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = input
    setMessages([...messages, { text: userMessage, isBot: false }])
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      const response = getBotResponse(userMessage)
      setMessages(prev => [...prev, { text: response, isBot: true }])
    }, 1000)
  }

  const getBotResponse = (message: string): string => {
    const lower = message.toLowerCase()

    // Check FAQs
    for (const faq of faqs) {
      if (lower.includes(faq.question.toLowerCase().split(' ')[0])) {
        return faq.answer
      }
    }

    if (lower.includes('price') || lower.includes('cost')) {
      return 'Our activities range from $75 to $499 per person. Yacht experiences start at $499, water sports at $75-$159, and VIP services at $299+. Check individual activity pages for exact pricing!'
    }

    if (lower.includes('location') || lower.includes('where')) {
      return 'We operate throughout Turks & Caicos, primarily in Providenciales, Grace Bay, and North Caicos. Each activity listing shows the exact meeting point!'
    }

    if (lower.includes('weather') || lower.includes('rain')) {
      return 'Most water activities are weather-dependent. If conditions are unsafe, we\'ll help you reschedule or provide a full refund. Check with individual providers for their weather policies.'
    }

    if (lower.includes('contact') || lower.includes('help')) {
      return 'You can reach us at hello@saltlifetci.com or call +1 (649) XXX-XXXX. We\'re here 24/7 to help with your booking!'
    }

    return 'I\'m here to help! You can ask me about activities, bookings, pricing, cancellations, or anything else. Or try one of the quick replies below! 😊'
  }

  const handleQuickReply = (reply: string) => {
    setMessages([...messages, { text: reply, isBot: false }])
    setTimeout(() => {
      const response = getBotResponse(reply)
      setMessages(prev => [...prev, { text: response, isBot: true }])
    }, 1000)
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-ocean-gradient text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageCircle size={28} />
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
              !
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-ocean-gradient text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Salt Life Assistant</h3>
                  <p className="text-xs text-white/80">Online • Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.isBot
                        ? 'bg-white text-gray-800 shadow-md'
                        : 'bg-ocean-600 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-2 bg-white text-ocean-600 text-sm rounded-full shadow hover:shadow-md transition-shadow border border-ocean-200"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  aria-label="Send message"
                  className="w-12 h-12 bg-ocean-600 hover:bg-ocean-700 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

