/**
 * API Route: Contact Form Submission
 * POST /api/contact
 * 
 * Handles contact form submissions and logs them.
 * In production, this would integrate with email service (SendGrid, Mailgun, etc.)
 */

import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs'
import { join } from 'path'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  timestamp: string
  ip?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create submission record
    const submission: ContactSubmission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      phone: phone || '',
      subject,
      message,
      timestamp: new Date().toISOString(),
    }

    // Log to console (visible in server logs)
    console.log('📧 NEW CONTACT FORM SUBMISSION:')
    console.log('=====================================')
    console.log(`Name: ${submission.name}`)
    console.log(`Email: ${submission.email}`)
    console.log(`Phone: ${submission.phone || 'Not provided'}`)
    console.log(`Subject: ${submission.subject}`)
    console.log(`Message: ${submission.message}`)
    console.log(`Time: ${submission.timestamp}`)
    console.log('=====================================')

    // Save to JSON file (for demo purposes - in production use database)
    try {
      const dataDir = join(process.cwd(), 'data')
      if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true })
      }
      
      const filePath = join(dataDir, 'contact-submissions.json')
      let submissions: ContactSubmission[] = []
      
      if (existsSync(filePath)) {
        const existing = readFileSync(filePath, 'utf-8')
        submissions = JSON.parse(existing)
      }
      
      submissions.push(submission)
      writeFileSync(filePath, JSON.stringify(submissions, null, 2))
      
      console.log(`✅ Submission saved to ${filePath}`)
    } catch (fileError) {
      console.warn('Could not save to file (read-only in production):', fileError)
    }

    // In production, you would send an email here:
    // await sendEmail({
    //   to: 'info@saltlifeexcursions.com',
    //   subject: `New Contact: ${subject}`,
    //   body: `From: ${name} (${email})\n\n${message}`
    // })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24-48 hours.',
      submissionId: submission.id,
    })
  } catch (error) {
    console.error('❌ Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}

// GET method to view submissions (admin only in production)
export async function GET() {
  try {
    const filePath = join(process.cwd(), 'data', 'contact-submissions.json')
    
    if (!existsSync(filePath)) {
      return NextResponse.json({ submissions: [], count: 0 })
    }
    
    const submissions = JSON.parse(readFileSync(filePath, 'utf-8'))
    
    return NextResponse.json({
      submissions,
      count: submissions.length,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

