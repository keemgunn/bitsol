<template>
<div id="app">

  <div id="wrapper-header">
    <div class="user-box" 
      :class="{plus: userBoxExtend}"
      @mouseenter="expandUserBox"
      @mouseleave="expandUserBox">

      <div id="account">
        user:<div id="user-name">{{this.$store.state.userName}}</div>
      </div>

      <transition name="fade">
        <div :class="{'user-menu':1}" v-if="userBoxExtend">
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
    </div>

    <form id="searchBox"
    @submit.prevent
    v-if="this.$store.state.modal.scopeTap !== 'admin'"
    autocomplete="off">
      <input
        id = "searchField"
        ref="searchField" 
        placeholder="search..."
        type="text" 
        @input="keyword = $event.target.value"
        @keyup="search()"
      />
      <div id="searchIndicator"></div>
      <div id="searchIcon"></div>
    </form>

  </div>

  <StudentList
    v-if="this.$store.state.modal.scopeTab === ('refg' || 'info')"
    :keyword="keyword"
    :searchArr="searchArr"
    :dbinfo="dbinfo"
    :coverBottom="coverBottom"
  />

</div>
</template>

<script>
import axios from 'axios'
import StudentList from '@/components/StudentList'

export default {
  name: 'App',
  components: {
    StudentList
  },
  props: [],
  data() { return {
    keyword: '',
    searchArr: [],
    dbinfo: {},
    coverBottom: {
      "height": "100%"
    },
    userBoxExtend: false

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
    listFit(count){
      this.coverBottom.height = "calc(100% - " + String(count * 66) + "px)"
    },
    expandUserBox(){
      this.userBoxExtend = !this.userBoxExtend;
    },

    //___________ LOAD/SEARCH DATABASE __________
    async getDBinfo(){
      let {data} = await axios.get('/db/info');
      this.dbinfo = data;
      console.log(this.dbinfo);
    },
    async search(){
      console.log(this.keyword);
      let {data} = await axios.post('/db/search', {keyword: this.keyword});
      this.searchArr = data.arg;
      this.listFit(this.searchArr.length);
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
  // background-color: rgb(86, 139, 255);
}

.user-box { //------------------------
  float: left;
  width: fit-content;
  height: 30px;
  margin-top: 4px;
  transition: 200ms;
  font-weight: 400;
  color: var(--i45);
  // background-color: rgb(8, 5, 29);
}
  .plus {
    transition: 200ms;
    font-weight: 800;
  }

#account {
  float: left;
  width: fit-content;
  height: 18px;
  margin-right: 12px;

  font-family: 'Space Mono';
  font-size: 16px;
  letter-spacing: 0.24px;
}
  #user-name {
    display: inline-block;
    margin-left: 1px;

    font-family: 'Nanum Square';
    font-size: 16px;
    letter-spacing: 0.24px;
    text-align: left;

    // background-color: rgb(14, 34, 88);
  }

.user-menu { // -----------------------
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

.border { // ------------------------
  display: block;
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
    transition: 400ms;
    animation-timing-function: ease-out;
    width: 100%;
  }


#searchBox { //------------------------
  display: block;
  position: relative;
  top: 31px;
  padding-top: 40px;

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


</style>
