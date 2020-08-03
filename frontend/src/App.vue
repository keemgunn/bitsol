<template>
<div
  id="app"
  v-bind:style="themeColor"
>

  <div id="loginBox">
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
  </div>

  <input 
    type="button" 
    value="heimdall"
    class="btn"
    v-on:click="heimdall"
  />
  <input 
    type="button" 
    value="logout"
    class="btn"
    v-on:click="logout"
  />

  <br><br><br>
  userKey: {{ userKey }}
  <br>
  access-level: {{ guard.accessLevel }}
  <br>
  message: <br>
  {{ msg }}

<router-view></router-view>
</div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'App',
  components: {
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
      accessLevel: 0,
      expiresIn_3h: 60*60*3, // 3h
      expiresIn_5s: 5, // 5s
    },
    userKey: '',
    msg: "Hello",
    testArr: [],
    test00: null
  }},
  methods: {
    // LOGIN METHOD: login -> getToken -> heimdall
    async login(e) {
      e.preventDefault();
      this.getToken(this.guard.key, this.guard.expiresIn_3h);
    },
    getToken( key, expiresIn ) {
      this.$store.dispatch('LOGIN', { key, expiresIn })
      .then(() => this.heimdall())
      .catch(({message}) => {
        this.guard.accessLevel = 0;
        this.userKey = ""
        this.msg = message
        // *** LOGIN ALERT: NO USER
      }) 
    },
    heimdall(){ // accessToken in Header
      axios.get('auth/verify')
        .then( res => {
          this.guard.accessLevel = res.data.accessLevel;
          this.userKey = this.$store.state.userKey;
          this.msg = res.data.msg;
        })
        .catch( err => {
          console.log(err);
          this.guard.accessLevel = 0;
          this.userKey = ""
          this.msg = "Request failed with status code 401"
          // *** AUTH ALART: FAILD
          // *** REDIRECTION TO LOGIN PAGE
      });
    },
    logout(){
      this.$store.dispatch('LOGOUT')
    }
  },
  created() {
    // ----- INITIATING USER CONFIGS -----


    // 기존에 발급 받았던 토큰으로 인증 __heimdall()
        // 통과하면 students.vue 랜더링,
        // 인증 실패하면 로그인 페이지 렌더링

    // students.vue에 진입하게 되면
    // 같은 정보를 이용해서 3시간 짜리 토큰 override




    window.addEventListener("beforeunload", function(e) {
      e.preventDefault();
      console.log("beforeunload");

      // 5초짜리 인증 토큰 override __getToken()




      // var confirmationMessage = "before unload";
      // (e || window.event).returnValue = confirmationMessage;
      // return confirmationMessage;
    })



  },
  destroyed() {
    console.log("des");
    axios.get('/destroy')
      .then ( res => {
        console.log(res);
      })
      .catch( err => {
        console.log(err);
    })
  }
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
