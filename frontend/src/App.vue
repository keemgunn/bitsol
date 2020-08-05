<template>
<div id="app" :style="themeColor">

  <div id="loginBox" v-if="this.$store.state.accessLevel === 0">
    <form @submit="login" autocomplete="off">
      <input
        type="text" 
        class = "id_field"
        v-model="key"
        placeholder="id:"
        name="id" 
        id = "id_field"
        required
      />
      <input 
        type="submit" 
        value="login" 
        class="btn"
      />
      <label class="id_label" for="id">id:</label>
    </form>
    <input 
      type="button" 
      value="heimdall"
      class="btn"
      @click="heimdall"
    />
  </div>


  <Manager
    v-if="this.$store.state.accessLevel !== 0"
    :accessLevel="this.$store.accessLevel"
    @manager-created="reIssueToken"
    @logout="logout"


    key="manager"
  />

<router-view></router-view>
</div>
</template>

<script>
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

import Manager from '@/components/Manager'


export default {
  name: 'App',
  components: {
    Manager
  },
  data() { return {
    themeColor: {
    "--i100": "#ffffff",
    "--i98": "#FAFAFA",
    "--i94": "#F0F0F0",
    "--i90": "#E6E6E6",
    "--i80": "#CCCCCC",
    "--i70": "#B3B3B3",
    "--i60": "#999999",
    "--i45": "#737373",
    "--i30": "#4D4D4D",
    "--i0": "#000000",
    "--accent02": "#FF7955",
    "--accent01": "#FF9470"
    },
    key: '',
    msg: "Hello",
    testArr: [],
    test00: null
  }},
  methods: {
    // LOGIN METHOD: login -> getToken -> heimdall
    async login(e) { e.preventDefault();
      axios.defaults.headers.common['Authorization'] = await this.getToken(this.key, 10800);
      console.log("A");
      this.loadConfig(this.key);
      console.log("B");
      this.heimdall();
    },
    async getToken(key, expiresIn) {
      let accessTime = new Date();
      let requestPoint = uuidv4();
      localStorage.requestPoint = requestPoint;
      const { data } = await axios.post('auth/issue', {key, expiresIn, accessTime, requestPoint}); 
      this.$store.dispatch('ISSUED', data)
      return data.accessToken;
    },
    loadConfig(key) {
      this.$store.dispatch('LOAD_CONFIG', {key});
    },
    logout(){
      this.$store.dispatch('LOGOUT');
    },
    setModal(property, state){
      this.$store.dispatch('SET_MODAL', {property, state})
    },
    heimdall(){
      this.$store.dispatch('VERIFY');
    },

    initiating(){

    },
    destroy(){

    },
    async reIssueToken(){

    }
  },
  created() {
    // this.initiating();
    window.addEventListener("beforeunload", async () => {
      // this.destroy();
    })
  },
}
</script>

<style lang="scss">
@import "assets/fonts/NanumSquare/nanumsquare.css";
@import "assets/fonts/CoreGothicD/coregothicd.css";

#app {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;

  position: absolute;

  font-family: 'Space Mono', 'Nanum Square', 'Core Gothic D', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: var(--i30);
  background-color: var(--i94);
}

#loginBox {
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
  outline: 0px;
  color: var(--i30);
  background-color: var(--accent01);
}
.btn:hover {
  color: var(--i100);
  background-color: var(--accent02);
}

</style>
