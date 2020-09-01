<template>
<div id="sidecar">

  <transition name="appear">
  <div class="sidecar left" v-if="admin.db.selected.length">
    <div class="content selection">
      <div class="title">선택된 항목</div>
      <div class="division _2px"></div>
      <div class="list-wrapper">
        <div class="record"
        v-for="index in admin.db.selected"
        :key="index">
          <SidecarRecord :type="toStr('selection')" :index="index" />
        </div>
      </div>
      <div class="division _1px"></div>



    </div>
  </div></transition>


  <div class="sidecar right">
    <div class="content updated"></div>

  </div>

</div>
</template>



<script>
import { mapState, mapMutations } from 'vuex';
import SidecarRecord from './SidecarRecord'

export default {
  name: "Sidecar",
  components: { SidecarRecord },
  props: [

  ],
  data() { return {

  }},
  computed: {
    ...mapState(['admin'])
  },
  methods: {
    toStr(type){
      return type
    },
    ...mapMutations([])
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
  user-select: none;
  -webkit-user-select: none;
  // background-color: aquamarine;
}
.sidecar {
  position: absolute;
  width: 200px;
  height: 100%;
  // background-color: rgba(235, 15, 206, 0.288);
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
.content {
  position: absolute; top: 0;
  padding-top: 56px;
  width: 160px;
  height: calc(100% - 82px);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: bisque;
}.selection {
  left: 0;
}.updated {
  right: 0;
}

.division {
  width: 100%;
  background-color: var(--i30);
}._2px {
  height: 2px;
}._1px {
  height: 1px;
}

.title {
  position: relative;
  width: 100%;
  height: fit-content;
  margin-bottom: 9px;
  font-family: 'Nanum Square', sans-serif;
  font-size: 16px;
  letter-spacing: 0;
  // background-color: aquamarine;
}

.list-wrapper {
  position: relative;
  width: 100%;
  height: fit-content;
}
.record {
  position: relative;
  width: 100%;
  height: fit-content;
  border-bottom: solid 1px var(--i30);
}



</style>