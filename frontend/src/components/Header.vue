<template>
<div id="header">
  <div id="light-cover"></div>
  <div id="content">

    <User/>

    <AdminBtn v-if="this.$store.state.auth.accessLevel > 1"/>

    <SearchBox 
      v-if="this.$store.state.modal.mode === 'search'"
      :searchArr="searchArr"
      :recordHeight="recordHeight"
      :coverBottom="coverBottom"
      :loadingState="loadingState"
    />


  </div>
</div>
</template>



<script>
import User from '@/components/header/User'
import AdminBtn from '@/components/header/AdminBtn'
import SearchBox from '@/components/header/SearchBox'
import axios from 'axios'


export default {
  name: "Header",
  components: {
    User, AdminBtn, SearchBox
  },
  props: [
    "searchArr",
    "recordHeight",
    "coverBottom",
    "loadingState",
    "dbinfo"
  ],
  methods: {

    //___________ AUTH __________
    async getDBinfo(){
      console.log('### request ...@App/getDBinfo');
      let {data} = await axios.get('/db/info');
      this.dbinfo = data;
      console.log(this.dbinfo);
    },

    //___________ LOAD/SEARCH DATABASE __________
    async search(keyword){
      let {data} = await axios.post('/db/search', {keyword});
      this.searchArr = data.arg;
      this.fitCoverBottom(this.searchArr.length, this.recordHeight);
    },

  },
  created() { //_____________________________
    if(this.$store.state.auth.id === null){
      this.$store.dispatch('RECOVER');
      console.log('### configuration recovered ... @App');
    }
    this.getDBinfo();
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