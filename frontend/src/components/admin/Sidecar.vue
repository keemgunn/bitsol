<template>
<div id="sidecar">

  <transition name="appear">
  <div class="sidecar left" v-if="admin.db.selected.length">
    <div class="content selection">
      <div class="title-box">
        <div class="title">선택된 항목</div>
      </div>
      <div class="list-wrapper">
        <div class="record"
        v-for="index in admin.db.selected"
        :key="index">
          <SidecarRecord :type="toStr('selection')" :index="index" />
        </div>
      </div>
      <div class="menu">
        <div class="count">{{admin.db.selected.length}}개 항목</div>
        <div class="btn"
          :class="{'action':1, 'disabled':(admin.db.selected.length !== 2)}">
          자리교체</div>
        <div class="btn"
          :class="{'delete':1}">
          퇴실처리</div>
      </div>
    </div>
  </div></transition>

  <transition name="appear">
  <div class="sidecar right" v-if="admin.db.updated.length">
    <div class="content updated">
      <div class="title-box">
        <div class="title">업데이트 기록</div>
      </div>
      <div class="list-wrapper">
        <div class="record"
        v-for="index in admin.db.updated"
        :key="index.id">
          <SidecarRecord :type="toStr('updated')" :index="index" />
        </div>
      </div>
    </div>
  </div>
  </transition>

</div>
</template>


<script>
import { mapState, mapMutations } from 'vuex';
import SidecarRecord from './SidecarRecord'

export default {
  name: "Sidecar",
  components: { SidecarRecord },
  computed: {
    ...mapState(['admin'])
  },
  methods: {
    ...mapMutations([]),
    toStr(type){
      return type
    },
  }
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
  right: calc(50% + 350px);
}.right {
  left: calc(50% + 365px);
}

.content {
  position: absolute; top: 0;
  width: 170px;
  height: 96%;
  overflow-x: hidden;
  overflow-y: auto;
  // background-color: bisque;
}.selection {
  left: 0;
}.updated {
  right: 0;
}

.division {
  width: 160px;
  background-color: var(--i30);
}._2px {
  height: 2px;
}._1px {
  height: 1px;
}

.title-box {
  z-index: 25;
  position: sticky; top: 0;
  width: 160px;
  height: 83px;
  border-bottom: 3px solid var(--i30);
  background-color: var(--i94);
}
.title {
  position: absolute; bottom: 0px; left: 0px;
  width: fit-content;
  height: fit-content;
  margin-bottom: 9px;
  font-family: 'Nanum Square', sans-serif;
  font-size: 16px;
  letter-spacing: 0;
  // background-color: aquamarine;
}

.list-wrapper {
  position: relative;
  width: 160px;
  height: fit-content;
}.record {
  position: relative;
  width: 100%;
  height: fit-content;
}


.menu {
  z-index: 25;
  position: sticky; bottom: 0;
  width: 160px;
  height: 76px;
  border-top: 2px solid var(--i30);
  border-bottom: 2px solid var(--i30);
  background-color: var(--i94);
}
.count {
  position: relative; top: 12px; left: 1px;
  width: fit-content;
  height: fit-content;
  font-family: 'Nanum Square', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0;
}

.btn {
  float: left;
  position: relative; top: 20px; left: 1px;
  margin-left: 3px;
  margin-right: 4px;
  width: 70px;
  height: 26px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.19px;
  text-align: center;
  line-height: 25px;
  color: var(--i30);
  border: solid 1px var(--i30);
  background-color: var(--i94);
  transition: 300ms;
}.btn:hover {
  transition: 200ms;
  cursor: pointer;
}

.delete:hover {
  color: var(--accent00);
  border: solid 1px transparent;
  background-color: var(--alert01);
}
.action:hover {
  color: var(--accent00);
  border: solid 1px transparent;
  background-color: var(--accent01);
}
.disabled {
  transition: 300ms;
  color: var(--i80);
  pointer-events: none;
  border: solid 1px transparent;
  background-color: var(--i90);
}





</style>