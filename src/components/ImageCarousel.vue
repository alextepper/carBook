<template>
  <div>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          v-for="(image, index) in images"
          :key="index"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          aria-current="true"
          :aria-label="'Slide ' + (index + 1)"
        ></button>
      </div>
      <div class="carousel-inner">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <img :src="image" class="d-block w-100" alt="Car Image" @click="openFullScreen(image)" />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
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
import { Modal } from 'bootstrap'
export default {
  name: 'ImageCarousel',
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedImage: ''
    }
  },
  methods: {
    openFullScreen(image) {
      this.selectedImage = image
      const modal = new Modal(document.getElementById('fullScreenImageModal'))
      modal.show()
    }
  }
}
</script>

<style scoped>
.carousel-item img {
  cursor: pointer;
}
</style>
