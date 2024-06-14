<template>
  <div class="container mt-5">
    <h1>All Car Ads</h1>
    <div class="row">
      <div v-for="ad in ads" :key="ad._id" class="col-lg-3 col-md-4 mb-4">
        <AdCard :ad="ad" @openAdDetails="openAdDetails" />
      </div>
    </div>

    <AdDetailsPopup v-if="selectedAd" :ad="selectedAd" ref="adDetailsPopup" />
  </div>
</template>

<script>
import AdDetailsPopup from '../components/AdDetailsPopup.vue'
import AdCard from '../components/AdCard.vue'
import { Modal } from 'bootstrap'
import { api } from '@/utils/api'

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
  },
  methods: {
    async fetchAds() {
      try {
        const response = await api('api/cars?isForSale=true')
        this.ads = response.data.data
      } catch (error) {
        console.error('Error fetching ads:', error)
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
