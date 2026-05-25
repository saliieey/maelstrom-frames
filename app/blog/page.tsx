import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Photography Blog - Tips & Guides Perinthalmanna',
  description: 'Read our photography blog for wedding, event & portrait photography tips, guides & insights. Learn from our professional photography team in Perinthalmanna.',
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      {/* Blog Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-warm-50">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[50%] rounded-full bg-warm-200 blur-3xl opacity-50"></div>
          <div className="absolute top-[20%] -left-[10%] w-[30%] h-[40%] rounded-full bg-warm-300 blur-3xl opacity-40"></div>
        </div>
        
        <div className="container relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-warm-100 text-warm-800 text-xs font-bold tracking-widest uppercase mb-6 animate-fade-in">
            Our Journal
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-gray-900 animate-slide-up font-serif font-bold">
            Photography Blog
            <span className="block mt-3 text-lg md:text-xl lg:text-2xl text-gray-600 font-medium font-sans">Wedding, Event & Portrait Photography Tips in Perinthalmanna, Kerala</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Tips, guides, and beautiful stories to inspire your wedding planning journey and help you capture perfect memories.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article 
                  key={post.id} 
                  className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  {/* Image Wrapper */}
                  <Link href={`/blog/${post.slug}`} className="relative block aspect-[4/3] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider text-warm-700 shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-6 md:p-8">
                    <div className="flex items-center text-sm text-gray-500 mb-4 justify-between">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        {post.author}
                      </div>
                    </div>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-warm-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <div 
                      className="text-gray-600 mb-6 line-clamp-3 text-sm md:text-base flex-grow"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-warm-600 font-bold text-sm tracking-wider uppercase group/link mt-auto w-max relative"
                    >
                      Read Article
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-warm-600 transition-all duration-300 group-hover/link:w-full"></span>
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                <p className="text-2xl font-serif mb-4">No stories published yet.</p>
                <p>Head to WordPress to post your first article!</p>
              </div>
            )}
          </div>
          
          {/* Load More Button */}
          {posts.length > 0 && (
            <div className="mt-16 text-center">
              <button className="btn btn-outline border-warm-200 text-gray-900 hover:text-white hover:border-warm-600 hover:bg-warm-600 px-10 py-4 font-bold tracking-wide">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
