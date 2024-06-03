<template>
  <div class="container mt-5">
    <h1>Create Car Advertisement</h1>
    <form @submit.prevent="createAd">
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
          <select class="form-control" v-model="model" @change="fetchGenerations" required>
            <option value="" disabled>Select Model</option>
            <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
          </select>
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <select class="form-control" v-model="generation" @change="fetchConfigurations" required>
            <option value="" disabled>Select Generation</option>
            <option v-for="generation in generations" :key="generation" :value="generation">
              {{ generation }}
            </option>
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
            <option v-for="config in configurations" :key="config.name" :value="config">
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
        <div class="col-lg-4 col-md-6 mb-3">
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
        </div>
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
  name: 'CreateAdView',
  data() {
    return {
      makes: [],
      models: [],
      generations: [],
      configurations: [],
      make: '',
      model: '',
      generation: '',
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
      horsepower: '',
      averageAnnualMaintenanceCost: '',
      fuelConsumption: ''
    }
  },
  created() {
    this.fetchMakes()
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
        this.generations = []
        this.configurations = []
        this.model = ''
        this.generation = ''
        this.configuration = null
      } catch (error) {
        console.error('Error fetching models:', error)
      }
    },
    async fetchGenerations() {
      try {
        const response = await axios.get('/configurations.json')
        this.generations = Object.keys(response.data[this.model] || {})
        this.configurations = []
        this.generation = ''
        this.configuration = null
      } catch (error) {
        console.error('Error fetching generations:', error)
      }
    },
    async fetchConfigurations() {
      try {
        const response = await axios.get('/configurations.json')
        const data = response.data[this.model] || {}
        this.configurations = data[this.generation]?.configurations || []
        this.configuration = null
      } catch (error) {
        console.error('Error fetching configurations:', error)
      }
    },
    updateConfigurationDetails() {
      if (this.configuration) {
        this.gearbox = this.configuration.gearbox
        this.engineVolume = this.configuration.engineVolume
        this.fuelType = this.configuration.fuelType
        this.horsepower = this.configuration.horsepower
        this.averageAnnualMaintenanceCost = this.configuration.averageAnnualMaintenanceCost
        this.fuelConsumption = this.configuration.fuelConsumption
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
    async createAd() {
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
      try {
        await axios.post('/ads', newAd)
        alert('Ad created successfully!')
      } catch (error) {
        console.error('Error creating ad:', error)
        alert('Failed to create ad.')
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
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
