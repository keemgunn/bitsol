<template>
<div id="app">

  <div id="wrapper-header">

    <div id="accountBox" @click="callback('accountBox')">
      user:<div id="userName">{{this.$store.state.userName}}</div>
      <div id="border"></div>
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
    refgTerm: null,
    searchArr: [],
    dbinfo: {},
    coverBottom: {
      "height": "100%"
    }
  }},
  computed: {

  },
  methods: {
    logout(){
      this.$emit('logout');
    },
    typing(e) {
      this.keyword = e.target.value
    },
    callback(arg){
      console.log(arg);
      return false;
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
    },
    listFit(count){
      this.coverBottom.height = "calc(100% - " + String(count * 66) + "px)"
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

#accountBox { //------------------------
  display: block;
  float: left;
  width: 250px;
  height: 30px;

  font-family: 'Space Mono';
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.24px;

  
  margin-top: 4px;
  color: var(--i45);
  background-color: rgb(8, 5, 29);
}
#userName {
  display: inline-block;
  margin-left: 1px;

  font-family: 'Nanum Square';
  font-size: 16px;
  letter-spacing: 0.24px;
  text-align: left;

  background-color: rgb(14, 34, 88);
}
#border {
  display: block;
  width: 20px;
  height: 2px;

  transition: 200ms;
  

  position: relative;
  left: 0;
  top: 4px;

  background-color: aquamarine;
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

</style>
