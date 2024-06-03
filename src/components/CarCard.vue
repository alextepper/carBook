<template>
  <div class="card h-100">
    <img :src="car.image" class="card-img-top" alt="Car Image" />
    <div class="card-body">
      <h5 class="card-title">{{ car.make }} {{ car.model }} ({{ car.year }})</h5>
      <p class="card-text">
        ${{ car.price }}<br />
        {{ car.mileage }} miles<br />
        {{ car.location }}
      </p>
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
