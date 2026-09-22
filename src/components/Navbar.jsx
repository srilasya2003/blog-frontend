import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-950" to="/home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 font-bold text-slate-950">
              B
            </span>
            Brightline
          </Link>
        </div>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link className="transition hover:text-slate-950" to="/home">
            Home
          </Link>
          <Link className="transition hover:text-slate-950" to="/home">
            Explore
          </Link>
          <Link className="transition hover:text-slate-950" to="/home">
            Trending
          </Link>
          <Link className="transition hover:text-slate-950" to="/write">
            Write
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 sm:inline-flex"
            type="button"
          >
            Search
          </button>
          <Link
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
            to="/write"
          >
            Publish
          </Link>

          <Link
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
            aria-label="Profile"
            title="Profile"
            to="/profile"
          >
            U
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
