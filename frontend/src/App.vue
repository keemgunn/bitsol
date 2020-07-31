<template>
  <div
    id="app"
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

  }}
}
</script>


<style lang="scss">
@import "@/assets/styles/_color_default.scss";

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

  color: $i30;
  background-color: $i94;
}
</style>
