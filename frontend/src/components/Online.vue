<template>
<div class="online">
  <h1>Online.vue</h1>
  <input 
  type="button" 
  value="logout"
  class="btn"
  v-on:click="logout"
  />
  <h1>{{ userKey }}</h1>
    


</div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'Online',
  components: {
    
  },
  props: ["userKey"],
  data() { return {

  }},
  methods: {
    logout(){
      this.$store.dispatch('LOGOUT');
      // $emit('del-todo', units.id);
    },

  },
  created() {
    console.log("created Online.vue");
  },
  mounted() {
    // students.vue에 진입하게 되면
    // 같은 정보를 이용해서 3시간 짜리 토큰 override
  },
  beforeDestroy() {
    console.log("### before Destroy Online.vue ###");

    // 5초짜리 인증 토큰 override __getToken()
    // this.getToken(this.$store.state.userKey, 5);



  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
