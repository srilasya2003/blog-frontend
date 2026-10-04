import { useEffect, useState } from 'react'
import { fetchCategories, fetchPosts } from '../api/client'
import FeaturedPost from '../components/FeaturedPost'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import Sidebar from '../components/Sidebar'

function HomePage() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPost, setSelectedPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadHomeFeed() {
      try {
        const [postsData, categoriesData] = await Promise.all([
          fetchPosts(),
          fetchCategories(),
        ])

        if (isActive) {
          const allPosts = Array.isArray(postsData) ? postsData : postsData?.results || []
          setPosts(
            allPosts.filter(
              (post) => post.is_published === true || String(post.is_published).toLowerCase() === 'true',
            ),
          )
          setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData?.results || [])
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message || 'Unable to load posts right now.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadHomeFeed()

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    if (!selectedPost) {
      return undefined
    }

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setSelectedPost(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedPost])

  const visiblePosts = selectedCategory === 'all'
    ? posts
    : posts.filter((post) => String(post.category) === selectedCategory)
  const featuredPost = visiblePosts[0]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Discover
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Fresh ideas for curious minds
              </h1>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              {[{ id: 'all', name: 'All' }, ...categories].map((topic) => (
                <button
                  key={topic.id}
                  className={`rounded-full border px-3 py-1.5 font-medium transition ${
                    String(topic.id) === selectedCategory
                      ? 'border-cyan-300 bg-cyan-50 text-cyan-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-700'
                  }`}
                  onClick={() => setSelectedCategory(String(topic.id))}
                  type="button"
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_360px]">
          <div className="space-y-8">
      
            {isLoading ? (
              <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                Loading posts...
              </p>
            ) : error ? (
              <p className="rounded-2xl border border-red-200 bg-white p-6 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : featuredPost ? (
              <FeaturedPost
                post={featuredPost}
                categoryName={categories.find((category) => String(category.id) === String(featuredPost.category))?.name}
                onSelect={setSelectedPost}
              />
            ) : (
              <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                No posts found in this category.
              </p>
            )}
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  Latest stories
                </h2>
                <button
                  className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
                  type="button"
                >
                  View all
                </button>
              </div>

              {!isLoading && !error && visiblePosts.length > 1 && (
                <PostCard
                  posts={visiblePosts.slice(1)}
                  categories={categories}
                  onSelect={setSelectedPost}
                />
              )}
            </section>
          </div>

          <Sidebar posts={posts} writersLoading={isLoading} />
        </div>
      </main>

      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onClick={() => setSelectedPost(null)}
        >
          <section
            aria-labelledby="post-dialog-title"
            aria-modal="true"
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Close post"
              className="absolute right-4 top-4 rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setSelectedPost(null)}
              type="button"
            >
              Close
            </button>
            <p className="pr-20 text-sm font-medium text-cyan-700">
              {categories.find((category) => String(category.id) === String(selectedPost.category))?.name || 'Story'}
            </p>
            <h2 id="post-dialog-title" className="mt-3 pr-16 text-2xl font-semibold text-slate-950 sm:text-3xl">
              {selectedPost.title}
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              By {selectedPost.author_name || 'Unknown author'}
              {' · '}
              {selectedPost.created_at
                ? new Date(selectedPost.created_at).toLocaleString()
                : 'Time unavailable'}
            </p>
            {selectedPost.image && (
              <img
                alt={selectedPost.title}
                className="mt-6 max-h-96 w-full rounded-xl object-cover"
                src={new URL(selectedPost.image, import.meta.env.VITE_API_BASE_URL || window.location.origin).toString()}
              />
            )}
            <p className="mt-6 whitespace-pre-wrap text-base leading-7 text-slate-700">
              {selectedPost.content}
            </p>
          </section>
        </div>
      )}
    </div>
  )
}

export default HomePage
