<template>
<div class="app">
  <h1>Online.vue</h1>
  <input 
  type="button" 
  value="logout"
  class="btn"
  v-on:click="logout"
  />
  <h1>{{ this.$store.state.userKey }}</h1>
  <h2>accessLevel: {{ this.$store.state.accessLevel }}</h2>
  <h3>modal.display: {{ this.$store.state.modal.display }}</h3>
  


  
</div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'App',
  components: {
    
  },
  props: [],
  data() { return {

  }},
  methods: {
    logout(){
      this.$emit('logout');
    }
  },
  created() {
    console.log("created");
    this.$emit('app-created')
    },
  mounted() {
  },
  beforeDestroy() {
    // this.$emit('close-session')
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
