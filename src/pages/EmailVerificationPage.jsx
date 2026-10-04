import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { confirmEmailVerification } from '../api/client'
import BrandPanel from '../components/BrandPanel'

function EmailVerificationPage() {
  const [searchParams] = useSearchParams()
  const uid = searchParams.get('uid')
  const token = searchParams.get('token')
  const [status, setStatus] = useState(() =>
    uid && token
      ? { type: 'loading', message: 'Verifying your email address...' }
      : {
          type: 'error',
          message: 'This verification link is incomplete. Request a new one from the registration page.',
        },
  )

  useEffect(() => {
    if (!uid || !token) {
      return undefined
    }

    let cancelled = false

    async function verifyEmail() {
      try {
        const response = await confirmEmailVerification({ uid, token })
        if (!cancelled) {
          setStatus({ type: 'success', message: response.message || 'Your email address is verified.' })
        }
      } catch (error) {
        if (!cancelled) {
          setStatus({
            type: 'error',
            message: error.message || 'This verification link is invalid or has expired.',
          })
        }
      }
    }

    verifyEmail()
    return () => {
      cancelled = true
    }
  }, [uid, token])

  return (
    <main className="min-h-screen bg-slate-50 lg:flex">
      <BrandPanel />

      <section className="flex min-h-screen flex-1 items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Account verification
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {status.type === 'success' ? 'Email verified' : 'Verify your email'}
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-500">
            {status.type === 'success'
              ? 'Your Brightline account is ready. Sign in to continue.'
              : 'We are checking the secure link sent to your inbox.'}
          </p>

          {status.message && (
            <p
              aria-live="polite"
              className={`mt-8 rounded-lg px-3 py-3 text-sm ${
                status.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700'
                  : status.type === 'error'
                    ? 'bg-red-50 text-red-700'
                    : 'bg-cyan-50 text-cyan-700'
              }`}
              role={status.type === 'error' ? 'alert' : 'status'}
            >
              {status.message}
            </p>
          )}

          {status.type === 'success' && (
            <Link
              className="mt-6 block w-full rounded-lg bg-slate-950 px-4 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200"
              to="/login"
            >
              Continue to sign in
            </Link>
          )}

          {status.type === 'error' && (
            <Link
              className="mt-6 block text-center text-sm font-semibold text-cyan-700 hover:text-cyan-900"
              to="/register"
            >
              Return to registration
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}

export default EmailVerificationPage