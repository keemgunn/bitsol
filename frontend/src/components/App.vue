<template>
<div id="app">

  <div class="wrapper-header" :class="{'wrapper-header-admin':this.$store.state.modal.mode === 'admin'}"> <!-------------------------->

    <form id="searchBox" 
    v-if="this.$store.state.modal.mode === 'search-list'"
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

    <div id="admin-tab"
    v-if="this.$store.state.modal.mode === 'admin'">
      <div class="menu" :class="{'menu-selected':(adminMenu==='index')}" @click="toggle('adminMenu', 'index')">개요</div>
      <div class="menu" :class="{'menu-selected':(adminMenu==='db')}" @click="toggle('adminMenu', 'db')">DB 관리</div>
      <div class="menu" :class="{'menu-selected':(adminMenu==='user')}" @click="toggle('adminMenu', 'user')">사용자 관리</div>
      <div class="menu" :class="{'menu-selected':(adminMenu==='refg')}" @click="toggle('adminMenu', 'refg')">냉장고팩 관리</div>
    </div>

    <div class="admin-menu">
      <div class="admin-menu-text">관리자</div>
      <div class="admin-menu-icon"></div>

    </div>



    <div class="user-box"
    :class="{'user-box-bold':userBoxState, 'user-box-admin':(this.$store.state.modal.mode === 'admin')}"
    @mouseenter="toggle('userBoxState', 1)"
    @mouseleave="toggle('userBoxState', 0);">
      <div id="account">
        user:<div id="user-name">{{this.$store.state.auth.userName}}</div>
      </div>
      <transition name="fade">
        <div class="user-menu"
        :class="{'user-menu-selected':(userBoxState===2)}"
        v-if="userBoxState"
        @click="toggle('userBoxState',2)">
          <div class="menu-text">
            테마 변경
          </div>
          <div class="icon">
            <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>theme</title>
              <g> 
                <polygon points="7 10 12 15 17 10"></polygon>
              </g>
            </svg>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="user-menu"
        :class="{'user-menu-selected':(userBoxState===2)}"
        v-if="(userBoxState && this.$store.state.modal.mode === 'search-list') && this.$store.state.auth.accessLevel > 1"
        @click="$emit('modal','mode','admin')">
          <div class="menu-text">
            관리자
          </div>
          <div class="icon-admin">
            <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>settings</title>
              <g id="settings-24px">
                <path d="M19.14,12.94 C19.18,12.64 19.2,12.33 19.2,12 C19.2,11.68 19.18,11.36 19.13,11.06 L21.16,9.48 C21.34,9.34 21.39,9.07 21.28,8.87 L19.36,5.55 C19.24,5.33 18.99,5.26 18.77,5.33 L16.38,6.29 C15.88,5.91 15.35,5.59 14.76,5.35 L14.4,2.81 C14.36,2.57 14.16,2.4 13.92,2.4 L10.08,2.4 C9.84,2.4 9.65,2.57 9.61,2.81 L9.25,5.35 C8.66,5.59 8.12,5.92 7.63,6.29 L5.24,5.33 C5.02,5.25 4.77,5.33 4.65,5.55 L2.74,8.87 C2.62,9.08 2.66,9.34 2.86,9.48 L4.89,11.06 C4.84,11.36 4.8,11.69 4.8,12 C4.8,12.31 4.82,12.64 4.87,12.94 L2.84,14.52 C2.66,14.66 2.61,14.93 2.72,15.13 L4.64,18.45 C4.76,18.67 5.01,18.74 5.23,18.67 L7.62,17.71 C8.12,18.09 8.65,18.41 9.24,18.65 L9.6,21.19 C9.65,21.43 9.84,21.6 10.08,21.6 L13.92,21.6 C14.16,21.6 14.36,21.43 14.39,21.19 L14.75,18.65 C15.34,18.41 15.88,18.09 16.37,17.71 L18.76,18.67 C18.98,18.75 19.23,18.67 19.35,18.45 L21.27,15.13 C21.39,14.91 21.34,14.66 21.15,14.52 L19.14,12.94 Z M12,15.6 C10.02,15.6 8.4,13.98 8.4,12 C8.4,10.02 10.02,8.4 12,8.4 C13.98,8.4 15.6,10.02 15.6,12 C15.6,13.98 13.98,15.6 12,15.6 Z" id="Shape" fill-rule="evenodd"></path>
              </g>
            </svg>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="user-menu"
        v-if="userBoxState"
        @click="logout()">
          <div class="menu-text">
            로그아웃
          </div>
          <div class="icon">
            <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>logout</title>
              <g transform="translate(7,0)">
                <polygon transform="translate(5,-5) rotate(45)" points="17.8925565 12.8417938 12.8417938 12.8417938 12.8417938 17.8925565 11.1582062 17.8925565 11.1582062 12.8417938 6.10744349 12.8417938 6.10744349 11.1582062 11.1582062 11.1582062 11.1582062 6.10744349 12.8417938 6.10744349 12.8417938 11.1582062 17.8925565 11.1582062"></polygon>
              </g>
            </svg>
          </div>
        </div>
      </transition>
      <div class="border" :class="{'border-extended': userBoxState}"></div>
      <transition name="orb-fade">
        <div class="theme-list" 
        v-if="userBoxState === 2">
          <div
          class="orb"
          :key="color" 
          v-for="color in this.$store.state.theme.colorKeys">
            <Theme
              :color="color"
            />
          </div>
        </div>
      </transition>
    </div>

  </div> <!----------- wrapper-header ------------->

  <transition name="fade"> <!-------------------------->
    <SearchList
      v-if="this.$store.state.modal.mode === 'search-list'"
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
    userBoxState: 0,
    adminMenu: 'index',

    // ------ search-list ---
    recordHeight: 66,
    coverBottom: {
      "height": "100%"
    },

  }},
  methods: {

    logout(){ this.$store.dispatch('LOGOUT');
    },

    //_____________ UI ACTIONS _________
    toggle(target, config){
      this[target] = config;
    },
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

    //___________ LeffiOAD/SEARCH DATABASE __________
    async getDBinfo(){
      console.log('### request ...@App/getDBinfo');
      let {data} = await axios.get('/db/info');
      this.dbinfo = data;
      console.log(this.dbinfo);
    },
    async search(){
      let {data} = await axios.post('/db/search', {keyword: this.keyword});
      this.searchArr = data.arg;
      this.fitCoverBottom(this.searchArr.length, this.recordHeight);
    },
    loading(bool){
      this.loadingState = bool;
    }
    
  },
  created() {
    if(this.$store.state.auth.id === null){
      this.$store.dispatch('RECOVER');
      console.log('### configuration recovered ... @App');
    }
    this.getDBinfo();
  },
  mounted() {
    this.$refs.searchField.focus();
  }
}
</script>




<style lang="scss" scoped> #app {
// -------------------------------------------
// -------------------------------------------
  float: left;
  z-index: 10;
  width: calc(100vw - 120px);
  height: 100vh;
  min-width: 490px;
  max-width: 710px;
}

/* --------------- HEADER-------------- */
.wrapper-header {
  width: calc(100% - 40px);
  height: 157px;
  padding: 20px 20px 0px 20px;
  user-select: none; -webkit-user-select: none;
  background-color: var(--i94);
    background-color: rgb(86, 139, 255);

  .admin-menu { //------------------------
    position: relative;
    bottom: 86px;
    left: 323px;
    width: 200px;
    height: 30px;
    justify-content: right;


    background-color:blueviolet;


    .admin-menu-text {
      display: inline-block;
      font-family: 'Nanum Square', sans-serif;
      font-size: 16px;
      text-align: right;
      background-color: yellow;
    }
    .admin-menu-icon {
      display: inline-block;
      margin: 3px 7px 0px 3px;
      width: 19px;
      height: 19px;
      background-color: bisque;
    }
  }

  .user-box { //------------------------
    position: relative;
    bottom: 116px;
    width: fit-content;
    height: 30px;
    margin-top: 4px;
    font-weight: 400;
    transition: 200ms;
    color: var(--i45);
      background-color: cornsilk;
    
    #account { //----------------
      float: left;
      width: fit-content;
      height: 18px;
      margin-right: 12px;
      font-family: 'Space Mono', sans-serif;
      font-size: 16px;
      text-align: left;
      letter-spacing: 0.24px;
      #user-name { 
        display: inline-block;
        margin-left: 1px;
        font-family: 'Nanum Square', sans-serif;
      }
    }
    .user-menu { //----------------
      float: left;
      bottom: 18px;
      width: fit-content;
      height: 25px;
      margin-right: 2px;
      font-family: 'Nanum Square', sans-serif;
      font-size: 14px;
      letter-spacing: 0.21px;
      text-align: right;
      font-weight: 400;
      color: var(--i30);
      fill: var(--i30);
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
      .icon-admin {
        float: left;
        margin: 3px 7px 0px 3px;
        width: 19px;
        height: 19px;
      }
    }.user-menu:hover {
      cursor: pointer;
      font-weight: 700;
      color: var(--accent01);
      fill: var(--accent01);
      transition: 300ms;
    }.user-menu-selected {
      font-weight: 700;
      color: var(--accent01);
      fill: var(--accent01);
      transition: 300ms;
    }
  }.user-box-bold {
    font-weight: 800;
    position: default;
  }.user-box-admin {
    bottom: 54px;
    transition: 200ms;
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
  }.border-extended {
      pointer-events: none;
      width: 100%;
      transition: 400ms;
      animation-timing-function: ease-out;
  }

  .theme-list{ // -------------------
    margin-top: 27px;
    padding-top: 14px;
    padding-bottom: 20px;
    width: 100%;
    height: 28px;
    background-color: fuchsia;
    .orb {
      display: inline-block;
      width: 28px;
      height: 28px;
      margin-right: 7px;
      background-color: gold;
    }
  }

  #searchBox { //------------------------
    position: relative;
    top: 75px;
    width: 100%;
    height: 80px;
    border-bottom: 2px solid var(--i30);
    // background-color: darkkhaki;
    #searchField { //-----------
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
      .load-bar {
        position: relative;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        animation: blink 300ms cubic-bezier(.37,.06,.67,.94) infinite;
        background-color: var(--accent01);
      }
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
  }#searchBox :hover, :focus {
    ~ #searchIndicator {
      height: 4px;
      transition: 200ms;
    } ~ #searchIcon {
      margin-top: 30px;
      transition: 200ms;
    }
  }
}.wrapper-header-admin {
  height: 144px;
}


#admin-tab {
  position: relative;
  top: 75px;
  width: 100%;
  height: 45px;
  border-top: 2px solid var(--i30);
  border-bottom: 2px solid var(--i30);
  background-color: rgba(0, 255, 255, 0.5);

  .menu {
    display: inline-block;
    margin-top: 12px;
    margin-left: 14px;
    margin-right: 6px;
    font-family: 'Nanum Square';
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 0;
    transition: 200ms;
    color: var(--i45);
    // background-color: chartreuse;
  }.menu:hover {
    transition: 200ms;
    cursor: pointer;
    color: var(--i30);
  }.menu-selected {
    transition: 300ms;
    font-weight: 600;
    color: var(--accent02);
  }.menu-selected:hover{
    transition: 200ms;
    color: var(--accent02);
  }
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
