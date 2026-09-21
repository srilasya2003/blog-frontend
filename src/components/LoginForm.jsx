function LoginForm() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label
          className="mb-2 block text-sm font-medium text-slate-800"
          htmlFor="email"
        >
          Email address
        </label>
        <input
          className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          id="email"
          name="email"
          placeholder="you@example.com"
          type="email"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            className="block text-sm font-medium text-slate-800"
            htmlFor="password"
          >
            Password
          </label>
          <a
            className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
            href="/forgot-password"
          >
            Forgot password?
          </a>
        </div>
        <input
          className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          id="password"
          name="password"
          placeholder="Enter your password"
          type="password"
        />
      </div>

      <button
        className="w-full rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200"
        type="submit"
      >
        Sign in
      </button>
    </form>
  )
}

export default LoginForm
