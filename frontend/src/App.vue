<template>
  <div id="app"
    v-bind:style="theme_gray"
  >





  </div>
</template>


<script>

import colors from './assets/colors.json';



export default {
  name: 'App',
  components: {

  },
  data() { return {
    theme_gray: {
      "background-color": colors["default"]["i98-bg"]
    }
  }}
}
</script>


<style>
#app {
  position: absolute;
  width: 100vw;
  height: 100vh;

  font-family: 'Space Mono', 'Nanum Square', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
</style>
