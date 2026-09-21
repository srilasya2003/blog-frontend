import { Link } from 'react-router-dom'

function WelcomePage() {
  return (
    <main className="welcome-page relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="welcome-glow welcome-glow-cyan" />
      <div className="welcome-glow welcome-glow-coral" />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <Link className="flex items-center gap-3 text-lg font-semibold tracking-tight" to="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 font-bold text-slate-950">
            B
          </span>
          Brightline
        </Link>
        <Link
          className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-300"
          to="/login"
        >
          Sign in
        </Link>
      </nav>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-89px)] max-w-7xl items-center gap-14 px-6 pb-16 pt-10 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pb-24">
        <div className="welcome-copy max-w-2xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            A place for ideas
          </p>
          <h1 className="max-w-xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            Make room for thoughts worth returning to.
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-slate-300">
            Brightline is a thoughtful corner for sharing perspectives, finding
            fresh ideas, and following writing that stays with you.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              className="rounded-lg bg-cyan-400 px-6 py-3.5 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              to="/login"
            >
              Start reading
            </Link>
            <Link
              className="rounded-lg border border-white/20 px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              to="/register"
            >
              Create an account
            </Link>
          </div>
        </div>

        <div className="welcome-orbit relative mx-auto aspect-square w-full max-w-md">
          <div className="welcome-ring welcome-ring-outer" />
          <div className="welcome-ring welcome-ring-inner" />
          <div className="welcome-note absolute left-[12%] top-[20%] rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
            <span className="text-3xl">01</span>
            <p className="mt-2 text-sm text-slate-300">Ideas in motion</p>
          </div>
          <div className="welcome-note absolute bottom-[15%] right-[6%] rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
            <span className="text-3xl text-cyan-300">+</span>
            <p className="mt-2 text-sm text-slate-300">Your perspective</p>
          </div>
          <div className="welcome-core absolute inset-[24%] flex items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/10 shadow-[0_0_90px_rgba(34,211,238,0.25)]">
            <span className="text-8xl font-semibold tracking-tight text-cyan-300">B</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default WelcomePage
