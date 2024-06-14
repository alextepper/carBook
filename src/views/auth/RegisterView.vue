<template>
  <div class="container mt-5">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="firstname" class="form-label">First Name</label>
        <input type="text" class="form-control" id="firstname" v-model="firstname" />
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="lastname" v-model="lastname" />
      </div>
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
      <router-link to="/login" class="btn btn-link">Already have an account?</router-link>
    </form>
  </div>
</template>

<script>
import { register } from '../../utils/api'

export default {
  name: 'RegisterView',
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!')
        return
      }

      try {
        const response = await register(this.firstname, this.lastname, this.email, this.password)
        console.log(response)
        // Save token and user data to localStorage
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.data))
        // Refresh navbar
        this.$root.$emit('refreshNavbar')
        this.$router.push(`/user-profile/${response.data.data.id}`)
      } catch (error) {
        console.error(error)
        // Handle your error here
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
