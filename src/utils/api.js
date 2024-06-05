import axios from 'axios'
import CryptoJS from 'crypto-js'

export function register(firstname, lastname, email, password) {
  // Hash the password
  const hashedPassword = CryptoJS.SHA256(password).toString()

  return axios.post('http://localhost:3000/api/auth/signup', {
    firstname,
    lastname,
    email,
    password: hashedPassword
  })
}

export function login(email, password) {
  // Hash the password
  const hashedPassword = CryptoJS.SHA256(password).toString()

  return axios.post('http://localhost:3000/api/auth/login', {
    email,
    password: hashedPassword
  })
}

export function forgotPassword(email) {
  return axios.post('http://localhost:3000/api/auth/forgot-password', {
    email
  })
}

export function resetPassword(token, newPassword) {
  return axios.put(`http://localhost:3000/api/auth/reset-password/${token}`, {
    password: newPassword
  })
}
