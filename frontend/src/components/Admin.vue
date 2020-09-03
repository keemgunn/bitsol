<template>
<div id="admin">

  <transition name="appear">
  <div id="index" v-if="admin.modal==='index'">
    <div class="title">DB 정보</div>
      <div class="content prop">현재DB:</div>
      <div class="content data">2020sdafasdfasdfasdfasdf</div>
      <br>
      <div class="content prop">마지막 업데이트:</div>
      <div class="content data">2020-07-27T12:53:49.009Z</div>
      


    <div class="title">냉장고 보관팩</div>


    <div class="title">사용자 정보</div>


    <div class="title">소프트웨어 정보</div>

    
  </div></transition>

  <transition name="appear"><DB 
    v-if="admin.modal==='db'"
  /></transition>
















</div>
</template>


<script>
import DB from '@/components/admin/DB'

import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: "Admin",
  components: { DB, },
  props: [
    "adminMenu"
  ],
  data() { return {

    //--------- DB
    scope: "room", //"student"
    option: true,


  }},
  computed: {
    ...mapState(['dbinfo', 'admin']),
    ...mapGetters(['ROOM_LIST', 'STUDENT_LIST'])
  },
  methods: {
    ...mapMutations(['LOAD_ROOM_LIST', 'LOAD_STUDENT_LIST'])
  },
  created() {
    if(this.ROOM_LIST.length === 0){
      this.LOAD_ROOM_LIST();
    }
    if(this.STUDENT_LIST.length === 0){
      this.LOAD_STUDENT_LIST();
    }
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
  // background-color: deeppink;
}

#index {
  display: block;
  position: relative; top: 0; left: 0;
  width: fit-content;
  height: 700px;
  justify-content: center;
  align-items: center;
  font-family: 'Nanum Square';
  letter-spacing: 0;
  background-color: gainsboro;

  .title {
    font-weight: 800;
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
    background-color: azure;
  }
  .content {
    display: inline-block;
    margin-bottom: 5px;
    font-size: 16px;
  }.prop {
    font-weight: 700;
  }.data {
    font-weight: 500;
  }.measure {
    font-size: 14px;
  }


}




</style>