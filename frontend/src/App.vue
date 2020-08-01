<template>
  <div
    id="app"
    v-bind:style="themeColor"
  >

  <router-view></router-view>

  </div>
</template>


<script>
export default {
  name: 'App',
  components: {
  },
  data() { return {
    themeColor: {
    "--i100": "#ffffff",
    "--i98": "#FAFAFA",
    "--i94": "#F0F0F0",
    "--i90": "#E6E6E6",
    "--i80": "#CCCCCC",
    "--i70": "#B3B3B3",
    "--i60": "#999999",
    "--i45": "#737373",
    "--i30": "#4D4D4D",
    "--i0": "#000000",
    "--accent02": "#FF7955",
    "--accent01": "#FF9470"
    }
  }}
}
</script>


<style lang="scss">
#app {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;

  position: absolute;

  font-family: 'Space Mono', 'Nanum Square', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: var(--i30);
  background-color: var(--i94);
}
</style>
