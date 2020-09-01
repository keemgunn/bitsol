<template>
<div class="user"
:class="{'user-expand':userBoxState>0, 'orb-shown':userBoxState===2}"
@mouseenter="userBoxState = 1"
@mouseleave="userBoxState = 0">

  <div id="name">
    user:{{AUTHOR.userName}}
  </div>

  <transition name="fade">
  <div class="menu"
  v-if="userBoxState"
  :class="{'menu-selected':userBoxState===2}"
  @click="userBoxState = 2">
    테마 변경
    <div class="icon">
      <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>theme</title>
        <g> 
          <polygon points="7 10 12 15 17 10"></polygon>
        </g>
      </svg>
    </div>
  </div></transition>

  <transition name="fade">
  <div class="menu"
  v-if="userBoxState"
  @click="logout()">
    로그아웃
    <div class="icon">
      <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>logout</title>
        <g transform="translate(7,0)">
          <polygon transform="translate(5,-5) rotate(45)" points="17.8925565 12.8417938 12.8417938 12.8417938 12.8417938 17.8925565 11.1582062 17.8925565 11.1582062 12.8417938 6.10744349 12.8417938 6.10744349 11.1582062 11.1582062 11.1582062 11.1582062 6.10744349 12.8417938 6.10744349 12.8417938 11.1582062 17.8925565 11.1582062"></polygon>
          </g>
      </svg>
    </div>
  </div></transition>

  <transition name="orb-fade">
  <div id="theme-list" 
  v-if="userBoxState === 2">
    <div :key="color" 
    v-for="color in theme.colorKeys">
      <Theme
        :color="color"
      />
    </div>
  </div></transition>

  <div class="border" :class="{'border-expand':userBoxState>0}"></div>

</div>
</template>



<script>
import Theme from '@/components/header/Theme'
import { mapState } from 'vuex';


export default {
  name: "User",
  components: {
    Theme
  },
  data() { return {
    userBoxState: 0,
  }},
  computed: {
    AUTHOR: function(){
      if(this.test){
        return this['$store']['state']['authTest']
      }else{
        return this['$store']['state']['auth']
      }
    },
    ...mapState(['auth', 'theme', 'test', 'authTest'])
  },
  methods: {
    logout(){ this.$store.dispatch('LOGOUT'); }
  },
}
</script>



<style lang="scss" scoped> .user {
  position: absolute; top: 20px; left: 0px;
  width: fit-content;
  height: 30px;
  font-family: 'Space Mono', 'Nanum Square', sans-serif;
  font-weight:600;
  font-size: 16px;
  text-align: left;
  letter-spacing: 0.24px;
  color: var(--i45);
  fill: var(--i45);
  // background-color: wheat;
}.user:hover {
  color: var(--i30);
}.user-expand {
  color: var(--i30);
  fill: var(--i30);
}.orb-shown {
  height: 90px;
}

#name {
  float:left;
  margin-right: 10px;
  width: fit-content;
  height: 28px;
  transition: 300ms;
  // background-color: aqua;
}

.menu {
  float: left;
  margin-left: 3px;
  width: fit-content;
  height: 26px;
  font-family: NanumSquareOTFB;
  font-size: 14px;
  letter-spacing: 0.21px;
  text-align: left;
  line-height: 26px;
  transition: 300ms;
  // background-color: chocolate;
}.menu:hover {
  transition: 200ms;
  cursor: pointer;
  color: var(--accent02);
  fill: var(--accent02);
}.menu-selected {
  color: var(--accent03);
  fill: var(--accent03);
}.menu-selected:hover {
  color: var(--accent03);
  fill: var(--accent03);
}.icon {
  float: right;
  margin-top: 1px;
  width: 24px;
  height: 24px;
}

.border {
  position: absolute; top: 28px; left: 0;
  width: 0%;
  height: 3px;
  background-color: var(--i30);
  transition: 300ms;
  animation-timing-function: ease-in-out;
}.border-expand {
  pointer-events: none;
  width: 100%;
  transition: 400ms;
  animation-timing-function: ease-out;
}

#theme-list {
  position: absolute; top: 40px; left: 0;
  width: 100%;
  height: fit-content;
  // background-color: deeppink;
}


// ================== ANIMATION =================

.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.orb-fade-enter {
  opacity: 0;
  transform: translateY(-8px);
} 
.orb-fade-enter-to {
  opacity: 1;
}
.orb-fade-enter-active{
  transition: all 200ms;
}
.orb-fade-leave {
  opacity: 1;
}
.orb-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.orb-fade-leave-active {
  transition: all 200ms;
}


</style>