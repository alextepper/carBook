<template>
  <div class="container mt-5">
    <div class="row mb-3">
      <div class="col-md-3 text-center position-relative">
        <img
          :src="user.profilePic || 'https://via.placeholder.com/150'"
          alt="Profile Picture"
          class="img-thumbnail mb-3"
        />
        <div class="position-absolute top-0 end-0 m-3 bg-dark p-1 rounded">
          <span class="me-1 text-light">{{ user.score.toFixed(1) }}</span>
          <i class="bi bi-star-fill text-warning"></i>
        </div>
      </div>
      <div class="col-md-9">
        <h1>{{ user.firstName }} {{ user.lastName }}</h1>
        <h6>{{ user.location }}</h6>
        <!-- <p>Posts: {{ user.posts }}</p> -->
      </div>
    </div>
    <h2>Cars</h2>
    <div class="row">
      <div v-for="car in user.cars" :key="car.nickname" class="col-lg-3 col-md-6 mb-4">
        <div class="card h-100">
          <img
            :src="car.images[0]"
            class="card-img-top"
            alt="Car Image"
            @click="openFullScreen(car.images[0])"
          />
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

    <!-- Full-Screen Image Modal -->
    <div
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Modal } from 'bootstrap'

export default {
  name: 'UserProfile',
  data() {
    return {
      user: null,
      selectedImage: ''
    }
  },
  created() {
    this.fetchUserData()
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('/user.json')
        this.user = response.data
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
    openFullScreen(image) {
      this.selectedImage = image
      const modal = new Modal(document.getElementById('fullScreenImageModal'))
      modal.show()
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
