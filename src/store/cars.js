import { defineStore } from 'pinia'
import axios from 'axios'

export const useCarsStore = defineStore('cars', {
  state: () => ({
    cars: [],
    bestReviewed: []
  }),
  actions: {
    async fetchCars() {
      try {
        const response = await axios.get('https://api.example.com/cars')
        this.cars = response.data
      } catch (error) {
        console.error('Error fetching cars:', error)
      }
    },
    async fetchBestReviewed() {
      try {
        const response = await axios.get('https://api.example.com/best-reviewed')
        this.bestReviewed = response.data
      } catch (error) {
        console.error('Error fetching best-reviewed cars:', error)
      }
    }
  }
})
