import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/client'
import { validateEmail } from '../utils/registerValidation'

function LoginForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [authMessage] = useState(() => sessionStorage.getItem('authMessage') || '')
  const [submitStatus, setSubmitStatus] = useState({
    type: authMessage ? 'error' : '',
    message: authMessage,
  })

  useEffect(() => {
    sessionStorage.removeItem('authMessage')
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}

    if (!validateEmail(formData.email).valid) {
      nextErrors.email = validateEmail(formData.email).message
    }
    if (!formData.password) {
      nextErrors.password = 'Password is required.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus({ type: '', message: '' })
      return
    }

    try {
      setSubmitStatus({ type: 'loading', message: 'Signing you in...' })
      await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      })

      navigate('/home')
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Invalid email or password.',
      })
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label
          className="mb-2 block text-sm font-medium text-slate-800"
          htmlFor="email"
        >
          Email address <span className="text-red-500">*</span>
        </label>
        <input
          className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          id="email"
          name="email"
          placeholder="you@example.com"
          onChange={handleChange}
          type="email"
          value={formData.email}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            className="block text-sm font-medium text-slate-800"
            htmlFor="password"
          >
            Password <span className="text-red-500">*</span>
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
          onChange={handleChange}
          type="password"
          value={formData.password}
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      {submitStatus.message && (
        <p
          className={`rounded-lg px-3 py-2 text-sm ${
            submitStatus.type === 'error'
              ? 'bg-red-50 text-red-700'
              : 'bg-cyan-50 text-cyan-700'
          }`}
        >
          {submitStatus.message}
        </p>
      )}

      <button
        className="w-full rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200"
        disabled={submitStatus.type === 'loading'}
        type="submit"
      >
        {submitStatus.type === 'loading' ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}

export default LoginForm
