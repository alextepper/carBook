<template>
  <div class="car-list mb-4">
    <h2>{{ title }}</h2>
    <ul class="list-group">
      <li
        v-for="car in cars"
        :key="car.id"
        class="list-group-item d-flex align-items-center position-relative"
        @click="navigateToCarProfile(car.id)"
      >
        <img :src="car.image" alt="Car Image" class="img-thumbnail me-3" />
        <div>
          <h5>{{ car.make }} {{ car.model }} ({{ car.year }})</h5>
          <p>~ ${{ car.price }}</p>
        </div>
        <div class="score position-absolute top-0 end-0 m-2 d-flex align-items-center">
          <span class="me-1">{{ car.score.toFixed(1) }}</span>
          <i class="bi bi-star-fill text-warning"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CarList',
  props: {
    title: {
      type: String,
      required: true
    },
    cars: {
      type: Array,
      required: true
    }
  },
  methods: {
    navigateToCarProfile(carId) {
      this.$router.push({ name: 'CarDetails', params: { id: carId } })
    }
  }
}
</script>

<style scoped>
.list-group-item {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}
.list-group-item:hover {
  background-color: #f0f0f0;
}
.img-thumbnail {
  width: 70px;
  height: 70px;
}
.score {
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
}
</style>
