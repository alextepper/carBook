<template>
  <div class="container mt-5">
    <h1>Best value</h1>
    <div class="row">
      <div v-for="(list, index) in carLists" :key="index" class="col-md-4 col-sm-6 mb-4">
        <CarList :title="'List ' + (index + 1)" :cars="list" />
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import CarList from '../components/CarList.vue'

export default {
  name: 'HomeView',
  components: {
    CarList
  },
  data() {
    return {
      carLists: []
    }
  },
  created() {
    this.fetchConfigurations()
  },
  methods: {
    async fetchConfigurations() {
      try {
        const response = await api('api/configurations')
        this.carLists = [response.data] // Adjust this line to group ads into lists if needed
      } catch (error) {
        console.error('Error fetching car lists:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 90%;
}
</style>
