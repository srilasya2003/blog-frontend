import { useState } from 'react'
import { Link } from 'react-router-dom'
import { requestPasswordReset } from '../api/client'
import BrandPanel from '../components/BrandPanel'
import { validateEmail } from '../utils/registerValidation'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })

  async function handleSubmit(event) {
    event.preventDefault()

    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      setError(emailValidation.message)
      setStatus({ type: '', message: '' })
      return
    }

    try {
      setError('')
      setStatus({ type: 'loading', message: 'Sending reset link...' })
      const response = await requestPasswordReset({ email: email.trim() })
      setStatus({ type: 'success', message: response.message })
    } catch (requestError) {
      setStatus({
        type: 'error',
        message: requestError.message || 'Unable to send reset link.',
      })
    }
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
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                id="reset-email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                type="email"
                value={email}
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>

            {status.message && (
              <p
                className={`rounded-lg px-3 py-2 text-sm ${
                  status.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700'
                    : status.type === 'error'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-cyan-50 text-cyan-700'
                }`}
              >
                {status.message}
              </p>
            )}

            <button
              className="w-full rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200"
              disabled={status.type === 'loading'}
              type="submit"
            >
              {status.type === 'loading' ? 'Sending...' : 'Send reset link'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Remembered your password?{' '}
            <Link
              className="font-semibold text-cyan-700 hover:text-cyan-900"
              to="/login"
            >
              Back to sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default ForgotPasswordPage
