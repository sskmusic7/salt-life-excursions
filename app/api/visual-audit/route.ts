/**
 * API Route: Visual Audit
 * POST /api/visual-audit
 * 
 * Audits all images on the site and matches them with Google Image Search results
 */

import { NextRequest, NextResponse } from 'next/server'
import { VisualAuditor } from '@/lib/visual-auditor/auditor'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type = 'full', applyCorrections = false } = body

    const auditor = new VisualAuditor()
    let results: any[] = []
    let summary: any = {}

    if (type === 'full') {
      // Full audit of all images
      const auditSummary = await auditor.runFullAudit()
      results = auditSummary.results
      summary = {
        totalAudited: auditSummary.totalAudited,
        needsCorrection: auditSummary.needsCorrection,
      }

      // Apply corrections if requested
      if (applyCorrections) {
        const corrected = await auditor.applyCorrections(results, true)
        summary.corrected = corrected
        summary.correctionsApplied = true
      }
    } else if (type === 'blog') {
      results = await auditor.auditBlogImages()
      summary = {
        totalAudited: results.length,
        needsCorrection: results.filter(r => r.suggestedImage).length,
      }
    } else if (type === 'excursions') {
      results = await auditor.auditExcursionImages()
      summary = {
        totalAudited: results.length,
        needsCorrection: results.filter(r => r.suggestedImage).length,
      }
    }

    return NextResponse.json({
      success: true,
      summary,
      results,
    })
  } catch (error) {
    console.error('Visual audit error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to run visual audit',
      },
      { status: 500 }
    )
  }
}

