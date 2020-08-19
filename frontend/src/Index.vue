<template>
<div id="index" 
  :style="themeColor"
  @mouseover="light_on"
  @mousemove="light_move"
  @mouseout="light_off"
>

  <div 
  id="loginBox" 
  v-if="this.$store.state.accessLevel === 0">
    <form @submit="login" autocomplete="off">
      <input
        type="text" 
        class = "id_field"
        v-model="id"
        placeholder="id:"
        name="id_field" 
        ref="id_field"
        id = "id_field"
        required
      />
      <input 
        type="submit" 
        value="login" 
        class="btn"
      />
      <label class="id_label" for="id_field">id:</label>
    </form>
  </div>

  <div class="cover-app-side" v-if="this.$store.state.modal.scopeTab === ('search-list')" :style="left0"></div>
  <App
    v-if="this.$store.state.accessLevel !== 0"
    :accessLevel="this.$store.accessLevel"
    @app-created="recoverConfig"
    @logout="logout"
    @change-theme="changeTheme"
    key="app"
  />
  <div class="cover-app-side" v-if="this.$store.state.modal.scopeTab === ('search-list')" :style="right0"></div>

  <div id="light" :style="lightening"
  v-if="this.$store.state.accessLevel !== 0 && this.$store.state.modal.scopeTab === ('search-list')"></div>

<router-view></router-view>
</div>
</template>


<script>
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

import App from '@/components/App'

export default {
  name: 'Index',
  components: { App },
  data() { return {
    themeColor: {},
    id: null,
    lightening: {
      "top" : "0px",
      "left": "0px",
      "background-color": "var(--i94)"
    },
    left0 : {"left":0},
    right0 : {"right":0},
  }},
  methods: {
    //___________AUTHORIZATION METHODS__________
    async login(e) { e.preventDefault();
                              this.id = '2018317024'
      let accessTime = new Date();
      const requestPoint = uuidv4();
      axios.defaults.headers.common['Authorization'] =
        await this.issueToken(this.id, 10800, accessTime, requestPoint);
      this.loadConfig(this.id);
      this.setColor();
      this.verify();
    },
    async issueToken(id, expiresIn, accessTime, requestPoint) {
      const { data } = await axios.post('/auth/issue', {id, expiresIn, accessTime, requestPoint}); 
      this.$store.dispatch('ISSUED', data)
      return data.accessToken;
    },
    loadConfig(id){ this.$store.dispatch('LOAD_CONFIG', {id});
    },
    verify(){ this.$store.dispatch('VERIFY'); 
    },
    logout(){ this.$store.dispatch('LOGOUT'); this.id = null;
    },
    sessionOut(){
      if(this.$store.state.accessLevel) { // 이미 인증이 되어있다면 
        axios.post('/auth/deposit', {id: localStorage.id})
      }else {
        console.log('no-authorized-history');
      }
    },
    async recoverConfig(){ // from App/$emit(app-created)
      if(this.id === null && localStorage.id){
        const {data} = await axios.post('/auth/recover', {id: localStorage.id});
        axios.defaults.headers.common['Authorization'] = data.accessToken;
        this.$store.state.id = await localStorage.id;
        this.$store.state.userName = await localStorage.userName;
        this.$store.state.colorConfig = await localStorage.colorConfig;
        this.setColor();
      } else {
        this.setColor();
      }
    },

    //___________OTHER METHODS__________
    setModal(property, state){
      this.$store.dispatch('SET_MODAL', {property, state})
    },
    async changeTheme(color){
      this.$store.state.colorConfig = color;
      localStorage.colorConfig = color;
      const {data} = await axios.post('/auth/theme/change', {
        "id": this.$store.state.id ,"color": color})
      console.log("theme set: ", data.color);
      this.setColor();
    },
    async setColor(){
      this.themeColor = await this["$store"]["state"]["colors"][this.$store.state.colorConfig];
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
//-----------------------------------------------------
//-----------------------------------------------------
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
  // background-color: lightblue;
}
::selection {
  color: var(--i30);
  background: var(--accent01);
}


// -------------------------LOGIN BOX
#loginBox {
  z-index: 10;
  width: 262px;
  height: 38px;
  color: inherit;
  border: 0px;
  border-bottom: 2px solid;
}

.id_field{
  display: block;

  padding: 0px;
  width: 100%;
  height: 100%;
  border: 0px;
  outline: 0;
  background: transparent;

  font-family: 'Space Mono', 'Nanum Square';
  color: inherit;
  font-size: 23px;
  cursor: text;

  &::placeholder {
  color: transparent;
  }
  &:placeholder-shown 
  ~ .id_label {
  position: relative;
  bottom: 61px;
  font-size: 24px;
  cursor: text;
  }
  &:placeholder-shown 
  ~ .btn {
    color: var(--i70);
    background-color: var(--i90);
    pointer-events: none;
    outline: 0;
  }
}

.id_label {
  display: -moz-popup;
  position: relative;
  bottom: 81px;
  font-size: 17px;
  transition: 0.2s;
}
.id_field:focus {
~ .id_label {
  position: relative;
  bottom: 81px;
  font-size: 17px;
  transition: 0.2s;
  }
}

.btn {
  display: block;
  width: 60px;
  height: 26px;

  position: relative;
  left: 202px;
  bottom: 29px;

  font-family: inherit;
  font-weight: 700;
  font-size: 13px;

  cursor: pointer;

  border: 0px;
  border-radius: 0px;
  outline: 0px;
  color: var(--accent00);
  background-color: var(--accent01);
}
.btn:hover {
  color: var(--accent00);
  background-color: var(--accent02);
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
