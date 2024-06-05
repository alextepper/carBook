<template>
  <div class="container mt-5">
    <h1>Reset Password</h1>
    <form @submit.prevent="resetPassword">
      <div class="mb-3">
        <label for="password" class="form-label">New Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required />
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm New Password</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Change Password</button>
    </form>
  </div>
</template>

<script>
import { resetPassword } from '../../utils/api'
import { useRoute } from 'vue-router'

export default {
  name: 'ResetPasswordView',
  data() {
    return {
      password: '',
      confirmPassword: ''
    }
  },
  setup() {
    const route = useRoute()
    const token = route.params.token
    return { token }
  },
  methods: {
    resetPassword() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      resetPassword(this.token, this.password)
        .then((response) => {
          console.log(response)
          // Handle success here, e.g., show a success message
        })
        .catch((error) => {
          console.error(error)
          // Handle error here, e.g., show an error message
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
