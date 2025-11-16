'use client'

import Link from 'next/link'
import {
  LayoutDashboard,
  List,
  Calendar,
  DollarSign,
  Settings,
  LogOut,
  Bell,
  FileText,
} from 'lucide-react'

interface ProviderSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function ProviderSidebar({ activeTab, setActiveTab }: ProviderSidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'listings', label: 'My Listings', icon: <List size={20} /> },
    { id: 'bookings', label: 'Bookings', icon: <FileText size={20} /> },
    { id: 'calendar', label: 'Availability', icon: <Calendar size={20} /> },
    { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Salt Life Logo"
            className="h-12 w-12"
          />
          <div>
            <h1 className="font-bold text-white">Salt Life</h1>
            <p className="text-xs text-gray-400">Provider Portal</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
            alt="Provider"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold">Ocean Elite Charters</h3>
            <p className="text-xs text-green-400">✓ Verified Provider</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-ocean-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Notifications */}
      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
          <Bell size={20} />
          <span>Notifications</span>
          <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <Link
          href="/"
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  )
}




