<template>
<div id="app">

  <div id="scopeTab">
    <div class="scopeBox"
        :class="{scopeSelected: this.$store.state.modal.scopeTab === 'refg'}"
        @click="callback('scopeBox_refg')">
      <div class="scopeText">냉장고팩지급</div>
    </div>
    <div class="scopeBox"
        :class="{scopeSelected: this.$store.state.modal.scopeTab === 'info'}"
        @click="callback('scopeBox_info')">
      <div class="scopeText">상세정보</div>
    </div>
    <div class="scopeBox"
        :class="{scopeSelected: this.$store.state.modal.scopeTab === 'admin'}"
        v-if="this.$store.state.accessLevel > 1"
        @click="callback('scopeBox_admin')">
      <div class="scopeText">학생관리</div>
    </div>
  </div>

  <div id="accountBox" @click="callback('accountBox')">
    <div id="userName">user: {{this.$store.state.userName}}</div>
  </div>

  <form 
  @submit.prevent
  id="searchBox"
  v-if="this.$store.state.modal.scopeTap !== 'admin'"
  autocomplete="off">
    <input
      id = "searchField"
      ref="searchField" 
      placeholder="search..."
      type="text" 
      v-model="keyword"
      @keyup="callback(keyword)"
    />
    <div id="searchIndicator"></div>
    <div id="searchIcon"></div>
  </form>
    
  <Refg
  v-if="this.$store.state.modal.scopeTab === 'refg'"
  />

</div>
</template>

<script>
import Refg from '@/components/Refg'

export default {
  name: 'App',
  components: {
    Refg

  },
  props: [],
  data() { return {
    keyword: '',

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
  },
  created() {
    console.log("created");
    this.$emit('app-created')
    },
  mounted() {
    this.$refs.searchField.focus();
  },
  beforeDestroy() {
    // this.$emit('close-session')
  },

}
</script>



<style lang="scss" scoped> #app 
{
  margin-top: 40px;
  width: calc(100vw - 250px);
  height: calc(100vh - 40px);
  min-width: 470px;
  max-width: 710px;

  background-color: transparent;
}


/* --------------- HEADER-------------- */
#scopeTab {
  display: block;
  float: left;
  height: 31px;
  width: fit-content; 

  background-color: transparent;
}
.scopeBox { //--------------------------
  display: inline-block;
  height: 31p;
  width: fit-content;
  margin-right: 10px; 

  font-family: 'Nanum Square', sans-serif;
  font-size: 20px;   
  text-align: center;
  letter-spacing: 0.3px;
  line-height: 30px;

  border-bottom: 2px solid var(--i94);
  font-weight: 400;
  color: var(--i45);
}
.scopeBox :hover {
  cursor: pointer;
  color: var(--i30);
}
.scopeText {
  display: inline-block;
  margin-left: 3px;
  margin-right: 3px;
}
.scopeSelected {
  border-bottom: 2px solid var(--accent02);
  font-weight: 700;
  color: var(--accent02);
}
.scopeSelected :hover {
  color: var(--accent02);
}

#accountBox { //------------------------
  display: block;
  float: right;
  margin-top: 4px;
  color: var(--i45);
}
#accountBox :hover {
  border-bottom: 1px solid var(--accent02);
  cursor: pointer;
  color: var(--accent02);
}
#userName {
  display: inline;
  font-family: 'Barlow','Nanum Square';
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.24px;
  text-align: right;
}


/* --------------- SEARCH BOX -------------- */
#searchBox {
  display: block;
  margin-top: 62px;
  width: 100%;
  height: 80px;
  border-bottom: 2px solid var(--i30);
  background-color: transparent;
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
#searchField { //------------------
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
