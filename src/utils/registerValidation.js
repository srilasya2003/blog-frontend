export function validateEmail(email) {
  const trimmedEmail = email?.trim() ?? ''
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!trimmedEmail) {
    return { valid: false, message: 'Email is required.' }
  }

  if (!emailPattern.test(trimmedEmail)) {
    return { valid: false, message: 'Enter a valid email address.' }
  }

  return { valid: true, message: '' }
}

export function validateUsername(username) {
  const trimmedUsername = username?.trim() ?? ''

  if (!trimmedUsername) {
    return { valid: false, message: 'Username is required.' }
  }

  if (trimmedUsername.length < 3) {
    return { valid: false, message: 'Username must be at least 3 characters long.' }
  }

  if (!/^[a-zA-Z0-9_]+$/.test(trimmedUsername)) {
    return { valid: false, message: 'Username can contain only letters, numbers, and underscores.' }
  }

  return { valid: true, message: '' }
}

export function validatePassword(password) {
  const trimmedPassword = password ?? ''

  if (!trimmedPassword) {
    return { valid: false, message: 'Password is required.' }
  }

  if (trimmedPassword.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long.' }
  }

  if (!/[A-Z]/.test(trimmedPassword)) {
    return { valid: false, message: 'Password must include at least one uppercase letter.' }
  }

  if (!/[a-z]/.test(trimmedPassword)) {
    return { valid: false, message: 'Password must include at least one lowercase letter.' }
  }

  if (!/\d/.test(trimmedPassword)) {
    return { valid: false, message: 'Password must include at least one number.' }
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword)) {
    return { valid: false, message: 'Password must include at least one special character.' }
  }

  return { valid: true, message: '' }
}

export function validateRegisterField(name, value, formValues = {}) {
  if (name === 'username') {
    return validateUsername(value).valid ? '' : validateUsername(value).message
  }

  if (name === 'email') {
    return validateEmail(value).valid ? '' : validateEmail(value).message
  }

  if (name === 'password') {
    return validatePassword(value).valid ? '' : validatePassword(value).message
  }

  if (name === 'password_confirmation') {
    if (!value) {
      return 'Please confirm your password.'
    }

    if (value !== formValues.password) {
      return 'Passwords do not match.'
    }

    return ''
  }

  return ''
}

export function validateRegisterForm(formValues) {
  const errors = {}

  const fields = ['username', 'email', 'password', 'password_confirmation']

  fields.forEach((field) => {
    const fieldError = validateRegisterField(field, formValues[field], formValues)
    if (fieldError) {
      errors[field] = fieldError
    }
  })

  return errors
}
