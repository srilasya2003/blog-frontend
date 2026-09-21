function RegisterForm() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label
          className="mb-2 block text-sm font-medium text-slate-800"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          id="username"
          name="username"
          placeholder="Choose a username"
          required
          type="text"
        />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-slate-800"
          htmlFor="register-email"
        >
          Email Address
        </label>
        <input
          className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          id="register-email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-slate-800"
          htmlFor="register-password"
        >
          Password
        </label>
        <input
          className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          id="register-password"
          name="password"
          placeholder="Create a password"
          required
          type="password"
        />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-slate-800"
          htmlFor="password-confirmation"
        >
          Confirm Password
        </label>
        <input
          className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          id="password-confirmation"
          name="password_confirmation"
          placeholder="Repeat your password"
          required
          type="password"
        />
      </div>

      <button
        className="w-full rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200"
        type="submit"
      >
        Create Account
      </button>
    </form>
  )
}

export default RegisterForm
