'use client'

import { useState } from 'react'
import { ProviderSidebar } from '@/components/provider/ProviderSidebar'
import { DashboardOverview } from '@/components/provider/DashboardOverview'
import { ListingsManager } from '@/components/provider/ListingsManager'
import { BookingsManager } from '@/components/provider/BookingsManager'
import { CalendarManager } from '@/components/provider/CalendarManager'
import { EarningsReport } from '@/components/provider/EarningsReport'
import { ProfileSettings } from '@/components/provider/ProfileSettings'

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />
      case 'listings':
        return <ListingsManager />
      case 'bookings':
        return <BookingsManager />
      case 'calendar':
        return <CalendarManager />
      case 'earnings':
        return <EarningsReport />
      case 'settings':
        return <ProfileSettings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex">
        <ProviderSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}







