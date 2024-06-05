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
import { forgotPassword } from '../../utils/api'

export default {
  name: 'ForgotPasswordView',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    forgotPassword() {
      forgotPassword(this.email)
        .then((response) => {
          console.log(response)
          // Handle success here, e.g. show a success message
        })
        .catch((error) => {
          console.error(error)
          // Handle error here, e.g. show an error message
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
