<template>
  <div class="col-lg-3 col-md-6 mb-4">
    <div class="card h-100">
      <img
        :src="car.pictures[0] || 'https://via.placeholder.com/150'"
        class="card-img-top"
        alt="Car Image"
      />
      <div class="card-body">
        <h5 class="card-title">{{ car.nickname }}</h5>
        <p class="card-text">
          {{ car.configuration.make }} {{ car.configuration.model }}
          {{ car.configuration.name }} ({{ car.year }})<br />
          {{ car.mileage }} miles
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarCard',
  props: {
    car: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>
