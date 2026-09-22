import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const myPosts = [
  {
    title: 'The quiet power of writing things down',
    category: 'Writing',
    date: 'Published Jun 8, 2026',
    status: 'Published',
    excerpt: 'A short reflection on turning scattered thoughts into ideas worth keeping.',
  },
  {
    title: 'Building a calmer creative routine',
    category: 'Creativity',
    date: 'Published May 30, 2026',
    status: 'Published',
    excerpt: 'Small, repeatable habits can make space for deeper and more consistent work.',
  },
]

function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-32 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.35),transparent_38%),linear-gradient(135deg,#0f172a,#1e293b)]" />
          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-cyan-400 text-2xl font-bold text-slate-950 shadow-sm">
                  U
                </div>
                <div className="pb-1">
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
                    Your profile
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">@yourusername</p>
                </div>
              </div>

              <Link
                className="rounded-full border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700"
                to="/write"
              >
                Write a post
              </Link>
            </div>

            <div className="mt-6 flex gap-8 border-t border-slate-200 pt-5 text-sm">
              <div>
                <p className="font-semibold text-slate-950">2</p>
                <p className="mt-1 text-slate-500">Posts</p>
              </div>
              <div>
                <p className="font-semibold text-slate-950">24</p>
                <p className="mt-1 text-slate-500">Followers</p>
              </div>
              <div>
                <p className="font-semibold text-slate-950">18</p>
                <p className="mt-1 text-slate-500">Following</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Your writing
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                My posts
              </h2>
            </div>
            <button
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-cyan-300 hover:text-cyan-700"
              type="button"
            >
              Drafts
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {myPosts.map((post) => (
              <article
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                key={post.title}
              >
                <div className="h-36 bg-[linear-gradient(135deg,#cffafe,#dbeafe,#f8fafc)]" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="rounded-full bg-cyan-50 px-2.5 py-1 font-semibold text-cyan-700">
                      {post.category}
                    </span>
                    <span className="font-medium text-emerald-600">{post.status}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  <p className="mt-4 text-xs text-slate-500">{post.date}</p>

                  <div className="mt-5 flex gap-3 border-t border-slate-200 pt-4">
                    <button
                      className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                      type="button"
                    >
                      View post
                    </button>
                    <button
                      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700"
                      type="button"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProfilePage
