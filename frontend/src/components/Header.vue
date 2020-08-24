<template>
<div id="header">
  <div id="light-cover"></div>
<div id="content">

  <div class="user"
  :class="{'user-expand':userBoxState>0, 'orb-shown':userBoxState===2}"
  @mouseenter="toggle('userBoxState', 1)"
  @mouseleave="toggle('userBoxState', 0);">
    <div id="name">
      user:{{this.$store.state.auth.userName}}
    </div>

    <transition name="fade">
    <div class="menu"
    v-if="userBoxState"
    :class="{'user-menu-selected':userBoxState===2}"
    @click="toggle('userBoxState',2)">
      테마 변경
      <div class="icon">
        <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>theme</title>
          <g> 
            <polygon points="7 10 12 15 17 10"></polygon>
          </g>
        </svg>
      </div>
    </div></transition>

    <transition name="fade">
    <div class="menu"
    v-if="userBoxState"
    :class="{'user-menu-selected':userBoxState===2}"
    @click="logout()">
      로그아웃
      <div class="icon">
        <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>logout</title>
          <g transform="translate(7,0)">
            <polygon transform="translate(5,-5) rotate(45)" points="17.8925565 12.8417938 12.8417938 12.8417938 12.8417938 17.8925565 11.1582062 17.8925565 11.1582062 12.8417938 6.10744349 12.8417938 6.10744349 11.1582062 11.1582062 11.1582062 11.1582062 6.10744349 12.8417938 6.10744349 12.8417938 11.1582062 17.8925565 11.1582062"></polygon>
            </g>
        </svg>
      </div>
    </div></transition>

    <transition name="orb-fade">
    <div id="theme-list" 
    v-if="userBoxState === 2">
      <div :key="color" 
      v-for="color in this.$store.state.theme.colorKeys">
        <Theme
          :color="color"
        />
      </div>
    </div></transition>

    <div class="border" :class="{'border-expand':userBoxState>0}"></div>
  </div>
















</div>
</div>
</template>



<script>
import axios from 'axios'
import Theme from '@/components/Theme'


export default {
  name: "Header",
  components: {
    Theme, 
  },
  props: [

  ],
  data() { return {

    //__________ UI
    userBoxState: 0,
    recordHeight: 66,
    coverBottom: {
      "height": "100%"
    },

    //__________ DB
    dbinfo: {},
    keyword: '',
    searchArr: [],

  }},
  computed: {

  },
  methods: {
    //___________ AUTH __________
    logout(){ this.$store.dispatch('LOGOUT');
    },
    async getDBinfo(){
      console.log('### request ...@App/getDBinfo');
      let {data} = await axios.get('/db/info');
      this.dbinfo = data;
      console.log(this.dbinfo);
    },

    //___________ LOAD/SEARCH DATABASE __________
    async search(){
      let {data} = await axios.post('/db/search', {keyword: this.keyword});
      this.searchArr = data.arg;
      this.fitCoverBottom(this.searchArr.length, this.recordHeight);
    },
    loading(bool){
      this.loadingState = bool;
    },

    //___________ UI ACTION __________
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
    modeChange(){
      if(this.$store.state.modal.mode === 'search-list'){
        this.$store.state.modal.mode = 'admin'
      }else{
        this.$store.state.modal.mode = 'search-list'
      }
    },


  },
  created() { //_____________________________
    if(this.$store.state.auth.id === null){
      this.$store.dispatch('RECOVER');
      console.log('### configuration recovered ... @App');
    }
    this.getDBinfo();
  },
  mounted() {
    
  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}

</script>


<style lang="scss" scoped> #header {
  position: absolute; top: 0; left: 0;
  width: 100vw;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none; -webkit-user-select: none;
}
#content {
  position: relative; top: 0; left: 0;
  z-index: 10;
  width: calc(100vw - 120px);
    min-width: 490px;
    max-width: 710px;
  height: 100%;
  background-color: rgba(219, 126, 13, 0.24);
}
//-----------------------------------------------
//-----------------------------------------------


.user {
  position: absolute; top: 20px; left: 0px;
  width: fit-content;
  height: 30px;
  font-family: 'Space Mono', 'Nanum Square', sans-serif;
  font-weight:800;
  font-size: 16px;
  text-align: left;
  letter-spacing: 0.24px;
  color: var(--i45);
  background-color: wheat;
}.user:hover {
  color: var(--i30);
}.user-expand {
  color: var(--i30);
  fill: var(--i30);
}.orb-shown {
  height: 90px;
}

  #name {
    float:left;
    margin-right: 5px;
    width: fit-content;
    height: 28px;
    background-color: aqua;
  }

  .menu {
    float: left;
    margin-left: 3px;
    width: fit-content;
    height: 26px;
    font-family: NanumSquareOTFB;
    font-size: 14px;
    letter-spacing: 0.21px;
    text-align: left;
    line-height: 26px;
    transition: 300ms;
    background-color: chocolate;
  }.menu:hover {
    transition: 200ms;
    cursor: pointer;
    color: var(--accent02);
    fill: var(--accent02);
  }.icon {
    float: right;
    margin-top: 1px;
    width: 24px;
    height: 24px;
  }

  .border {
    position: absolute; top: 28px; left: 0;
    width: 0%;
    height: 3px;
    background-color: var(--i30);
    transition: 200ms;
    animation-timing-function: ease-in-out;
  }.border-expand {
    pointer-events: none;
    width: 100%;
    transition: 400ms;
    animation-timing-function: ease-out;
  }

  #theme-list {
    position: absolute; top: 40px; left: 0;
    width: 100%;
    height: fit-content;
    // background-color: deeppink;
  }

  #light-cover { 
    position: absolute; top: 0; left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: var(--i94);
  }

// ================== ANIMATION =================

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
.fade-enter, .fade-leave-to {
  opacity: 0;
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


.admin-menu-enter {
  opacity: 0;
}
.admin-menu-enter-to {
  opacity: 1;
}
.admin-menu-enter-active{
  transition: all 300ms;
  transition-delay: 300ms;
}
.admin-menu-leave {
  opacity: 1;
}
.admin-menu-leave-to {
  opacity: 0;
}
.admin-menu-leave-active {
  transition: all 280ms;
}

</style>