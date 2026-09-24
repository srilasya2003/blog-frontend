const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function apiRequest(path, options = {}) {
  const { method = 'GET', body, headers = {}, isFormData = false } = options

  const requestHeaders = { ...headers }
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    requestHeaders.Authorization = `Bearer ${accessToken}`
  }

  const config = {
    method,
    headers: requestHeaders,
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

export async function fetchPosts() {
  return apiRequest('/posts/')
}

export async function fetchProfile() {
  return apiRequest('/profile/')
}

export async function registerUser(payload) {
  return apiRequest('/register/', {
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

export { API_BASE_URL }
