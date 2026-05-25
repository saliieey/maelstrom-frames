import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) {
    return { title: 'Post Not Found - Maelstrom Frames' }
  }
  return {
    title: `${post.title} - Maelstrom Frames Blog`,
    description: post.excerpt.replace(/<[^>]+>/g, '').slice(0, 150) + '...',
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <article className="bg-white">
      {/* Article Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-warm-50">
         <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-6 text-sm font-bold tracking-widest text-warm-700 uppercase">
                 <Link href="/blog" className="hover:text-warm-900 transition-colors">Blog</Link>
                 <span>•</span>
                 <span>{post.category}</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl mb-8 text-gray-900 font-serif leading-tight">
                 {post.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-gray-500">
                <div className="flex items-center">
                  <span className="font-medium w-max border-b-2 border-warm-200">By {post.author}</span>
                </div>
                <div className="w-1.5 h-1.5 bg-warm-300 rounded-full"></div>
                <div className="flex items-center">
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* Featured Image */}
      <section className="container -mt-10 md:-mt-16 relative z-20 px-4 md:px-8">
         <div className="relative aspect-[16/9] md:aspect-[21/9] w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
            {post.image && (
              <Image
                 src={post.image}
                 alt={post.title}
                 fill
                 className="object-cover"
                 priority
              />
            )}
         </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container">
          <div 
             className="max-w-3xl mx-auto wp-article-content text-gray-700 text-lg md:text-xl leading-relaxed"
             dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Internal Styles for WordPress Content Output */}
      <style dangerouslySetInnerHTML={{__html: `
        .wp-article-content h1, 
        .wp-article-content h2, 
        .wp-article-content h3, 
        .wp-article-content h4 {
           font-family: var(--font-playfair);
           color: #1a1a1a;
           margin-top: 2.5em;
           margin-bottom: 1em;
           font-weight: 700;
           line-height: 1.2;
        }
        .wp-article-content h2 { font-size: 2.25rem; }
        .wp-article-content h3 { font-size: 1.75rem; }
        .wp-article-content p {
           margin-bottom: 1.75em;
        }
        .wp-article-content a {
           color: rgb(212, 165, 116);
           text-decoration: underline;
           text-decoration-thickness: 2px;
           text-underline-offset: 4px;
           transition: color 0.3s;
        }
        .wp-article-content a:hover {
           color: #b8936a;
        }
        .wp-article-content img {
           border-radius: 1rem;
           margin: 3em auto;
           max-width: 100%;
           height: auto;
           box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
        }
        .wp-article-content ul, .wp-article-content ol {
           margin-bottom: 1.75em;
           padding-left: 1.5em;
        }
        .wp-article-content ul { list-style-type: disc; }
        .wp-article-content ol { list-style-type: decimal; }
        .wp-article-content li {
           margin-bottom: 0.5em;
        }
        .wp-article-content blockquote {
           border-left: 4px solid rgb(212, 165, 116);
           background: #fef9f3;
           padding: 1.5em;
           border-radius: 0 1rem 1rem 0;
           font-style: italic;
           font-size: 1.25em;
           color: #4b5563;
           margin: 2.5em 0;
        }
        .wp-article-content figure {
           margin: 3em 0;
        }
        .wp-article-content figcaption {
           text-align: center;
           font-size: 0.875rem;
           color: #6b7280;
           margin-top: 0.75rem;
           font-style: italic;
        }
      `}} />
    </article>
  )
}
