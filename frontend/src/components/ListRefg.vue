<template>
<div class="listrefg">
<div class="content">

  <div class="room-name">{{record.room_name}}</div>

  <div class="student-name">{{record.student_name}}</div>

  <svg class="pack-icon" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>pack</title>
    <path 
    class="unavailable"
    :class="{
    supplement: askUpdate(0),
    available: askAvail(0)
    }"
      d="M8.42738854,10.0002825 C9.45778372,12.9121914 12.2365569,15 15.5,15 C16.7642632,15 17.9557872,14.6866616 19.0010984,14.1334584 L19,19.0006212 C19,19.552906 18.5522847,20.0006212 18,20.0006212 L6,20.0006212 C5.44771525,20.0006212 5,19.552906 5,19.0006212 L5,10 L8.42738854,10.0002825 Z M15.5,2 C18.536,2 21,4.464 21,7.5 C21,10.536 18.536,13 15.5,13 C12.464,13 10,10.536 10,7.5 C10,4.464 12.464,2 15.5,2 Z M18.02,4.665 L14.31,8.375 L12.98,7.045 L12,8.025 L14.31,10.335 L19,5.645 L18.02,4.665 Z M8.866088,3.99975893 C8.31316711,5.04486421 8,6.23608235 8,7.5 C8,7.668127 8.00554132,7.83496762 8.01645118,8.00034907 L5,8 L5,5.0006212 C5,4.44833645 5.44771525,4.0006212 6,4.0006212 L8.866088,3.99975893 Z" id="Combined-Shape" fill="#000000"></path>
  </svg>
  <svg class="pack-icon" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>pack</title>
    <path 
    class="unavailable"
    :class="{
    supplement: askUpdate(1),
    available: askAvail(1)
    }"
      d="M8.42738854,10.0002825 C9.45778372,12.9121914 12.2365569,15 15.5,15 C16.7642632,15 17.9557872,14.6866616 19.0010984,14.1334584 L19,19.0006212 C19,19.552906 18.5522847,20.0006212 18,20.0006212 L6,20.0006212 C5.44771525,20.0006212 5,19.552906 5,19.0006212 L5,10 L8.42738854,10.0002825 Z M15.5,2 C18.536,2 21,4.464 21,7.5 C21,10.536 18.536,13 15.5,13 C12.464,13 10,10.536 10,7.5 C10,4.464 12.464,2 15.5,2 Z M18.02,4.665 L14.31,8.375 L12.98,7.045 L12,8.025 L14.31,10.335 L19,5.645 L18.02,4.665 Z M8.866088,3.99975893 C8.31316711,5.04486421 8,6.23608235 8,7.5 C8,7.668127 8.00554132,7.83496762 8.01645118,8.00034907 L5,8 L5,5.0006212 C5,4.44833645 5.44771525,4.0006212 6,4.0006212 L8.866088,3.99975893 Z" id="Combined-Shape" fill="#000000"></path>
  </svg>

</div>
</div>
</template>

<script>
export default {
  name: 'ListRefg',
  data() { return {
    update: 0, 
    refgLimit00: 2,
    refgTerm00: '19_1',
    
  }},
  props: [
    "record",
    "refgTerm",
    "refgLimit"
  ],
  methods: {
    askUpdate(i) {
      if(this.update){
        if ( this.update - i > 0 ){
          return true;
        }else {
          return false;
        }
      }else {
        return false
      }
    },
    askAvail(i) {
      if ( this.updateLimit00 - i > 0){
        return true;
      }else {
        return false;
      }
    }
  },
  computed: {
    updateLimit: function() {
      return this.refgLimit - this["record"][this.refgTerm]
    },
    updateLimit00: function() {
      return this.refgLimit00 - this["record"][this.refgTerm00]
    },
  },
  created() {

  }
}


</script>



<style lang="scss" scoped> .listrefg {
  float: left;
  width: calc(100% - 46px);
  height: 50px;
  padding: 3px;
  transition: 300ms;
  background-color: transparent;
} 
.listrefg:hover {
  background-color: rgba(255, 255, 255, 1);
  transition: 150ms;
}
.content {
  width: 100%;
  height: 50px;
  transition: 300ms;
  background-color: var(--i94);
  background-color: bisque;
} 
.content:hover {
  transition: 150ms;
  background-color: var(--i98);
}


// ------------------------------ CONTENTS

.room-name {
  display: inline-block;
  position: relative;
  margin-top: 4px;
  margin-left: 15px;

  font-family: 'Barlow';
  font-weight: 400;
  font-size: 32px;
  letter-spacing: 0.84px;
  text-align: center;
  background-color: forestgreen; 
}

.student-name {
  display: inline-block;
  position: relative;
  margin-left: 7px;
  margin-right: 6px;
  bottom: 2px;

  font-family: 'Core Gothic D';
  font-weight: 400;
  font-size: 26px;
  letter-spacing: -0.45px;
  text-align: center;
  background-color: teal;
}

.pack-icon { // --------------------
  display: inline-block;
  position: relative;
  top: 2px;

  width: 27px;
  height: 27px;

  transition: 200ms;
}
.unavailable {
  fill: var(--i70);
}
.available {
  fill: var(--i30);
}
.supplement {
  fill: var(--accent02);
}






</style>
