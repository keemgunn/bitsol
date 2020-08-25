<template>
<div class="record">
  <div class="plate">

    <div class="room">{{info.room_name}}</div>

    <div class="name">{{info.student_name}}</div>

    <svg class="pack-icon" v-if="!search.moreinfo" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>pack</title>
      <path class="unavailable"
      :class="{ supplement: askUpdate(0), available: askAvail(0), unavailable: submitCheck }"
      d="M8.42738854,10.0002825 C9.45778372,12.9121914 12.2365569,15 15.5,15 C16.7642632,15 17.9557872,14.6866616 19.0010984,14.1334584 L19,19.0006212 C19,19.552906 18.5522847,20.0006212 18,20.0006212 L6,20.0006212 C5.44771525,20.0006212 5,19.552906 5,19.0006212 L5,10 L8.42738854,10.0002825 Z M15.5,2 C18.536,2 21,4.464 21,7.5 C21,10.536 18.536,13 15.5,13 C12.464,13 10,10.536 10,7.5 C10,4.464 12.464,2 15.5,2 Z M18.02,4.665 L14.31,8.375 L12.98,7.045 L12,8.025 L14.31,10.335 L19,5.645 L18.02,4.665 Z M8.866088,3.99975893 C8.31316711,5.04486421 8,6.23608235 8,7.5 C8,7.668127 8.00554132,7.83496762 8.01645118,8.00034907 L5,8 L5,5.0006212 C5,4.44833645 5.44771525,4.0006212 6,4.0006212 L8.866088,3.99975893 Z" id="Combined-Shape" fill="#000000"></path>
    </svg>

    <svg class="pack-icon" v-if="!search.moreinfo" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>pack</title>
      <path class="unavailable"
      :class="{ supplement: askUpdate(1), available: askAvail(1), unavailable: submitCheck }"
      d="M8.42738854,10.0002825 C9.45778372,12.9121914 12.2365569,15 15.5,15 C16.7642632,15 17.9557872,14.6866616 19.0010984,14.1334584 L19,19.0006212 C19,19.552906 18.5522847,20.0006212 18,20.0006212 L6,20.0006212 C5.44771525,20.0006212 5,19.552906 5,19.0006212 L5,10 L8.42738854,10.0002825 Z M15.5,2 C18.536,2 21,4.464 21,7.5 C21,10.536 18.536,13 15.5,13 C12.464,13 10,10.536 10,7.5 C10,4.464 12.464,2 15.5,2 Z M18.02,4.665 L14.31,8.375 L12.98,7.045 L12,8.025 L14.31,10.335 L19,5.645 L18.02,4.665 Z M8.866088,3.99975893 C8.31316711,5.04486421 8,6.23608235 8,7.5 C8,7.668127 8.00554132,7.83496762 8.01645118,8.00034907 L5,8 L5,5.0006212 C5,4.44833645 5.44771525,4.0006212 6,4.0006212 L8.866088,3.99975893 Z" id="Combined-Shape" fill="#000000"></path>
    </svg>










  </div>
</div>
</template>



<script>
import { mapState } from 'vuex';

export default {
  name: "Record",
  props: [
    "info"
  ],
  data() { return {
    update: 0,
    submitCheck: false,
    cf0: 0, cf1: 1,
  }},
  computed: {
    updateLimit: function(){
      return this.dbinfo.refgLimit - this["info"][this.dbinfo.refgTerm]
    },
    ...mapState(['search', 'dbinfo'])
  },
  methods: {
    askUpdate(i){
      if(this.update && !this.submitCheck){
        if ( this.update - i > 0 ){
          return true;
        }else {
          return false;
        }
      }else {
        return false
      }
    },
    askAvail(i){
      if ( this.updateLimit - i > 0 && !this.submitCheck){
        return true;
      }else {
        return false;
      }
    },
    plus(){
      if(this.update < this.updateLimit && !this.submitCheck) {
        this.update ++
      }else {
        this.alert("~~ exceeded");
      }
    },
    minus(){
      if(this.update > 0 && !this.submitCheck) {
        this.update --
      }else {
        this.alert("~~ less than 0");
      }
    },
    alert(msg){
      console.log(msg);
      this.coverFlow("cf0");
      setTimeout(this.coverFlow, 200, "cf1");
    },coverFlow(obj){
      this[obj] ++ ;
    },
    submit(){
      if(this.submitCheck === false){
        this.submitCheck = true
        //submit method ~~~~~~~


        console.log("~~~ submitted");
      }else{
        this.alert("already submitted")
      }
    },

  },
  created() {

  },
  mounted() {
    this.alert("~~ record mounted ~~");
  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
.record {
  position: relative; top: 0; left: 0;
  width: 100%;
  height: 56px;
  background-color: darksalmon;
}
.plate {
  position: relative; top: 3px; left: 3px;
  width: calc(100% - 6px);
  height: 50px;
  background-color: var(--i94);
}


.room {
  float: left; width: fit-content; height: 40px;
  margin-top: 5px; margin-left: 12px;
  font-family: 'Barlow';
  font-size: 32px;
  letter-spacing: 0.84px;
  line-height: 34px;
  // background-color: cornflowerblue;
}


.name {
  float: left; width: fit-content; height: 40px;
  margin: 5px 6px 0px 4px;
  font-family: 'Core Gothic D';
  font-size: 26px;
  letter-spacing: -0.45px;
  line-height: 39px;
  // background-color: darkkhaki;
}

.pack-icon { 
  float: left;
  margin-top: 11px; margin-left: -1px;
  width: 27px;
  height: 27px;
  transition: 200ms;
}.unavailable {
  transition: 200ms;
  fill: var(--i70);
}.available {
  transition: 200ms;
  fill: var(--i30);
}.supplement {
  transition: 200ms;
  fill: var(--accent02);
}













</style>