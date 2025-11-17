/**
 * Blog Post Detail Page
 * Displays full blog post content
 */

import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { ShareButton } from '@/components/blog/ShareButton'

export async function generateStaticParams() {
  const dataDir = join(process.cwd(), 'data')
  const filePath = join(dataDir, 'generated-blog-posts.json')
  
  if (!existsSync(filePath)) {
    return []
  }

  try {
    const fileContent = readFileSync(filePath, 'utf-8')
    const posts = JSON.parse(fileContent)
    return posts.map((post: any) => ({
      id: post.id.toString()
    }))
  } catch (error) {
    console.error('Failed to load blog posts:', error)
    return []
  }
}

async function getBlogPost(id: string) {
  const dataDir = join(process.cwd(), 'data')
  const filePath = join(dataDir, 'generated-blog-posts.json')
  
  if (!existsSync(filePath)) {
    return null
  }

  try {
    const fileContent = readFileSync(filePath, 'utf-8')
    const posts = JSON.parse(fileContent)
    const post = posts.find((p: any) => p.id.toString() === id)
    return post || null
  } catch (error) {
    console.error('Failed to load blog post:', error)
    return null
  }
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      {/* Header */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container-custom pb-12 text-white">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>
          
          <div className="mb-4">
            <span className="bg-ocean-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{post.readTime}</span>
            </div>
            <div>
              <span>By {post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <article className="prose prose-lg max-w-none">
            {/* Blog Content */}
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: formatBlogContent(post.content) }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-ocean-100 text-ocean-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Share this post:</h3>
              <div className="flex items-center gap-4">
                <ShareButton post={post} />
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

/**
 * Format blog content from markdown/text to HTML
 */
function formatBlogContent(content: string): string {
  // Convert markdown-style headers to HTML first (before paragraph processing)
  let html = content
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-gray-900 mt-10 mb-6">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-gray-900 mt-12 mb-8">$1</h1>')
  
  // Convert markdown links FIRST (before processing paragraphs)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-ocean-600 hover:text-ocean-700 underline font-medium">$1</a>')
  
  // Convert plain URLs (http/https) that aren't already in anchor tags
  // Use a function to check if URL is already inside an anchor tag
  html = html.replace(/(https?:\/\/[^\s<>"']+)/gi, (match, offset, string) => {
    // Check if this URL is already inside an anchor tag
    const before = string.substring(0, offset)
    
    // Check if we're inside an <a> tag
    const lastOpenTag = before.lastIndexOf('<a')
    const lastCloseTag = before.lastIndexOf('</a>')
    
    // If there's an open <a> tag after the last closing </a>, we're inside an anchor
    if (lastOpenTag > lastCloseTag) {
      return match // Already in an anchor tag, don't convert
    }
    
    // Check if there's a > before the URL (might be inside another tag)
    const lastAngleBefore = before.lastIndexOf('>')
    if (lastAngleBefore > lastCloseTag && before.substring(lastAngleBefore).includes('<')) {
      return match // Inside another tag, don't convert
    }
    
    return `<a href="${match}" target="_blank" rel="noopener noreferrer" class="text-ocean-600 hover:text-ocean-700 underline font-medium">${match}</a>`
  })
  
  // Convert paragraphs (process line by line to preserve structure)
  const lines = html.split('\n')
  let processedLines: string[] = []
  let currentParagraph: string[] = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines
    if (!line) {
      if (currentParagraph.length > 0) {
        processedLines.push(`<p class="text-gray-700 mb-6 leading-relaxed">${currentParagraph.join(' ')}</p>`)
        currentParagraph = []
      }
      continue
    }
    
    // If it's already an HTML tag (header, list, etc.), add it directly
    if (line.match(/^<[h|u|o|l]/i)) {
      if (currentParagraph.length > 0) {
        processedLines.push(`<p class="text-gray-700 mb-6 leading-relaxed">${currentParagraph.join(' ')}</p>`)
        currentParagraph = []
      }
      processedLines.push(line)
      continue
    }
    
    // Collect paragraph text
    currentParagraph.push(line)
  }
  
  // Add any remaining paragraph
  if (currentParagraph.length > 0) {
    processedLines.push(`<p class="text-gray-700 mb-6 leading-relaxed">${currentParagraph.join(' ')}</p>`)
  }
  
  html = processedLines.join('\n')
  
  // Convert bullet lists (markdown style)
  html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 mb-2 text-gray-700">$1</li>')
  html = html.replace(/(<li class="ml-6 mb-2 text-gray-700">.*<\/li>\n?)+/g, (match) => {
    return `<ul class="list-disc mb-6 space-y-2 pl-6">${match}</ul>`
  })
  
  // Convert numbered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 text-gray-700">$1</li>')
  html = html.replace(/(<li class="ml-6 mb-2 text-gray-700">.*<\/li>\n?)+/g, (match, offset, string) => {
    // Only if it's not already wrapped in a ul
    if (!string.substring(Math.max(0, offset - 10), offset + match.length).includes('<ul')) {
      return `<ol class="list-decimal mb-6 space-y-2 pl-6">${match}</ol>`
    }
    return match
  })
  
  // Convert bold (after links to avoid conflicts)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
  
  // Convert italic (but not bold asterisks)
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic">$1</em>')
  
  return html
}

