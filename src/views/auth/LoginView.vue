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
      // Implement login logic here
      console.log('Logging in with', this.email, this.password)
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
