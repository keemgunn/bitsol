<template>
<div id="index" 
  :style="this.$store.state.theme.applied"
  @mouseover="light_on"
  @mousemove="light_move"
  @mouseout="light_off"
>

  <LoginBox 
    v-if="this.$store.state.auth.accessLevel === 0"
    @verify="this.verify"
  />

  <div class="cover-app-side" v-if="this.$store.state.modal.scopeTab === ('search-list')" :style="{'left':0}"></div>

  <App
    v-if="this.$store.state.auth.accessLevel !== 0"
    :accessLevel="this.$store.state.auth.accessLevel"
    key="app"
  />

  <div class="cover-app-side" v-if="this.$store.state.modal.scopeTab === ('search-list')" :style="{'right':0}"></div>

  <div id="light" :style="lightening"
  v-if="this.$store.state.auth.accessLevel !== 0 && this.$store.state.modal.scopeTab === ('search-list')"></div>

<router-view></router-view>
</div>
</template>


<script>

import App from '@/components/App'
import LoginBox from '@/components/LoginBox'

export default {
  name: 'Index',
  components: { App, LoginBox },
  data() { return {
    themeColor: {},
    lightening: {
      "top" : "0px",
      "left": "0px",
      "background-color": "var(--i94)"
    },
  }},
  methods: {
    //___________ AUTHENTICATION METHODS ____________
    verify(){ 
      this.$store.dispatch('VERIFY');
    },
    sessionOut(){
      if(this.$store.state.auth.accessLevel) { // 이미 인증이 되어있다면 
        this.$store.dispatch('DEPOSIT');
      }else {
        console.log('no-authorized-history');
      }
    },

    //______________ UI METHODS _____________

    setModal(property, state){
      this.$store.dispatch('SET_MODAL', {property, state});
      console.log('### modal set ...@Index/setModal');
    },
    
    light_on(){
      this["lightening"]["background-color"] = "var(--i70)";
    },light_off(){
      this["lightening"]["background-color"] = "var(--i94)";
    },light_move(e){
      this.lightening.top = String(e.pageY) + "px";
      this.lightening.left = String(e.pageX) + "px";
    }

  }, 
  
  created() {
    // this.setColor();
    this.verify(); // 바로 인증부터 시작
    window.addEventListener("beforeunload", () => {
      this.sessionOut();
    });
  }
}
</script>



<style lang="scss">
//------------------------------------------------
//------------------------------------------------
@import "assets/fonts/NanumSquare/nanumsquare.css";
@import "assets/fonts/CoreGothicD/coregothicd.css";
#index {
  z-index: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  position: absolute;
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


// ------------------------- APP WRAPPER
.cover-app-side {
  z-index: 2;
  position: absolute;
  height: 100vh;
  background-color: var(--i94);
  // background-color: fuchsia;
}

@media ( max-width: 2000px ) {
    .cover-app-side {
        width: calc( 50vw - 340px );
    }   
}
@media ( max-width: 800px ) {
    .cover-app-side {
        width: calc( 10vw );
    } 
}
@media ( max-width: 550px ) {
    .cover-app-side {
        width: calc( 7vw );
    } 
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


</style>
