<template>
  <div class="card h-100" @click="openAdDetails(ad)">
    <img :src="ad.image" class="card-img-top" alt="Car Image" />
    <div class="card-body">
      <h5 class="card-title">
        {{ ad.make }} {{ ad.model }} {{ ad.configuration }} ({{ ad.year }})
      </h5>
      <p class="card-text">{{ ad.engineVolume }} {{ ad.gearbox }}</p>
      <p class="card-text">
        {{ ad.mileage }} miles<br />
        {{ ad.location }}
      </p>
      <h5 class="card-text">${{ ad.price }}</h5>
      <div class="d-flex align-items-center">
        <span class="me-1">{{ ad.score.toFixed(1) }}</span>
        <i class="bi bi-star-fill text-warning"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdCard',
  props: {
    ad: {
      type: Object,
      required: true
    }
  },
  methods: {
    openAdDetails(ad) {
      this.$emit('openAdDetails', ad)
    }
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
}
.card-text {
  margin-bottom: 0.5rem;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
