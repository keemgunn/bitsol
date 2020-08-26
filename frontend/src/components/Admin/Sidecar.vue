<template>
<div id="sidecar">

  <div class="sidecar left">


  </div>


  <div class="sidecar right">


  </div>

</div>
</template>



<script>
export default {
  name: "Sidecar",
  props: [

  ],
  data() { return {

  }},
  computed: {

  },
  methods: {

  },
  created() {

  },
  mounted() {
    
  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
#sidecar {
  position: absolute; top: 0; left: 0;
  width: 100%;
  height: 100%;
  // background-color: aquamarine;
}




.sidecar {
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