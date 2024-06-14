<template>
  <div class="container mt-5">
    <div v-if="car">
      <img :src="car.pictures[0]" class="img-fluid mb-3" alt="Car Image" />
      <h2>{{ car.make }} {{ car.model }} {{ car.name }} ({{ car.generation.name }})</h2>
      <p><strong>Average Price:</strong> ${{ car.averagePrice }}</p>
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

    <h3 class="mt-5">Similar Cars for Sale</h3>
    <div class="row">
      <div v-for="ad in similarCars" :key="ad._id" class="col-lg-4 col-md-6 mb-4">
        <AdCard :ad="ad" @openAdDetails="openAdDetails" />
      </div>
    </div>
    <AdDetailsPopup v-if="selectedAd" :ad="selectedAd" ref="adDetailsPopup" />
  </div>
</template>

<script>
import AdDetailsPopup from '../components/AdDetailsPopup.vue'
import AdCard from '../components/AdCard.vue'
import { Modal } from 'bootstrap'
import { api } from '@/utils/api'

export default {
  name: 'CarDetails',
  components: {
    AdDetailsPopup,
    AdCard
  },
  data() {
    return {
      car: null,
      similarCars: [],
      selectedAd: null
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
        this.fetchSimilarCarsForSale(this.car._id)
      } catch (error) {
        console.error('Error fetching car details:', error)
      }
    },
    async fetchSimilarCarsForSale(configurationId) {
      try {
        const response = await api(`api/cars?configuration=${configurationId}&isForSale=true`)
        this.similarCars = response.data.data
      } catch (error) {
        console.error('Error fetching similar cars for sale:', error)
      }
    },
    openAdDetails(ad) {
      this.selectedAd = ad
      this.$nextTick(() => {
        if (this.$refs.adDetailsPopup && this.$refs.adDetailsPopup.$el) {
          const modal = new Modal(this.$refs.adDetailsPopup.$el)
          modal.show()
        } else {
          console.error('Error: adDetailsPopup or its $el is null or undefined')
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
