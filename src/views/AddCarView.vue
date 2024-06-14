<template>
  <div class="container mt-5">
    <h1>Add your Car</h1>
    <form @submit.prevent="addCar">
      <div class="row mb-3">
        <div class="col-12 text-center">
          <img
            :src="
              image ||
              'https://static.vecteezy.com/system/resources/thumbnails/018/873/933/small_2x/blue-circle-and-white-plus-add-new-create-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-png.png'
            "
            alt="Car Image"
            class="img-thumbnail mb-3"
            @click="triggerFileInput"
            style="cursor: pointer; width: 150px; height: 150px"
          />
          <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none" />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-3">
          <select class="form-control" v-model="make" @change="fetchModels" required>
            <option value="" disabled>Select Make</option>
            <option v-for="make in makes" :key="make" :value="make">{{ make }}</option>
          </select>
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <select class="form-control" v-model="model" required>
            <option value="" disabled>Select Model</option>
            <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
          </select>
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <select class="form-control" v-model="year" @change="fetchConfigurations" required>
            <option value="" disabled>Select Year</option>
            <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <select
            class="form-control"
            v-model="configuration"
            @change="updateConfigurationDetails"
            required
          >
            <option value="" disabled>Select Configuration</option>
            <option v-for="config in configurations" :key="config._id" :value="config">
              {{ config.name }}
            </option>
          </select>
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <input
            type="number"
            class="form-control"
            v-model="mileage"
            placeholder="Mileage"
            required
          />
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <input
            type="number"
            class="form-control"
            v-model="previousOwners"
            placeholder="Previous Owners"
            min="0"
            required
          />
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <input
            type="text"
            class="form-control"
            v-model="location"
            placeholder="Location"
            required
          />
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <input type="number" class="form-control" v-model="price" placeholder="Price" required />
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <input
            type="text"
            class="form-control"
            v-model="gearbox"
            placeholder="Gearbox"
            readonly
          />
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <input
            type="text"
            class="form-control"
            v-model="engineVolume"
            placeholder="Engine Volume"
            readonly
          />
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <input
            type="text"
            class="form-control"
            v-model="fuelType"
            placeholder="Fuel Type"
            readonly
          />
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <input
            type="number"
            class="form-control"
            v-model="horsepower"
            placeholder="Horsepower"
            readonly
          />
        </div>
        <!-- <div class="col-lg-4 col-md-6 mb-3">
          <input
            type="number"
            class="form-control"
            v-model="averageAnnualMaintenanceCost"
            placeholder="Average Annual Maintenance Cost"
            readonly
          />
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <input
            type="text"
            class="form-control"
            v-model="fuelConsumption"
            placeholder="Fuel Consumption"
            readonly
          />
        </div> -->
        <div class="col-lg-12 mb-3">
          <textarea
            class="form-control"
            v-model="description"
            placeholder="Description"
            rows="3"
            required
          ></textarea>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-secondary" @click="saveForLater">
          Save for Later
        </button>
        <button type="submit" class="btn btn-primary">Create Advertisement</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddCarView',
  data() {
    return {
      makes: [],
      models: [],
      availableYears: [],
      configurations: [],
      make: '',
      model: '',
      year: '',
      configuration: null,
      mileage: '',
      image: '',
      location: '',
      price: '',
      description: '',
      previousOwners: '',
      gearbox: '',
      engineVolume: '',
      fuelType: '',
      horsepower: ''
    }
  },
  created() {
    this.fetchMakes()
    this.generateYears()
  },
  methods: {
    async fetchMakes() {
      try {
        const response = await axios.get('/makes.json')
        this.makes = response.data
      } catch (error) {
        console.error('Error fetching makes:', error)
      }
    },
    async fetchModels() {
      try {
        const response = await axios.get('/models.json')
        this.models = response.data[this.make] || []
        this.configurations = []
        this.model = ''
        this.year = ''
        this.configuration = null
      } catch (error) {
        console.error('Error fetching models:', error)
      }
    },

    async fetchConfigurations() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/configurations?make=${this.make}&model=${this.model}&year=${this.year}`
        )
        this.configurations = response.data
        this.configuration = null
      } catch (error) {
        console.error('Error fetching configurations:', error)
      }
    },
    updateConfigurationDetails() {
      if (this.configuration) {
        this.gearbox = this.configuration.gearbox
        this.engineVolume = this.configuration.engine
        this.fuelType = this.configuration.fuelType
        this.horsepower = this.configuration.power
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.image = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    async addCar() {
      const newCar = {
        nickname: this.nickname,
        year: this.year,
        configuration: this.configuration._id,
        mileage: this.mileage,
        pictures: [this.image], // Assuming you're uploading one image
        location: this.location,
        price: this.price,
        description: this.description,
        previousOwners: this.previousOwners,
        isForSale: this.isForSale
      }
      try {
        const response = await axios.post('http://localhost:3000/api/cars', newCar, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        alert('Car added successfully!')
        console.log(response.data)
      } catch (error) {
        console.error('Error creating car:', error)
        alert('Failed to create car.')
      }
    },
    saveForLater() {
      const newAd = {
        make: this.make,
        model: this.model,
        generation: this.generation,
        configuration: this.configuration.name,
        mileage: this.mileage,
        image: this.image,
        location: this.location,
        price: this.price,
        description: this.description,
        previousOwners: this.previousOwners,
        gearbox: this.gearbox,
        engineVolume: this.engineVolume,
        fuelType: this.fuelType,
        horsepower: this.horsepower,
        averageAnnualMaintenanceCost: this.averageAnnualMaintenanceCost,
        fuelConsumption: this.fuelConsumption
      }
      console.log('Saving advertisement for later with data:', newAd)
      // Here, you can save the newAd data to local storage or handle it as needed
    },
    generateYears() {
      const currentYear = new Date().getFullYear()
      for (let year = currentYear; year >= 1990; year--) {
        this.availableYears.push(year)
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
