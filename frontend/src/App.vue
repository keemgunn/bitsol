<template>
<div id="app" :style="themeColor">

  <div id="loginBox" v-if="this.$store.state.accessLevel === 0">
    <form @submit="login" autocomplete="off">
      <input
        type="text" 
        class = "id_field"
        v-model="id"
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
  </div>


  <Manager
    v-if="this.$store.state.accessLevel !== 0"
    :accessLevel="this.$store.accessLevel"
    @manager-created="appMounted"
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
    id: null
  }},
  methods: {
    //___________AUTHORIZATION METHODS__________
    async login(e) { e.preventDefault();
      let accessTime = new Date();
      localStorage.requestPoint = uuidv4();
      axios.defaults.headers.common['Authorization'] =
        await this.issueToken(this.id, 10800, accessTime, localStorage.requestPoint);
      this.loadConfig(this.id);
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
    async appMounted(){
      if(this.id === null){
        const {data} = await axios.post('/auth/recover', {id: localStorage.id});
        axios.defaults.headers.common['Authorization'] = data.accessToken;
        this.$store.state.id = localStorage.id;
        this.$store.state.userName = localStorage.userName;
        this.$store.state.colorConfig = localStorage.colorConfig;
        this.$store.state.userName = localStorage.userName;
      }
    },

    //___________OTHER METHODS__________
    setModal(property, state){
      this.$store.dispatch('SET_MODAL', {property, state})
    }

  },
  created() {
    this.verify(); // 바로 인증부터 시작
    window.addEventListener("beforeunload", async () => {
      this.sessionOut();
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
