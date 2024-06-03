<template>
  <div class="container mt-5">
    <h1>Forgot Password</h1>
    <form @submit.prevent="forgotPassword">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" v-model="email" required />
      </div>
      <button type="submit" class="btn btn-primary">Reset Password</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ForgotPasswordView',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    forgotPassword() {
      // Implement forgot password logic here
      console.log('Resetting password for', this.email)
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
