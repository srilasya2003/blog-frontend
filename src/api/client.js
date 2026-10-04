const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
let csrfToken = null

async function getCsrfToken() {
  if (csrfToken) {
    return csrfToken
  }

  const response = await fetch(`${API_BASE_URL}/csrf/`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to initialize CSRF protection')
  }

  const data = await response.json()
  csrfToken = data.csrfToken
  return csrfToken
}

function isInvalidTokenResponse(response, data) {
  const tokenMessages = data?.errors?.messages || data?.messages || []

  return (
    response.status === 401 &&
    (data?.code === 'token_not_valid' ||
      data?.errors?.code === 'token_not_valid' ||
      tokenMessages.some((message) => message?.message === 'Token is expired'))
  )
}

function isLoginRequest(path) {
  return path === '/login/'
}

async function refreshAccessToken() {
  const csrf = await getCsrfToken()
  const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'X-CSRFToken': csrf },
  })

  if (!response.ok) {
    throw new Error('Unable to refresh session')
  }

  return response.json()
}

function expireSession() {
  sessionStorage.setItem(
    'authMessage',
    'Your session has expired. Please log in again.',
  )
  window.location.assign('/login')
}

async function apiRequest(path, options = {}, hasRetried = false) {
  const { method = 'GET', body, headers = {}, isFormData = false } = options

  const requestHeaders = { ...headers }
  const normalizedMethod = method.toUpperCase()

  if (!['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(normalizedMethod)) {
    requestHeaders['X-CSRFToken'] = await getCsrfToken()
  }

  const config = {
    method: normalizedMethod,
    headers: requestHeaders,
    credentials: 'include',
  }

  if (body !== undefined) {
    if (isFormData) {
      config.body = body
      delete requestHeaders['Content-Type']
    } else {
      config.body = JSON.stringify(body)
      requestHeaders['Content-Type'] = 'application/json'
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, config)

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    if (isInvalidTokenResponse(response, data)) {
      if (!hasRetried) {
        try {
          await refreshAccessToken()
          return apiRequest(path, options, true)
        } catch {
          expireSession()
          return
        }
      }

      expireSession()
      return
    }

    if (response.status === 401 && !isLoginRequest(path)) {
      expireSession()
      return
    }

    const fieldErrors = data?.errors || data
    const errorMessage =
      data?.detail ||
      data?.message ||
      data?.error ||
      fieldErrors?.detail ||
      fieldErrors?.email?.[0] ||
      fieldErrors?.username?.[0] ||
      fieldErrors?.non_field_errors?.[0] ||
      `Request failed with status ${response.status}`

    const error = new Error(errorMessage)
    error.fieldErrors = fieldErrors && typeof fieldErrors === 'object' ? fieldErrors : {}
    throw error
  }

  return data
}

export async function fetchCategories() {
  return apiRequest('/categories/')
}

export async function fetchPosts({ includeDrafts = false } = {}) {
  const query = includeDrafts ? '?include_drafts=true' : ''
  return apiRequest(`/posts/${query}`)
}

export async function fetchProfile() {
  return apiRequest('/profile/')
}

export async function requestPasswordReset(payload) {
  return apiRequest('/password-reset/', {
    method: 'POST',
    body: payload,
  })
}

export async function confirmPasswordReset(payload) {
  return apiRequest('/password-reset/confirm/', {
    method: 'POST',
    body: payload,
  })
}

export async function registerUser(payload) {
  return apiRequest('/register/', {
    method: 'POST',
    body: payload,
  })
}

export async function confirmEmailVerification(payload) {
  return apiRequest('/email-verification/confirm/', {
    method: 'POST',
    body: payload,
  })
}

export async function resendEmailVerification(payload) {
  return apiRequest('/email-verification/resend/', {
    method: 'POST',
    body: payload,
  })
}

export async function loginUser(payload) {
  return apiRequest('/login/', {
    method: 'POST',
    body: payload,
  })
}

export async function createPost(payload) {
  const isFormData = payload instanceof FormData

  return apiRequest('/posts/create/', {
    method: 'POST',
    body: payload,
    isFormData,
  })
}

export async function updatePost(postId, payload) {
  const isFormData = payload instanceof FormData

  return apiRequest(`/posts/${postId}/`, {
    method: 'PATCH',
    body: payload,
    isFormData,
  })
}

export { API_BASE_URL }
