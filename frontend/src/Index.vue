<template>
<div id="index" 
  :style="themeColor"
  @mouseover="light_on"
  @mousemove="light_move"
  @mouseout="light_off"
>

  <LoginBox 
    v-if="this.$store.state.accessLevel === 0"
    :id="id"
    @verify="this.verify"
  />

  <div class="cover-app-side" v-if="this.$store.state.modal.scopeTab === ('search-list')" :style="{'left':0}"></div>

  <App
    v-if="this.$store.state.accessLevel !== 0"
    :id="id"
    :accessLevel="this.$store.accessLevel"
    @set-color="setColor"
    @logout="logout"
    @change-theme="changeTheme"
    key="app"
  />

  <div class="cover-app-side" v-if="this.$store.state.modal.scopeTab === ('search-list')" :style="{'right':0}"></div>

  <div id="light" :style="lightening"
  v-if="this.$store.state.accessLevel !== 0 && this.$store.state.modal.scopeTab === ('search-list')"></div>

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
    id: null,
    lightening: {
      "top" : "0px",
      "left": "0px",
      "background-color": "var(--i94)"
    },
  }},
  methods: {
    //__________ AUTH _________________
    verify(){ 
      this.$store.dispatch('VERIFY');
    },
    sessionOut(){
      if(this.$store.state.accessLevel) { // 이미 인증이 되어있다면 
        this.$axios.post('/auth/deposit', {id: localStorage.id})
      }else {
        console.log('no-authorized-history');
      }
    },

    //___________OTHER METHODS__________
    setModal(property, state){
      this.$store.dispatch('SET_MODAL', {property, state})
    },
    async changeTheme(color){
      this.$store.state.colorConfig = color;
      localStorage.colorConfig = color;
      const {data} = await this.$axios.post('/auth/theme/change', {
        "id": this.$store.state.id ,"color": color})
      console.log("theme set: ", data.color);
      this.setColor();
    },
    setColor(){
      this.themeColor = this["$store"]["state"]["colors"][this.$store.state.colorConfig];
    },
    
    light_on(){
      this["lightening"]["background-color"] = "var(--i70)";
    },
    light_off(){
      this["lightening"]["background-color"] = "var(--i94)";
    },
    light_move(e){
      this.lightening.top = String(e.pageY) + "px";
      this.lightening.left = String(e.pageX) + "px";
    }

  }, 
  
  //___________INITIATING__________
  created() {
    this.setColor();
    this.verify(); // 바로 인증부터 시작
    window.addEventListener("beforeunload", async () => {
      this.sessionOut();
    });
  },
  mounted() {
    this.$refs.id_field.focus();
  },
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
