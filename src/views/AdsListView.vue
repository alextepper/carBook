<template>
  <div class="container mt-5">
    <h1>All Car Ads</h1>
    <div class="row">
      <div v-for="ad in ads" :key="ad.id" class="col-lg-4 col-md-6 mb-4">
        <AdCard :ad="ad" @openAdDetails="openAdDetails" />
      </div>
    </div>

    <AdDetailsPopup v-if="selectedAd" :ad="selectedAd" ref="adDetailsPopup" />
  </div>
</template>

<script>
import axios from 'axios'
import AdDetailsPopup from '../components/AdDetailsPopup.vue'
import AdCard from '../components/AdCard.vue'
import { Modal } from 'bootstrap'

export default {
  name: 'AdsListView',
  components: {
    AdDetailsPopup,
    AdCard
  },
  data() {
    return {
      ads: [],
      selectedAd: null,
      configurations: {}
    }
  },
  created() {
    this.fetchAds()
    this.fetchConfigurations()
  },
  methods: {
    async fetchAds() {
      try {
        const response = await axios.get('/ads.json')
        this.ads = response.data
      } catch (error) {
        console.error('Error fetching ads:', error)
      }
    },
    async fetchConfigurations() {
      try {
        const response = await axios.get('/configurations.json')
        this.configurations = response.data
      } catch (error) {
        console.error('Error fetching configurations:', error)
      }
    },
    openAdDetails(ad) {
      this.selectedAd = ad
      this.$nextTick(() => {
        if (this.$refs.adDetailsPopup && this.$refs.adDetailsPopup.$el) {
          const modal = new Modal(this.$refs.adDetailsPopup.$el)
          modal.show()
        } else {
          console.error('Error: adDetailsPopup or its $el is null or undefined')
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
