'use client'

import { Share2 } from 'lucide-react'

export function ShareButton({ post }: { post: { title: string; excerpt: string } }) {
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        }).catch(() => {
          // User cancelled share
        })
      } else {
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition-colors"
    >
      <Share2 size={18} />
      <span>Share</span>
    </button>
  )
}

