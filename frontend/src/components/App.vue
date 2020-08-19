<template>
<div id="app">

  <div id="wrapper-header"> <!-------------------------->

    <form id="searchBox" 
    v-if="this.$store.state.modal.scopeTab === 'search-list'"
    @submit.prevent
    autocomplete="off">
      <input
        id = "searchField"
        ref="searchField" 
        placeholder="search..."
        type="text" 
        @input="keyword = $event.target.value"
        @keyup="search()"
      />
      <div id="searchIndicator">
        <div class="load-bar" v-if="loadingState"></div>
      </div>
      <div id="searchIcon"></div>
    </form>

    <div class="user-box"
    :class="{'user-box-bold':userBoxExtend, 'user-box-admin':(this.$store.state.modal.scopeTab === 'admin')}"
    @mouseenter="expandUserBox(1)"
    @mouseleave="expandUserBox(0); toggleThemeList(0);">
      <div id="account">
        user:<div id="user-name">{{this.$store.state.userName}}</div>
      </div>
      <transition name="fade">
        <div :class="{'user-menu':1}"
        v-if="userBoxExtend"
        @click="toggleThemeList(1)">
          <div class="menu-text">
            테마 변경
          </div>
          <div class="icon">
            <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>arrow_drop_down</title>
              <g> 
                <polygon points="7 10 12 15 17 10"></polygon>
              </g>
            </svg>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div :class="{'user-menu':1}"
        v-if="userBoxExtend"
        @click="logout()">
          <div class="menu-text">
            로그아웃
          </div>
          <div class="icon">
            <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>Shape Copy</title>
              <g transform="translate(7,0)">
                <polygon transform="translate(5,-5) rotate(45)" points="17.8925565 12.8417938 12.8417938 12.8417938 12.8417938 17.8925565 11.1582062 17.8925565 11.1582062 12.8417938 6.10744349 12.8417938 6.10744349 11.1582062 11.1582062 11.1582062 11.1582062 6.10744349 12.8417938 6.10744349 12.8417938 11.1582062 17.8925565 11.1582062"></polygon>
              </g>
            </svg>
          </div>
        </div>
      </transition>
      <div class="border" :class="{'border-extended': userBoxExtend}"></div>
      <transition name="orb-fade">
        <div class="theme-list" 
        v-if="showThemeList">
          <div
          class="orb"
          :key="color" 
          v-for="color in this.$store.state.colorKeys">
            <Theme
              :color="color"
              @change-theme="changeTheme"
            />
          </div>
        </div>
      </transition>
    </div>
    <br><br><br><br><br>
    {{userBoxExtend}}
    {{showThemeList}}
  </div> <!----------- wrapper-header ------------->

  <transition name="fade"> <!-------------------------->
    <SearchList
      v-if="this.$store.state.modal.scopeTab === 'search-list'"
      :keyword="keyword"
      :searchArr="searchArr"
      :dbinfo="dbinfo"
      :coverBottom="coverBottom"
      @moreinfo="changeCoverBottom"
      @loading="loading"
    />
  </transition>

</div>
</template>

<script>
import axios from 'axios'
import SearchList from '@/components/SearchList'
import Theme from '@/components/Theme'

export default {
  name: 'App',
  components: {
    SearchList,
    Theme
  },
  props: [],
  data() { return {
    keyword: '',
    searchArr: [],
    dbinfo: {},
    // ------ UI ---
    loadingState: 0,
    // ------ user-box ---
    userBoxExtend: 0,
    showThemeList: 0,
    // ------ search-list ---
    recordHeight: 66,
    coverBottom: {
      "height": "100%"
    },

  }},
  computed: {

  },
  methods: {
    logout(){
      this.$emit('logout');
    },
    callback(arg){
      console.log(arg);
      return false;
    },

    //_____________ USER INTERFACE ACTIONS _________
    fitCoverBottom(count, height){
      this.coverBottom.height = "calc(100% - " + String(count * height) + "px)"
    },
    changeCoverBottom(state){
      if(state){
        this.recordHeight = 146;
        this.fitCoverBottom(this.searchArr.length, this.recordHeight);
      }else{
        this.recordHeight = 66;
        this.fitCoverBottom(this.searchArr.length, this.recordHeight);
      }
    },
    expandUserBox(i){
      this.userBoxExtend = i;
    },
    toggleThemeList(i){
      this.showThemeList = i;
    },
    changeTheme(color){
      this.$emit('change-theme', color);
    },
    loading(bool){
      this.loadingState = bool;
    },
    //___________ LOAD/SEARCH DATABASE __________
    async getDBinfo(){
      let {data} = await axios.get('/db/info');
      this.dbinfo = data;
      console.log(this.dbinfo);
    },
    async search(){
      this.loadingState = 1;
      let {data} = await axios.post('/db/search', {keyword: this.keyword});
      this.searchArr = data.arg;
      this.fitCoverBottom(this.searchArr.length, this.recordHeight);
    }
  },
  created() {
    console.log("created");
    this.$emit('app-created');
    this.getDBinfo();
    },
  mounted() {
    this.$refs.searchField.focus();
  },
  beforeDestroy() {
    // this.$emit('close-session')
  },

}
</script>




<style lang="scss" scoped> #app {
  // ------------------------------------------------
  // ------------------------------------------------
  float: left;
  z-index: 10;
  width: calc(100vw - 120px);
  height: 100vh;
  min-width: 490px;
  max-width: 710px;
  // background-color: aqua;
}

/* --------------- HEADER-------------- */
#wrapper-header {
  width: calc(100% - 40px);
  height: 157px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  user-select: none;
  -webkit-user-select: none;
  background-color: var(--i94);
  background-color: rgb(86, 139, 255);
}

.user-box { //------------------------
  float: left;
  position: relative;
  bottom: 86px;
  width: fit-content;
  height: 30px;
  margin-top: 4px;
  transition: 200ms;
  font-weight: 400;
  color: var(--i45);
  background-color: cornsilk;
}
  .user-box-bold {
    font-weight: 800;
    position: default;
  }
  .user-box-admin {
    bottom: 10px;
    transition: 200ms;
  }


#account {
  float: left;
  width: fit-content;
  height: 18px;
  margin-right: 12px;
  font-family: 'Space Mono', sans-serif;
  font-size: 16px;
  letter-spacing: 0.24px;
}
  #user-name {
    display: inline-block;
    margin-left: 1px;
    font-family: 'Nanum Square', sans-serif;
    font-size: 16px;
    letter-spacing: 0.24px;
    text-align: left;
    // background-color: rgb(14, 34, 88);
  }
  #user-name:hover{
    cursor: pointer;
  }

.user-menu { 
  float: left;
  bottom: 18px;
  width: fit-content;
  height: 25px;
  margin-right: 1px;
  font-family: 'Nanum Square';
  font-size: 14px;
  letter-spacing: 0.21px;
  text-align: right;
  font-weight: 400;
  color: var(--i30);
  fill: var(--i30);
}
  .user-menu:hover {
    cursor: pointer;
    font-weight: 700;
    color: var(--accent01);
    fill: var(--accent01);
    transition: 300ms;
  }
    .menu-text {
      float: left;
      margin-top: 5px;
    }
    .icon {
      float: left;
      margin-top: 1px;
      width: 24px;
      height: 24px;
    }

.theme-list{ // -------------------
  float: left;
  display: relative;
  padding-top: 14px;
  padding-bottom: 20px;

  width: 100%;
  height: 28px;
  background-color: aquamarine;
}
  .orb {
    float: left;
    margin-right: 7px;
  }
    .orb-border {
      width: 28px;
      height: 28px;
      fill: var(--i30);
    }
    .orb-bg {
      position: relative;
      top: 2px;
      margin-left: 2px;
      width: 24px;
      height: 24px;
      fill: var(--i94);
    }
    .orb-accent {
      position: relative;
      top: 2px;
      margin-left: 2px;
      width: 20px;
      height: 20px;
      fill: var(--accent02);
    }
      .orb-border-selected {
        fill: var(--i30);
      }


.border { // ------------------------
  width: 0%;
  height: 2px;
  position: relative;
  left: 0;
  top: 28px;
  transition: 300ms;
  animation-timing-function: ease-in-out;
  background-color: var(--i30);
}
  .border-extended {
    pointer-events: none;
    width: 100%;
    transition: 400ms;
    animation-timing-function: ease-out;
  }


#searchBox { //------------------------
  display: block;
  position: relative;
  top: 75px;
  width: 100%;
  height: 80px;
  border-bottom: 2px solid var(--i30);
  // background-color: darkkhaki;
}
#searchBox :hover, :focus {
  ~ #searchIndicator {
    height: 4px;
    transition: 200ms;
  }
  ~ #searchIcon {
    margin-top: 30px;
    transition: 200ms;
  }
}
#searchField { //------
  display: block;
  float: left;

  padding: 0px;
  margin-top: 6px;
  height: calc(100% - 10px);
  width: calc(100% - 46px);
  border: 0; outline: 0;

  font-family: 'Space Mono', 'Nanum Square';
  font-size: 60px;
  color: var(--i30);
  letter-spacing: 0;
  text-align: right;

  background-color: transparent;

  &::placeholder {
  color: transparent;
  }
}
#searchIndicator { //--------------
  position: relative;
  top: 80px;
  width: 100%;
  height: 2px;

  transition: 200ms;

  background-color: var(--i30);
}
#searchIcon { //--------------
  display: block;
  float: right;
  margin-top: 32px;
  margin-right: 2px;
  width: 40px;
  height: 40px;

  transition: 200ms;

  -webkit-mask-image: url(../assets/images/searchIcon.svg);
  mask-image: url(../assets/images/searchIcon.svg) no-repeat;
  background-color: var(--i30);
}

.load-bar {
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  animation: blink 300ms cubic-bezier(.37,.06,.67,.94) infinite;
  background-color: var(--accent01);
}


// ----------------------------------- ANIMATION

@keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
@keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@keyframes shuttle {
  0% {
    -webkit-mask-image: linear-gradient(to right, transparent 0%,  black 50%, black 80%, transparent 81%);
    mask-image: linear-gradient(to right, transparent 0%,  black 50%, black 80%, transparent 81%);
    left: 0%;
  }
  50% {
    -webkit-mask-image: linear-gradient(to right, transparent 19%,  black 20%, black 50%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 19%,  black 20%, black 50%, transparent 100%);
    left: 75%;
  }
  100% {
    -webkit-mask-image: linear-gradient(to right, transparent 0%,  black 50%, black 80%, transparent 81%);
    mask-image: linear-gradient(to right, transparent 0%,  black 50%, black 80%, transparent 81%);
    left: 0%;
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
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
