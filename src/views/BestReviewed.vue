<template>
  <div>
    <h1>Best Reviewed Cars</h1>
    <ul>
      <li v-for="car in bestReviewed" :key="car.id">
        <router-link :to="{ name: 'CarDetails', params: { id: car.id } }">
          {{ car.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { useCarsStore } from '../store/cars'
import { onMounted } from 'vue'

export default {
  setup() {
    const carsStore = useCarsStore()

    onMounted(() => {
      carsStore.fetchBestReviewed()
    })

    return {
      bestReviewed: carsStore.bestReviewed
    }
  }
}
</script>
