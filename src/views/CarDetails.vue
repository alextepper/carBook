<template>
  <div class="container mt-5">
    <div v-if="car">
      <img :src="car.pictures[0]" class="img-fluid mb-3" alt="Car Image" />
      <h2>{{ car.make }} {{ car.model }} ({{ car.generation.name }})</h2>
      <p><strong>Average Price:</strong> ${{ car.averagePrice }}</p>
      <p><strong>Configuration:</strong> {{ car.name }}</p>
      <p><strong>Gearbox:</strong> {{ car.gearbox }}</p>
      <p><strong>Engine:</strong> {{ car.engine }}</p>
      <p><strong>Fuel Type:</strong> {{ car.fuelType }}</p>
      <p><strong>Horsepower:</strong> {{ car.power }}</p>
      <p><strong>Fuel Consumption:</strong> {{ car.fuelConsumption }}</p>
      <p><strong>Tax Category:</strong> {{ car.taxCategory }}</p>
      <p><strong>Score:</strong> {{ car.score }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'

export default {
  name: 'CarDetails',
  data() {
    return {
      car: null
    }
  },
  created() {
    this.fetchCarDetails()
  },
  methods: {
    async fetchCarDetails() {
      const carId = this.$route.params.id
      try {
        const response = await api('api/configurations/' + carId)
        this.car = response.data
      } catch (error) {
        console.error('Error fetching car details:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
