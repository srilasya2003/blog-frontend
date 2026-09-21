import test from 'node:test'
import assert from 'node:assert/strict'

import {
  validateEmail,
  validatePassword,
  validateRegisterForm,
  validateUsername,
} from './registerValidation.js'

test('username validation rejects short names', () => {
  assert.equal(validateUsername('ab').valid, false)
})

test('email validation accepts valid email', () => {
  assert.equal(validateEmail('user@example.com').valid, true)
})

test('email validation rejects invalid email', () => {
  assert.equal(validateEmail('invalid-email').valid, false)
})

test('password validation requires strong password', () => {
  const result = validatePassword('weak')
  assert.equal(result.valid, false)
  assert.ok(result.message.length > 0)
})

test('strong password passes validation', () => {
  assert.equal(validatePassword('Strong@123').valid, true)
})

test('register form validation checks matching confirm password', () => {
  const errors = validateRegisterForm({
    username: 'demoUser',
    email: 'demo@example.com',
    password: 'Strong@123',
    password_confirmation: 'Different@123',
  })

  assert.equal(errors.password_confirmation, 'Passwords do not match.')
})
