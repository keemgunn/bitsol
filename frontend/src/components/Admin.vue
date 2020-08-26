<template>
<div id="admin">

  <DbSetting 
    v-if="admin.modal==='db'"
  />

</div>
</template>

<script>
import DbSetting from '@/components/admin/DbSetting'

import { mapState } from 'vuex'

export default {
  name: "Admin",
  components: { DbSetting, },
  props: [
    "adminMenu"
  ],
  data() { return {

    //--------- DB
    scope: "room", //"student"
    option: true,


  }},
  computed: {
    ...mapState(['admin'])
  },
  methods: {

  },
  created() {

  },
}
</script>

<style lang="scss" scoped> #admin {
  z-index: 10;
  position: absolute; top: 160px; left: 0;
  width: 100vw;
  height: calc(100% - 160px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: deeppink;
}




</style>