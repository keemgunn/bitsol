<template>
<div id="deadline">

    <div id="title">보관팩 기간: </div>

    <div id="date">{{dbinfo.deadline}}</div>

    <div id="change">변경</div>

</div>
</template>



<script>
import { mapState } from 'vuex';

export default {
  name: "Deadline",
  data() { return {

  }},
  computed: {
    ...mapState(['dbinfo'])
  },
  methods: {

  },
}
</script>



<style lang="scss" scoped> 
#deadline {
  position: absolute; top: 13px; left: 18px;
  width: fit-content;
  height: 35px;
  color: var(--i45);
  transition: 500ms;
  #change {
  border: 2px solid transparent;
  border-radius: 6px;
  color: transparent;
  transition: 500ms;
  }
}#deadline:hover {
  transition: 200ms;
  color: var(--i30);
  #change {
  border: 2px solid var(--i45);
  color: var(--i30);
  background-color: var(--i94);
  transition: 200ms;
  }#change:hover {
    cursor: pointer;
    background-color: var(--accent01);
    color: var(--accent00);
    border: 2px solid var(--accent01);
  }
}#title {
  float: left;
  font-family: 'Nanum Square';
  font-weight: 700;
  font-size: 21px;
  line-height: 35px;
}#date {
  float: left;
  margin-top: 1px;
  margin-left: 6px;
  font-family: 'Barlow';
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
}#change {
  float: left;
  margin-top: 5px;
  margin-left: 12px;
  padding: 4px;
  width: fit-content;
  height: 14px;
  font-family: 'Nanum Square';
  font-weight: 700;
  font-size: 13px;
  line-height: 15px;
}






</style>