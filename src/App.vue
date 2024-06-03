<template>
  <div id="app">
    <AppNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'

export default {
  components: {
    AppNavbar
  }
}
</script>

<style>
/* Add any global styles here */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  background-color: #f8f9fa;
}
</style>
