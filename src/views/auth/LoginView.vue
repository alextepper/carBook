<template>
  <div class="container mt-5">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" v-model="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <router-link to="/forgot-password" class="btn btn-link">Forgot Password?</router-link>
    </form>
  </div>
</template>

<script>
import { login } from '../../utils/api'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      login(this.email, this.password)
        .then((response) => {
          console.log(response)
          // Save token and user data to localStorage
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.data))
        })
        .catch((error) => {
          console.error(error)
          // Handle your error here
        })
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
