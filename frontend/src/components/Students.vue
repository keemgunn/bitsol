<template>
  <div class="hello">
    <h1>students.vue</h1>
    <h3> {{ msg }} </h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Students',
  data() { return {
    msg: ''
  }},
  created() {
    axios.get('/students')
     .then(({data}) => (this.msg = data.msg))
     .catch(() => {
       console.log('FUCK')
     })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
