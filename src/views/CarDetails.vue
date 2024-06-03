<template>
  <div class="container mt-5">
    <div v-if="car">
      <img :src="car.image" class="img-fluid mb-3" alt="Car Image" />
      <h2>{{ car.make }} {{ car.model }} ({{ car.generation }})</h2>
      <p><strong>Configuration:</strong> {{ car.configuration }}</p>
      <p><strong>Gearbox:</strong> {{ car.gearbox }}</p>
      <p><strong>Engine Volume:</strong> {{ car.engineVolume }}</p>
      <p><strong>Fuel Type:</strong> {{ car.fuelType }}</p>
      <p><strong>Horsepower:</strong> {{ car.horsepower }}</p>
      <p>
        <strong>Average Annual Maintenance Cost:</strong> ${{ car.averageAnnualMaintenanceCost }}
      </p>
      <p><strong>Fuel Consumption:</strong> {{ car.fuelConsumption }}</p>

      <h3 class="mt-5">Similar Cars</h3>
      <div class="row">
        <div
          v-for="similarCar in similarCars"
          :key="similarCar.id"
          class="col-lg-3 col-md-4 col-sm-6 mb-4"
        >
          <CarCard :car="similarCar" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CarCard from '../components/CarCard.vue'

export default {
  name: 'CarDetails',
  components: {
    CarCard
  },
  data() {
    return {
      car: null,
      similarCars: []
    }
  },
  created() {
    this.fetchCarDetails()
  },
  methods: {
    async fetchCarDetails() {
      // const carId = this.$route.params.id
      try {
        const response = await axios.get('/car.json')
        const carData = response.data
        this.car = carData.car
        this.similarCars = carData.similarCars
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
