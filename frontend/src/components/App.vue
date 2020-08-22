<template>
<div id="app">

  <div class="wrapper-header" :class="{'wrapper-header-admin':this.$store.state.modal.scopeTab === 'admin'}"> <!-------------------------->

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

    <div id="admin-tab"
    v-if="this.$store.state.modal.scopeTab === 'admin'">
      <div class="menu" :class="{'menu-selected':(adminMenu==='index')}" @click="toggle('adminMenu', 'index')">개요</div>
      <div class="menu" :class="{'menu-selected':(adminMenu==='db')}" @click="toggle('adminMenu', 'db')">DB 관리</div>
      <div class="menu" :class="{'menu-selected':(adminMenu==='user')}" @click="toggle('adminMenu', 'user')">사용자 관리</div>
      <div class="menu" :class="{'menu-selected':(adminMenu==='refg')}" @click="toggle('adminMenu', 'refg')">냉장고팩 관리</div>
    </div>

    <div class="user-box"
    :class="{'user-box-bold':userBoxState, 'user-box-admin':(this.$store.state.modal.scopeTab === 'admin')}"
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
              <title>arrow_drop_down</title>
              <g> 
                <polygon points="7 10 12 15 17 10"></polygon>
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
              <title>Shape Copy</title>
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

  .user-box { //------------------------
    position: relative;
    bottom: 86px;
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
      margin-right: 1px;
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
      float: left;
      margin-right: 7px;
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
