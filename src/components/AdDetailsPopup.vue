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
            {{ ad.configuration.make }} {{ ad.configuration.model }} {{ ad.configuration.name }} ({{
              ad.year
            }})
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
            <div class="col-md-12">
              <ImageCarousel :images="ad.pictures" />
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
          <button type="button" class="btn btn-primary" @click="callSeller">Call Seller</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageCarousel from './ImageCarousel.vue'

export default {
  name: 'AdDetailsPopup',
  props: {
    ad: {
      type: Object,
      required: true
    }
  },
  components: {
    ImageCarousel
  },
  computed: {
    fields() {
      return {
        Gearbox: this.ad.configuration.gearbox,
        'Engine Volume': this.ad.configuration.engine,
        'Fuel Type': this.ad.configuration.fuelType,
        Horsepower: this.ad.configuration.power,
        'Annual Maintenance Cost': `$${this.ad.configuration.averageAnnualMaintenanceCost}`,
        'Fuel Consumption': this.ad.configuration.fuelConsumption
      }
    }
  },
  methods: {
    callSeller() {
      // Logic to call the seller or open a dialer
      alert('Calling seller...')
    }
  }
}
</script>

<style scoped>
.modal-body {
  max-height: 70vh;
  overflow-y: auto;
}
</style>
