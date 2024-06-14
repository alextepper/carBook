<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">CarBook</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/best-reviewed">Best Reviewed</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ads">All Ads</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/users">Users</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" @click="sellCar">Sell a Car</a>
          </li>
          <li v-if="user" class="nav-item">
            <router-link class="nav-link" :to="`/user-profile/${user.id}`">
              <img
                :src="user.image || 'https://via.placeholder.com/50'"
                alt="Profile Image"
                class="rounded-circle"
                width="30"
                height="30"
              />
            </router-link>
          </li>
          <li v-if="user" class="nav-item">
            <a class="nav-link" href="#" @click="logout">Logout</a>
          </li>
          <li v-else class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
    <SellCarModal ref="sellCarModal" />
  </nav>
</template>

<script>
import SellCarModal from './SellCarModal.vue'

export default {
  name: 'AppNavbar',
  components: {
    SellCarModal
  },
  data() {
    return {
      user: null
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    logout() {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      this.user = null
      this.$router.push('/login')
    },
    sellCar() {
      if (this.user) {
        this.$refs.sellCarModal.show()
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.navbar-nav .nav-link {
  color: white;
}
.navbar-nav .nav-link:hover {
  color: #ccc;
}
.rounded-circle {
  object-fit: cover;
}
</style>
