function Sidebar() {
  const trending = ['Product thinking', 'Remote teams', 'Design systems', 'Writing rituals']
  const writers = ['Aisha Shah', 'Lina Park', 'Marcus Lee', 'Nadia Cole']

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
          {writers.map((writer) => (
            <div key={writer} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                  {writer
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </div>
                <span className="text-sm font-medium text-slate-700">{writer}</span>
              </div>
              <button
                className="text-xs font-semibold text-cyan-700 hover:text-cyan-900"
                type="button"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
