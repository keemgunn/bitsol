<template>
<div id="theme">

  <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

    <title>{{color}}</title>

    <circle 
    :class="{'orb-border':1, 'selected': isSelected}"
    @click="CHANGE_THEME({color})"
    cx="14" cy="14" r="14"></circle>

    <circle :style="colorSet" class="orb-bg" cx="14" cy="14" r="12"></circle>

    <path :style="colorSet" class="orb-accent" d="M21.128769,6.98710509 C20.293568,5.12864209 16.7908937,4 14,4 C8.4771525,4 4,8.4771525 4,14 C4,17.2847527 5.38827847,20.5134024 8.05716466,21.9445443 C10.0779576,23.0281579 21.9639699,8.84556809 21.128769,6.98710509 Z"></path>

  </svg>

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

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
      return (localStorage.colorConfig === this.color)
    },
    ...mapState(['theme'])
  },
  methods: {
    ...mapMutations(['CHANGE_THEME'])
  },
  created() {
    this.colorSet = {
      "--i94": this['theme']["colors"][this.color]["--i94"],
      "--accent02": this['theme']["colors"][this.color]["--accent02"]
    }
  },
}
</script>

<style lang="scss" scoped>
#theme {
  float: left;
  margin-right: 5px;
}

.orb-border {
  width: 28px;
  height: 28px;
  fill: var(--i94);
}.orb-border:hover {
    cursor: pointer;
}.selected {
    fill: var(--i30);
}

.orb-bg {
  pointer-events: none;
  position: relative;
  top: 2px;
  width: 24px;
  height: 24px;
  margin-left: 2px;
  fill: var(--i94);
}

.orb-accent {
  pointer-events: none;
  position: relative;
  top: 2px;
  margin-left: 2px;
  width: 20px;
  height: 20px;
  fill: var(--accent02);
}

</style>