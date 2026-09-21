import FeaturedPost from '../components/FeaturedPost'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import Sidebar from '../components/Sidebar'

function HomePage() {
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
              {['All', 'Design', 'Technology', 'Writing', 'Product', 'Culture'].map((topic) => (
                <button
                  key={topic}
                  className={`rounded-full border px-3 py-1.5 font-medium transition ${
                    topic === 'All'
                      ? 'border-cyan-300 bg-cyan-50 text-cyan-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-700'
                  }`}
                  type="button"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_360px]">
          <div className="space-y-8">
      
            <FeaturedPost />
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

              <PostCard />
            </section>
          </div>

          <Sidebar />
        </div>
      </main>
    </div>
  )
}

export default HomePage
