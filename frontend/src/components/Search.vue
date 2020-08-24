
<template>
<div id="search">
<div class="cover-app-side" :style="{'left':0}"></div>
<div class="cover-app-side" :style="{'right':0}"></div>

<div id="content">


</div>






</div>
</template>



<script>
import axios from 'axios';

export default {
  name: "Search",
  props: [

  ],
  data() { return {

  }},
  computed: {

  },
  methods: {
    async getDBinfo(){
      console.log('### request ...@App/getDBinfo');
      let {data} = await axios.get('/db/info');
      this.dbinfo = data;
      console.log(this.dbinfo);
    },
  },
  created() {
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



<style lang="scss" scoped> 
#search {
  position: absolute; top: 180px; left: 0;
  width: 100%;
  height: calc(100% - 180px);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none; -webkit-user-select: none;
  background-color: rgba(151, 23, 255, 0.226);
}
#content {
  position: relative; top: 0; left: 0;
  z-index: 10;
  width: calc(100vw - 120px);
    min-width: 490px;
    max-width: 710px;
  height: 100%;
  background-color: rgb(0, 224, 150);
}








.cover-app-side {
  position: absolute; top: 0;
  z-index: 2;
  height: 100vh;
  background-color: var(--i94);
  // background-color: rgba(78, 78, 78, 0.295);
}
@media ( max-width: 2000px ) {
    .cover-app-side {
        width: calc( 50vw - 340px );
    }   
}
@media ( max-width: 800px ) {
    .cover-app-side {
        width: calc( 10vw );
    } 
}
@media ( max-width: 550px ) {
    .cover-app-side {
        width: calc( 7vw );
    } 
}
</style>