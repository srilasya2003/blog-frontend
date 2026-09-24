import { useState } from 'react'
import { registerUser } from '../api/client'
import {
  validateRegisterField,
  validateRegisterForm,
} from '../utils/registerValidation'

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [errors, setErrors] = useState({})

  function updateFieldError(name, value, nextFormData) {
    const nextErrors = { ...errors }
    const fieldError = validateRegisterField(name, value, nextFormData)

    if (fieldError) {
      nextErrors[name] = fieldError
    } else {
      delete nextErrors[name]
    }

    if (name === 'password' && nextFormData.password_confirmation) {
      const confirmError = validateRegisterField(
        'password_confirmation',
        nextFormData.password_confirmation,
        nextFormData,
      )

      if (confirmError) {
        nextErrors.password_confirmation = confirmError
      } else {
        delete nextErrors.password_confirmation
      }
    }

    if (name === 'password_confirmation') {
      if (value) {
        const confirmError = validateRegisterField(
          'password_confirmation',
          value,
          nextFormData,
        )

        if (confirmError) {
          nextErrors.password_confirmation = confirmError
        } else {
          delete nextErrors.password_confirmation
        }
      }
    }

    setErrors(nextErrors)
  }

  function handleChange(event) {
    const { name, value } = event.target
    const nextFormData = {
      ...formData,
      [name]: value,
    }

    setFormData(nextFormData)
    updateFieldError(name, value, nextFormData)
  }

  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  async function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateRegisterForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' })
      return
    }

    try {
      setSubmitStatus({ type: 'loading', message: 'Creating your account...' })
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      })

      setSubmitStatus({ type: 'success', message: 'Account created successfully.' })
      setFormData({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
      })
      setErrors({})
    } catch (error) {
      const fieldErrors = Object.fromEntries(
        Object.entries(error.fieldErrors || {}).map(([field, value]) => [
          field,
          Array.isArray(value) ? value[0] : value,
        ]),
      )

      setErrors(fieldErrors)
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Unable to create account right now.',
      })
    }
  }

  function labelWithAsterisk(label, htmlFor) {
    return (
      <label
        className="mb-2 block text-sm font-medium text-slate-800"
        htmlFor={htmlFor}
      >
        {label} <span className="text-red-500">*</span>
      </label>
    )
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        {labelWithAsterisk('Username', 'username')}
        <input
          className={`block w-full rounded-lg border bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
            errors.username
              ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 focus:border-cyan-500 focus:ring-cyan-100'
          }`}
          id="username"
          name="username"
          onChange={handleChange}
          placeholder="Choose a username"
          type="text"
          value={formData.username}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username}</p>
        )}
      </div>

      <div>
        {labelWithAsterisk('Email Address', 'register-email')}
        <input
          className={`block w-full rounded-lg border bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
            errors.email
              ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 focus:border-cyan-500 focus:ring-cyan-100'
          }`}
          id="register-email"
          name="email"
          onChange={handleChange}
          placeholder="you@example.com"
          type="email"
          value={formData.email}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        {labelWithAsterisk('Password', 'register-password')}
        <input
          className={`block w-full rounded-lg border bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
            errors.password
              ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 focus:border-cyan-500 focus:ring-cyan-100'
          }`}
          id="register-password"
          name="password"
          onChange={handleChange}
          placeholder="Create a password"
          type="password"
          value={formData.password}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div>
        {labelWithAsterisk('Confirm Password', 'password-confirmation')}
        <input
          className={`block w-full rounded-lg border bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
            errors.password_confirmation
              ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 focus:border-cyan-500 focus:ring-cyan-100'
          }`}
          id="password-confirmation"
          name="password_confirmation"
          onChange={handleChange}
          placeholder="Repeat your password"
          type="password"
          value={formData.password_confirmation}
        />
        {errors.password_confirmation && (
          <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
        )}
      </div>

      {submitStatus.message && (
        <p
          className={`rounded-lg px-3 py-2 text-sm ${
            submitStatus.type === 'success'
              ? 'bg-emerald-50 text-emerald-700'
              : submitStatus.type === 'error'
                ? 'bg-red-50 text-red-700'
                : 'bg-cyan-50 text-cyan-700'
          }`}
        >
          {submitStatus.message}
        </p>
      )}

      <button
        className="w-full rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={submitStatus.type === 'loading'}
        type="submit"
      >
        {submitStatus.type === 'loading' ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  )
}

export default RegisterForm
