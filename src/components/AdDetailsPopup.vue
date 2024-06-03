<template>
  <div
    class="modal fade"
    id="adDetailsPopup"
    tabindex="-1"
    aria-labelledby="adDetailsPopupLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="adDetailsPopupLabel">
            {{ ad.year }} {{ ad.make }} {{ ad.model }} ({{ ad.configuration }})
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mb-4">
            <div class="">
              <img :src="ad.image" class="img-fluid mb-3" alt="Car Image" />
            </div>
            <div class="d-flex flex-column justify-content-center">
              <h3 class="text-primary">${{ ad.price }}</h3>
              <p class="mb-1"><strong>Mileage:</strong> {{ ad.mileage }} miles</p>
              <p class="mb-1"><strong>Location:</strong> {{ ad.location }}</p>
            </div>
          </div>
          <h4>Basics</h4>
          <div class="row">
            <div class="col-6 mb-3" v-for="(value, label) in fields" :key="label">
              <label class="form-label">{{ label }}</label>
              <input type="text" class="form-control" :value="value" disabled />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea class="form-control" :value="ad.description" disabled rows="3"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="callSeller">Call Seller</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdDetailsPopup',
  props: {
    ad: {
      type: Object,
      required: true
    }
  },
  computed: {
    fields() {
      return {
        Gearbox: this.ad.gearbox,
        'Engine Volume': this.ad.engineVolume,
        'Fuel Type': this.ad.fuelType,
        Horsepower: this.ad.horsepower,
        'Annual Maintenance Cost': `$${this.ad.averageAnnualMaintenanceCost}`,
        'Fuel Consumption': this.ad.fuelConsumption
      }
    }
  },
  methods: {
    callSeller() {
      // Logic to call the seller or open a dialer
      alert('Calling seller...')
    },
    resetAd() {
      this.$emit('reset-ad')
    }
  }
}
</script>

<style scoped>
.modal-body {
  max-height: 80vh;
  overflow-y: auto;
}
</style>
