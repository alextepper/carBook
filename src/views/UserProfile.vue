<template>
  <div class="container mt-5">
    <div v-if="loading">Loading...</div>

    <div v-else>
      <div class="row mb-3">
        <div class="col-md-3 text-center position-relative">
          <img
            :src="user.image || 'https://via.placeholder.com/150'"
            alt="Profile Picture"
            class="img-thumbnail mb-3"
          />
          <!-- <div class="position-absolute top-0 end-0 m-3 bg-dark p-1 rounded">
            <span class="me-1 text-light">{{ user.score.toFixed(1) }}</span>
            <i class="bi bi-star-fill text-warning"></i>
          </div> -->
        </div>
        <div class="col-md-9">
          <h1>{{ user.firstname }} {{ user.lastname }}</h1>
          <h6>{{ user.location }}</h6>
          <!-- <p>Posts: {{ user.posts }}</p> -->
        </div>
      </div>
      <h2>Cars</h2>
      <div class="row">
        <div v-for="car in user.cars" :key="car.nickname" class="col-lg-3 col-md-6 mb-4">
          <div class="card h-100">
            <img :src="car.images[0]" class="card-img-top" alt="Car Image" />
            <div class="card-body">
              <h5 class="card-title">{{ car.nickname }}</h5>
              <p class="card-text">
                {{ car.make }} {{ car.model }} {{ car.configuration }} ({{ car.year }})<br />
                {{ car.mileage }} miles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full-Screen Image Modal -->
    <!-- <div
      class="modal fade"
      id="fullScreenImageModal"
      tabindex="-1"
      aria-labelledby="fullScreenImageModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div
            class="modal-body d-flex justify-content-center align-items-center position-relative"
          >
            <img :src="selectedImage" class="img-fluid" alt="Full Screen Car Image" />
            <button
              type="button"
              class="btn-close position-absolute top-0 end-0 m-3"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { api } from '@/utils/api'

export default {
  name: 'UserProfile',
  data() {
    return {
      user: null,
      loading: true
    }
  },
  created() {
    const userId = this.$route.params.userId
    this.fetchUserData(userId)
  },
  methods: {
    async fetchUserData(userId) {
      try {
        const response = await api(`api/users/${userId}`)
        this.user = response.data.data
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        this.loading = false // Set loading to false once the data has been loaded or there's an error
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.card {
  cursor: pointer;
}
.card-img-top {
  height: 150px;
  object-fit: cover;
}
</style>
