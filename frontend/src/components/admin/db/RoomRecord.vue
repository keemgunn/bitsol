<template>
<div id="room-record">

{{roomTest[index]["room"]}}
<br>


{{roomTest[index]["A"]["seat"]}}
{{roomTest[index]["A"]["student_name"]}}
{{roomTest[index]["A"]["faculty"]}}
{{roomTest[index]["A"]["major"]}}
({{roomTest[index]["A"]["student_number"]}})
{{roomTest[index]["A"]["indate"]}}

<br>

{{roomTest[index]["B"]["seat"]}}
{{roomTest[index]["B"]["student_name"]}}
{{roomTest[index]["B"]["faculty"]}}
{{roomTest[index]["B"]["major"]}}
({{roomTest[index]["B"]["student_number"]}})
{{roomTest[index]["B"]["indate"]}}


</div>
</template>



<script>
import { mapState } from 'vuex';

export default {
  name: "RoomRecord",
  components: { },
  props: [
    'index'
  ],
  data() { return {

  }},
  computed: {
    ...mapState(['roomList', 'roomTest'])
  },
  methods: {

  },
  created() {

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
#room-record {
  position: relative; top: 0; left: 0;
  width: 100%;
  height: 90px;
  background-color: aqua;
  overflow-y: auto;
  overflow-x: hidden;
}





</style>