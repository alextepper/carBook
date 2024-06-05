<template>
  <div class="container mt-5">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" v-model="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required />
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
import { register } from '../../utils/api'

export default {
  name: 'RegisterView',
  data() {
    return {
      firstname: 'max',
      lastname: 'mustermann',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!')
        return
      }

      register(this.firstname, this.lastname, this.email, this.password)
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
