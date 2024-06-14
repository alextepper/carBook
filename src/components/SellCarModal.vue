<template>
  <div
    class="modal fade"
    id="sellCarModal"
    tabindex="-1"
    aria-labelledby="sellCarModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="sellCarModalLabel">Your Cars</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="cars.length === 0">
            <p>You have no cars listed.</p>
          </div>
          <div v-else>
            <div v-for="car in cars" :key="car._id" class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    :src="car.pictures[0] || 'https://via.placeholder.com/150'"
                    class="img-fluid rounded-start"
                    alt="Car Image"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{{ car.nickname }}</h5>
                    <p class="card-text">
                      {{ car.configuration.make }} {{ car.configuration.model }}
                      {{ car.configuration.name }} ({{ car.year }})
                    </p>
                    <p class="card-text">{{ car.mileage }} miles</p>
                    <button class="btn btn-primary" @click="sellCar(car._id)">Sell</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import { Modal } from 'bootstrap'

export default {
  name: 'SellCarModal',
  data() {
    return {
      cars: []
    }
  },
  methods: {
    show() {
      this.fetchUserCars()
      const modal = new Modal(document.getElementById('sellCarModal'))
      modal.show()
    },
    async fetchUserCars() {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const response = await api(`api/cars?user=${user.id}`)
        this.cars = response.data.data
      } catch (error) {
        console.error('Error fetching user cars:', error)
      }
    },
    async sellCar(carId) {
      try {
        await api(`api/cars/${carId}/sell`, 'POST')
        alert('Car listed for sale successfully!')
        this.fetchUserCars() // Refresh the list of cars
      } catch (error) {
        console.error('Error selling car:', error)
        alert('Failed to list car for sale.')
      }
    }
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
}
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
</style>
