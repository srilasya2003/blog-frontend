function Sidebar({ posts = [], writersLoading = false }) {
  const trending = ['Product thinking', 'Remote teams', 'Design systems', 'Writing rituals']
  const popularWriters = Array.from(
    posts.reduce((writersById, post) => {
      const authorId = post.author?.id ?? post.author
      const authorName = post.author_name || post.author?.username

      if (authorId === undefined || authorId === null || !authorName) {
        return writersById
      }

      const key = String(authorId)
      const writer = writersById.get(key) || {
        id: key,
        name: authorName,
        postCount: 0,
      }
      writer.postCount += 1
      writersById.set(key, writer)
      return writersById
    }, new Map()).values(),
  )
    .sort((first, second) => second.postCount - first.postCount)
    .slice(0, 4)

  return (
    <aside className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Trending topics</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          {trending.map((topic, index) => (
            <li key={topic} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-50 text-xs font-semibold text-cyan-700">
                {index + 1}
              </span>
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Weekly note
        </p>
        <h3 className="mt-3 text-xl font-semibold">Read slower. Think deeper.</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          A curated list of thoughtful stories for people who prefer depth over noise.
        </p>
        <button
          className="mt-5 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          type="button"
        >
          Join the list
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Popular writers</h3>
        <div className="mt-4 space-y-3">
          {writersLoading ? (
            <p className="text-sm text-slate-500">Loading writers...</p>
          ) : popularWriters.length > 0 ? (
            popularWriters.map((writer) => (
              <div key={writer.id} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                    {writer.name
                      .split(/\s+/)
                      .map((name) => name[0])
                      .join('')}
                  </div>
                  <span className="truncate text-sm font-medium text-slate-700">
                    {writer.name}
                  </span>
                </div>
                <span className="shrink-0 text-xs text-slate-500">
                  {writer.postCount} {writer.postCount === 1 ? 'post' : 'posts'}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No published writers yet.</p>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
