'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { ProvidersManagement } from '@/components/admin/ProvidersManagement'
import { BookingsManagement } from '@/components/admin/BookingsManagement'
import { ActivitiesApproval } from '@/components/admin/ActivitiesApproval'
import { CommissionSettings } from '@/components/admin/CommissionSettings'
import { AnalyticsReports } from '@/components/admin/AnalyticsReports'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />
      case 'providers':
        return <ProvidersManagement />
      case 'bookings':
        return <BookingsManagement />
      case 'activities':
        return <ActivitiesApproval />
      case 'commission':
        return <CommissionSettings />
      case 'analytics':
        return <AnalyticsReports />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}







