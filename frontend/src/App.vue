<template>
<div id="app" :style="themeColor">

  <div id="loginBox" v-if="!guard.accessLevel">
    <form @submit="login" autocomplete="off">
      <input
        type="text" 
        class = "id_field"
        v-model="guard.key"
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
    v-if="guard.accessLevel"
    :accessLevel="guard.accessLevel"
    :state="state"
    :modal="modal"
    @manager-created="reIssueToken"
    @logout="logout"


    key="manager"
  />

<router-view></router-view>
</div>
</template>

<script>
import axios from 'axios'

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
    guard: {
      key: '',
      accessLevel: 0
    },
    state: {
      userKey: '',
      userName: '',
      colorConfig: ''
    },
    modal: {
      display: 'refg'
    },
    msg: "Hello",
    testArr: [],
    test00: null
  }},
  methods: {
    // LOGIN METHOD: login -> getToken -> heimdall
    async login(e) {
      e.preventDefault();
      await this.getToken(this.guard.key, 10800);
      await this.loadConfig(this.guard.key);
      this.heimdall();
    },
    getToken(key, expiresIn) {
      this.$store.dispatch('ISSUE', {key, expiresIn});
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

    loadFromLocal(){
      this.state.userKey = localStorage.userKey || "";
      this.state.userName = localStorage.userName || "";
      this.state.colorConfig = localStorage.colorConfig || "";
      this.modal.display = localStorage.display || "refg";
    },
    deleteLocalState(){
      delete localStorage.userName;
      delete localStorage.colorConfig;
    },
    heimdall(){
      axios.get('auth/verify')
        .then( res => {
          this.guard.accessLevel = res.data.accessLevel;
        })
        .catch( err => {
          console.log(err);
          this.guard.accessLevel = 0;
          // *** AUTH ALART: FAILD
          // *** REDIRECTION TO LOGIN PAGE
      });
    },

    initiating(){
      console.log("initiating...");
      console.log("localstorage.expiresIn: ", localStorage.expiresIn);
      axios.defaults.headers.common['Authorization'] = localStorage.accessToken;
      this.heimdall();
    },
    async destroy(){
      await this.getToken(this.state.userKey, 3);
    },
    async reIssueToken(){
      console.log("reissueing...");
      console.log("localstorage.expiresIn: ", localStorage.expiresIn);
      await this.getToken(localStorage.userKey, 10800);
      console.log("TOKEN REISSUED");
      console.log("localstorage.expiresIn: ", localStorage.expiresIn);
    }
  },
  created() {
    this.initiating();
    window.addEventListener("beforeunload", async () => {
      // await this.destroy();
      await this.getToken(this.state.userKey, 3);
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
