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
  // Convert markdown-style headers to HTML
  let html = content
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-gray-900 mt-10 mb-6">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-gray-900 mt-12 mb-8">$1</h1>')
  
  // Convert paragraphs
  html = html.split('\n\n').map(paragraph => {
    if (paragraph.trim() && !paragraph.match(/^<[h|u|o|l]/i)) {
      return `<p class="text-gray-700 mb-6 leading-relaxed">${paragraph.trim()}</p>`
    }
    return paragraph
  }).join('\n\n')
  
  // Convert bullet lists
  html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 mb-2 text-gray-700">$1</li>')
  html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc mb-6 space-y-2">$&</ul>')
  
  // Convert numbered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 text-gray-700">$1</li>')
  html = html.replace(/(<li.*<\/li>\n?)+/g, '<ol class="list-decimal mb-6 space-y-2">$&</ol>')
  
  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
  
  // Convert italic
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
  
  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-ocean-600 hover:text-ocean-700 underline">$1</a>')
  
  return html
}

