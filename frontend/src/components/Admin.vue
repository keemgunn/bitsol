<template>
<div id="admin">




  <div class="sidecar-wrapper left">
    
  </div>

  <div class="sidecar-wrapper right">
    
  </div>







  <div id="content-wrapper">

  </div>






</div>
</template>

<script>
export default {
  name: "Admin",
  props: [
    "color"
  ],
  data() { return {

  }},
  computed: {

  },
  methods: {

  },
  created() {

  },
}
</script>

<style lang="scss" scoped> #admin {
  position: absolute;
  left: 0;
  width: 100vw;
  height: calc(100% - 200px);
  justify-content: center;
}

#content-wrapper {
  margin: auto;
  width: calc(100vw - 120px);
  min-width: 490px;
  max-width: 710px;
  height: 100%;
  background-color: rgba(235, 15, 59, 0.329);
}

.sidecar-wrapper {
  position: absolute;
  width: 200px;
  height: 100%;
  background-color: rgba(235, 15, 206, 0.288);
}.left {
  right: calc(50% + 355px);
}.right {
  left: calc(50% + 355px);
}
@media ( max-width: 830px ) {
  .left {
    right: calc(100% - 60px);
  }
  .right {
    left: calc(100% - 60px);
  }
}
@media ( max-width: 610px ) {
  .left {
    right: calc(50% + 245px);
  } 
  .right {
    left: calc(50% + 245px);
  } 
}









</style>