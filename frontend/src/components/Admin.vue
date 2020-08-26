<template>
<div id="admin">

  <div class="sidecar-wrapper left">
    
  </div>

  <div class="sidecar-wrapper right">
    
  </div>

  <div id="content-wrapper">

    <div id="index-wrapper" v-if="adminMenu==='index'"></div>
    
    <div id="db-wrapper" v-if="adminMenu==='db'">
      <AdminDbHeader
        :scope="scope"
        :option="option"
      />



    </div>

    <div id="user-wrapper" v-if="adminMenu==='user'"></div>

    <div id="refg-wrapper" v-if="adminMenu==='refg'"></div>

  </div>





</div>
</template>

<script>
import AdminDbHeader from '@/components/AdminDbHeader'

export default {
  name: "Admin",
  components: {
    AdminDbHeader,

  },
  props: [
    "adminMenu"
  ],
  data() { return {

    //--------- DB
    scope: "room", //"student"
    option: true,


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
  // background-color: deeppink;
}
#content-wrapper {
  margin: auto;
  width: calc(100vw - 120px);
  min-width: 490px;
  max-width: 710px;
  height: 100%;
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
#index-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 140, 0, 0.438);
}
#db-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(43, 255, 0, 0.438);
}
#user-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 162, 255, 0.438);
}
#refg-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(119, 0, 255, 0.438);
}

</style>