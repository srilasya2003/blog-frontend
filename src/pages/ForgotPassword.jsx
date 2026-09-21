import BrandPanel from '../components/BrandPanel'

function ForgotPasswordPage() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <main className="min-h-screen bg-slate-50 lg:flex">
      <BrandPanel />

      <section className="flex min-h-screen flex-1 items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <div className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-950">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 font-bold">
                B
              </span>
              Brightline
            </div>
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Reset access
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Forgot your password?
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-500">
            Enter the email address associated with your account and we’ll send a
            secure link to help you reset it.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-slate-800"
                htmlFor="reset-email"
              >
                Email address
              </label>
              <input
                className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                id="reset-email"
                name="email"
                placeholder="you@example.com"
                type="email"
              />
            </div>

            <button
              className="w-full rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200"
              type="submit"
            >
              Send reset link
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Remembered your password?{' '}
            <a
              className="font-semibold text-cyan-700 hover:text-cyan-900"
              href="/login"
            >
              Back to sign in
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}

export default ForgotPasswordPage
