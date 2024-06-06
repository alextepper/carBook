<template>
  <div class="container mt-5">
    <h1>All Users</h1>
    <div class="row">
      <div v-for="user in users" :key="user._id" class="col-lg-3 col-md-6 mb-4">
        <div class="card h-100" @click="goToUserProfile(user._id)">
          <img
            :src="user.image || 'https://via.placeholder.com/150'"
            class="card-img-top"
            alt="User Image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ user.firstname }} {{ user.lastname }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'

export default {
  name: 'UserList',
  data() {
    return {
      users: []
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api('api/users')
        this.users = response.data.data // Ensure this accesses the 'data' property correctly
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    goToUserProfile(userId) {
      this.$router.push(`/user-profile/${userId}`)
    }
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>
