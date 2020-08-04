<template>
<div class="online">
  <h1>Online.vue</h1>
  <input 
  type="button" 
  value="logout"
  class="btn"
  v-on:click="logout"
  />
  <h1>{{ state.userKey }}</h1>
  <h2>accessLevel: {{ accessLevel }}</h2>
  <h3>modal.display: {{ modal.display }}</h3>
  


  
</div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'Online',
  components: {
    
  },
  props: ["accessLevel", "state", "modal"],
  data() { return {

  }},
  methods: {
    logout(){
      this.$emit('logout');
    }
  },
  created() {
    this.$emit('manager-created')
  },
  mounted() {

  },
  beforeDestroy() {

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
