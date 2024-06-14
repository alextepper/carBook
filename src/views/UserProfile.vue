<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-3 col-md-4 mb-4">
        <img
          :src="user.profilepic || 'https://via.placeholder.com/150'"
          class="img-fluid rounded-circle"
          alt="Profile Image"
        />
      </div>
      <div class="col-lg-9 col-md-8">
        <h2>{{ user.fullname }}</h2>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Score:</strong> {{ user.userAward }}</p>
        <h2>Cars</h2>
        <div class="row">
          <CarCard v-for="car in cars" :key="car.nickname" :car="car" />
        </div>
        <button class="btn btn-primary mt-4" @click="goToAddCar">Add Car</button>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import CarCard from '@/components/CarCard.vue'

export default {
  name: 'UserProfile',
  components: {
    CarCard
  },
  data() {
    return {
      user: {
        fullname: '',
        email: '',
        userAward: '',
        profilepic: ''
      },
      cars: []
    }
  },
  created() {
    const userId = this.$route.params.userId
    this.fetchUserData(userId)
    this.fetchUserCars(userId)
  },
  methods: {
    async fetchUserCars(userId) {
      try {
        const response = await api(`api/cars?user=${userId}`)
        this.cars = response.data.data
      } catch (error) {
        console.error('Error fetching user cars:', error)
      }
    },
    async fetchUserData(userId) {
      try {
        const response = await api(`api/users/${userId}`)
        this.user = response.data.data
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
    goToAddCar() {
      this.$router.push('/add-car')
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>
