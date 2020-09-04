<template>
<div class="sidecar-record"
:class="{'selection':type==='selection', 'updated':type==='updated'}">

  <div v-if="type==='selection'">

    <div class="name">
      {{STUDENT.student_name}}
    </div>

    <div class="id">
      {{STUDENT.student_id}}
    </div>

    <div class="room">
      {{ROOM_NAME}}
    </div>

    <div class="num">
      {{STUDENT.student_number}}
    </div>

    <div class="delete">
      <svg viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>선택 해제</title>
        <polygon transform="translate(13,-5) rotate(45)" fill-rule="nonzero" points="22.8994949 14.4142136 14.4142136 14.4142136 14.4142136 22.8994949 11.5857864 22.8994949 11.5857864 14.4142136 3.10050506 14.4142136 3.10050506 11.5857864 11.5857864 11.5857864 11.5857864 3.10050506 14.4142136 3.10050506 14.4142136 11.5857864 22.8994949 11.5857864"></polygon>
      </svg>
    </div>

  </div>



  <div v-if="type==='updated'">

    <div class="container" v-if="index.adjust === 'change'">
      <div class="title">자리 변경</div>
      <div class="block red">
        <div class="line">
          <div class="text">{{index['rooms'][0][1]}}</div>
          <div class="text">{{this['STUDENT_LIST'][index['before'][0]]['student_name']}}</div>
        </div>
        <div class="line">
          <div class="text">{{index['rooms'][1][1]}}</div>
          <div class="text">{{this['STUDENT_LIST'][index['before'][1]]['student_name']}}</div>
        </div>
      </div>
      <div class="block green">
        <div class="line">
          <div class="text">{{index['rooms'][0][1]}}</div>
          <div class="text">{{this['STUDENT_LIST'][index['after'][0]]['student_name']}}</div>
        </div>
        <div class="line">
          <div class="text">{{index['rooms'][1][1]}}</div>
          <div class="text">{{this['STUDENT_LIST'][index['after'][1]]['student_name']}}</div>
        </div>
        <div class="arrow">
          <svg viewBox="0 0 12 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>Combined Shape</title>
          <path d="M10.4540263,7.10542736e-14 L11.8272734,1.45402631 L6.622,6.37 L5.95402631,7.07727337 L5.913,7.039 L5.87324707,7.07727337 L5.205,6.37 L1.33226763e-13,1.45402631 L1.37324707,7.10542736e-14 L5.914,4.288 L10.4540263,7.10542736e-14 Z" id="Combined-Shape" fill-rule="nonzero"></path>
          </svg>
        </div>
      </div>
    </div>

    <div class="container" v-if="index.adjust === 'out'">
      <div class="title">퇴실</div>
      <div class="block red">
        <div class="line">
          <div class="text">{{index['from'][1]}}</div>
          <div class="text">{{this['STUDENT_LIST'][index['target']]['student_name']}}</div>
        </div>
      </div>
    </div>

    <div class="container" v-if="index.adjust === 'in'">
      <div class="title">입실</div>
      <div class="block green">
        <div class="line">
          <div class="text">{{index['to'][1]}}</div>
          <div class="text">{{this['STUDENT_LIST'][index['target']]['student_name']}}</div>
        </div>
      </div>
    </div>

    <div class="undo">
      실행취소
      <div class="icon">
        <svg width="16px" height="7px" viewBox="0 0 16 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Group 2/more_close_thin</title>
        <g id="Symbols" stroke="none" stroke-width="1" fill-rule="evenodd">
          <g id="sidemenu_update_exchange" transform="translate(-136.000000, -13.000000)" >
            <g id="Group-2/more_close_thin-Copy" transform="translate(135.000000, 8.000000)">
                <path d="M9.375,6 C7.3875,6 5.5875,6.7425 4.2,7.95 L1.5,5.25 L1.5,12 L8.25,12 L5.535,9.285 C6.5775,8.415 7.905,7.875 9.375,7.875 C12.03,7.875 14.2875,9.6075 15.075,12 L16.8525,11.415 C15.81,8.2725 12.8625,6 9.375,6 Z" id="Path"></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
    
  </div>
</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: "SidecarRecord",
  components: { },
  props: ['type', 'index'],
  computed: {
    STUDENT: function(){
      return this.STUDENT_LIST[this.index]
    },
    ROOM_NAME: function(){
      if(this.STUDENT.room_name){
        return this.STUDENT.room_name
      }else{
        return '퇴실'
      }
    },
    ...mapState(['admin']),
    ...mapGetters(['ROOM_LIST', 'STUDENT_LIST'])
  },
  methods: {
    ...mapMutations([])
  }
}
</script>



<style lang="scss" scoped> 
.sidecar-record {
  position: relative;
  width: 100%;
  font-family: 'Nanum Square', sans-serif;
  font-weight: 500;
  letter-spacing: 0;
  // background-color: deepskyblue;
}



.selection {
  height: 59px;
  color: var(--i45);
  border-bottom: 1px solid var(--i30);
  background-color: transparent;
  transition: 200ms;

  .name {
    float: left;
    position: relative; top: 10px; left: 1px;
    font-weight: 700;
    font-size: 17px;
    line-height: 19px;
    // background-color: fuchsia;
  }
  .id {
    float: left;
    position: relative; top: 8px; left: 4px;
    font-size: 13px;
  }
  .room {
    float: left;
    position: relative; top: 10px; left: 8px;
    font-size: 15px;
    line-height: 18px;
  }
  .num {
    position: absolute; bottom: 9px; left: 1px;
    font-size: 13px;
  }
  .delete {
    position: absolute; top: 8px; right: 3px;
    width: 17px;
    height: 17px;
    fill: var(--i45);
  }.delete:hover {
    cursor: pointer;
    fill: var(--i20);
  }
}.selection:hover {
  transition: 300ms;
  color: var(--i30);
  background-color: var(--i98);
}



.updated {
  height: fit-content;
  padding-top: 10px;
  padding-bottom: 7px;
  border-bottom: 1px solid var(--i30);
  color: var(--i30);
  background-color: transparent;
  opacity: 0.8;
  transition: 200ms;

  .title{
    font-weight: 700;
    font-size: 17px;
    margin-bottom: 6px;
    padding-left: 2px;
    // background-color: darkslategrey;
  }

  .container{
    font-size: 15px;
    letter-spacing: 0;
    line-height: 18px;
    .block{
      margin-left: 6px;
      margin-bottom: 6px;
      height: fit-content;
      width: fit-content;
    }
    .red{
      color: var(--alert01);
      border-left: 3px solid var(--alert01);
    }
    .green{
      color: var(--pos01);
      border-left: 3px solid var(--pos01);
    }
    .arrow{
      position: absolute; bottom: 56px; left: 1px;
      width: 13px; height: 8px;
      fill: var(--alert01);
    }
    .line{
      margin-left: 6px;
      margin-bottom: 3px;
      height: 16px;
      width: fit-content;
    }
    .text{
      display: inline-block;
      margin-left: 3px;
    }
  }
  
  .undo{
    position: absolute; top: 12px; right: 0px;
    width: 68px;
    height: 18px;
    font-size: 12px;
    font-weight: 700;
    color: transparent;
    transition: 200ms;
    // background-color: rgba(255, 0, 255, 0.356);
    .icon{
      position: absolute; bottom: 1px; right: 0px;
      width: 18px; height: 18px;
      fill: var(--i30);
    }
  }.undo:hover{
    transition: 200ms;
    cursor: pointer;
    color: var(--i30);
  }

}.updated:hover {
  transition: 300ms;
  opacity: 1;
  background-color: var(--i98);
}

</style>