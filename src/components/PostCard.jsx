const posts = [
  {
    title: 'What a slow morning can teach you about creative work',
    category: 'Creativity',
    author: 'Lina Park',
    date: 'Jun 3, 2026',
    readTime: '5 min read',
    excerpt:
      'Quiet routines often create sharper ideas than fast bursts of productivity ever could.',
  },
  {
    title: 'The best writing habits are the ones you can keep',
    category: 'Writing',
    author: 'Marcus Lee',
    date: 'Jun 1, 2026',
    readTime: '6 min read',
    excerpt:
      'Consistency beats intensity. A sustainable system helps ideas become real work.',
  },
  {
    title: 'Designing for trust means editing with intention',
    category: 'Product',
    author: 'Nadia Cole',
    date: 'May 28, 2026',
    readTime: '4 min read',
    excerpt:
      'Less complexity often makes the product feel safer, clearer, and more memorable.',
  },
  {
    title: 'Why every team needs a clearer feedback loop',
    category: 'Leadership',
    author: 'Owen Clarke',
    date: 'May 22, 2026',
    readTime: '7 min read',
    excerpt:
      'A healthier feedback process doesn’t silence disagreement; it gives it structure.',
  },
]

function PostCard() {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article
          key={post.title}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex flex-col gap-4 p-5 sm:flex-row">
            <div className="h-40 w-full rounded-2xl bg-[linear-gradient(135deg,#e0f2fe,#dbeafe,#f8fafc)] sm:w-44" />

            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-cyan-700">
                  {post.category}
                </span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-800">{post.author}</p>
                  <p className="text-xs text-slate-500">{post.date}</p>
                </div>

                <button
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
                  type="button"
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default PostCard
