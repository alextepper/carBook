<template>
  <div class="card h-100" @click="openAdDetails(ad)">
    <div class="position-absolute top-0 end-0 m-3 bg-dark p-1 rounded">
      <span class="me-1 text-light">{{ ad.score.toFixed(1) }}</span>
      <i class="bi bi-star-fill text-warning"></i>
    </div>
    <img
      :src="
        ad.images[0] ||
        'https://www.meadowbrookventuresinc.com/wp-content/plugins/wp-car-manager/assets/images/placeholder-single.png'
      "
      class="card-img-top"
      alt="Car Image"
    />
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
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15); /* Add shadow effect */
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out; /* Add transition for smooth effect */
}

.card:hover {
  transform: scale(1.05); /* Increase the size of the card */
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1); /* Add shadow effect */
}

.card-text {
  margin-bottom: 0.5rem;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
