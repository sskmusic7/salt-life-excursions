/**
 * Blog Page
 * Travel tips, guides, and stories from Turks & Caicos
 */

import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export const metadata = {
  title: 'Blog - Salt Life Excursions',
  description: 'Travel tips, guides, and stories from Turks & Caicos Islands.',
}

// Fallback blog posts if generated posts don't exist
const fallbackBlogPosts = [
  {
    id: 1,
    title: '10 Best Beaches in Turks & Caicos You Must Visit',
    excerpt: 'Discover the most stunning beaches across the islands, from Grace Bay to pristine hidden gems that few tourists know about.',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1070',
    category: 'Travel Guide',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '8 min read',
  },
  {
    id: 2,
    title: 'First-Time Visitor\'s Guide to Turks & Caicos',
    excerpt: 'Everything you need to know for your first trip to the islands, including best times to visit, what to pack, and local customs.',
    image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?q=80&w=1070',
    category: 'Travel Tips',
    author: 'Michael Chen',
    date: '2024-01-10',
    readTime: '10 min read',
  },
  {
    id: 3,
    title: 'The Ultimate Snorkeling Guide: Best Spots & Tips',
    excerpt: 'From Smith\'s Reef to the Barrier Reef, explore the best snorkeling locations and learn tips for an amazing underwater experience.',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1070',
    category: 'Activities',
    author: 'Emily Rodriguez',
    date: '2024-01-05',
    readTime: '7 min read',
  },
  {
    id: 4,
    title: 'Local Cuisine: Must-Try Dishes in TCI',
    excerpt: 'Explore the flavors of Turks & Caicos with our guide to conch fritters, fresh seafood, and local Caribbean specialties.',
    image: 'https://images.unsplash.com/photo-1600891963931-17596e7eabc1?q=80&w=1070',
    category: 'Food & Drink',
    author: 'David Thompson',
    date: '2023-12-28',
    readTime: '6 min read',
  },
  {
    id: 5,
    title: 'Family-Friendly Activities in Providenciales',
    excerpt: 'Planning a family vacation? Discover the best kid-friendly activities, from safe beaches to educational eco-tours.',
    image: 'https://images.unsplash.com/photo-1609177999149-41b38586c8ad?q=80&w=1070',
    category: 'Family Travel',
    author: 'Lisa Anderson',
    date: '2023-12-20',
    readTime: '9 min read',
  },
  {
    id: 6,
    title: 'Sustainable Tourism: Protecting Our Paradise',
    excerpt: 'Learn how you can travel responsibly and help preserve the natural beauty of the Turks & Caicos Islands for future generations.',
    image: 'https://images.unsplash.com/photo-1591131848873-9a4558f93926?q=80&w=1070',
    category: 'Sustainability',
    author: 'James Wilson',
    date: '2023-12-15',
    readTime: '5 min read',
  },
]

function getBlogPosts() {
  const dataDir = join(process.cwd(), 'data')
  const filePath = join(dataDir, 'generated-blog-posts.json')
  
  if (!existsSync(filePath)) {
    return fallbackBlogPosts
  }

  try {
    const fileContent = readFileSync(filePath, 'utf-8')
    const posts = JSON.parse(fileContent)
    return Array.isArray(posts) && posts.length > 0 ? posts : fallbackBlogPosts
  } catch (error) {
    console.error('Failed to load blog posts:', error)
    return fallbackBlogPosts
  }
}

export default function BlogPage() {
  const blogPosts = getBlogPosts()
  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-600/90 to-ocean-400/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=2070"
          alt="Blog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container-custom text-center text-white">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            Travel Blog
          </h1>
          <p className="text-xl">
            Tips, guides, and stories from paradise
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding">
        <div className="container-custom max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="card overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-ocean-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      By {post.author}
                    </span>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-ocean-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">Showing {blogPosts.length} article{blogPosts.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
