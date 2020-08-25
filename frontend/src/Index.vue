<template>
<div id="index" 
  :style="theme.applied"
  @mouseover="light_on"
  @mousemove="light_move"
  @mouseout="light_off"
>

  <transition name="login-box">
  <LoginBox 
    v-if="auth.accessLevel === 0"
    @verify="this.verify"
  /></transition>

  <transition name="appear">
  <Header 
    v-if="auth.accessLevel > 0"
  /></transition>

  <transition name="appear">
  <Search
    v-if="(auth.accessLevel > 0)
    && (mode === 'search')"
  /></transition>

  <!-- <Admin /> -->

  <transition name="appear">
  <div id="light" :style="lightening"
  v-if="auth.accessLevel !== 0 && mode === ('search')"
  ></div></transition>

<router-view></router-view>
</div>
</template>


<script>
import LoginBox from '@/components/LoginBox';
import Header from '@/components/Header';
import Search from '@/components/Search';
// import Admin from '@/components/Admin'
import { mapState } from 'vuex';

export default {
  name: 'Index',
  components: { LoginBox, Header, Search, },
  data() { return {
    themeColor: {},
    lightening: {
      "top" : "0px",
      "left": "0px",
      "background-color": "var(--i94)"
    },
  }},
  computed: {
    ...mapState(['auth', 'mode', 'theme']),
  },
  methods: {
    //___________ AUTHENTICATION METHODS ____________
    verify(){ 
      this.$store.dispatch('VERIFY');
    },
    sessionOut(){
      if(this.auth.accessLevel) { // 이미 인증이 되어있다면 
        this.$store.dispatch('DEPOSIT');
      }else {
        console.log('no-authorized-history');
      }
    },
    //______________ UI METHODS _____________
    light_on(){
      this["lightening"]["background-color"] = "var(--i70)";
    },light_off(){
      this["lightening"]["background-color"] = "var(--i94)";
    },light_move(e){
      this.lightening.top = String(e.pageY) + "px";
      this.lightening.left = String(e.pageX) + "px";
    },
  },
  created() {
    this.verify(); // 바로 인증부터 시작
    window.addEventListener("beforeunload", () => {
      this.sessionOut();
    });
  }
}
</script>



<style lang="scss">
@import "assets/fonts/NanumSquare/nanumsquare.css";
@import "assets/fonts/CoreGothicD/coregothicd.css";
#index {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: 'Space Mono', 'Barlow', 'Nanum Square', 'Core Gothic D', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--i30);
  background-color: var(--i94);
}
::selection {
  color: var(--i30);
  background: var(--accent01);
}


// ------------------------- VISUAL EFFECT

#light {
  z-index: 1;
  position: absolute;
  width: 260px;
  height: 260px;
  z-index: 0;
  border-radius: 50%;
  transform: translate3d(-50%, -50%, 0);

  -webkit-mask-image: radial-gradient(circle at center, white -25%, transparent 130px);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 260px 260px;

  mask-image: radial-gradient(circle at center, white -25%, transparent 130);
  mask-repeat: no-repeat;
  mask-size: 260px 260px;

  background-color: var(--i70);
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.appear-enter {
  opacity: 0;
  transform: translateY(-8px);
} 
.appear-enter-to {
  opacity: 1;
}
.appear-enter-active{
  transition: all 200ms;
  transition-delay: 300ms;
}
.appear-leave {
  opacity: 1;
}
.appear-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.appear-leave-active {
  transition: all 300ms;
}


.login-box-enter {
  opacity: 0;
  transform: translateY(-8px);
} 
.login-box-enter-to {
  opacity: 1;
}
.login-box-enter-active{
  transition: all 200ms;
  transition-delay: 300ms;
}
.login-box-leave {
  opacity: 1;
}
.login-box-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.login-box-leave-active {
  transition: all 300ms;
}




</style>
