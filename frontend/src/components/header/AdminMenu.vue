<template>
<div id="admin-menu">

<div class="menu" :class="{'menu-selected':(admin.modal==='index')}" @click="changeModal('index')">개요</div>

<div class="menu" :class="{'menu-selected':(admin.modal==='db')}" @click="changeModal('db')">DB 관리</div>

<div class="menu" :class="{'menu-selected':(admin.modal==='user')}" @click="changeModal('user')">사용자 관리</div>

<div class="menu" :class="{'menu-selected':(admin.modal==='refg')}" @click="changeModal('refg')">냉장고팩 관리</div>

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: "AdminMenu",
  data() { return {
    modalNow: ''
  }},
  computed: {
    ...mapState(['admin'])
  },
  methods: {
    changeModal(to){
      if(this.modalNow !== to){
        this.$store.state.admin.modal = to;
        this.INITIALIZE(this.modalNow);
        this.modalNow = to;
      }
    },
    ...mapMutations(['INITIALIZE'])
  },
  created() {
    this.modalNow = this.admin.modal;
  },
}
</script>


<style lang="scss" scoped> 
#admin-menu {
  position: absolute; bottom: 15px; left: 0;
  width: 100%;
  height: 45px;
  border-top: solid var(--i30) 2px;
  border-bottom: solid var(--i30) 2px;
}

.menu {
  float: left;
  margin: 12px 6px 0px 14px;
  font-family: 'Nanum Square', sans-serif;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0;
  color: var(--i45);
  transition: 500ms;
}.menu:hover {
  transition: 200ms;
  cursor: pointer;
  color: var(--accent01);
}.menu-selected {
  color: var(--accent03);
  font-weight: 700;
}.menu-selected:hover {
  cursor: default;
  color: var(--accent03);
}


</style>