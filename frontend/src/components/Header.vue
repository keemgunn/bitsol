<template>
<div id="header">
  <div id="light-cover"></div>
<div id="content">

  
















</div>
</div>
</template>



<script>
export default {
  name: "Header",
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



<style lang="scss" scoped> #header {
  position: absolute; top: 0; left: 0;
  width: 100vw;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none; -webkit-user-select: none;
}

#content {
  position: relative; top: 0; left: 0;
  z-index: 10;
  width: calc(100vw - 120px);
    min-width: 490px;
    max-width: 710px;
  height: 100%;
  background-color: rgba(219, 126, 13, 0.24);
}














#light-cover { 
  position: absolute; top: 0; left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: var(--i94);
}
</style>