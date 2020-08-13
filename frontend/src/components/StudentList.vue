<template>
<div id="stdtlist">

  <div class="refg"
  :key="record.student_id"
  v-for="record in searchArr">
    <ListRefg 
      :record="record" 
    />
  </div>

  
  <div class="no-result">

  </div>


</div>
</template>

<script>
import ListRefg from '@/components/ListRefg'

export default {
  name: 'StudentList',
  components: {
    ListRefg
  },
  data() { return {

  }},
  props: [
    "searchArr", // from /db/search
    "dbinfo"
  ],
  methods: {

  },
  created() {

  }
}
</script>

<style lang="scss" scoped> #stdtlist 
{
  display: block;
  margin-top: 12px;
  width: 100%;
  height: calc(100% - 156px);

  background-color: burlywood;
}

.refg {
  display: block;
  width: 100%;
  height: 120px;

  background-color: darkblue;
}




</style>
