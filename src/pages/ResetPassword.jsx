import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { confirmPasswordReset } from '../api/client'
import BrandPanel from '../components/BrandPanel'
import { validatePassword } from '../utils/registerValidation'

function ResetPasswordPage() {
  const { uid, token } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ password: '', confirmation: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    const passwordValidation = validatePassword(formData.password)

    if (!passwordValidation.valid) {
      nextErrors.password = passwordValidation.message
    }
    if (!formData.confirmation) {
      nextErrors.confirmation = 'Please confirm your password.'
    } else if (formData.password !== formData.confirmation) {
      nextErrors.confirmation = 'Passwords do not match.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: '', message: '' })
      return
    }

    try {
      setStatus({ type: 'loading', message: 'Updating your password...' })
      const response = await confirmPasswordReset({
        uid,
        token,
        new_password: formData.password,
      })
      setStatus({ type: 'success', message: response.message })
      setTimeout(() => navigate('/login'), 1200)
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to reset your password.',
      })
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 lg:flex">
      <BrandPanel />

      <section className="flex min-h-screen flex-1 items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Reset access
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Create a new password
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-500">
            Choose a strong password for your Brightline account.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800" htmlFor="reset-password">
                New password <span className="text-red-500">*</span>
              </label>
              <input
                className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                id="reset-password"
                name="password"
                onChange={handleChange}
                placeholder="Create a password"
                type="password"
                value={formData.password}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800" htmlFor="reset-confirmation">
                Confirm password <span className="text-red-500">*</span>
              </label>
              <input
                className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                id="reset-confirmation"
                name="confirmation"
                onChange={handleChange}
                placeholder="Repeat your password"
                type="password"
                value={formData.confirmation}
              />
              {errors.confirmation && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmation}</p>
              )}
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
              className="w-full rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={status.type === 'loading' || status.type === 'success'}
              type="submit"
            >
              {status.type === 'loading' ? 'Updating...' : 'Update password'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Remembered your password?{' '}
            <Link className="font-semibold text-cyan-700 hover:text-cyan-900" to="/login">
              Back to sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default ResetPasswordPage
