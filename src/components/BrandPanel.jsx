function BrandPanel() {
  return (
    <section className="hidden min-h-screen flex-1 flex-col justify-between bg-slate-950 p-10 text-white lg:flex">
      <div>
        <div className="flex items-center gap-3 text-lg font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 font-bold text-slate-950">
            B
          </span>
          Brightline
        </div>

        <div className="mt-32 max-w-md">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            A place for ideas
          </p>
          <h1 className="text-5xl font-semibold leading-tight tracking-tight">
            Write clearly. Think deeply. Share freely.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Follow thoughtful stories and publish your own perspective with a
            community that values good writing.
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-500">Thoughts worth returning to.</p>
    </section>
  )
}

export default BrandPanel
