function FeaturedPost() {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="min-h-[260px] bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.25),transparent_40%),linear-gradient(135deg,#0f172a,#1e293b)] p-8 text-white">
          <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-300" />
            Featured story
          </div>

          <p className="text-sm text-slate-300">Design • 7 min read</p>
          <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            Why better interfaces feel calm, not crowded.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
            Thoughtful design isn’t about adding more; it’s about making every
            decision clearer, lighter, and easier to trust.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
              AS
            </div>
            <div>
              <p className="text-sm font-medium text-white">Aisha Shah</p>
              <p className="text-xs text-slate-300">May 14, 2026</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-slate-50 p-6">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 h-44 rounded-2xl bg-[linear-gradient(135deg,#cffafe,#dbeafe,#f8fafc)]" />
            <div className="space-y-3">
              <div className="h-3 w-2/3 rounded-full bg-slate-200" />
              <div className="h-3 w-1/2 rounded-full bg-slate-200" />
              <div className="h-3 w-3/4 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default FeaturedPost
