<template>
<div id="theme">

  <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

    <title>Orb</title>

    <circle 
    :class="{'orb-border':1, 'selected': isSelected}"
    @click="$emit('change-theme', color)"
    cx="14" cy="14" r="14"></circle>

    <circle :style="colorSet" class="orb-bg" cx="14" cy="14" r="12"></circle>

    <path :style="colorSet" class="orb-accent" d="M21.128769,6.98710509 C20.293568,5.12864209 16.7908937,4 14,4 C8.4771525,4 4,8.4771525 4,14 C4,17.2847527 5.38827847,20.5134024 8.05716466,21.9445443 C10.0779576,23.0281579 21.9639699,8.84556809 21.128769,6.98710509 Z"></path>

  </svg>

</div>
</template>

<script>


export default {
  name: "Theme",
  props: [
    "color"
  ],
  data() { return {
    colorSet: {},
  }},
  computed: {
    isSelected: function() {
      return (this.$store.state.colorConfig === this.color)
    },

  },
  created() {
    this.colorSet = {
      "--i94": this["$store"]["state"]["colors"][this.color]["--i94"],
      "--accent02": this["$store"]["state"]["colors"][this.color]["--accent02"]
    }
  },
}
</script>

<style lang="scss" scoped>

.orb-border {
  display: block;
  width: 28px;
  height: 28px;
  fill: var(--i94);
}.orb-border:hover {
    cursor: pointer;
}.selected {
    fill: var(--i30);
}

.orb-bg {
  display: block;
  pointer-events: none;
  position: relative;
  width: 24px;
  height: 24px;
  top: 2px;
  margin-left: 2px;
  fill: var(--i94);
}

.orb-accent {
  display: block;
  pointer-events: none;
  position: relative;
  top: 2px;
  margin-left: 2px;
  width: 20px;
  height: 20px;
  fill: var(--accent02);
}



</style>